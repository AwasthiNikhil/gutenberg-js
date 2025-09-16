import { TextControl, Button } from "@wordpress/components";

export const name = "myplugin/table";

export const settings = {
  title: "Table",
  icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v3.5h-15V5c0-.3.2-.5.5-.5zm8 5.5h6.5v3.5H13V10zm-1.5 3.5h-7V10h7v3.5zm-7 5.5v-4h7v4.5H5c-.3 0-.5-.2-.5-.5zm14.5.5h-6V15h6.5v4c0 .3-.2.5-.5.5z"></path></svg>,
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
