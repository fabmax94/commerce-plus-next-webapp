import axios from "axios";
import { SERVER_HOST } from "../constants";

const BASE_HOST = SERVER_HOST;
const HOST = `${BASE_HOST}/api`;

const server = axios.create({
  baseURL: BASE_HOST,
  validateStatus: function () {
    return true;
  },
});

const getAuthorization = (config) => {
  if (config.cookie) {
    const cookie = config.cookie
      .split(";")
      .filter((cookie) => cookie.includes("Authorization"));

    const contentType = config["Content-Type"]
      ? { "Content-Type": config["Content-Type"] }
      : {};
    return (
      cookie.length && {
        headers: {
          Authorization: cookie[0].split("=")[1].replace("%20", " "),
          ...contentType,
        },
      }
    );
  }
};

const get = (uri, config = {}) => {
  return server.get(uri, getAuthorization(config));
};

const post = (uri, data, config = {}) => {
  return server.post(uri, data, getAuthorization(config));
};

const put = (uri, data, config = {}) => {
  return server.patch(uri, data, getAuthorization(config));
};

export { get, post, put, server, BASE_HOST, HOST };
