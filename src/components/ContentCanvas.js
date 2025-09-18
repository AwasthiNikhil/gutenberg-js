import React, { useState } from "react";
import { BlockList } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";

const ContentCanvas = () => {

  const [title, setTitle]= useState("Title");

  return (
    <div
      className="contentCanvas"
    >
      <TextControl
        value={title}
        onChange={(nextTitle) => setTitle(nextTitle ?? '')}
      />
      <BlockList />
    </div>
  );
};

export default ContentCanvas;
