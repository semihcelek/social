import axios from "axios";
import { setToken } from "./user-service";

export const createPost = async (values, userObj) => {
  const userToken = setToken(userObj);
  const payload = { title: values.title, content: values.content };

  const config = {
    headers: { Authorization: userToken },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/post`,
    payload,
    config
  );
  return response.data;
};
