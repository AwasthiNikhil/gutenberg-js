import React, { useEffect } from 'react';
import { BlockEditorProvider, BlockList, BlockInspector } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';

import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
// import '@wordpress/blocks/build-style/style.css';

import { registerAllBlocks } from "./blocks";

const App = () => {
    // Register core blocks once, when the component mounts
    registerAllBlocks();

    const blockContent = `
        <!-- wp:paragraph -->
            <p>paragraph</p>
        <!-- /wp:paragraph -->

        <!-- wp:heading -->
            <h2 class="wp-block-heading">Heading</h2>
        <!-- /wp:heading -->

        <!-- wp:list -->
            <ul class="wp-block-list"><!-- wp:list-item -->
                <li>List item</li>
            <!-- /wp:list-item --></ul>
        <!-- /wp:list -->

        <!-- wp:paragraph -->
            <p>quote</p>
        <!-- /wp:paragraph -->

        <!-- wp:table -->
            <figure class="wp-block-table"><table class="has-fixed-layout"><tbody><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>5</td><td>6</td></tr></tbody></table></figure>
        <!-- /wp:table -->

        <!-- wp:buttons -->
            <div class="wp-block-buttons">
            <!-- wp:button -->
                <div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Button 1</a></div>
            <!-- /wp:button --></div>
        <!-- /wp:buttons -->

        <!-- wp:paragraph -->
            <p></p>
        <!-- /wp:paragraph -->
    `;

    // Parse the block content into block data
    const blocks = parse(blockContent);

    return (
        <div style={{
            display: "flex"
        }}>
            <BlockEditorProvider value={blocks}>
                <div style={{
                    width: "80%"
                }}>
                    <BlockList />
                </div>
                <div style={{
                    width: "20%"
                }}>
                    <BlockInspector />
                </div>
            </BlockEditorProvider>
        </div>
    );
};

export default App;
