import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
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
const Home = ({ navigation }) => {
    const [items, setItems] = useState([])
    const [refr, setRefr] = useState(false)

    const addToCart = async (id) => {
        const res = await ServerMethods.AddToCart(id)
        alert('added to cart')
    }

    const Btn = ({ item, user }) => {
        return (
            user && user.type === 'user' &&
            <Pressable onPress={() => { addToCart(item.id) }} style={styles.submitWrapper}>
                <Text style={styles.submitbutton}>Add To Cart</Text>
            </Pressable>
        )
    }

    const fetchandset = async () => {
        setRefr(true)
        axios.get('http://10.1.135.24:5000/api/items').then((result) => {
            setItems(result.data)
            setRefr(false)
        })
    }
    useEffect(() => {
        fetchandset().then(() => { })
    }, [])

    return (
        <RenderItems items={items} fetchandset={fetchandset} refr={refr} button={Btn}></RenderItems>
    );
};

export default Home;