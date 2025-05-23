import { useState } from "react";
import { Modal } from "flowbite-react";
import close from "../assets/close.svg";
import olxLogo from "../assets/symbol1.png"; 
import { login, signup } from "../config/Firebase/Firebase"; 
import { useNavigate } from "react-router-dom";

const EmailLogin = ({ toggleModal, status }) => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        await login(email, password,navigate);
      } else {
        await signup(name, email, password,navigate);
      }
      toggleModal(); 
    } catch (error) {
      console.error("Authentication error:", error);
    
    } finally {
      setLoading(false);
    }
  };


  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div>
      <Modal
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner:
              "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
          },
        }}
        onClick={toggleModal}
        className="bg-black rounded-none"
        position={"center"}
        show={status}
        size="md"
        popup={true}
      >
        {loading && <LoadingSpinner />}

        <div
          onClick={(e) => e.stopPropagation()}
          className="p-6 pt-0 pb-0 bg-white flex flex-col items-center pb-4"
        >
          <div className="w-full relative">
            <button className="absolute left-0 top-4 p-2" onClick={toggleModal}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <img
              onClick={toggleModal}
              className="w-6 absolute z-10 top-4 right-4 cursor-pointer"
              src={close}
              alt="Close"
            />
          </div>

          <div className="mt-10 mb-6 flex justify-center">
            <img className="w-24" src={olxLogo} alt="OLX Logo" />
          </div>

          <h2 className="text-2xl font-bold mb-8">
            {signState === "Sign In"
              ? "Enter your email to login"
              : "Create an account"}
          </h2>

          <form onSubmit={user_auth} className="w-full px-4">
            {signState === "Sign Up" && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={signState === "Sign Up"}
                />
              </div>
            )}

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

        

            <button
              type="submit"
              className="w-full p-3 bg-gray-300 text-gray-600 font-semibold rounded-md hover:bg-gray-400 transition"
            >
              {signState}
            </button>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <p className="text-sm text-blue-600 cursor-pointer">Need Help?</p>
            </div>

            <p className="text-xs text-center mt-6 text-gray-500">
              Your email is never shared with external parties nor do we use it
              to spam you in any way.
            </p>

            <div className="mt-6 text-center">
              {signState === "Sign In" ? (
                <p className="text-sm">
                  New to OLX?{" "}
                  <span
                    onClick={() => setSignState("Sign Up")}
                    className="text-blue-600 font-semibold cursor-pointer"
                  >
                    Sign Up Now
                  </span>
                </p>
              ) : (
                <p className="text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => setSignState("Sign In")}
                    className="text-blue-600 font-semibold cursor-pointer"
                  >
                    Sign In Now
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EmailLogin;
