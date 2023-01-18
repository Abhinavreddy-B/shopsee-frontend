import { useState } from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import AuthStorageContext from './src/contexts/AuthContext';
import UserContext from './src/contexts/UserContext';
import AuthStorage from './src/utils/authStorage';


const authStorage = new AuthStorage()
export default function App() {
  const [user, setUser] = useState()
  return (
    <NativeRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </UserContext.Provider>
    </NativeRouter>
  );
}
