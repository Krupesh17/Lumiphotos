import { useSelector } from "react-redux";
import ProfilePictureBox from "./ProfilePictureBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileValidation } from "../../../../validations";
import PersonalInfoField from "./PersonalInfoField";
import AboutInfoField from "./AboutInfoField";
import SocialInfoField from "./SocialInfoField";
import { ButtonFilled } from "../../../../components/shared";
import { useUpdateUser } from "../../../../react-query/queries";
import { toast } from "react-toastify";

const EditProfileForm = () => {
  const userData = useSelector((state) => state?.auth?.authData?.userData);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(EditProfileValidation),
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      location: userData?.location || "",
      personalWebsiteUrl: userData?.personalWebsiteUrl || "",
      bio: userData?.bio || "",
      interests: userData?.interests || "",
      instagramId: userData?.instagramId || "",
      twitterId: userData?.twitterId || "",
    },
  });

  const watchInterests = watch("interests");

  const { mutateAsync: updateUser, isPending: isUserUpdatePending } =
    useUpdateUser();

  const handleEditProfileForm = async (data) => {
    try {
      const updatedUserData = await updateUser({ ...data, $id: userData?.$id });

      if (!updatedUserData) {
        throw new Error("Error occurred while updating user's profile.");
      }

      toast.success("User's profile updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(handleEditProfileForm)}>
        <ProfilePictureBox />

        <PersonalInfoField
          control={control}
          email={userData?.email}
          username={userData?.username}
          errors={errors}
        />

        <AboutInfoField
          control={control}
          errors={errors}
          setValue={setValue}
          interests={
            watchInterests.length ? watchInterests.trim().split(",") : []
          }
        />

        <SocialInfoField control={control} errors={errors} />

        <ButtonFilled
          type="submit"
          buttonBlock={true}
          className={`mb-5 ${isUserUpdatePending && "btn-primary-loading"}`}
        >
          <div className={`${isUserUpdatePending && "invisible opacity-0"}`}>
            Update account
          </div>
        </ButtonFilled>
      </form>
    </>
  );
};
export default EditProfileForm;
