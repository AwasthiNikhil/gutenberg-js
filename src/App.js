import { useEffect } from "react";
import { useState } from "react";
import { BlockEditorProvider } from "@wordpress/block-editor";
import Navbar from "./components/Navbar.js";
import ContentCanvas from "./components/ContentCanvas.js";
import { registerAllBlocks } from "./blocks";

import "@wordpress/components/build-style/style.css";
import { SettingsPanelStyle } from "./styles/style.js";

function App() {
    const [blocksState, setBlocksState] = useState([]);
    const blockContent = blocksState;

    useEffect(() => {
        registerAllBlocks();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gutenberg Editor</h1>

            <BlockEditorProvider
                value={blocksState}
                onInput={setBlocksState}
                onChange={setBlocksState}
                settings={{}}
            >
                <Navbar blockContent={blockContent} />
                <ContentCanvas />
            </BlockEditorProvider>
        </div>
    );
}

export default App;
