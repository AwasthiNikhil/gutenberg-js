import React, { useEffect } from 'react';
import { BlockEditorProvider, BlockList, BlockInspector } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';

import { registerAllBlocks } from "./blocks";

const App = () => {
    // Register core blocks once, when the component mounts
    registerAllBlocks();

    const blockContent = `
        <!-- wp:myplugin/team -->
<div class="wp-block-myplugin-team team-member-block"><h2>First Team</h2><p>This isa  first team......</p></div>
<!-- /wp:myplugin/team -->
    `;
  
    // Parse the block content into block data
    const blocks = parse(blockContent);

    return (
        <BlockEditorProvider value={blocks}>
            <BlockInspector />
            <BlockList />
        </BlockEditorProvider>
    );
};

export default App;
