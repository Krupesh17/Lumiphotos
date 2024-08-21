import { Client, ID, Storage } from "appwrite";
import appConfig from "./config";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(appConfig.endPointUrl)
      .setProject(appConfig.projectId);

    this.storage = new Storage(this.client);
  }

  async uploadFile(bucketId, file) {
    try {
      const uploadedFile = await this.storage.createFile(
        bucketId,
        ID.unique(),
        file
      );

      if (!uploadedFile)
        throw new Error(
          "An error occurred while uploading the file. Please try again."
        );

      return uploadedFile;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getFilePreview(bucketId, fileId) {
    try {
      const fileUrl = this.storage.getFilePreview(bucketId, fileId);
      if (!fileUrl)
        throw new Error(
          "An error occurred while attempting to retrieve the file's URL. Please try again."
        );
      return fileUrl;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getFileDownload(bucketId, fileId) {
    try {
      const fileUrl = this.storage.getFileDownload(bucketId, fileId);

      if (!fileUrl)
        throw new Error(
          "An error occurred while attempting to retrieve the download file. Please try again."
        );

      return fileUrl;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteFile(bucketId, fileId) {
    try {
      await this.storage.deleteFile(bucketId, fileId);
      return { status: true };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const storageService = new StorageService();
export default storageService;
