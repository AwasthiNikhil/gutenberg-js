import { useEffect, useState } from "react";
import { registerAllBlocks } from "./blocks";
import Navbar from "./components/Navbar";
import { BlockEditorProvider, ButtonBlockAppender } from "@wordpress/block-editor";
import "./index.css";
import { Modal } from "@wordpress/components";
import ContentCanvas from "./components/ContentCanvas";
import EditorFooter from "./components/EditorFooter";
import "@wordpress/components/build-style/style.css";
import Sidebar from "./components/Sidebar";
// import "./css/style.min.css";
// import "./css/editor.min.css";
// import "./css/content.min.css";


function App() {
    const [blocksState, setBlocksState] = useState([]);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

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

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (

        <BlockEditorProvider
            value={blocksState}
            onInput={handleStateChange}
            onChange={handleStateChange}
            settings={{}}
        >
            <Navbar className="navbar" blockContent={blockContent} handleUndo={handleUndo} handleRedo={handleRedo} toggleSidebar={toggleSidebar} />
            <div className="bodySkeleton">
                {/* {isSidebarOpen && <Modal onRequestClose={() => {
                    setSidebarOpen(false);
                }} />} */}
                {isSidebarOpen && <Sidebar />}
                <ContentCanvas />
            </div>

            <ButtonBlockAppender />

            <EditorFooter />
        </BlockEditorProvider>
    );
}

export default App;
