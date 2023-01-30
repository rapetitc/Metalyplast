import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "./fbconfig";

export const getFileFrom = async (filepath) => {
  const fileRef = ref(storage, filepath);
  const fileUrl = await getDownloadURL(fileRef)
  return { title: fileRef.name, url: fileUrl }
}

export const getFilesFrom = async (folderpath) => {
  const filesRef = ref(storage, folderpath);
  const files = await listAll(filesRef)
  let filesCollection = []
  for (const item of files.items) {
    const url = await getDownloadURL(item)
    filesCollection.push({ title: item.name, url: url })
  }
  return filesCollection
}
