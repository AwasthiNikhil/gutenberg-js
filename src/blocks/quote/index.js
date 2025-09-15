import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/quote";

export const settings = {
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
};
