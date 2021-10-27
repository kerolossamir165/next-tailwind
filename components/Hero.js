import React from "react";
import Link from "next/link";
function Hero() {
  return (
    <div className="my-48 mx-auto max-w-7xl sm:mt-24 md:mt-72 text-center">
      <h1 className="font-extrabold text-gray-900">
        <p className="text-xl sm:text-3xl md:tex-4xl">NextJs + Tailwind Css</p>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500  text-4xl sm:text-6xl md:text-7xl">
          Modern E-Commerce
        </p>
      </h1>
      <h2 className="mt-3 max-w-md mx-auto text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-x-3xl">
        Build the E-Commerce Revolution
      </h2>
      <div className="mt-5 max-w-md mx-auto flex justify-center items-center md:mt-8">
        <Link href="#">
          <a className="inline-flex items-center justify-center h-14 px-6 font-medium py-6 border-transparent rounded-md text-white bg-gray-800">
            Enroll Now
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
