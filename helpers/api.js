import axios from "axios";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = "http://188.94.155.7";
    // this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }
  init = () => {
    // this.api_token = getCookie("ACCESS_TOKEN");
    let headers = {
      Accept: "application/json",
    };
    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }
    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });
    return this.client;
  };
  loginUser = (data) => {
    return this.init().post("/api/login", data);
  };
  registerUser = (data) => {
    return this.init().post("/api/register", data);
  };
  getMainPage = () => {
    return this.init().get("");
  };
}
