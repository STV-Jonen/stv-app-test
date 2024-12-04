import { useQuery } from '@tanstack/react-query'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../firebase'

type Props = {
  folder: string
}

export const useFilesInFolder = ({ folder }: Props) => {
  return useQuery({
    queryKey: ['files', folder],
    queryFn: async () => {
      const folderRef = ref(storage, folder)
      const res = await listAll(folderRef)

      const files = await Promise.all(
        res.items.map(async (file) => {
          const downloadUrl = await getDownloadURL(file)
          return {
            name: file.name,
            url: downloadUrl,
          }
        })
      )

      return files
    },
  })
}
