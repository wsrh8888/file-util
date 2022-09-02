import { fileType, getMd5, getImageAttribute } from './file';
import OSS from 'ali-oss'
import { OssOptions, DataObject, UploadInfo } from './types'


let ossClient: OSS

/**
 * @description: 初始化创建一个Oss对象
 * @param {OssOptions} ossInfo
 * @return {*}
 */
export const createOSS = (ossInfo: OssOptions): OSS => {
  if (!ossClient) {
    ossClient = new OSS({
      region: ossInfo.region,
      bucket: ossInfo.bucket,
      accessKeyId: ossInfo.accessKeyId,
      accessKeySecret: ossInfo.accessKeySecret,
      stsToken: ossInfo.securityToken,
      secure: true
    })
  }
  return ossClient
}


/**
 * @description: 上传文件到阿里云
 * @param {DataObject} dataObj
 * @param {OssOptions} ossObject
 * @param {string} type
 * @param {any} argument
 * @return {*}
 */
 export const uploadFileToAliOss = async (dataObj: DataObject, ossObject: OssOptions, argument: any): Promise<UploadInfo> => {
  const { file, path, baseUrl, name } = dataObj

  let ext = name.substring(name.lastIndexOf('.') + 1)
  const client: any = await createOSS(ossObject)

  let audioAttribute = {}
  let imageAttribute = {}
  try {
    if (fileType(file.type) === 'image') {
      imageAttribute = await getImageAttribute(file)
    }

    const md5 = await getMd5(file)
    const fileName = `${md5}.${ext}`
    let timestamp
    await client.multipartUpload(`${path}/${fileName}`, file, {})
    const ossObj = await client.getObjectMeta(`${path}/${fileName}`)
    timestamp = new Date(ossObj.res.headers['last-modified']).getTime()
    // }
    return {
      timestamp,
      url: `${baseUrl}/${path}/${fileName}`,
      name: name.substring(0, name.lastIndexOf('.')),
      md5: md5,
      ext: ext,
      ...imageAttribute,
      ...argument,
      ...audioAttribute
    }
  } catch (e) {
    throw new Error()
  }
}