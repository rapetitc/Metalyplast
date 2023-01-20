import { async } from "@firebase/util";
import { getDownloadURL, list, listAll, ref } from "firebase/storage";
import { storage } from "./fb";

export const getAllFilesFrom = (folder, callback) => {
  const filepath = folder;
  const filesRef = ref(storage, filepath);

  listAll(filesRef, { maxResults: 100 })
    .then(async (res) => {
      let imgsCollection = []
      for (const item of res.items) {
        const url = await getDownloadURL(item)
        imgsCollection.push({ name: item.name, url: url })
      }
      return imgsCollection
    })
    .then((imgsCollection) => {
      callback(imgsCollection)
    })
    .catch((error) => {
      console.log(error.code);
    })
}

export const getFileUrl = (filepath, callback) => {
  const imagesRef = ref(storage, filepath);

  const dataToReturn = getDownloadURL(imagesRef)
    .then((url) => {
      return url
    })
    .catch((error) => {
      console.log(error);
      return ''
    })
  console.log('Retornando:', dataToReturn);
  return dataToReturn
}