// pages/api/config.js
import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) =>
{
  const filepath = path.join(process.cwd(), 'data.json');
  const data = await fs.readFile(filepath, 'utf8');
  const config = JSON.parse(data);
  res.status(200).json(config);
};
