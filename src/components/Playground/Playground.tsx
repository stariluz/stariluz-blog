import { useState } from 'react';
import '../../App.css';
import MarkdownParser from 'md-parser-react';

function Playground() {
  const [markdown, setMarkdown] = useState<string>('# Hello Markdown!\nThis is a **test** with a [link](http://example.com).');

  return (
    <div className="Playground">
      <h1>Test Markdown Parser</h1>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Write your markdown here"
        rows={10}
        style={{ width: '100%' }}
      />
      <MarkdownParser markdown={markdown}></MarkdownParser>
    </div>
  );
}

export default Playground;
