import { Inserter } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { serialize } from "@wordpress/blocks";
import { useState } from "react";

const Navbar = ({ blockContent, setBlocksState }) => {
    // functions

    const extractBlocksFromHTML = (doc) => {
        const blocks = [];
        const blockElements = doc.body.querySelectorAll(
            "[class^='wp-block-myplugin']"
        ); // Find blocks with wp-block-myplugin- prefix

        blockElements.forEach((blockElement) => {
            const classList = Array.from(blockElement.classList);
            const blockName = classList.find((cls) =>
                cls.startsWith("wp-block-myplugin-")
            );

            if (!blockName) return;

            // You can map the block name to specific block types if necessary
            const blockType = blockName.replace("wp-block-", ""); // Extracting block type (e.g., 'heading', 'list')

            // For example, we could add custom handling based on the block type
            switch (blockType) {
                case "heading":
                    blocks.push({
                        blockName: "myplugin/heading", // Gutenberg block name
                        innerHTML: blockElement.innerHTML,
                    });
                    break;
                case "list":
                    blocks.push({
                        blockName: "myplugin/list", // Gutenberg block name
                        innerHTML: blockElement.innerHTML,
                    });
                    break;
                default:
                    blocks.push({
                        blockName: blockType, // or a default block
                        innerHTML: blockElement.innerHTML,
                    });
                    break;
            }
        });

        return blocks;
    };

    const handleExport = () => {
        const html = serialize(blockContent);
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        // replace later with wordpress backend API
        const link = document.createElement("a");
        link.href = url;
        link.download = "page.html";
        link.click();
    };

    const handleView = () => {
        const html = serialize(blockContent);
        const newWindow = window.open();
        newWindow.document.body.innerHTML = html;
        newWindow.document.close();
    };

    // render
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
