import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/preformatted";

export const settings = {
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
};
