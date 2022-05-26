import React, { useCallback } from 'react';
import * as Quill from "quill";
import "quill/dist/quill.snow.css";

import { Container } from './styles';


const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: "ordered" }, { list: "bullet" }],
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }],
	[{ script: "sub" }, { script: "super" }],
	[{ align: [] }],
	["image", "blockquote", "code-block"],
	["clean"],
];

function TextEditor() {

	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return;

		wrapperRef.innerHTML = "";
		const editor = document.createElement("div");
		wrapper.append(editor);
		new Quill(editor, { theme: 'snow', modules: {toolbar: TOOLBAR_OPTIONS} })
	}, [])
	return <Container><div className="container" ref={wrapperRef}></div>;</Container>
}

export default TextEditor;