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

  const blocks = [

    {
      name: "myplugin/pullquote",
      title: "Pullquote",
      icon: "format-quote",
      category: "text",
      attributes: {
        content: {
          type: "string",
          default: "This is a pullquote.",
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          <TextareaControl
            label="Pullquote Content"
            value={attributes.content}
            onChange={(value) => setAttributes({ content: value })}
          />
        </div>
      ),
      save: ({ attributes }) => (
        <div
          style={{
            fontStyle: "italic",
            margin: "20px 0",
            borderLeft: "4px solid #ccc",
            paddingLeft: "10px",
          }}
        >
          {attributes.content}
        </div>
      ),
    },
    {
      name: "myplugin/table",
      title: "Table",
      icon: "editor-table",
      category: "text",
      attributes: {
        rows: {
          type: "array",
          default: [["Header 1", "Header 2"]],
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          <h4>Table Rows</h4>
          {attributes.rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((cell, colIndex) => (
                <TextControl
                  key={colIndex}
                  label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
                  value={cell}
                  onChange={(value) => {
                    const updatedRows = [...attributes.rows];
                    updatedRows[rowIndex][colIndex] = value;
                    setAttributes({ rows: updatedRows });
                  }}
                />
              ))}
            </div>
          ))}
          <Button
            onClick={() =>
              setAttributes({ rows: [...attributes.rows, ["", ""]] })
            }
          >
            Add Row
          </Button>
        </div>
      ),
      save: ({ attributes }) => (
        <table>
          <thead>
            <tr>
              {attributes.rows[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attributes.rows.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      name: "myplugin/verse",
      title: "Verse",
      icon: "editor-quote",
      category: "text",
      attributes: {
        content: {
          type: "string",
          default: "Roses are red, violets are blue...",
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          <TextareaControl
            label="Verse"
            value={attributes.content}
            onChange={(value) => setAttributes({ content: value })}
          />
        </div>
      ),
      save: ({ attributes }) => (
        <div style={{ fontFamily: "monospace", fontStyle: "italic" }}>
          {attributes.content}
        </div>
      ),
    },
  ];

  // blocks.forEach((block) => registerBlockType(block.name, block));

  useEffect(() => {
    registerAllBlocks();
  }, []);
  


  return (
    <div style={{ padding: "20px" }}>
      <h1>Gutenberg Editor</h1>
      {/* Block Editor Provider */}
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
