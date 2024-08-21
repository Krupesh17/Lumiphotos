import { Client, Databases, Query } from "appwrite";
import appConfig from "./config";

export class WebsiteService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(appConfig.endPointUrl)
      .setProject(appConfig.projectId);

    this.databases = new Databases(this.client);
  }

  getAllFeaturedTags = async () => {
    try {
      const featuredTags = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.bannersCollectionId,
        [Query.notEqual("tagName", "Explore")]
      );

      if (!featuredTags)
        throw new Error(
          "An error occurred while attempting to retrieve the featured tags."
        );

      return featuredTags.documents;
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while attempting to retrieve the featured tags."
      );
    }
  };

  getFeaturedTagBySlug = async (slug) => {
    try {
      const response = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.bannersCollectionId,
        [Query.equal("slug", slug)]
      );

      if (response.documents.length === 0) {
        throw new Error(
          "An error occurred while attempting to retrieve the featured tag it's by tagName."
        );
      }

      return response.documents[0];
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while attempting to retrieve the featured tag it's by tagName."
      );
    }
  };
}
const websiteService = new WebsiteService();
export default websiteService;
