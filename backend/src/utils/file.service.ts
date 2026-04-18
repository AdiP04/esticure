import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  // Absolute path to the data directory.
  // At runtime __dirname = backend/dist/utils  →  ../../../data = Esticure/data
  private readonly dataDir = path.resolve(__dirname, '../../../data');

  /**
   * Read a JSON file from the data directory.
   * Returns parsed object/array, or empty array if file doesn't exist.
   */
  async readJsonFile<T = any>(filename: string): Promise<T> {
    const filePath = path.join(this.dataDir, filename);
    try {
      const raw = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(raw) as T;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return [] as unknown as T;
      }
      throw err;
    }
  }

  /**
   * Write data to a JSON file in the data directory (pretty-printed).
   */
  async writeJsonFile(filename: string, data: any): Promise<void> {
    const filePath = path.join(this.dataDir, filename);
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
