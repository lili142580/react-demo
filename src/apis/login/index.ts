import Request from "../request";
const axios = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

export const getLoginImage = async () => {
  const { data } = await axios.request({
    url: "/captchaImage",
    method: "get",
  });

  return data.img;
};
