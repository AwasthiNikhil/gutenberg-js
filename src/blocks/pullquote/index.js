import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/pullquote";

export const settings = {
  title: "Pullquote",
  icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M18 8H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm.5 6c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v4zM4 4v1.5h16V4H4zm0 16h16v-1.5H4V20z"></path></svg>,
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
