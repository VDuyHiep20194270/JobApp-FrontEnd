import React, { useRef } from "react";
import dynamic from 'next/dynamic';
// import JoditEditor from "jodit-react";

const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "ol", "source"],
};

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const RichTextEditor = ({ initialValue, getValue }) => {
  // const editor = useRef(null);
  return (
    <JoditEditor
      value={initialValue}
      config={config}
      tabIndex={1}
      onChange={(newContent) => getValue(newContent)}
    />
  );
};

export default RichTextEditor;
