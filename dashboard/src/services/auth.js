import { getAuth } from "../auth/auth";
import config from "../config";

// some-javascript-utils
import { getCookie } from "some-javascript-utils/browser";

import md5 from "md5";
import { getUserName } from "../utils/auth";

/**
 *
 * @param {string} type
 * @returns
 */
export const validateBasicKey = async (type) => {
  const response = await fetch(
    // @ts-ignore
    `${config.apiUrl}auth/${type === "admin" ? "is-admin" : "validate"}`,
    {
      method: "POST",
      body: JSON.stringify({ user: getUserName() }),
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  const data = await response.data;
  if (data.data.user) return data.data.user;
  return false;
};

/**
 * Takes a user object and sends it to the backend to be authenticated
 * @param {string} user - the user name
 * @param {string} password - the user password
 * @returns The response from the server.
 */
export const login = async (user, password, remember) => {
  const response = await fetch(
    // @ts-ignore
    `${config.apiUrl}auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ user, password: md5(password), remember }),
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};

/**
 *
 * @param {string} user
 */
export const signOutUser = async (user) => {
  const response = await fetch(
    // @ts-ignore
    `${config.apiUrl}auth/sign-out`,
    {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  return await response.data;
};

/**
 * Sends a POST request to the API with the email address of the user who wants to reset their
 * password
 * @param {string} email - The email address of the user who wants to reset their password.
 * @returns The response from the server.
 */
export const passwordRecovery = async (email) => {
  const response = await fetch(
    // @ts-ignore
    `${config.apiUrl}user/password-reset`,
    { method: "POST", body: JSON.stringify({ email }), headers: getAuth }
  );
  return response;
};

export const saveInfo = async (attributes, values) => {
  const response = await fetch(
    // @ts-ignore
    `${config.apiUrl}users/save-info`,
    {
      method: "POST",
      body: JSON.stringify({ user: getUserName(), attributes, values }),
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  return await response.data;
};

export const loadInfo = async (attributes) => {
  const response = await fetch(
    // @ts-ignore
    `${config.apiUrl}users/load-info`,
    {
      method: "POST",
      body: JSON.stringify({ user: getUserName(), attributes }),
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  return await response.data;
};
