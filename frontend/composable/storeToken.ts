export const storeToken = (jwt: string): boolean => {
  if (jwt) {
    localStorage.setItem('jwt', jwt);
    return true;
  }

  return false;
};
