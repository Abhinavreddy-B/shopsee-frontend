import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    cardWrapper: {
        borderColor: theme.colors.secondary,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        flex: 1, 
        margin: 5,
        padding: 10,
    }
})

const Card = ({ item }) => {
    return (
        <View style={styles.cardWrapper}>
            <Image
                source={{
                    uri: item.image || 'https://reactnative.dev/docs/assets/p_cat2.png',
                }}
                style={{ width: '100%', height: undefined, aspectRatio: 1 / 1, }}
            />
            <Text style={{width: '100%',textAlign: 'center',fontSize: theme.fontSizes.subheading}}>{item.name}</Text>
            <Text style={{fontSize: theme.fontSizes.body,color: theme.colors.quarternary}}>₹{item.price}</Text>
            <Text>Sold By {item.seller.Name}</Text>
        </View>
    )
}

const Home = () => {
    const [items, setItems] = useState([])
    const [refr,setRefr] = useState(false)

    const fetchandset = async ()=> {
        setRefr(true)
        axios.get('http://10.1.135.24:5000/api/items').then((result) => {
            setItems(result.data)
            setRefr(false)
        })
    }
    useEffect(() => {
        fetchandset().then(() => {})
    }, [])

    return (
        <FlatList
            data={items}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={item => item.id}
            numColumns='2'
            onRefresh={() => {fetchandset()}}
            refreshing={false}
        >

        </FlatList>
    );
};

export default Home;