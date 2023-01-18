import { useContext } from 'react'; 

import AuthStorageContext from '../contexts/AuthContext';

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;