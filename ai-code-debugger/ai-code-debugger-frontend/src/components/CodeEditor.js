import Editor from '@monaco-editor/react';

export const CodeEditor = ({ code, setCode, language, setLanguage }) => (
  <div className="editor-container">
    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="cpp">C++</option>
    </select>
    <Editor
      height="60vh"
      language={language}
      value={code}
      onChange={setCode}
      theme="vs-dark"
    />
  </div>
);