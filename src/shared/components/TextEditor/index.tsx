import React, { useLayoutEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import { EditorCont } from './Styles'

interface TextEditorProps {
  className?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  onChange: (...args: any) => void
  getEditor: (...arg: any) => void
}

const TextEditor = ({
  className,
  placeholder,
  defaultValue,
  // we're not really feeding new value to quill instance on each render because it's too
  // expensive, but we're still accepting 'value' prop as alias for defaultValue because
  // other components like <Form.Field> feed their children with data via the 'value' prop
  value: alsoDefaultValue,
  onChange,
  getEditor
}: TextEditorProps) => {
  const $editorContRef = useRef<any>()
  const $editorRef = useRef<any>()
  const initialValueRef = useRef<any>(defaultValue || alsoDefaultValue || '')

  useLayoutEffect(() => {
    let quill = new Quill($editorRef.current, { placeholder, ...quillConfig })

    const insertInitialValue = () => {
      quill.clipboard.dangerouslyPasteHTML(0, initialValueRef.current)
      quill.blur()
    }
    const handleContentsChange = () => {
      onChange(getHTMLValue())
    }
    const getHTMLValue = () =>
      $editorContRef.current.querySelector('.ql-editor').innerHTML

    insertInitialValue()
    getEditor({ getValue: getHTMLValue })

    quill.on('text-change', handleContentsChange)
    return () => {
      quill.off('text-change', handleContentsChange)
      // quill = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <EditorCont className={className} ref={$editorContRef}>
      <div ref={$editorRef} />
    </EditorCont>
  )
}

const quillConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  }
}

export default TextEditor
