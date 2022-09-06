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

/**
 * @description: 判断文件是否存在
 * @param {string} url
 * @return {*}
 */
export const isExistFile = (url:string): Boolean => {
  let xmlhttp
  if (window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
  }else{
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
  xmlhttp.open("GET",`${url}?${new Date().getTime()}`,false);
  xmlhttp.send();
  if(xmlhttp.readyState === 4){
    if(xmlhttp.status === 200) {
      return true
    } else {
      return false
    }
  } else {
    return false;
  }
}