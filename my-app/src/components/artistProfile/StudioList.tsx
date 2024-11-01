import { StudioListProps } from "@/lib/type";
import React from "react";

const StudioList: React.FC<StudioListProps> = ({ studios }) => {
  if (!Array.isArray(studios) || studios.length === 0) {
    return <p>N/A</p>;
  }

  return <p>{studios.map((studio) => studio.name).join(", ")}</p>;
};

export default StudioList;
