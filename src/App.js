import React, { useEffect } from "react";
import { useState } from "react";
import { BlockEditorProvider } from "@wordpress/block-editor";
import Navbar from "./components/Navbar.js";
import ContentCanvas from "./components/ContentCanvas.js";
import { registerAllBlocks } from "./blocks";

import {
  Button,
  TextControl,
  SelectControl,
  TextareaControl,
  PanelBody,
} from "@wordpress/components";
import "@wordpress/components/build-style/style.css";
import { registerBlockType } from "@wordpress/blocks";
import { SettingsPanelStyle } from "./styles/style.js";

function App() {
  const [blocksState, setBlocksState] = useState([]);
  const blockContent = blocksState;

  useEffect(() => {
    registerAllBlocks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gutenberg Editor</h1>

      <BlockEditorProvider
        value={blocksState}
        onInput={setBlocksState}
        onChange={setBlocksState}
        settings={{}}
      >
        <Navbar blockContent={blockContent} />

        <ContentCanvas />

        {/* TODO: Settings Panel (For Selected Blocks */}
        {/* <div style={SettingsPanelStyle}>
            <h3>Block Settings</h3>
            <PanelBody title="Block Settings" initialOpen={true}>
              <Button variant="primary">Save Block</Button>
            </PanelBody>
          </div> */}
      </BlockEditorProvider>
    </div>
  );
}

export default App;
