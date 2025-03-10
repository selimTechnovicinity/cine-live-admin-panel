import { authKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getLocalStorage(authKey);
  const userInfo = authToken ? decodedToken(authToken) : null;
  return userInfo;
};

export const isLoggedIn = () => {
  const authToken = getLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  } else return false;
};

export const removeUser = () => {
  return clearLocalStorage(authKey);
};
