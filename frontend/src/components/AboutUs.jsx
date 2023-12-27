import React from "react";
import AboutUsCard from "./AboutUsCard";
import {
  ali,
  mina,
  mostafa,
  jana,
  mariam,
  mariamAmr,
  chilli,
  omar,
} from "../assets/profilePhotos";

const AboutUs = () => {
  return (
    <div className="flex flex-col bg-white-50 font-mono">
      <h1 className="text-center font-semibold text-3xl m-2">
        Meet The Team!
      </h1>
      <div className="flex justify-center items-center">
        <h1 className="text-center font-extralight text-l text-gray-400 w-[65%] m-2">
          Meet our innovative team of passionate young developers who brought
          Help Desk to life! Our diverse and talented group worked seamlessly
          each with a unique skill that contributed to design and develop a
          user-friendly website with precision, creativity, and a shared
          dedication to delivering an exceptional online experience.
        </h1>
      </div>

      <div className="flex flex-row gap-1.5 m-2 justify-center">
        <AboutUsCard
          imgURL={ali}
          name="Ali Zein"
          profURL="https://www.linkedin.com/in/ali-zein-103741244/"
          position="Security Expert"
        />

        <AboutUsCard
          imgURL={mina}
          name="Minamark"
          profURL="https://www.linkedin.com/in/minamark-atef-2b7495240/"
          position="Security Expert"
        />

        <AboutUsCard
          imgURL={chilli}
          name="Ahmad Hosam"
          profURL="https://www.linkedin.com/in/0xchilli/"
          position="Security Analyst"
        />

        <AboutUsCard
          imgURL={mostafa}
          name="Mostafa Hossam"
          profURL="https://www.linkedin.com/in/mosvdh/"
          position="Software Engineer"
        />

        <AboutUsCard
          imgURL={omar}
          name="Omar Dawood"
          profURL="https://www.linkedin.com/in/omardawood/"
          position="Software Engineer"
        />

        <AboutUsCard
          imgURL={mariam}
          name="Mariam Rizkallah"
          profURL="https://www.linkedin.com/in/mariam-rizkallah-b03487249/"
          position="Data Scientist"
        />

        <AboutUsCard
          imgURL={mariamAmr}
          name="Mariam Eldeeb"
          profURL="https://www.linkedin.com/in/mariam-amr-eldeeb/"
          position="Security Analyst"
        />

        <AboutUsCard
          imgURL={jana}
          name="Jana ElKasaby"
          profURL="https://www.linkedin.com/in/janaelkasaby/"
          position="Data Scientist"
        />
      </div>
    </div>
  );
};

export default AboutUs;
