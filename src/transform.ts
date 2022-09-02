
/**
 * @description: 将blob文件转为file文件
 * @param {Blob} blob
 * @param {string} fileName
 * @param {FilePropertyBag} options
 * @return {*}
 */
 export const blobToFile = (blob: Blob,fileName:string, options: FilePropertyBag | undefined):File =>{
  return new File([blob],fileName, options)
}


/**
 * @description: 文件转为Base64文件流
 * @param {File} file
 * @return {*}
 */
export const fileToBase64 = (file: File): Promise<string | null | ArrayBuffer | undefined> => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);  
    fileReader.onload = function (e: ProgressEvent<FileReader>) { 
      resolve(e.target?.result) 
    }
  })
}


