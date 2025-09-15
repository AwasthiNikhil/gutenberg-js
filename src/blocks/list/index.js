import { TextControl, Button } from "@wordpress/components";

export const name = "myplugin/list";

export const settings = {
  title: "List",
  icon: "editor-ul",
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
