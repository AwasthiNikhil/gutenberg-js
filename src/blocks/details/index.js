import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/details";

export const settings = {
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
};
