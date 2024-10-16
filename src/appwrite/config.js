const appConfig = {
  endPointUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT_URL),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  usersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
  postsCollectionId: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
  savesCollectionId: String(import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID),
  bannersCollectionId: String(
    import.meta.env.VITE_APPWRITE_BANNERS_COLLECTION_ID
  ),
  websitePropertyCollectionId: String(
    import.meta.env.VITE_APPWRITE_WEBSITE_PROPERTY_COLLECTION_ID
  ),
  usersStorageId: String(import.meta.env.VITE_APPWRITE_USERS_STORAGE_ID),
  postsStorageId: String(import.meta.env.VITE_APPWRITE_POSTS_STORAGE_ID),
};

export default appConfig;
