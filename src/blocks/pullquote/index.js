import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/pullquote";

export const settings = {
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
};
