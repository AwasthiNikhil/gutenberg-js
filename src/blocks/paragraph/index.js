import { TextareaControl } from "@wordpress/components";

export const name = "myplugin/paragraph";

export const settings = {
    title: "Paragraph",
    icon: "paragraph",
    category: "text",
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
