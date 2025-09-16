import { useEffect, useState } from "react";
import { BlockEditorProvider } from "@wordpress/block-editor";
import Navbar from "./components/Navbar";
import ContentCanvas from "./components/ContentCanvas";
import { registerAllBlocks } from "./blocks";

import "@wordpress/components/build-style/style.css";


function App() {
    const [blocksState, setBlocksState] = useState([]);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const blockContent = blocksState;


    useEffect(() => {
        registerAllBlocks(); // Initialize all custom blocks if necessary
    }, []);

    const handleStateChange = (newState) => {
        // When a state change happens, push the current state to the undo stack
        setUndoStack((prevUndoStack) => [...prevUndoStack, blocksState]);
        setRedoStack([]); // Clear the redo stack on new changes

        // Update the blocksState with the new state
        setBlocksState(newState);
    };

    const handleUndo = () => {
        if (undoStack.length === 0) return; // No action if there's no previous state

        const previousState = undoStack[undoStack.length - 1];
        setRedoStack((prevRedoStack) => [blocksState, ...prevRedoStack]); // Push current state to redo stack
        setUndoStack((prevUndoStack) => prevUndoStack.slice(0, -1)); // Pop the last state from undo stack

        // Set the blocksState to the previous state
        setBlocksState(previousState);
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return; // No action if there's no next state

        const nextState = redoStack[0];
        setUndoStack((prevUndoStack) => [...prevUndoStack, blocksState]); // Push current state to undo stack
        setRedoStack((prevRedoStack) => prevRedoStack.slice(1)); // Pop the first state from redo stack

        // Set the blocksState to the next state
        setBlocksState(nextState);
    };

    return (
        <div style={{
            border: "1px solid blue",
            minHeight: "100vh",
            overflowY: "auto",
        }}>
            <BlockEditorProvider
                value={blocksState}
                onInput={handleStateChange}
                onChange={handleStateChange}
                settings={{}}
            >
                <Navbar blockContent={blockContent} handleStateChange={handleStateChange} handleUndo={handleUndo} handleRedo={handleRedo} />
                <ContentCanvas />
            </BlockEditorProvider>
        </div>
    );
}

export default App;
