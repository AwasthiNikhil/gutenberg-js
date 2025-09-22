import { registerBlockType } from "@wordpress/blocks";
import { registerCoreBlocks } from '@wordpress/block-library';

const requireBlock = require.context(".", true, /index\.js$/);

export const registerAllBlocks = () => {
  requireBlock.keys().forEach((filename) => {
    const blockModule = requireBlock(filename);
    const { name, settings } = blockModule;

    if (name && settings) {
      registerBlockType(name, settings);
    }
  });
  registerCoreBlocks();
};
