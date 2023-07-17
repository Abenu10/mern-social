import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config.API_URL,
});

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await api.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
// changed it to use config.API_URL 
// 