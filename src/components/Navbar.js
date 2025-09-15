import React from "react";
import { Inserter } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { serialize } from "@wordpress/blocks";

const Navbar = ({blockContent}) => {
  // functions
  const handleExport = () => {
    const html = serialize(blockContent);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "export.html";
    link.click();
  };

  const handleView = () => {
    const html = serialize(blockContent);
    const newWindow = window.open();
    newWindow.document.body.innerHTML = html;
    newWindow.document.close();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Inserter />
      <div>
        <Button
          variant="secondary"
          style={{ marginRight: "10px" }}
          onClick={handleView}
        >
          View HTML
        </Button>
        <Button variant="primary" onClick={handleExport}>
          Export HTML
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
