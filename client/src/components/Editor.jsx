import React, { forwardRef, useEffect, useLayoutEffect, useImperativeHandle, useRef } from 'react';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);

const Editor = forwardRef(
  ({ value, onTextChange, onSelectionChange, onPublish }, ref) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const Delta = Quill.import('delta'); // Import the Delta class
    const initialDeltaRef = useRef(new Delta()); // Store the initial Delta fetched from the server

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useImperativeHandle(ref, () => ({
      setContents: (value) => {
        if (quillRef.current) {
          const delta = quillRef.current.clipboard.convert(value);
          quillRef.current.setContents(delta);
          initialDeltaRef.current = delta; // Store the initial Delta fetched from the server
        }
      },
      enable: (value) => {
        quillRef.current.enable(value);
      },
      handlePublish: async (title, postId, updatePost) => {
        if (!quillRef.current) return;

        const content = quillRef.current.root.innerHTML; // Get the current content of the editor
        const currentDelta = quillRef.current.getContents(); // Get the current Delta of the editor
        console.log('Current Delta:', currentDelta);

        // Compute the difference between initialDelta and currentDelta
        const diffDelta = initialDeltaRef.current.diff(currentDelta);
        console.log('Diff Delta:', diffDelta);

        // Extract added and removed images/videos
        const addedMedia = [];
        const removedMedia = [];
        diffDelta.ops.forEach((op) => {
          if (op.insert && op.insert.image) {
            addedMedia.push(op.insert.image); // Collect added images
          }
          if (op.insert && op.insert.video) {
            addedMedia.push(op.insert.video); // Collect added videos
          }
          if (op.delete) {
            // Find the deleted content in the initial delta
            let deletedIndex = 0;
            initialDeltaRef.current.ops.forEach((initialOp) => {
              if (initialOp.retain) {
                deletedIndex += initialOp.retain;
              } else if (initialOp.insert) {
                if (deletedIndex < op.delete) {
                  if (initialOp.insert.image) {
                    removedMedia.push(initialOp.insert.image); // Collect removed images
                  }
                  if (initialOp.insert.video) {
                    removedMedia.push(initialOp.insert.video); // Collect removed videos
                  }
                  deletedIndex++;
                }
              }
            });
          }
        });

        console.log('Added Media:', addedMedia);
        console.log('Removed Media:', removedMedia);

        try {
          const updatedPost = await updatePost({ id: postId, updatedData: { title, content } }).unwrap();
          console.log('Post Updated:', updatedPost);
          if (onPublish) onPublish(updatedPost); // Notify parent component if needed
        } catch (err) {
          console.error('Error updating post:', err);
          alert(err.data?.message || 'An error occurred while updating the post.');
        }

        // Reset initialDeltaRef to the current delta after publishing
        initialDeltaRef.current = currentDelta;
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
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'super' }, { 'script': 'sub' }],
            [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['direction', { 'align': [] }],
            ['link', 'image', 'video', 'formula'],
            ['clean'],
          ],
          imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
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
        },
      });

      quillRef.current = quill;

      if (value) {
        quill.root.innerHTML = value;
        const delta = quill.clipboard.convert(value);
        initialDeltaRef.current = delta; // Store the initial Delta fetched from the server
      }

      quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
        const currentContent = quill.root.innerHTML; // Get the current HTML content of the editor
        onTextChangeRef.current?.(currentContent, delta, oldDelta, source);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        quillRef.current = null;
        container.innerHTML = '';
      };
    }, []);

    return <div ref={containerRef} style={{ minHeight: '95%' }}></div>;
  },
);

Editor.displayName = 'Editor';

export default Editor;