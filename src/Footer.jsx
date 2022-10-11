import React from "react";
import { BsFacebook, BsGithub, BsGoogle, BsYoutube } from "react-icons/bs";

const SocialButton = (props) => (
  <a
    href={props.url}
    className=" p-2 hover:bg-white hover:bg-opacity-20 transition-opacity rounded-full"
    target="_BLANK"
    rel="noreferrer"
  >
    {props?.Icon ? <props.Icon /> : props.children}
    <span className="sr-only">{props.text}</span>
  </a>
);

export const Footer = () => {
  return (
    <footer className="p-4 bg-main sm:p-6 text-white">
      <div className="container w-full  mx-auto flex flex-col-reverse  md:flex-row justify-between">
        <span className="text-sm  sm:text-center py-2 md:whitespace-nowrap  ">
          © 2022{" "}
          <a href="https://leafautos.com/" className="hover:underline">
            Leaf Autos LLC
          </a>
          . All Rights Reserved.
        </span>
        <div className=" items-center  flex mt-4 space-x-6 justify-center  sm:mt-0">
          <SocialButton
            text="Facebook page"
            url="https://www.facebook.com/leafautos/"
            Icon={BsFacebook}
          />
          <SocialButton
            text="Google Business page"
            url="https://g.page/leafautos"
            Icon={BsGoogle}
          />
          <SocialButton
            text="Youtube page"
            url="https://www.youtube.com/channel/UC0OPm7G6-AC1Vqony6ypPPg"
            Icon={BsYoutube}
          />
          <SocialButton
            text="Github Issues Page"
            url="https://github.com/jelizarovas/leafautos.com/issues"
            Icon={BsGithub}
          />
        </div>
      </div>
    </footer>
  );
};
