import { TextareaControl } from "@wordpress/components";

export const name = "core/details";

export const settings = {
  title: "Details",
  icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M4 16h10v1.5H4V16Zm0-4.5h16V13H4v-1.5ZM10 7h10v1.5H10V7Z" fillRule="evenodd" clipRule="evenodd"></path><path d="m4 5.25 4 2.5-4 2.5v-5Z"></path></svg>,
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
