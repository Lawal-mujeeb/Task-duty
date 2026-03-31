
import axios from "axios"

const BASEURL = import.meta.env.VITE_TASKDUTY_BASE_URL;
const TIMEOUTMSG = "Waiting for too long...aborted";
const timeout = 30000;

const config = {
    baseURL: BASEURL + "/api/v1",
    timeoutErrorMessage: TIMEOUTMSG,
    timeout,
    withCredentials: true, // to allow cookies to be received on the client
};

const axiosInstance = axios.create(config);



export default axiosInstance;

// import axios from "axios";

// const BASEURL = import.meta.env.VITE_TASKDUTY_BASE_URL;
// const TIMEOUTMSG = "Waiting for too long...aborted";
// const timeout = 30000;

// const config = {
//   baseURL: BASEURL + "/api/v1",
//   timeoutErrorMessage: TIMEOUTMSG,
//   timeout,
//   withCredentials: true,
// };

// const axiosInstance = axios.create(config);

// // ✅ Attach token automatically before every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;