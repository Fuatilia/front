"use client";

import AspirantCard from "./AspirantCard";

interface Aspirant {
  image: string;
  name: string;
  party: string;
  slogan: string;
}

interface AspirantListProps {
  aspirants: Aspirant[];
}

export default function AspirantList({ aspirants }: AspirantListProps) {
  return (
    <div className="aspirant-list">
      {aspirants.map((a, i) => (
        <AspirantCard key={i} {...a} />
      ))}
    </div>
  );
}
