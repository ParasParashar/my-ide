"use client";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "monaco-editor/min/vs/editor/editor.main.css";

const CodeEditor = () => {
  const onChange = (newValue: string, e: any) => {
    console.log("onChange", newValue, e);
    // Handle code changes here
  };

  const editorOptions = {
    fontSize: 25,
  };

  return (
    <MonacoEditor
      width="90vw"
      height="85vh"
      language="javascript"
      theme="vs-dark"
      onChange={onChange}
      className={"text-xl"}
      options={editorOptions}
    />
  );
};

export default CodeEditor;
