import React from "react";
import { BlockList } from "@wordpress/block-editor";

const ContentCanvas = () => {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid red",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <BlockList />
    </div>
  );
};

export default ContentCanvas;
