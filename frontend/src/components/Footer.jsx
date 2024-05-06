import React from "react";
import { Link } from "react-router-dom";
import { RiBook2Fill, RiFacebookFill, RiGithubFill, RiInstagramFill, RiMailAddFill, RiMapPin2Fill, RiPhoneFill, RiTwitterXFill, RiUserLocationFill } from "@remixicon/react";
const Footer = () => {
  return (
    <footer className="w-full mt-4">
        <Link to="/" className="logo flex gap-3 items-center">
            <RiBook2Fill color="green" size={36} />
            <h1 className="text-4xl leading-tight font-bold text-[#008000]">Kitaabein</h1>
          </Link>
      <div className="container mt-4 mx-auto flex flex-wrap justify-between">
        {/* Footer Left */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          {" "}
          <p className="footer-links">
            <Link to='/' className="block my-2 hover:underline">Home</Link>
            <Link to='/home' className="block my-2 hover:underline">Dashboard</Link>
          </p>
          <p className="text-sm">&copy; Kitaabein © 2024</p>
          <p className="text-sm">Designed and Developed with ❣️ by @Nilaacodes</p>
        </div>

        {/* Footer Center */}
        <div className="w-full mt-4 md:w-1/3 mb-8 md:mb-0">
          <div className="mb-4 flex items-center gap-3">
            <RiMapPin2Fill color="#008000"/>
            <p className="inline-block">
                6969 XYZ Road, Silchar, Assam
            </p>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <RiPhoneFill color="#008000"/>
            <p className="inline-block">+91 9876543210</p>
          </div>
          <div className="flex items-center gap-3">
            <RiMailAddFill color="#008000"/>
            <p className="inline-block">
              <a href="mailto:support@company.com">support@kitaabein.com</a>
            </p>
          </div>
        </div>

        {/* Footer Right */}
        <div className="w-full md:w-1/3">
          <p className="mb-4">
            <span className="font-bold">About the Store</span>
            <br />
            Kitaabein is a Book Store Located at the heart of Silchar Town. Here at Kitaabein you will find a collection of books for every mood, and every need
          </p>
          <div className="footer-icons">
            <a
              href="#"
              className="inline-block bg-[#008000] rounded-full p-2 mr-2"
            >
                <RiTwitterXFill color="white"/>
            </a>
            <a
              href="#"
              className="inline-block bg-[#008000] rounded-full p-2 mr-2"
            >
                <RiGithubFill color="white"/>
            </a>
            <a
              href="#"
              className="inline-block bg-[#008000] rounded-full p-2 mr-2"
            >
              <RiInstagramFill color="white"/>
            </a>
            <a href="#" className="inline-block bg-[#008000] rounded-full p-2">
              <RiFacebookFill color="white"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
