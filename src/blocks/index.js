// import { registerBlockType } from "@wordpress/blocks";
// import * as paragraph from "./paragraph";

// const blocks = [paragraph];

// export const registerAllBlocks = () => {
//   blocks.forEach(({ name, settings }) => {
//     registerBlockType(name, settings);
//   });
// };

import { registerBlockType } from "@wordpress/blocks";

const requireBlock = require.context(".", true, /index\.js$/);

export const registerAllBlocks = () => {
  requireBlock.keys().forEach((filename) => {
    const blockModule = requireBlock(filename);
    const { name, settings } = blockModule;

    if (name && settings) {
      registerBlockType(name, settings);
    }
  });
};
