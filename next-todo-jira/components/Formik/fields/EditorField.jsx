'use client'
import {useMemo, useState} from 'react'
import {cn} from "@/lib/utils/utils";
import {Button} from "@/components/ui/button";
import FormControl from "@/components/Formik/common/FormControl";
import FormLabel from "@/components/Formik/common/FormLabel";
import FormHelperText from "@/components/Formik/common/FormHelperText";
import '@/styles/editor.css'
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    [{header: [1, 2, false]}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    ['link', 'image', 'color'],
    ['clean']
  ]
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color'
]

const EditorField = (props) => {
  const {
    field: {name = 'description'},
    label,
    className,
    form: {
      values,
      handleChange,
      setFieldValue
    },
    helperText
  } = props

  // To avoid Uncaught Error: document is not defined
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {ssr: false}), [])

  const [showSourceCode, setShowSourceCode] = useState(false)
  const toggleShowSourceCode = () => setShowSourceCode(show => !show)

  const onEditorChange = (value) => {
    setFieldValue(name, value)
  }

  if (!ReactQuill) return null

  return (
    <FormControl className={cn('flex flex-col', className)}>
      <FormLabel label={label} id={name}/>

      <div className="relative flex-grow flex flex-col">
        {showSourceCode ? (
          <textarea name={name} value={values[name]} onChange={handleChange} className="flex-grow text-xs p-2"/>
        ) : <ReactQuill
          theme="snow"
          id={name}
          modules={modules}
          formats={formats}
          value={values[name]}
          onChange={onEditorChange}
          className="flex flex-col flex-grow min-h-[250px]"
        />}

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={toggleShowSourceCode}>Toggle</Button>
        </div>

        <FormHelperText show={helperText}>
          {helperText}
        </FormHelperText>
      </div>
    </FormControl>
  )
}

export default EditorField
