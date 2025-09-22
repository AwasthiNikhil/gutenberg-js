import React, { useState } from "react";
import { BlockList, WritingFlow } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";

const ContentCanvas = ({ title, handleTitleChange, list }) => {

  return (
    <div
      className="contentCanvas"
    >
      <TextControl
        value={title}
        onChange={(nextTitle) => handleTitleChange(nextTitle ?? '')}
      />
      <WritingFlow>
        <BlockList />
      </WritingFlow>

    </div>
  );
};

export default ContentCanvas;
