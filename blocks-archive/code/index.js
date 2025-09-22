import { TextareaControl } from "@wordpress/components";

export const name = "core/code";

export const settings = {
  title: "Code",
  icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"></path></svg>,
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
