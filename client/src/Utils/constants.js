export const TASK_PRIORITY = ["Urgent", "Important"];



// export const headers = (accessToken) => {
//   return {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };
// };
export const headers = (accessToken) => {
  if (!accessToken) return {}; // don't send Authorization if no token
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};