import Link from "next/link";
import Image from "next/image";
import React from "react";

interface CommonImageProps {
  id: string;
  required?: boolean;
  tooltip?: boolean;
  classNameD?:string;
  classNameI?:string;
  width:number;
  height:number;
  href:string;
  src:string;
}

export const CommonIcon: React.FC<CommonImageProps> = ({
  id,
  required,
  tooltip,
  classNameD,
  classNameI,
  width,
  height,
  href,
  src,
}) => {
  console.log(href,"incommon,icon")
  return (

    <Link href={href}>
      {/* The Link component wraps around the content */}
      <div className={`${classNameD} flex justify-center items-center text-sm uppercase option hover:scale-105 transition-all duration-300 border-l border-gray-300 first:border-l-0 ml-[-6px]`}>
        <Image
          src={src}
          alt="/"
          width={width}
        //   30
          height={height}
        //   20
          className={`${classNameI} cursor-pointer`}
        />
      </div>
    </Link>
  );
};
