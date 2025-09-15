import { TextareaControl, SelectControl } from "@wordpress/components";

export const name = "myplugin/heading";

export const settings = {
  title: "Heading",
  icon: "editor-heading",
  category: "text",
  attributes: {
    level: {
      type: "number",
      default: 1,
    },
    content: {
      type: "string",
      default: "Heading text",
    },
  },
  edit: ({ attributes, setAttributes }) => (
    <div>
      <SelectControl
        label="Heading Level"
        value={attributes.level}
        options={[
          { label: "H1", value: 1 },
          { label: "H2", value: 2 },
          { label: "H3", value: 3 },
          { label: "H4", value: 4 },
          { label: "H5", value: 5 },
          { label: "H6", value: 6 },
        ]}
        onChange={(value) => setAttributes({ level: parseInt(value) })}
      />
      <TextareaControl
        label="Heading Content"
        value={attributes.content}
        onChange={(value) => setAttributes({ content: value })}
      />
    </div>
  ),
  save: ({ attributes }) => {
    const Tag = `h${attributes.level}`;
    return <Tag>{attributes.content}</Tag>;
  },
};
