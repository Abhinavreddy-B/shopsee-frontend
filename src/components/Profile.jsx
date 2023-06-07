import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import UserContext from '../contexts/UserContext';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';
import ServerMethods from '../utils/Communicate';

const styles = StyleSheet.create({
    submitWrapper: {
        display: 'flex',
        textAlign: 'center'
    },
    submitbutton: {
        margin: 12,
        color: 'white',
        backgroundColor: theme.colors.quarternary,
        padding: 8,
        borderRadius: 5,
        textAlign: 'center'
    },
    text: {
        width: '100%',
        textAlign: 'center',
        fontSize: theme.fontSizes.heading
    },
    parentWrapper: {
        height: '70%',
        display: 'flex',
        justifyContent: 'center'
    }
});

const Profile = ({ navigation }) => {
    const authStorage = useAuthStorage();
    const { user, setUser } = useContext(UserContext)
    // const navigate = useNavigate()

    const LogOut = async () => {
        await authStorage.removeAccessToken()
        ServerMethods.resetToken()
        setUser(undefined)
        alert('Log Out Succesfull')
        navigation.navigate('home')
    }

    return (
        <View style={styles.parentWrapper}>
            {
                user &&
                <Text style={styles.text}>Logged In as {user.userName}</Text>
            }
            <Pressable onPress={LogOut} style={styles.submitWrapper}>
                <Text style={styles.submitbutton}>Log Out</Text>
            </Pressable>
        </View>
    );
};

export default Profile;