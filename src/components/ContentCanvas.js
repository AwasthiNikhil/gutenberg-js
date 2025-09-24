import React, { useState } from "react";
import { BlockList, WritingFlow, BlockInspector } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import { useEntityProp } from '@wordpress/core-data';

const ContentCanvas = ({ list }) => {
  // Get the post title and setter from WordPress entity props
  const [ title, setTitle ] = useEntityProp('postType', 'post', 'title');

  return (
    <div className="contentCanvas">
      <TextControl
        label="Post Title"
        value={title}
        onChange={(nextTitle) => setTitle(nextTitle)}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <WritingFlow>
            <BlockList />
          </WritingFlow>
        </div>
        <div style={{ width: '20%' }}>
          <BlockInspector />
        </div>
      </div>
    </div>
  );
};

export default ContentCanvas;
