import axios, { AxiosResponse } from "axios";

const HOST = `http://${
  typeof window !== "undefined" ? window.location.host : "localhost:3001"
}/api`;

const server = axios.create({
  baseURL: HOST,
  validateStatus: function () {
    return true;
  },
});

const get = (uri, config = {}): Promise<AxiosResponse> => {
  return server.get(uri, config);
};

const put = (uri, data, config = {}) => {
  return server.put(uri, data, config);
};

const post = (uri, data, config = {}) => {
  return server.post(uri, data, config);
};

const remove = (uri, config = {}) => {
  return server.delete(uri, config);
};

export { get, post, put, remove, server };
