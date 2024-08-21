import React from "react";
import { ErrorMessageField, Input } from "../../../../components/shared";
import { AtSymbolIcon } from "@heroicons/react/24/outline";

const SocialInfoField = ({ control, errors }) => {
  return (
    <div className="mb-5">
      <h1 className="text-lg font-semibold mb-4">Social</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="w-full">
          <Input
            label="Instagram username"
            name="instagramId"
            control={control}
            preFixIcon={<AtSymbolIcon className="w-5 h-5" strokeWidth={2} />}
            usernameInput={true}
            autoComplete="off"
          />
          {errors?.instagramId && (
            <ErrorMessageField className="mt-2">
              {errors?.instagramId?.message}
            </ErrorMessageField>
          )}
        </div>
        <div className="w-full">
          <Input
            label="Twitter username"
            name="twitterId"
            control={control}
            preFixIcon={<AtSymbolIcon className="w-5 h-5" strokeWidth={2} />}
            usernameInput={true}
            autoComplete="off"
          />
          {errors?.twitterId && (
            <ErrorMessageField className="mt-2">
              {errors?.twitterId?.message}
            </ErrorMessageField>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialInfoField;
