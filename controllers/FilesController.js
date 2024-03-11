import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class FilesController {
  static async postUpload(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      name, type, parentId = '0', isPublic = false, data,
    } = req.body;

    // Check if required fields are provided
    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }
    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }
    if (type !== 'folder' && !data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    // Check if parentId exists and is a folder
    if (parentId !== '0') {
      const parentFile = await dbClient.filesCollection.findOne({ _id: parentId });
      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }
      if (parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    let localPath = '';
    if (type !== 'folder') {
      // Create storing folder path
      const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Create local path and store the file
      const fileName = `${uuidv4()}`;
      localPath = `${folderPath}/${fileName}`;
      const fileData = Buffer.from(data, 'base64');
      fs.writeFileSync(localPath, fileData);
    }

    // Create new file document in the database
    const newFile = {
      userId,
      name,
      type,
      isPublic,
      parentId,
      localPath: type !== 'folder' ? localPath : undefined,
    };
    const result = await dbClient.filesCollection.insertOne(newFile);

    // Return the new file with status code 201
    const { _id } = result.insertedId;
    const createdFile = {
      id: _id,
      userId,
      name,
      type,
      isPublic,
      parentId,
      localPath,
    };
    return res.status(201).json(createdFile);
  }
}

export default FilesController;
