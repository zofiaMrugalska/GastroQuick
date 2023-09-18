export const useGetUserToken = () => {
  const accessTokenJSON = localStorage.getItem("accessToken");
  if (accessTokenJSON) {
    const accessTokenObj = JSON.parse(accessTokenJSON);
    return accessTokenObj.accessToken;
  }
  return null;
};
