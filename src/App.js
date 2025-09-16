import { useEffect, useState } from "react";
import { BlockEditorProvider } from "@wordpress/block-editor";
import Navbar from "./components/Navbar";
import ContentCanvas from "./components/ContentCanvas";
import { registerAllBlocks } from "./blocks";

import "@wordpress/components/build-style/style.css";
import { SettingsPanelStyle } from "./styles/style.js";

function App() {
    const [blocksState, setBlocksState] = useState([]);
    const blockContent = blocksState;

    useEffect(() => {
        registerAllBlocks(); // Initialize all custom blocks if necessary
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <BlockEditorProvider
                value={blocksState}
                onInput={setBlocksState}
                onChange={setBlocksState}
                settings={{}}
            >
                <Navbar blockContent={blockContent} setBlocksState={setBlocksState} />
                <ContentCanvas />
            </BlockEditorProvider>
        </div>
    );
}

export default App;
