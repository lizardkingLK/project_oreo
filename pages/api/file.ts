import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import formidable, { File } from 'formidable';
import { randomUUID } from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

type UploadResponse = {
  status: string;
  message: string;
  data?: string;
};

const uploads = '/public/uploads/';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) => {
  let status = 200,
    resultBody = {
      status: 'ok',
      message: 'Files were uploaded successfully',
      data: '',
    };

  /* Get files using formidable */
  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm({ maxFileSize: 10000000 });
      const files: ProcessedFiles = [];
      form.on('file', function (field, file) {
        files.push([field, file]);
      });
      form.on('end', () => resolve(files));
      form.on('error', (err) => reject(err));
      form.parse(req, () => {
        //
      });
    }
  ).catch((_e) => {
    status = 500;
    resultBody = { status: 'fail', message: 'Upload error', data: '' };
  });

  if (files?.length) {
    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), uploads);
    try {
      await fs.access(targetPath);
    } catch (e) {
      await fs.mkdir(targetPath);
    }

    /* Move uploaded files to directory */
    for (const file of files) {
      const tempPath = file[1].filepath,
        fileName = randomUUID() + file[1].originalFilename,
        savedPath = targetPath + fileName;
      await fs.rename(tempPath, savedPath);
      resultBody.data = fileName;
    }
  }

  res.status(status).json(resultBody);
};

export default handler;
