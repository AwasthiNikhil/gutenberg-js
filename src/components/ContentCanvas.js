import React, { useState } from "react";
import { BlockList } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";

const ContentCanvas = ({ title, handleTitleChange }) => {
  return (
    <div
      className="contentCanvas"
    >
      <TextControl
        value={title}
        onChange={(nextTitle) => handleTitleChange(nextTitle ?? '')}
      />
      <BlockList />
    </div>
  );
};

export default ContentCanvas;
