import React, { useContext, useEffect } from 'react';
import {  Text, View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import UserContext from '../contexts/UserContext';
import useAuthStorage from '../hooks/useAuthStorage';
import ServerMethods from '../utils/Communicate';
import AddItem from './AddItem';
import AppBar from './AppBar';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';


const Main = () => {
    const {setUser} = useContext(UserContext)
    const authstorage = useAuthStorage()
    useEffect(() => {
        authstorage.getAccessToken().then((saved) => {
            if(saved){
                setUser(saved)
                ServerMethods.setToken(saved)
            }
        })
    },[])
    return (
        <View style={{flex: 1}}>
            <AppBar></AppBar>
            <Routes>
                <Route exact path='/' element={<Home></Home>}></Route>
                <Route exact path='/login' element={<Login></Login>}></Route>
                <Route exact path='/profile' element={<Profile></Profile>}></Route>
                <Route exact path='/addItem' element={<AddItem></AddItem>}></Route>
                <Route exact path='/signup' element={<SignUp></SignUp>}></Route>
            </Routes>
        </View>
    );
};

export default Main;