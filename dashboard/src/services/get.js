import { getAuth } from "../auth/auth";
import config from "../config";

// some-javascript-utils
import { getCookie } from "some-javascript-utils/browser";

import { getUserName } from "../utils/auth";

/**
 *
 * @param {string} collection
 * @param {number} page
 * @param {string[]} attributes
 * @param {any} query
 * @returns
 */
export async function fetchList(collection, page, attributes, query) {
  const response = await fetch(`${config.apiUrl}${collection}/list`, {
    method: "POST",
    body: JSON.stringify({
      user: getUserName(),
      collection,
      page,
      attributes,
      query,
    }),
    headers: {
      ...getAuth,
      Authorization: `Bearer ${getCookie(config.basicKey)}`,
    },
  });
  return response;
}

/**
 *
 * @param {string} collection
 * @param {number} page
 * @returns
 */
export async function fetchListGET(page, type) {
  const response = await fetch(
    `${
      config.apiUrl
    }posts/fetch?type=${type}&page=${page}&user?${getUserName()}`,
    {
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  return response;
}

/**
 *
 * @param {string} collection
 * @param {number} page
 * @param {string[]} attributes
 * @param {any} query
 * @returns
 */
export async function fetchUnionList(collections, page, attributes, query) {
  const response = await fetch(`${config.apiUrl}${collections[0]}/union-list`, {
    method: "POST",
    body: JSON.stringify({
      user: getUserName(),
      collections,
      page,
      attributes,
      query,
    }),
    headers: {
      ...getAuth,
      Authorization: `Bearer ${getCookie(config.basicKey)}`,
    },
  });
  return response;
}
