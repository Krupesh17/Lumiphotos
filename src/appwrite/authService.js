import { Account, Avatars, Client, Databases, ID, Query } from "appwrite";
import appConfig from "./config";

export class AuthService {
  client = new Client();
  account;
  databases;
  avatars;

  //getting Error in sign up
  constructor() {
    this.client
      .setEndpoint(appConfig.endPointUrl)
      .setProject(appConfig.projectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.avatars = new Avatars(this.client);
  }

  // 🅰 ACCOUNT METHODS
  async createAccount(data) {
    try {
      const newAccount = await this.account.create(
        ID.unique(),
        data?.email,
        data?.password,
        data?.username
      );

      if (!newAccount) throw new Error("Failed to create a new account.");

      const avatarUrl = this.avatars.getInitials(data?.username);

      if (!avatarUrl) throw new Error("Failed to generate the avatar image.");

      await this.saveToUsersCollection({
        firstName: data?.firstName,
        lastName: data?.lastName,
        accountId: newAccount?.$id,
        email: newAccount?.email,
        username: data?.username,
        imageUrl: avatarUrl,
        bio: `Download free, beautiful high-quality photos curated by ${data?.firstName}`,
      });
    } catch (error) {
      throw error;
    }
  }

  async signInAccount(data) {
    try {
      const session = await this.account.createEmailPasswordSession(
        data?.email,
        data?.password
      );

      if (!session)
        throw Error("Error occurred while creating a email session.");

      return session;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentAccount() {
    try {
      const currentUserAccount = await this.account.get();

      if (!currentUserAccount)
        throw new Error("Unable to fetch current user account.");

      return currentUserAccount;
    } catch (error) {
      throw error;
    }
  }

  async signOutAccount() {
    try {
      const session = await this.account.deleteSession("current");

      if (!session) throw Error("Failed to sign out. Please try again later.");

      return session;
    } catch (error) {
      throw error;
    }
  }

  async updateEmailAddress(data) {
    try {
      const updatedEmailAddress = await this.account.updateEmail(
        data?.email,
        data?.password
      );

      if (!updatedEmailAddress)
        throw new Error("Error occurred while updating email address.");

      return updatedEmailAddress;
    } catch (error) {
      throw error;
    }
  }

  async updateName(name) {
    try {
      const updatedName = await this.account.updateName(name);

      if (!updatedName) throw new Error("Error occurred while updating name.");

      return updatedName;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(data) {
    try {
      const updatedPassword = await this.account.updatePassword(
        data?.password,
        data?.oldPassword
      );

      if (!updatedPassword)
        throw new Error("Error occurred while changing password.");

      return updatedPassword;
    } catch (error) {
      throw error;
    }
  }

  async createEmailVerification(redirectUrl) {
    try {
      const verification = await this.account.createVerification(redirectUrl);

      if (!verification)
        throw new Error(
          "Error occurred while creating email verification. Please try again later."
        );

      return verification;
    } catch (error) {
      throw error;
    }
  }

  async updateEmailVerification(data) {
    try {
      const updatedVerification = await this.account.updateVerification(
        data?.userId,
        data?.secret
      );

      if (!updatedVerification)
        throw new Error(
          "Error occurred while updating email verification. Please try again later."
        );

      return updatedVerification;
    } catch (error) {
      throw error;
    }
  }

  async createPasswordRecovery(data) {
    try {
      const response = await this.account.createRecovery(
        data?.email,
        data?.url
      );

      if (!response)
        throw new Error("Error occurred while creating password recovery.");

      return response;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data) {
    try {
      const response = await this.account.updateRecovery(
        data?.userId,
        data?.secret,
        data?.password,
        data?.passwordAgain
      );

      if (!response)
        throw new Error("Error occurred while resetting password.");

      return response;
    } catch (error) {
      throw error;
    }
  }

  // 👨‍🦱 USERS COLLECTION METHODS.
  async saveToUsersCollection(data) {
    try {
      const newUser = await this.databases.createDocument(
        appConfig.databaseId,
        appConfig.usersCollectionId,
        ID.unique(),
        data
      );

      if (!newUser)
        throw new Error("Failed to create a new user. Please try again later.");

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async isUsernameTaken(username) {
    try {
      const isUsernameExist = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.usersCollectionId,
        [Query.equal("username", username)]
      );

      if (isUsernameExist.documents.length > 0) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const currentUserAccount = await this.getCurrentAccount();

      const currentUserData = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.usersCollectionId,
        [Query.equal("accountId", currentUserAccount?.$id)]
      );

      if (!currentUserData)
        throw new Error("Unable to fetch current user data.");

      return {
        accountData: { ...currentUserAccount },
        userData: { ...currentUserData.documents[0] },
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(username) {
    try {
      const response = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.usersCollectionId,
        [Query.equal("username", username)]
      );

      if (response.documents.length === 0) {
        throw new Error("User not found");
      }

      return response.documents[0];
    } catch (error) {
      throw error;
    }
  }

  async updateUser(user) {
    try {
      const updatedUser = await this.databases.updateDocument(
        appConfig.databaseId,
        appConfig.usersCollectionId,
        user.$id,
        {
          firstName: user?.firstName,
          lastName: user?.lastName,
          username: user?.username,
          email: user?.email,
          imageId: user?.imageId,
          imageUrl: user?.imageUrl,
          bio: user?.bio,
          location: user?.location,
          personalWebsiteUrl:
            user?.personalWebsiteUrl === "" ? null : user.personalWebsiteUrl,
          instagramId: user?.instagramId,
          twitterId: user?.twitterId,
          interests: user?.interests,
        }
      );

      if (!updatedUser) {
        throw new Error("Something went wrong while updating user's profile.");
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async followUnfollow(userId, following) {
    try {
      const updatedUser = await this.databases.updateDocument(
        appConfig.databaseId,
        appConfig.usersCollectionId,
        userId,
        {
          following: following,
        }
      );

      if (!updatedUser) {
        throw new Error("An error occurred while updating follow list.");
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async getInfiniteUsersBySearchTerm({ pageParam, searchTerm }) {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.or([
        Query.search("username", searchTerm),
        Query.search("firstName", searchTerm),
        Query.search("lastName", searchTerm),
      ]),
      Query.limit(9),
    ];

    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
      const response = await this.databases.listDocuments(
        appConfig.databaseId,
        appConfig.usersCollectionId,
        queries
      );

      if (!response)
        throw new Error(
          "An error occurred while attempting to retrieve the users."
        );

      return response;
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while attempting to retrieve the users"
      );
    }
  }
}

const authService = new AuthService();
export default authService;
