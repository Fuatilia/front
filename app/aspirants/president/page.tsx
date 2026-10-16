"use client";

import AspirantList from "../../components/aspirants/AspirantList";

const presidentialAspirants = [
  {
    image: "/images/presidential-1.jpeg",
    name: "William Ruto",
    party: "UDA",
    slogan: "Bottom-up economic transformation",
  },
  {
    image: "/images/presidential-2.jpeg",
    name: "Raila Odinga",
    party: "ODM",
    slogan: "Azimio la Umoja",
  },
  {
    image: "/images/presidential-3.jpeg",
    name: "Martha Karua",
    party: "NARC-Kenya",
    slogan: "A fairer Kenya",
  },
];

export default function PresidentPage() {
  return (
    <div className="page-wrapper">
      <h1 className="section-title">Presidential Aspirants</h1>
      <AspirantList aspirants={presidentialAspirants} />
    </div>
  );
}
