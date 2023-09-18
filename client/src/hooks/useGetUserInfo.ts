export const useGetUserInfo = () => {
  const accessUserInfo = localStorage.getItem("userInformation");

  if (accessUserInfo) {
    const accessInfoObj = JSON.parse(accessUserInfo);
    return accessInfoObj;
  }
  return null;
};
