import {NextApiHandler, NextApiRequest} from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req: NextApiRequest, saveLocally: boolean) => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), '/public');
    options.filename = (name, ext, path, form) => {
      return '' + path.originalFilename;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({fields, files});
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + '/content', '/images'));
  } catch (err) {
    await fs.mkdir(path.join(process.cwd() + '/content', '/images'));
  }
  await readFile(req, true);
  return res.json({message: 'all good'});
};

export default handler;
