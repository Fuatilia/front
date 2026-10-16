"use client";

import Image from "next/image";

interface AspirantCardProps {
  image: string;
  name: string;
  party: string;
  slogan: string;
}

export default function AspirantCard({
  image,
  name,
  party,
  slogan,
}: AspirantCardProps) {
  return (
    <div className="aspirant-card">
      <Image
        src={image}
        alt={`${name}'s photo`}
        width={80}
        height={80}
        className="aspirant-image"
        unoptimized
      />
      <div className="aspirant-details">
        <h3 className="aspirant-name">{name}</h3>
        <span className="aspirant-party">{party}</span>
        <p className="aspirant-slogan">{slogan}</p>
      </div>
    </div>
  );
}
