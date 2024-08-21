import React from "react";
import {
  Input,
  ErrorMessageField,
  InputIllusionButton,
} from "../../../../components/shared";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const PersonalInfoField = ({
  control,
  email,
  username,
  errors,
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-5">
      <div className="w-full">
        <Input
          label="First Name"
          name="firstName"
          control={control}
          toPascalCase={true}
          autoComplete="on"
          placeholder="First Name"
          required={true}
        />
        {errors?.firstName && (
          <ErrorMessageField className="mt-2">
            {errors.firstName.message}
          </ErrorMessageField>
        )}
      </div>

      <div className="w-full">
        <Input
          label="Last Name"
          name="lastName"
          control={control}
          toPascalCase={true}
          autoComplete="on"
          placeholder="Last Name"
          required={true}
        />
        {errors?.lastName && (
          <ErrorMessageField className="mt-2">
            {errors.lastName.message}
          </ErrorMessageField>
        )}
      </div>

      <InputIllusionButton
        label="Email"
        required={true}
        onClick={() => navigate("/account/change-email")}
      >
        {email}
      </InputIllusionButton>

      <InputIllusionButton
        label="Username"
        preFixIcon={<AtSymbolIcon className="w-5 h-5" strokeWidth={2} />}
        required={true}
        onClick={() => navigate("/account/change-username")}
      >
        {username}
      </InputIllusionButton>
    </div>
  );
};

export default PersonalInfoField;
