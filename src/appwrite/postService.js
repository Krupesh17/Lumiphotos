import { Client, Databases, ID, Query } from "appwrite";
import appConfig from "./config";

export class PostService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(appConfig.endPointUrl)
      .setProject(appConfig.projectId);

    this.databases = new Databases(this.client);
  }

  // 💌 CREATE POST
  async createPost(post) {
    try {
      const newPost = await this.databases.createDocument(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        ID.unique(),
        {
          creator: post?.userId,
          description: post?.description,
          imageUrl: post?.imageUrl,
          imageId: post?.imageId,
          blurImageUrl: post?.blurImageUrl,
          blurImageId: post?.blurImageId,
          imageWidth: post?.imageWidth,
          imageHeight: post?.imageHeight,
          location: post?.location,
          tags: post?.tags,
        }
      );

      if (!newPost) {
        throw new Error(
          "An error occurred while uploading the photo. Please try again."
        );
      }

      return newPost;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(post) {
    try {
      const updatedPost = await this.databases.updateDocument(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        post?.$id,
        {
          description: post?.description,
          location: post?.location,
          tags: post?.tags,
        }
      );

      if (!updatedPost) {
        throw new Error(
          "An error occurred while updating the post's info. Please try again."
        );
      }

      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId, username, userId) {
    try {
      const response = await this.databases.deleteDocument(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        postId
      );

      if (!response)
        throw Error("An error occurred while attempting to delete your post.");

      return { username: username, userId: userId };
    } catch (error) {
      throw error;
    }
  }

  // 💌 GET INFINITE POSTS
  getInfinitePosts = async ({ pageParam }) => {
    const queries = [Query.orderDesc("$createdAt"), Query.limit(9)];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
      const posts = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        queries
      );

      if (!posts)
        throw new Error(
          "An error occurred while attempting to retrieve the posts."
        );

      return posts;
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while attempting to retrieve the posts."
      );
    }
  };

  getInfinitePostsByUserId = async ({ pageParam, userId }) => {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.equal("creator", userId),
      Query.limit(9),
    ];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
      const posts = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        queries
      );

      if (!posts)
        throw new Error(
          "An error occurred while attempting to retrieve the posts."
        );

      return posts;
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while attempting to retrieve the posts."
      );
    }
  };

  async likeUnlikePost(postId, likesArray) {
    try {
      const updatedPost = await this.databases.updateDocument(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        postId,
        { likes: likesArray }
      );

      if (!updatedPost)
        throw Error(
          "An error occurred while updating the post's likes. Please try again."
        );

      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async savePost(userId, postId) {
    try {
      const savedPost = await this.databases.createDocument(
        appConfig.databaseId,
        appConfig.savesCollectionId,
        ID.unique(),
        {
          user: userId,
          post: postId,
        }
      );

      if (!savedPost)
        throw new Error(
          "An error occurred while saving the post. Please try again."
        );

      return savedPost;
    } catch (error) {
      throw error;
    }
  }

  async deleteSavedPost(savedPostId, username, userId) {
    try {
      const response = await this.databases.deleteDocument(
        appConfig.databaseId,
        appConfig.savesCollectionId,
        savedPostId
      );

      if (!response)
        throw new Error(
          "An error occurred while deleting the saved post. Please try again."
        );

      return { username: username, userId: userId };
    } catch (error) {
      throw error;
    }
  }

  async getInfiniteSavedPostsByUserId({ pageParam, userId }) {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.equal("user", userId),
      Query.limit(9),
    ];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
      const response = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.savesCollectionId,
        queries
      );

      if (!response)
        throw new Error(
          "An error occurred while attempting to retrieve the saved posts."
        );

      return response;
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while attempting to retrieve the saved posts."
      );
    }
  }

  // 💌 GET POST BY ID
  async getPostById(postId) {
    if (!postId) throw new Error("Please provide post ID.");
    try {
      const post = await this.databases.getDocument(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        postId
      );

      if (!post)
        throw new Error(
          "An error occurred while attempting to retrieve the post by it's ID."
        );

      return post;
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while attempting to retrieve the post by it's ID."
      );
    }
  }

  async getInfiniteSearchPostsBySearchTerm({ pageParam, searchTerm }) {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.equal("tags", searchTerm),
      Query.limit(9),
    ];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
      const response = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        queries
      );

      if (!response)
        throw new Error(
          "An error occurred while attempting to retrieve the posts."
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getInfinitePostRelatedPosts({
    pageParam,
    tagList,
    postId,
  }) {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.equal("tags", tagList),
      Query.notEqual("$id", postId),
      Query.limit(9),
    ];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
      const response = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        queries
      );

      if (!response)
        throw new Error(
          "An error occurred while attempting to retrieve the posts."
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getInfinitePostsByFollowedUsers({ pageParam, followedUserIds }) {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.equal("creator", followedUserIds),
      Query.limit(9),
    ];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
      const response = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.postsCollectionId,
        queries
      );

      if (!response)
        throw new Error(
          "An error occurred while attempting to retrieve the posts."
        );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const postService = new PostService();
export default postService;
