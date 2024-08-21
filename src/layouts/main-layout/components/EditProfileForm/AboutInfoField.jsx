import React from "react";
import {
  Input,
  ErrorMessageField,
  Textarea,
  InputTagBox,
  TagsInput,
} from "../../../../components/shared";

const AboutInfoField = ({ control, interests, setValue, errors }) => {
  return (
    <div className="mb-5">
      <h1 className="text-lg font-semibold mb-4">About</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="w-full">
          <Input
            label="Location"
            name="location"
            control={control}
            autoComplete="off"
            placeholder="Location"
          />
          {errors?.location && (
            <ErrorMessageField className="mt-2">
              {errors?.location?.message}
            </ErrorMessageField>
          )}
        </div>

        <div className="w-full">
          <Input
            label="Personal site/portfolio"
            name="personalWebsiteUrl"
            control={control}
            autoComplete="off"
            placeholder="https://"
          />
          {errors?.personalWebsiteUrl && (
            <ErrorMessageField className="mt-2">
              {errors?.personalWebsiteUrl?.message}
            </ErrorMessageField>
          )}
        </div>

        <div className="w-full">
          <Textarea label="Bio" name="bio" control={control} />
          {errors?.bio && (
            <ErrorMessageField className="mt-2">
              {errors?.bio?.message}
            </ErrorMessageField>
          )}
        </div>

        <div className="w-full">
          <InputTagBox
            label="Interests"
            subLabel="(maximum 5)"
            setValue={setValue}
            tags={interests}
            name="interests"
            placeholder="Add a interest"
          />
           {/* <TagsInput
            label="Interests"
            subLabel="(maximum 5)"
            control={control}
            name="interests"
            required={true}
          /> */}
          <small className="text-copy-lighter text-xs">
            Your interests are generated from the types of photos you like,
            collect, and contribute.
          </small>
          {errors?.interests && (
            <ErrorMessageField className="mt-2">
              {errors?.interests?.message}
            </ErrorMessageField>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutInfoField;
