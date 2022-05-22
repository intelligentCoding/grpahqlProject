import { FieldError } from "./generated/graphql";

export const errorMap = (errors: FieldError[]) => {
  const mapAllErrors: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    mapAllErrors[field] = message;
  });
  return mapAllErrors;
};
