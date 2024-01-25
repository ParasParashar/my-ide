"use client";
"use client";
import { useState } from "react";
import MonacoEditor, { monaco } from "react-monaco-editor";
import "monaco-editor/min/vs/editor/editor.main.css";

const CodeEditor = () => {
  const onChange = (newValue: string, e: any) => {
    console.log("onChange", newValue, e);
    // Handle code changes here
  };

  const editorOptions = {
    fontSize: 25,
  };
  function setEditorTheme(monaco: any) {
    monaco.editor.defineTheme("onedark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          token: "comment",
          foreground: "#5d7988",
          fontStyle: "italic",
        },
        { token: "constant", foreground: "#e06c75" },
      ],
      colors: {
        "editor.background": "#0000FF",
      },
    });
  }

  monaco.editor.setTheme("default");
  return (
    <MonacoEditor
      width="90vw"
      height="85vh"
      language="javascript"
      theme="vs-dark"
      onChange={onChange}
      className={"text-xl"}
      options={editorOptions}
      // editorDidMount={setEditorTheme}
    />
  );
};

export default CodeEditor;
