import { TextControl, Button } from "@wordpress/components";

export const name = "myplugin/media-and-text";

export const settings = {
  title: "Media & Text",
  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M3 6v11.5h8V6H3Zm11 3h7V7.5h-7V9Zm7 3.5h-7V11h7v1.5ZM14 16h7v-1.5h-7V16Z"></path></svg>,
  category: "media",
  attributes: {},
  edit: ()=>{
    <input/>
  },
  save: ()=>{
    <input/>
  }
};
