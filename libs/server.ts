import axios from "axios";

const server = axios.create({
  baseURL: process.env.SERVER_HOST,
  validateStatus: function () {
    return true;
  },
});

const getAuthorization = (config) => {
  return (
    config.token && {
      headers: {
        Authorization: config.token,
        ...(config["Content-Type"]
          ? { "Content-Type": config["Content-Type"] }
          : {}),
      },
    }
  );
};

const get = (uri, config = {}) => {
  return server.get(uri, getAuthorization(config));
};

const post = (uri, data, config = {}) => {
  console.log(getAuthorization(config));
  return server.post(uri, data, getAuthorization(config));
};

const put = (uri, data, config = {}) => {
  return server.patch(uri, data, getAuthorization(config));
};

export { get, post, put, server };
