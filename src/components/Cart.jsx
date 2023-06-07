import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import UserContext from '../contexts/UserContext';
import theme from '../theme';
import ServerMethods from '../utils/Communicate';
import RenderItems from './RenderItems';

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
})
const Cart = () => {
    const {user} = useContext(UserContext)
    const [cartItems,setCartItems] = useState([])
    const [loading,setLoading] = useState(true)

    const fetchAndSet = () => {
        setLoading(true)
        ServerMethods.GetCart().then((response) => {
            setCartItems(response.map( e => e.item))
            setLoading(false)
        })
    }
    useEffect(() => {
        setLoading(true)
        ServerMethods.GetCart().then((response) => {
            console.log("Hello")
            setCartItems(response.map(e => e.item))
            setLoading(false)
        })
    },[])

    const Btn = ({ item, user }) => {
        return (
            user && user.type === 'user' &&
            <Pressable onPress={() => { () => alert('Removed From Cart') }} style={styles.submitWrapper}>
                <Text style={styles.submitbutton}>Remove To Cart | {cartItems.find(e => e.item == item).quantity}</Text>
            </Pressable>
        )
    }

    return (
        <RenderItems items={cartItems} fetchandset={fetchAndSet} refr={loading} button={Btn}></RenderItems>
    );
};

export default Cart;