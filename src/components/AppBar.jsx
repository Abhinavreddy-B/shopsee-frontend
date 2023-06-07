import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import theme from '../theme';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: theme.colors.primary,
        fontSize: theme.fontSizes.subheading,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: theme.fontSizes.subheading
    }
})
const AppBar = () => {
    const { user } = useContext(UserContext)
    // const navigate = useNavigate()

    return (
        <View style={styles.wrapper}>
            {/* <Pressable onPress={() => navigate('/')}>
                <Text style={styles.text}>
                    Shop
                </Text>
            </Pressable>
            {
                user && user.type === 'seller' &&
                <Pressable onPress={() => navigate('/addItem')}>
                    <Text style={styles.text}>
                        Add Item
                    </Text>
                </Pressable>
            }
            {
                !user ?
                    <Pressable onPress={() => navigate('/login')}>
                        <Text style={styles.text}>
                            Log In
                        </Text>
                    </Pressable>
                    :
                    <Pressable onPress={() => navigate('/profile')}>
                        <Text style={styles.text}>
                            Profile
                        </Text>
                    </Pressable>
            } */}
        </View>
    );
};

export default AppBar;