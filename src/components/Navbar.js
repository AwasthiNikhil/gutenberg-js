import { Inserter } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { __experimentalToggleGroupControl as ToggleGroupControl } from "@wordpress/components";
import { serialize } from "@wordpress/blocks";

const Navbar = ({ blockContent, handleStateChange, handleUndo, handleRedo }) => {
    // functions
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
                position: "sticky",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
            }}
        >
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <div>
                    <ToggleGroupControl>

                        <Inserter />

                        <Button onClick={handleUndo}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M18.3 11.7c-.6-.6-1.4-.9-2.3-.9H6.7l2.9-3.3-1.1-1-4.5 5L8.5 16l1-1-2.7-2.7H16c.5 0 .9.2 1.3.5 1 1 1 3.4 1 4.5v.3h1.5v-.2c0-1.5 0-4.3-1.5-5.7z"></path></svg></Button>
                        <Button onClick={handleRedo}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M15.6 6.5l-1.1 1 2.9 3.3H8c-.9 0-1.7.3-2.3.9-1.4 1.5-1.4 4.2-1.4 5.6v.2h1.5v-.3c0-1.1 0-3.5 1-4.5.3-.3.7-.5 1.3-.5h9.2L14.5 15l1.1 1.1 4.6-4.6-4.6-5z"></path></svg></Button>

                    </ToggleGroupControl>
                </div>
                {/* <ListView/> */}

            </div>
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
