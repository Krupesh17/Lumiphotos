import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import authService from "../appwrite/authService";
import QUERY_KEYS from "./queryKeys";
import { toast } from "react-toastify";
import storageService from "../appwrite/storageService";
import postService from "../appwrite/postService";
import websiteService from "../appwrite/websiteService";

// 🔐 AUTH QUERIES
export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (data) => authService.createAccount(data),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while creating a new account. Please try again later."
      ),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (data) => authService.signInAccount(data),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => authService.signOutAccount(),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while signing out. Please try again later."
      ),
  });
};

export const useIsUsernameTaken = () => {
  return useMutation({
    mutationFn: (username) => authService.isUsernameTaken(username),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while checking the username availability. Please try again later."
      ),
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: async () => {
      try {
        const authData = await authService.getCurrentUser();
        return authData;
      } catch (error) {
        console.error(
          error.message ||
            "An error occurred while fetching current user data. Please try again later."
        );
      }
    },
  });
};

export const useGetCurrentAccount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_ACCOUNT],
    queryFn: async () => {
      try {
        const currentUserAccount = await authService.getCurrentAccount();
        return currentUserAccount;
      } catch (error) {
        toast.error(
          error.message ||
            "An error occurred while fetching current account data. Please try again later."
        );
      }
    },
  });
};

export const useGetUserByUsername = (username) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, username],
    queryFn: async () => {
      try {
        const user = await authService.getUserByUsername(username);
        return user;
      } catch (error) {
        console.error(error.message);
        return null;
      }
    },
    enabled: !!username,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => authService.updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, data?.username],
      });

      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });
    },
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while updating user. Please try again later."
      ),
  });
};

export const useFollowUnfollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, following }) =>
      authService.followUnfollow(userId, following),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while updating follow list. Please try again."
      ),
  });
};

export const useUpdateEmail = () => {
  return useMutation({
    mutationFn: (data) => authService.updateEmailAddress(data),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while updating email. Please try again later."
      ),
  });
};

export const useUpdateName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name) => authService.updateName(name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_ACCOUNT],
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data) => authService.changePassword(data),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while changing your password. Please try again later."
      ),
  });
};

export const useCreateEmailVerification = () => {
  return useMutation({
    mutationFn: (redirectUrl) =>
      authService.createEmailVerification(redirectUrl),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while creating email verification. Please try again later."
      ),
  });
};

export const useUpdateEmailVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => authService.updateEmailVerification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_ACCOUNT],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useCreatePasswordRecovery = () => {
  return useMutation({
    mutationFn: (data) => authService.createPasswordRecovery(data),
    onError: (error) =>
      toast.error(
        error.message || "An Error occurred while creating password recovery."
      ),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => authService.resetPassword(data),
    onError: (error) =>
      toast.error(
        error.message || "An Error occurred while resetting password."
      ),
  });
};

// 📦 STORAGE QUERIES
export const useUploadFile = () => {
  return useMutation({
    mutationFn: ({ bucketId, file }) =>
      storageService.uploadFile(bucketId, file),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while uploading the file. Please try again."
      ),
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: ({ bucketId, fileId }) =>
      storageService.deleteFile(bucketId, fileId),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while attempting to delete the file. Please try again."
      ),
  });
};

export const useGetFilePreview = () => {
  return useMutation({
    mutationFn: ({ bucketId, fileId }) =>
      storageService.getFilePreview(bucketId, fileId),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while attempting to retrieve the file's URL. Please try again."
      ),
  });
};

export const useGetFileDownload = () => {
  return useMutation({
    mutationFn: ({ bucketId, fileId }) =>
      storageService.getFileDownload(bucketId, fileId),
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while attempting to retrieve the download file. Please try again."
      ),
  });
};

