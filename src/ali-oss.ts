import { fileType, getMd5, getImageAttribute } from './file'
import OSS from 'ali-oss'
import { AliOptions, FileInfo, UploadInfo } from './types'

let aliOssClient: OSS

/**
 * @description: 初始化创建一个Oss对象
 * @param {AliOptions} ossInfo
 * @return {*}
 */
export const createAliOSS = (ossInfo: AliOptions): OSS => {
  if (!aliOssClient) {
    aliOssClient = new OSS({
      region: ossInfo.region,
      bucket: ossInfo.bucket,
      accessKeyId: ossInfo.accessKeyId,
      accessKeySecret: ossInfo.accessKeySecret,
      stsToken: ossInfo.securityToken,
      secure: true
    })
  }
  return aliOssClient
}

/**
 * @description: 上传文件到阿里云
 * @param {DataObject} dataObj
 * @param {AliOptions} ossObject
 * @param {string} type
 * @param {any} argument
 * @return {*}
 */
export const uploadFileToAliOss = async (FileInfo: FileInfo, AliOptions: AliOptions, argument?: any): Promise<UploadInfo> => {
  const { file, path, baseUrl } = FileInfo

  let ext = file.name.substring(file.name.lastIndexOf('.') + 1)
  const client: any = await createAliOSS(AliOptions)

  let audioAttribute = {}
  let imageAttribute = {}
  try {
    if (fileType(file.type) === 'image') {
      imageAttribute = await getImageAttribute(file)
    }

    const md5 = await getMd5(file)
    const fileName = `${md5}.${ext}`

    await client.multipartUpload(`${path}/${fileName}`, file, {})
    return {
      url: `${baseUrl}/${path}/${fileName}`,
      name: file.name.substring(0, file.name.lastIndexOf('.')),
      md5: md5,
      ext: ext,
      ...imageAttribute,
      ...argument,
      ...audioAttribute
    }
  } catch (e) {
    throw new Error(`文件删除失败:${e}`)
  }
}
