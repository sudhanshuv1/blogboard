import React, { forwardRef, useEffect, useLayoutEffect, useImperativeHandle, useRef } from 'react';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);
import { ImageDrop } from 'quill-image-drop-module';
 
Quill.register('modules/imageDrop', ImageDrop);

const Editor = forwardRef(
  ({ value, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useImperativeHandle(ref, () => ({
      setContents: (value) => {
        if (quillRef.current) {
          const delta = quillRef.current.clipboard.convert(value);
          quillRef.current.setContents(delta);
        }
      },
      enable: (value) => {
        quillRef.current.enable(value);
      },
    }), []);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.ownerDocument.createElement('div');
      editorContainer.style.overflow = 'scroll';
      container.appendChild(editorContainer); 
      
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            [ 'bold', 'italic', 'underline', 'strike' ],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'super' }, { 'script': 'sub' }],
            [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
            [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
            [ 'direction', { 'align': [] }],
            [ 'link', 'image', 'video', 'formula' ],
            [ 'clean' ]
          ],
          imageResize: {
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],
            handleStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
            toolbarStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
          },
          imageDrop: true,
        }
      });

      quillRef.current = quill;

      if (value) {
        quill.root.innerHTML = value;
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(quill.root.innerHTML, ...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        quillRef.current = null;
        container.innerHTML = '';
      };
    }, []);

    useEffect(() => {
      if (quillRef.current && value !== quillRef.current.root.innerHTML) {
        const delta = quillRef.current.clipboard.convert(value || '');
        quillRef.current.setContents(delta);
      }
    }, [value]);

    return <div ref={containerRef} style={{ minHeight: '95%' }}></div>;
  },
);

Editor.displayName = 'Editor';

export default Editor;