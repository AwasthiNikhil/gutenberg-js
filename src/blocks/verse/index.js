import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/verse";

export const settings = {
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
};
