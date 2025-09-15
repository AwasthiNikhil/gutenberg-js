import { TextControl, Button } from "@wordpress/components";

export const name = "myplugin/table";

export const settings = {
  title: "Table",
  icon: "editor-table",
  category: "text",
  attributes: {
    rows: {
      type: "array",
      default: [["Header 1", "Header 2"]],
    },
  },
  edit: ({ attributes, setAttributes }) => (
    <div>
      <h4>Table Rows</h4>
      {attributes.rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <TextControl
              key={colIndex}
              label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
              value={cell}
              onChange={(value) => {
                const updatedRows = [...attributes.rows];
                updatedRows[rowIndex][colIndex] = value;
                setAttributes({ rows: updatedRows });
              }}
            />
          ))}
        </div>
      ))}
      <Button
        onClick={() =>
          setAttributes({ rows: [...attributes.rows, ["", ""]] })
        }
      >
        Add Row
      </Button>
    </div>
  ),
  save: ({ attributes }) => (
    <table>
      <thead>
        <tr>
          {attributes.rows[0].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {attributes.rows.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
