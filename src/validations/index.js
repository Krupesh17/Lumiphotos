import { z } from "zod";

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "The password must be at least 8 characters long.",
  }),
});

export const SignUpValidation = z.object({
  firstName: z.string().min(1, {
    message: "Please provide a first name that is at least 1 character long.",
  }),
  lastName: z.string().min(1, {
    message: "Please provide a last name that is at least 1 character long.",
  }),
  username: z.string().min(4, {
    message: "Please provide a username of at least 4 characters.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "Require at least one uppercase character.")
    .regex(new RegExp(".*[a-z].*"), "Require at least one lowercase character.")
    .regex(new RegExp(".*\\d.*"), "Require at least one numeric character.")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "Require at least one special character."
    )
    .min(8, { message: "The password must be at least 8 characters long." }),
});

export const SearchValidation = z.object({
  search: z.string().min(2),
});

export const EditProfileValidation = z.object({
  firstName: z.string().min(1, {
    message: "Please provide a first name that is at least 1 character long.",
  }),
  lastName: z.string().min(1, {
    message: "Please provide a last name that is at least 1 character long.",
  }),
  location: z.string().min(0),
  personalWebsiteUrl: z.string().min(0),
  bio: z.string().min(0).max(250, {
    message: "Maximum length allowed is 250 characters.",
  }),
  interests: z.string().min(0),
  instagramId: z.string().min(0),
  twitterId: z.string().min(0),
});

export const UpdateEmailValidation = z.object({
  newEmail: z.string().email(),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "Require at least one uppercase character.")
    .regex(new RegExp(".*[a-z].*"), "Require at least one lowercase character.")
    .regex(new RegExp(".*\\d.*"), "Require at least one numeric character.")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "Require at least one special character."
    )
    .min(8, { message: "The password must be at least 8 characters long." }),
});

export const UpdateUsernameValidation = z.object({
  newUsername: z.string().min(4, {
    message: "Please provide a username of at least 4 characters.",
  }),
});

export const ChangePasswordValidation = z.object({
  oldPassword: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "Require at least one uppercase character.")
    .regex(new RegExp(".*[a-z].*"), "Require at least one lowercase character.")
    .regex(new RegExp(".*\\d.*"), "Require at least one numeric character.")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "Require at least one special character."
    )
    .min(8, { message: "The password must be at least 8 characters long." }),
  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "Require at least one uppercase character.")
    .regex(new RegExp(".*[a-z].*"), "Require at least one lowercase character.")
    .regex(new RegExp(".*\\d.*"), "Require at least one numeric character.")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "Require at least one special character."
    )
    .min(8, { message: "The password must be at least 8 characters long." }),
});

export const ForgotPasswordValidation = z.object({
  email: z.string().email(),
});

export const CreatePostValidation = z.object({
  description: z.string().min(0).max(600, {
    message: "Maximum length allowed is 600 characters.",
  }),
  location: z.string().min(0),
  tags: z
    .string()
    .refine(
      (val) =>
        val.split(",").filter((tag) => tag.trim().length > 0).length >= 5,
      {
        message: "You must provide at least 5 tags, separated by commas.",
      }
    ),
});

export const UpdatePostValidation = z.object({
  description: z.string().min(0).max(600, {
    message: "Maximum length allowed is 600 characters.",
  }),
  location: z.string().min(0),
  tags: z
    .string()
    .refine(
      (val) =>
        val.split(",").filter((tag) => tag.trim().length > 0).length >= 5,
      {
        message: "You must provide at least 5 tags, separated by commas.",
      }
    ),
});
