
import { TextareaControl, SelectControl } from "@wordpress/components";

export const name = "myplugin/heading";

export const settings = {
  title: "Heading",
  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M6 5V18.5911L12 13.8473L18 18.5911V5H6Z"></path></svg>,
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
      {/* <SelectControl
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
      /> */}


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
