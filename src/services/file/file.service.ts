import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';
import { UploadedFile } from 'express-fileupload';

import {filePathBuilder} from '../../helpers';

const fsMkdir = promisify(fs.mkdir);
const fsReadDir = promisify(fs.readdir);
const fsUnlink = promisify(fs.unlink);
const fsRmdir = promisify(fs.rmdir);
const fsStat = promisify(fs.stat);

async function _deleteFolder(dirPath: any) {
  const folders = await fsReadDir(dirPath);

  if (folders.length) {
    for (const files of folders) {
      const file = await fsStat(path.join(dirPath, `${files}`));

      if (file.isDirectory()) {
        if (!files.length) {
          await fsRmdir(path.join(dirPath, `${files}`));
        }
        await _deleteFolder(`${dirPath}/${files}`);
      } else {
        await fsUnlink(path.join(dirPath, `${files}`));
      }
    }
  }
  await fsRmdir(dirPath);
}

class FileService {
  async filesUpload(ownerId: string, fileType: string, file: UploadedFile, dirName: string, service: any): Promise<void> {
    const {pathWithStatic, fullPath, uploadPath} = filePathBuilder( dirName, ownerId, fileType, file);

    await fsMkdir(pathWithStatic, {recursive: true});

    await file.mv(fullPath);

    await service.updateOne(ownerId, {[fileType]: uploadPath});
  }

  async updateFiles(ownerId: string, fileType: string, file: UploadedFile, dirName: string, service: any): Promise<void> {
    const {pathWithStatic, fullPath, uploadPath} = filePathBuilder(dirName, ownerId, fileType, file);

    const files = await fsReadDir(pathWithStatic);

    await fsUnlink(path.join(pathWithStatic, `${files}`));

    await file.mv(fullPath);

    await service.updateOne(ownerId, {[fileType]: uploadPath});

  }

  async deleteFiles(ownerId: string, dirName: string): Promise<void> {
    const dirPath = path.resolve(__dirname, '../../','public', dirName, ownerId);

    await _deleteFolder(dirPath);
  }

}

export const fileService = new FileService();
