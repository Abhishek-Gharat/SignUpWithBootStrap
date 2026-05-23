import React, { useRef, useEffect } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

/**
 * Custom ReactQuill wrapper that avoids the findDOMNode deprecation warning
 * by properly managing the editor ref
 */
const CustomQuill = React.forwardRef(({ value, onChange, ...props }, ref) => {
  const editorRef = useRef(null);

  // Expose the editor instance if needed
  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(editorRef.current);
      } else {
        ref.current = editorRef.current;
      }
    }
  }, [ref]);

  return (
    <QuillEditor
      ref={editorRef}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
});

CustomQuill.displayName = "CustomQuill";

export default CustomQuill;
