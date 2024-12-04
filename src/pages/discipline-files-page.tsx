import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { deleteObject, ref, uploadBytes } from 'firebase/storage'
import {
  ChevronLeftIcon,
  EyeIcon,
  FileIcon,
  MousePointerSquareDashedIcon,
  Trash2Icon,
} from 'lucide-react'
import { useState } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
import { BarLoader } from 'react-spinners'
import { storage } from '../firebase'
import { useFilesInFolder } from '../hooks/useFilesInFolder'
import { cn, isNotNullOrUndefined, isNullOrUndefined } from '../utils/utils'

type Props = {}

export const DisciplineFilesPage = ({}: Props) => {
  const { discipline, year } = useParams({
    from: '/disciplines/$year/$discipline/files',
  })
  const {
    data: files,
    isFetching,
    refetch,
  } = useFilesInFolder({
    folder: `disciplines/${year}/${discipline}`,
  })
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const { mutate: uploadFile, isPending } = useMutation({
    mutationFn: async () => {
      if (isNotNullOrUndefined(file)) {
        const fileRef = ref(
          storage,
          `disciplines/${year}/${discipline}/${file.name}`
        )
        await uploadBytes(fileRef, file)
        await refetch()
      }
    },
    onSuccess: () => setFile(null),
  })

  const { mutate: deleteFile } = useMutation({
    mutationFn: async (file: string) => {
      const fileRef = ref(storage, `disciplines/${year}/${discipline}/${file}`)
      await deleteObject(fileRef)
      await refetch()
    },
  })

  const onDropAccepted = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setFile(file)
  }

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    console.log(rejectedFiles)

    if (rejectedFiles.length > 1) {
      toast({
        title: 'Datei konnte nicht hochgeladen werden',
        description: 'Maximal 1 Datei erlaubt',
      })
    }
  }

  return (
    <div className="p-4">
      <Link
        to="/"
        className={cn(
          buttonVariants({
            variant: 'link',
            className: '"flex items-center gap-2"',
          })
        )}
      >
        <ChevronLeftIcon className="size-4" />
        <p>Zurück</p>
      </Link>

      <h1 className="text-3xl mb-4">{discipline}</h1>

      <div className="py-4">
        <div className="max-w-xs mb-4">
          <div
            className={cn(
              'relative flex size-full flex-1 flex-col items-center justify-center rounded-md bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl',
              {
                'bg-blue-900/10 ring-blue-900/25': isDragOver,
              }
            )}
          >
            <Dropzone
              multiple={false}
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
              onDragEnter={() => setIsDragOver(true)}
              onDragLeave={() => setIsDragOver(false)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="flex size-full flex-1 flex-col items-center justify-center"
                >
                  <input {...getInputProps()} />
                  {isDragOver ? (
                    <MousePointerSquareDashedIcon className="mb-2 size-6 text-zinc-500" />
                  ) : (
                    <FileIcon className="mb-2 size-6 text-zinc-500" />
                  )}
                  <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                    {isDragOver ? (
                      <p>
                        <span className="font-semibold">Datei ablegen</span> um
                        hochzuladen
                      </p>
                    ) : (
                      <p>
                        <span className="font-semibold">
                          Klicken um hochzuladen
                        </span>{' '}
                        oder drag and drop
                      </p>
                    )}
                  </div>

                  {false ? null : (
                    <p className="text-xs text-zinc-500">Max. 1</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <div>
            <div className="font-bold">Ausgewählte Datei</div>
            <div>
              {isNullOrUndefined(file) ? (
                <div>Keine Datei ausgewählt</div>
              ) : (
                <div className="flex gap-4 items-center">
                  <div>{file.name}</div>
                  <button onClick={() => setFile(null)}>
                    <Trash2Icon className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          disabled={isNullOrUndefined(file) || isPending}
          className={cn(
            'bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md disabled:bg-gray-400'
          )}
          onClick={() => uploadFile()}
        >
          {isPending ? <BarLoader color="white" /> : 'Upload'}
        </button>
      </div>

      <div className="font-bold">Dateien</div>
      <div>
        {isFetching ? (
          <div>
            <BarLoader />
          </div>
        ) : (
          <>
            {isNotNullOrUndefined(files) && files.length > 0 ? (
              files.map((file) => (
                <div key={file.name} className="flex items-center gap-4">
                  <div>{file.name}</div>
                  <div className="flex items-center gap-2">
                    <a href={file.url}>
                      <EyeIcon className="size-4" />
                    </a>
                    <button onClick={() => deleteFile(file.name)}>
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>Keine Dateien</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
