import { useContext } from "react";
import {authContext} from './authProvider';

// From https://usehooks.com/useAuth/
// useAuth hook can be called to retrieve auth state
// and conditionally render components
export const useAuth = () => {
  return useContext(authContext);
};