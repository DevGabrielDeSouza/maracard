import React, { useCallback } from 'react';
import * as Quill from "quill";
import "quill/dist/quill.snow.css";

// import { Container } from './styles';


function TextEditor() {

	const wrapperRef = useCallback((wrapper) => {
		if(wrapper == null) return;

		wrapperRef.innerHTML = "";
		const editor = document.createElement("div");
		wrapper.append(editor);
		new Quill(editor, { theme: 'snow' })
	}, [])
	return <div id="container" ref={wrapperRef}></div>;
}

export default TextEditor;