import * as QiniuOSS from 'qiniu-js'
import { fileType, getImageAttribute, getMd5 } from './file'
import { FileInfo, UploadInfo } from './types'

export const uploadFileToQiniuOss = async (FileInfo: FileInfo, token: string, argument?: any): Promise<UploadInfo> => {
  const { file, path, baseUrl } = FileInfo
  let audioAttribute = {}
  let imageAttribute = {}
  
  let ext = file.name.substring(file.name.lastIndexOf('.') + 1)
  if (fileType(file.type) === 'image') {
    imageAttribute = await getImageAttribute(file)
  }
  const md5 = await getMd5(file)
  const fileName = `${md5}.${ext}`
  
  return new Promise((resolve) => {
    let observable = QiniuOSS.upload(file, `${path}/${fileName}`, token)
    const observer = {
      complete() {
        resolve({
          url: `${baseUrl}/${path}/${fileName}`,
          name: file.name.substring(0, file.name.lastIndexOf('.')),
          md5: md5,
          ext: ext,
          ...imageAttribute,
          ...argument,
          ...audioAttribute
        })
      }
    }
    observable.subscribe(observer) // 上传开始
  })
}
