import { MdOutlineLocalOffer } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative bg-hero bg-cover bg-center bg-no-repeat h-screen w-full">
      <div className="max_padd_container relative top-20 xs:top-24">
        <h1 className="h1 text-black capitalize max-w-[39rem]">Digital Shopping Hub Junction</h1>
        <p className="text-gray-500 regular-16 mt-6 max-w-[33rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          totam ullam ut culpa, error voluptatum qui dolorum minima vel
          provident aliquid fuga tempore optio iure magnam unde perspiciatis
          quaerat architecto quis, eaque animi!
        </p>
        <div className="flexStart !items-center gap-x-4 my-10">
          <div className="text-black !regular-24 flexCenter gap-x-3">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className="text-black bold-16 sm:bold-20">
            176K <span className="regular-16 sm:regular-20">Excellent Reviews</span>
          </div>
        </div>
        <div className="sm:flex-row flex-col flex gap-2">
          <NavLink className={"btn_dark_rounded flexCenter"}>Shop now</NavLink>
          <NavLink className={"btn_dark_rounded flexCenter gap-x-2"}>
            <MdOutlineLocalOffer className="text-2xl" /> Offers
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
