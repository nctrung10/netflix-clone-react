import { EMAIL_REGEX } from "./regex";

export const validateEmail = (value: string): any => {
  return value.toLowerCase().match(EMAIL_REGEX);
};

export const validatePassword = (value: string) => {
  return value.trim() !== '' && value.length >= 6 && value.length <= 60;
};