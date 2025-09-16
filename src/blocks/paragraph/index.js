import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/paragraph";

export const settings = {
  title: "Paragraph",
  description: "Start with the basic building block of all narrative",
  category: "text",
  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="m9.99609 14v-.2251l.00391.0001v6.225h1.5v-14.5h2.5v14.5h1.5v-14.5h3v-1.5h-8.50391c-2.76142 0-5 2.23858-5 5 0 2.7614 2.23858 5 5 5z"></path></svg>,
  attributes: {
    content: {
      type: "string",
      default: "",
    },
  },

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
};
