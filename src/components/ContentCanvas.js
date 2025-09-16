import React from "react";
import { BlockList } from "@wordpress/block-editor";

const ContentCanvas = () => {
  return (
    <div
      style={{
        flex: 1,
        padding: "10px",
      }}
    >
      <BlockList />
    </div>
  );
};

export default ContentCanvas;
