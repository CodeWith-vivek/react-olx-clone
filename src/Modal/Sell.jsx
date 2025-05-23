import { Modal, ModalBody } from "flowbite-react";
import Input from "../Components/Input/Input";
import React, { useState, useEffect } from "react";
import { userAuth } from "../Context/Auth";
import { addDoc, collection } from "firebase/firestore";
import { fetchFromFireStore, fireStore } from "../config/Firebase/Firebase";
import loading from "../assets/loading.gif";
import fileUpload from "../assets/fileUpload.svg";
import close from "../assets/close.svg";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

const Sell = ({
  toggleModalSell,
  status,
  setItems,
  editItem = null,
  
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const auth = userAuth();

  const validateInputs = () => {
    if (!title.trim()) return "Title is required";
    if (!category.trim()) return "Category is required";
    if (!price.trim() || isNaN(price)) return "Valid price is required";
    if (!description.trim()) return "Description is required";
    if (!image && !editItem?.imageUrl) return "Image is required";
    return null;
  };

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setCategory(editItem.category);
      setPrice(editItem.price);
      setDescription(editItem.description);
      setImage(null);
    } else {
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);
    }
  }, [editItem, status]);

  const handleImageUpload = (e) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth?.user) {
      toast.error("Please log in to continue");
      return;
    }

    const error = validateInputs();
    if (error) {
      toast.warn(error);
      return;
    }

    setSubmitting(true);

    const readImageAsDataUrl = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result;
          localStorage.setItem(`image_${file.name}`, imageUrl);
          resolve(imageUrl);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    let imageUrl = editItem?.imageUrl || "";
    if (image) {
      try {
        imageUrl = await readImageAsDataUrl(image);
      } catch (error) {
        toast.error("Failed to read image");
        setSubmitting(false);
        return;
      }
    }

    try {
      if (editItem) {
        const itemRef = doc(fireStore, "products", editItem.id);
        await updateDoc(itemRef, {
          title,
          category,
          price,
          description,
          imageUrl,
        });
        toast.success("Item updated successfully");
      } else {
        await addDoc(collection(fireStore, "products"), {
          title,
          category,
          price,
          description,
          imageUrl,
          userId: auth.user.uid,
          userName: auth.user.displayName || "Anonymous",
          createdAt: new Date().toDateString(),
        });
        toast.success("Item added successfully");
      }

      const datas = await fetchFromFireStore();
      setItems(datas);
      toggleModalSell();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        onClick={toggleModalSell}
        show={status}
        className="bg-black"
        position="center"
        size="md"
        popup={true}
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner:
              "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
          },
        }}
      >
        <ModalBody
          className="bg-white h-96 p-0 rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            onClick={() => {
              toggleModalSell();
              setImage(null);
            }}
            className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
            src={close}
            alt="close"
          />
          <div className="p-6 pl-8 pr-8 pb-8">
            <p className="font-bold text-lg mb-3">
              {editItem ? "Edit Item" : "Sell Item"}
            </p>

            <form onSubmit={handleSubmit}>
              <Input placeholder="Title" value={title} setInput={setTitle} />

              <Input
                placeholder="Category"
                value={category}
                setInput={setCategory}
              />
              <Input placeholder="Price" value={price} setInput={setPrice} />

              <Input
                placeholder="Description"
                value={description}
                setInput={setDescription}
              />
              <div className="pt-2 w-full relative">
                <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                  {image ? (
                    <img
                      className="object-contain"
                      src={URL.createObjectURL(image)}
                      alt="uploaded"
                    />
                  ) : editItem?.imageUrl ? (
                    <img
                      className="object-contain"
                      src={editItem.imageUrl}
                      alt="existing"
                    />
                  ) : (
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileUpload} alt="upload" />
                      <p className="text-center text-sm pt-2">
                        Click to upload images
                      </p>
                      <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                    </div>
                  )}
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-30"
                  />
                </div>
              </div>
              {submitting ? (
                <div className="w-full flex h-14 justify-center pt-4 pb-2">
                  <img
                    className="w-32 object-cover"
                    src={loading}
                    alt="loading"
                  />
                </div>
              ) : (
                <div className="w-full pt-2">
                  <button
                    className="w-full p-3 rounded-lg text-white"
                    style={{ backgroundColor: "#002f34" }}
                  >
                    {editItem ? "Update Item" : "Sell Item"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Sell;
