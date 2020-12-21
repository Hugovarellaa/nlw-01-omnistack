import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import './styles.css'

interface Props {
  onFileUpload: (file: File) => void
}

export function Dropzone({ onFileUpload }: Props) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0]

      const fileUrl = URL.createObjectURL(file)

      setSelectedFileUrl(fileUrl)
      onFileUpload(file)
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="image preview" />
      ) : (
        <p>
          <FiUpload />
          Image do estabelecimento
        </p>
      )}
    </div>
  )
}
