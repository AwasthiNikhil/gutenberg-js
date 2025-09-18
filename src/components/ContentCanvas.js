import React from "react";
import { BlockList } from "@wordpress/block-editor";

const ContentCanvas = () => {
  return (
    <div
     className="contentCanvas"
    >
      <BlockList />
    </div>
  );
};

export default ContentCanvas;
