import type {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs/promises';
import path from 'path';

type Data = {
  name: string;
};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
  const file = await fs.readdir(path.join(process.cwd() + '/content', '/images'));
  console.log(file);
  res.status(200).json({name: 'Example'});
}
