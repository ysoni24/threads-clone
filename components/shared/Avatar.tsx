import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
interface AvatarProps {
  imageUrl: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

const Avatar = ({ imageUrl, width, height, alt, className }: AvatarProps) => {
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={cn("rounded-full object-cover", className)}
    />
  );
};

export default Avatar;
