import React, { useContext } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text } from 'react-native';
import { Surface } from 'react-native-paper';
import UserContext from '../contexts/UserContext';
import theme from '../theme';
import ServerMethods from '../utils/Communicate';

const styles = StyleSheet.create({
    cardWrapper: {
        borderColor: theme.colors.secondary,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: 'white'
    },
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

const Card = ({ item, button: CustButton }) => {
    const { user } = useContext(UserContext)
    
    
    return (
        <Surface style={styles.cardWrapper} elevation={1}>
            <Image
                source={{
                    uri: item.image || 'https://reactnative.dev/docs/assets/p_cat2.png',
                }}
                style={{ width: '100%', height: undefined, aspectRatio: 1 / 1, }}
            />
            <Text style={{ width: '100%', textAlign: 'center', fontSize: theme.fontSizes.subheading }}>{item.name}</Text>
            <Text style={{ fontSize: theme.fontSizes.body, color: theme.colors.quarternary }}>₹{item.price}</Text>
            <Text>Sold By {item.seller.Name}</Text>
            <CustButton user={user} item={item}></CustButton>
            {/* {
                user && user.type === 'user' && title &&
                <Pressable onPress={() => {action(item.id)}} style={styles.submitWrapper}>
                    <Text style={styles.submitbutton}>{title}</Text>
                </Pressable>
            } */}
        </Surface>
    )
}

const RenderItems = ({items,fetchandset,refr, button}) => {
    return (
        <FlatList
            data={items}
            renderItem={({ item }) => <Card item={item} button={button}/>}
            keyExtractor={item => item.id}
            numColumns='2'
            onRefresh={() => { fetchandset() }}
            refreshing={refr}
        >

        </FlatList>
    );
};

export default RenderItems;