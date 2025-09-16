import { TextControl, Button } from "@wordpress/components";

export const name = "myplugin/list";

export const settings = {
  title: "List",
  icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path></svg>,
  category: "text",
  attributes: {
    items: {
      type: "array",
      default: ["Item 1", "Item 2"],
    },
  },
  edit: ({ attributes, setAttributes }) => (
    <div>
      {attributes.items.map((item, index) => (
        <TextControl
          key={index}
          label={`Item ${index + 1}`}
          value={item}
          onChange={(value) => {
            const newItems = [...attributes.items];
            newItems[index] = value;
            setAttributes({ items: newItems });
          }}
        />
      ))}
      <Button
        onClick={() =>
          setAttributes({ items: [...attributes.items, "New Item"] })
        }
      >
        Add Item
      </Button>
    </div>
  ),
  save: ({ attributes }) => (
    <ul>
      {attributes.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  ),
};
