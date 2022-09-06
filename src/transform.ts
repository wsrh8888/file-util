// File类型继承于Blob类型

/**
 * @description: 将blob文件转为file文件
 * @param {Blob} blob
 * @param {string} fileName
 * @param {FilePropertyBag} options
 * @return {*}
 */
export const blobToFile = (blob: Blob, fileName: string, options: FilePropertyBag | undefined): File => {
  return new File([blob], fileName, options)
}

/**
 * @description: 文件转为Base64文件流
 * @param {File} file
 * @return {*}
 */
export const fileToBase64 = (file: File): Promise<string | null | ArrayBuffer | undefined> => {
  return new Promise((resolve) => {
    let fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = function (e: ProgressEvent<FileReader>) {
      resolve(e.target?.result)
    }
  })
}

/**
 * @description: base64转为Blob
 * @param {File} file
 * @return {*}
 */
export const base64ToBlob = (base64: string): Promise<Blob> => {
  return new Promise((resolve) => {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/) as RegExpMatchArray
    const type = mime[0]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    resolve(new Blob([u8arr], { type: type }))
  })
}

/**
 * @description: 将base64转为file类型
 * @param {*} Promise
 * @return {*}
 */
export const base64ToFile = (base64: string, filename: string): Promise<File> => {
  return new Promise((resolve) => {
    let arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/) as RegExpMatchArray
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return resolve(new File([u8arr], filename, { type: mime[1] }))
  })
}

/**
 * @description: 将文件转为流文件
 * @param {Blob} files
 * @return {*}
 */
 export const fileToBuffer = (files: Blob|File): Promise<ArrayBuffer> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.onload = function () {
      const result = fileReader.result as ArrayBuffer
      resolve(result)
    }
    fileReader.readAsArrayBuffer(files)
  })
}