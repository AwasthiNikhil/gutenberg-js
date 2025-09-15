import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/code";

export const settings = {
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
};
