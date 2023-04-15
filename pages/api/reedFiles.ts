import type {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs/promises';
import path from 'path';

type Data = {
  name: string;
};

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({name: 'Example'});
}
