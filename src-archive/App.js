import React from "react";
import {
  BlockEditorProvider,
  BlockList,
  Inserter,
} from "@wordpress/block-editor";
import {
  Button,
  TextControl,
  SelectControl,
  TextareaControl,
  PanelBody,
} from "@wordpress/components";
import "@wordpress/components/build-style/style.css";
import { registerBlockType } from "@wordpress/blocks";
import {
  BlockEditorProviderStyle,
  ContentCanvasStyle,
} from "./styles/style.js";
import { BlockInserterStyle } from "./styles/style.js";
import { SettingsPanelStyle } from "./styles/style.js";

function App() {
  // Register a simple block
  // registerBlockType("myplugin/my-block", {
  //   title: "My Custom Block",
  //   icon: "smiley",
  //   category: "common",
  //   attributes: {
  //     text: { type: "string", default: "Hello, World!" },
  //   },
  //   edit: (props) => {
  //     const { attributes, setAttributes } = props;
  //     return (
  //       <div>
  //         <InspectorControls>
  //           <PanelBody title="Block Settings">
  //             <TextControl
  //               label="Enter some text"
  //               value={attributes.text}
  //               onChange={(value) => setAttributes({ text: value })}
  //             />
  //           </PanelBody>
  //         </InspectorControls>
  //         <p>{attributes.text}</p>
  //       </div>
  //     );
  //   },
  //   save: (props) => {
  //     return <p>{props.attributes.text}</p>;
  //   },
  // });
  // return (
  //   <div style={{ padding: "20px" }}>
  //     <h1>My Custom Gutenberg-like Editor</h1>
  //     <BlockEditorProvider>
  //       <BlockList />
  //     </BlockEditorProvider>
  //   </div>
  // );

  const blocks = [
    {
      name: "myplugin/paragraph",
      title: "Paragraph",
      icon: "paragraph",
      category: "text",
      edit: ({ attributes, setAttributes }) => (
        <div>
          <TextareaControl
            label="Content"
            value={attributes.content}
            onChange={(value) => setAttributes({ content: value })}
          />
        </div>
      ),
      save: ({ attributes }) => <p>{attributes.content}</p>,
    },
    {
      name: "myplugin/heading",
      title: "Heading",
      icon: "editor-heading",
      category: "text",
      attributes: {
        level: {
          type: "number",
          default: 1,
        },
        content: {
          type: "string",
          default: "Heading text",
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          <SelectControl
            label="Heading Level"
            value={attributes.level}
            options={[
              { label: "H1", value: 1 },
              { label: "H2", value: 2 },
              { label: "H3", value: 3 },
              { label: "H4", value: 4 },
              { label: "H5", value: 5 },
              { label: "H6", value: 6 },
            ]}
            onChange={(value) => setAttributes({ level: parseInt(value) })}
          />
          <TextareaControl
            label="Heading Content"
            value={attributes.content}
            onChange={(value) => setAttributes({ content: value })}
          />
        </div>
      ),
      save: ({ attributes }) => {
        const Tag = `h${attributes.level}`;
        return <Tag>{attributes.content}</Tag>;
      },
    },
    {
      name: "myplugin/list",
      title: "List",
      icon: "editor-ul",
      category: "text",
      attributes: {
        items: {
          type: "array",
          default: ["Item 1", "Item 2"],
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          {attributes.items.map((item, index) => (
            <TextControl
              key={index}
              label={`Item ${index + 1}`}
              value={item}
              onChange={(value) => {
                const newItems = [...attributes.items];
                newItems[index] = value;
                setAttributes({ items: newItems });
              }}
            />
          ))}
          <Button
            onClick={() =>
              setAttributes({ items: [...attributes.items, "New Item"] })
            }
          >
            Add Item
          </Button>
        </div>
      ),
      save: ({ attributes }) => (
        <ul>
          {attributes.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "myplugin/quote",
      title: "Quote",
      icon: "format-quote",
      category: "text",
      attributes: {
        content: {
          type: "string",
          default: "This is a quote.",
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          <TextareaControl
            label="Quote Content"
            value={attributes.content}
            onChange={(value) => setAttributes({ content: value })}
          />
        </div>
      ),
      save: ({ attributes }) => <blockquote>{attributes.content}</blockquote>,
    },
    {
      name: "myplugin/code",
      title: "Code",
      icon: "editor-code",
      category: "text",
      attributes: {
        content: {
          type: "string",
          default: 'console.log("Hello World");',
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          <TextareaControl
            label="Code"
            value={attributes.content}
            onChange={(value) => setAttributes({ content: value })}
          />
        </div>
      ),
      save: ({ attributes }) => (
        <pre>
          <code>{attributes.content}</code>
        </pre>
      ),
    },
    {
      name: "myplugin/details",
      title: "Details",
      icon: "visibility",
      category: "text",
      attributes: {
        content: {
          type: "string",
          default: "Click to reveal more...",
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          <TextareaControl
            label="Details Content"
            value={attributes.content}
            onChange={(value) => setAttributes({ content: value })}
          />
        </div>
      ),
      save: ({ attributes }) => (
        <details>
          <summary>{attributes.content}</summary>
          <p>Here are the details!</p>
        </details>
      ),
    },
    {
      name: "myplugin/preformatted",
      title: "Preformatted",
      icon: "editor-underline",
      category: "text",
      attributes: {
        content: {
          type: "string",
          default: "Preformatted text...",
        },
      },
      edit: ({ attributes, setAttributes }) => (
        <div>
          <TextareaControl
            label="Preformatted Text"
            value={attributes.content}
            onChange={(value) => setAttributes({ content: value })}
          />
        </div>
      ),
      save: ({ attributes }) => <pre>{attributes.content}</pre>,
    },
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

  blocks.forEach((block) => registerBlockType(block.name, block));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gutenberg Editor</h1>

      {/* Block Editor Provider */}
      <BlockEditorProvider>
        <div style={{ display: "flex", border: "2px solid red" }}>
          {/* Block Inserter */}
          <div style={BlockInserterStyle}>
            <h3>Block Inserter</h3>
            <Inserter />
          </div>

          {/* Content Canvas (Where Blocks Appear) */}
          <div style={ContentCanvasStyle}>
            <BlockList />
          </div>

          {/* Settings Panel (For Selected Blocks) */}
          <div style={SettingsPanelStyle}>
            <h3>Block Settings</h3>
            <PanelBody title="Block Settings" initialOpen={true}>
              <Button isPrimary>Save Block</Button>
            </PanelBody>
          </div>
        </div>
      </BlockEditorProvider>
    </div>
  );
}

export default App;