// 💌 POST QUERIES
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post) => postService.createPost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.GET_INFINITE_POSTS_BY_USER_ID,
          data?.creator?.$id,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, data?.creator?.username],
      });
    },
    onError: (error) => {
      toast.error(
        error.message ||
          "An error occurred while uploading the photo. Please try again."
      );
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post) => postService.updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.GET_INFINITE_POSTS_BY_USER_ID,
          data?.creator?.$id,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, data?.creator?.username],
      });
    },
    onError: (error) => {
      toast.error(
        error.message ||
          "An error occurred while updating the post's info. Please try again."
      );
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, username, userId }) =>
      postService.deletePost(postId, username, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS_BY_USER_ID, data?.userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, data?.username],
      });
    },
    onError: (error) =>
      toast.error(
        error.message ||
          "An error occurred while attempting to delete your post."
      ),
  });
};

export const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: postService.getInfinitePosts,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useGetInfinitePostsByUserId = (userId) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS_BY_USER_ID, userId],
    queryFn: ({ pageParam }) =>
      postService.getInfinitePostsByUserId({ pageParam, userId }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useLikeUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, likesArray }) =>
      postService.likeUnlikePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.refetchQueries({
        queryKey: [
          QUERY_KEYS.GET_INFINITE_POSTS_BY_USER_ID,
          data?.creator?.$id,
        ],
      });
    },
    onError: (error) => {
      toast.error(
        error.message ||
          "An error occurred while updating the post's likes. Please try again."
      );
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId }) => postService.savePost(userId, postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.GET_INFINITE_SAVED_POSTS_BY_USER_ID,
          data?.user?.$id,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS_BY_USER_ID, data?.user?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, data?.user?.username],
      });
    },
    onError: (error) => {
      toast.error(
        error.message ||
          "An error occurred while saving the post. Please try again."
      );
    },
  });
};

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ savedPostId, username, userId }) =>
      postService.deleteSavedPost(savedPostId, username, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.GET_INFINITE_SAVED_POSTS_BY_USER_ID,
          data?.userId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS_BY_USER_ID, data?.userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_USERNAME, data?.username],
      });
    },
    onError: (error) => {
      toast.error(
        error.message ||
          "An error occurred while deleting the saved post. Please try again."
      );
    },
  });
};

export const useGetInfiniteSavedPostsByUserId = (userId) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SAVED_POSTS_BY_USER_ID, userId],
    queryFn: ({ pageParam }) =>
      postService.getInfiniteSavedPostsByUserId({ pageParam, userId }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => postService.getPostById(postId),
    enabled: !!postId,
  });
};

export const useGetInfiniteSearchPostsBySearchTerm = (searchTerm) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SEARCH_POSTS_BY_SEARCH_TERM, searchTerm],
    queryFn: ({ pageParam }) =>
      postService.getInfiniteSearchPostsBySearchTerm({ pageParam, searchTerm }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useGetInfiniteUsersBySearchTerm = (searchTerm) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_USERS_BY_SEARCH_TERM, searchTerm],
    queryFn: ({ pageParam }) =>
      authService.getInfiniteUsersBySearchTerm({ pageParam, searchTerm }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useGetInfinitePostRelatedPosts = (tagList, postId) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POST_RELATED_POSTS, tagList, postId],
    queryFn: ({ pageParam }) =>
      postService.getInfinitePostRelatedPosts({
        pageParam,
        tagList,
        postId,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useGetInfinitePostsByFollowedUsers = (followedUserIds) => {
  return useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.GET_INFINITE_POSTS_BY_FOLLOWED_USERS,
      followedUserIds,
    ],
    queryFn: ({ pageParam }) =>
      postService.getInfinitePostsByFollowedUsers({
        pageParam,
        followedUserIds,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useGetAllFeaturedTags = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_FEATURED_TAGS],
    queryFn: () => websiteService.getAllFeaturedTags(),
  });
};

export const useGetFeaturedTagBySlug = (slug) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FEATURED_TAG_BY_SLUG, slug],
    queryFn: () => websiteService.getFeaturedTagBySlug(slug),
    enabled: !!slug,
  });
};
