import { config, logger } from "4u7o";
import got from "got";
import fs from "node:fs";

export class ObjectStorage {
  private static readonly bucketPARWrite = config.oracle.bucketPARWrite;
  private static readonly bucketPARName = config.oracle.bucketPARName;
  private static readonly bucketUrl = config.oracle.bucketUrl;
  private static readonly region = config.oracle.region;
  private static readonly bucketName = config.oracle.bucketName;

  public static async put(key: string, filePath: string): Promise<void> {
    try {
      const uploadUrl = `${this.bucketPARWrite}${encodeURIComponent(key)}`;
      const fileStream = fs.createReadStream(filePath);

      const response = await got.put(uploadUrl, {
        body: fileStream,
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (response.statusCode !== 200) {
        throw new Error(response.statusMessage);
      }
    } catch (error) {
      logger.error(error, {
        message: `Failed to upload file: ${key}`,
      });
    }
  }

  public static get(key: string): string {
    return `${this.bucketUrl}${encodeURIComponent(key)}`;
  }
}
