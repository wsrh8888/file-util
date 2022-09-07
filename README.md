# file-utils-plus
AliOss, QiniuOss and other upload capabilities，common functions of files。

## Installation

```
npm install file-utils-plus
//or
yarn add file-utils-plus
```

### Ali-oss use:

```javascript
import { uploadFileToAliOss, AliOptions } from 'file-utils-plus'

export const uploadFileToOSS = async (file: File,path: string,baseUrl: string, options: AliOptions, argument?: Object) => {
  return uploadFileToAliOss(file, path, baseUrl, options, argument)
}

```

### Qiniu-oss use:

```javascript
import { uploadFileToQiniuOss } from 'file-utils-plus'

export const uploadFileToQiniuOss = async (file: File, path: string,baseUrl:string,token: string, argument?: Object) => {
  return uploadFileToAliOss(file, path, baseUrl, token, argument)
}

```

## Documentation

### file
1. get file md5

    ```javascript
    const getMd5: (file: File) => Promise<string>;
    ```
2. get image attribute

    ```javascript
    const getImageAttribute: (file: File) => Promise<ImageSize>;
    ```
3. check the file exists

  ```javascript
  const isExistFile: (url: string) => Boolean;
  ```

### transform

1. blob to file

  ```javascript
  const blobToFile: (blob: Blob, fileName: string, options: FilePropertyBag | undefined) => File;
  ```
2. file to base64

  ```javascript
  const fileToBase64: (file: File) => Promise<string | null | ArrayBuffer | undefined>;
  ```
3. base64 to blob

  ```javascript
  const base64ToBlob: (base64: string) => Promise<Blob>;
  ```

4. base64 to File

  ```javascript
  const base64ToFile: (base64: string, filename: string) => Promise<File>;
  ```  

5. base64 to Buffer

  ```javascript
  const fileToBuffer: (files: Blob | File) => Promise<ArrayBuffer>;
  ```


  ### ali-oss
1. upload files to Ali oss

  ```javascript
  const uploadFileToAliOss: (file: File, path: string, baseUrl: string, options: AliOptions, argument?: any) => Promise<UploadInfo>;
  ```

  ### qiniu-oss

  1. upload files to Qiniu oss

  ```javascript
  const uploadFileToQiniuOss: (file: File, path: string, baseUrl: string, token: string, argument?: any) => Promise<UploadInfo>;
  ```