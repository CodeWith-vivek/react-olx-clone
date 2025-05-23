import "./Banner.css";
import bannerImg from "../../assets/banner copy.png";

const Banner = () => {
  return (
    
      <div className="bannerChildDiv">
        <div className="banner">
          <img src={bannerImg} alt="Banner" />
        </div>
      </div>
  
  );
};

export default Banner;
