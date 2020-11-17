import React from 'react';
import "prismjs/themes/prism-solarizedlight.css";

export default function Codeblock({ code, language = "javascript" }) {

    // const notionLanguageToHljs = {
    //     "plain text": "plaintext",
    //     'javascript': "javascript",
    //     'bash': "bash",
    //     'html': "xml",
    //     'scss': "scss",
    //     'css': "scss",
    //     'json': "json",
    // };


	const Prism = require('prismjs');
	const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');

	return <div className="code-block"><pre><code dangerouslySetInnerHTML={{ __html: highlightedCode }}></code></pre></div>

}