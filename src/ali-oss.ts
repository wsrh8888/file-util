import { fileType, getMd5, getImageAttribute } from './file'
import OSS from 'ali-oss'
import { AliOptions, UploadInfo } from './types'

/**
 * @description: 初始化创建一个Oss对象
 * @param {AliOptions} ossInfo
 * @return {*}
 */
export const createAliOSS = (ossInfo: AliOptions): OSS => {
  return new OSS({
    region: ossInfo.region,
    bucket: ossInfo.bucket,
    accessKeyId: ossInfo.accessKeyId,
    accessKeySecret: ossInfo.accessKeySecret,
    stsToken: ossInfo.securityToken,
    secure: true
  })
}

/**
/**
 * @description: 上传文件到阿里云
 * @param {File} file 
 * @param {string} path 上传的路径
 * @param {string} baseUrl 上传后的域名
 * @param {AliOptions} options  阿里云的oss参数
 * @param {any} argument
 * @return {*}
 */
export const uploadFileToAliOss = async (file: File, path: string,baseUrl: string, options: AliOptions, argument?: any): Promise<UploadInfo> => {
  let ext = file.name.substring(file.name.lastIndexOf('.') + 1)
  const client: any = await createAliOSS(options)

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
    throw new Error(`文件上传失败:${e}`)
  }
}
