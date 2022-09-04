import BMF from 'browser-md5-file'
import { ImageSize } from './types'

/**
 * @description: 获取文件的md5
 * @param {File} file
 * @return {*}
 */
export const getMd5 = (file: File): Promise<string> => {
  const bmf = new BMF()
  return new Promise((resolve, reject) => {
    bmf.md5(file, (err: Error, md5: string) => {
      if (err) {
        return reject(err)
      }
      resolve(md5)
    })
  })
}

/**
 * @description: 获取图片的宽度和高度
 * @param {Blob} file
 * @return {*}
 */
export const getImageAttribute = (file: File): Promise<ImageSize> => {
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.onload = function (e: ProgressEvent<FileReader>) {
      let result = e.target?.result
      let img: HTMLImageElement = document.createElement('img')
      img.src = result as string
      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height
        })
      }
    }
    reader.onerror = function (e: any) {
      resolve(e)
    }
    reader.readAsDataURL(file)
  })
}

/**
 * @description: 将文件转为流文件
 * @param {Blob} files
 * @return {*}
 */
export const transferFileToBuffer = (files: Blob): Promise<ArrayBuffer> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.onload = function () {
      const result = fileReader.result as ArrayBuffer
      resolve(result)
    }
    fileReader.readAsArrayBuffer(files)
  })
}

/**
 * @description: 判断当前文件的类型
 * @param {string} value
 * @return {*}
 */
export const fileType = (value: string): string => {
  if (value.lastIndexOf('audio') !== -1) {
    return 'audio'
  } else if (value.lastIndexOf('image') !== -1) {
    return 'image'
  } else {
    return ''
  }
}
