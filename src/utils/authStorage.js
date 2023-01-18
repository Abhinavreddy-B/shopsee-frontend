import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:token`)
    return JSON.parse(token)
  }

  async setAccessToken(accessToken) {
    return await AsyncStorage.setItem(`${this.namespace}:token`,JSON.stringify(accessToken))
  }

  async removeAccessToken() {
    return await AsyncStorage.removeItem(`${this.namespace}:token`)
  }
}

export default AuthStorage;