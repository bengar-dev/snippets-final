import { storeToken } from '~/composable/storeToken';

//TODO: check how to store jwt, handle auth
//maybe this is useless, we'll have to check it
export const useUtility = () => ({
  store: storeToken,
});
