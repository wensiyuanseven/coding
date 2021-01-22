import env from "./../../env.js";
let url = {
  picUrl: "",
  baseUrl: "",
  loginUrl: ""
};

switch (env) {
  case "development":
    url.picUrl = "";
    url.baseUrl = "";
    url.loginUrl = "";
    break;
  case "test":
    url.picUrl = "";
    url.baseUrl = "";
    url.loginUrl = "";
    break;
  case "qa":
    url.picUrl = "";
    url.baseUrl = "";
    url.loginUrl = "";
    break;
  case "production":
    url.picUrl = "";
    url.baseUrl = "";
    url.loginUrl = "";
    break;
}
export default {
  loginUrl: url.loginUrl,
  picUrl: url.picUrl,
  baseUrl: url.baseUrl
};
