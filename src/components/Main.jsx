import React, { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import useAuthStorage from '../hooks/useAuthStorage';
import ServerMethods from '../utils/Communicate';
import AddItem from './AddItem';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import theme from '../theme';
import Cart from './Cart';

const Drawer = createDrawerNavigator();

const Main = () => {
    const { user, setUser } = useContext(UserContext)
    const authstorage = useAuthStorage()
    useEffect(() => {
        authstorage.getAccessToken().then((saved) => {
            if (saved) {
                setUser(saved)
                ServerMethods.setToken(saved)
            }
        })
    }, [])

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" screenOptions={{headerTitle: user?user.Name:''}}>
                <Drawer.Screen name='home' component={Home} />
                {
                    !user ?
                        <Drawer.Screen name='login' component={Login} /> :
                        <Drawer.Screen name='profile' component={Profile} />
                }
                {
                    user && user.type === 'seller' &&
                    <Drawer.Screen name='Add Item' component={AddItem} />
                }
                {
                    user && user.type === 'user' &&
                    <Drawer.Screen name='My Cart' component={Cart} />
                }
                {/* <Drawer.Screen name='/signup' component={SignUp} /> */}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default Main;