import fs from 'fs';
import path from 'path';

export default (req, res) =>
{
  try
  {
    const filepath = path.join(process.cwd(), 'public/selfIntro.txt');
    const data = fs.readFileSync(filepath, 'utf8');
    res.status(200).send(data);
  } catch (error)
  {
    res.status(500).send('Error reading file.');
  }
};
