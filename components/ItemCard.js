import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { FAB, } from 'react-native-paper';

import style from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import * as ReducerAction from '../redux/reducer';


export default function ItemCard(props) {
    let allData = useSelector((state) => state.lookData);
    const styles = style(allData.settings.theme)
    const dispatch = useDispatch();

    const windowWidth = Dimensions.get('window').width;

    const stylesCard = StyleSheet.create({
        image: {
            resizeMode: "cover",
            width: "100%",
            height: 250,
            alignSelf: "center"
        },
        content: {
            width: (windowWidth < 400) ? (windowWidth - 40) / 2 : (windowWidth - 40) / 3,

            padding: 5
        }
    });

    const fakeData = {
        tag: ["nike,manteau,khaki"],
        category: ["Casual", "StreetWear"],
        pic: "https://img01.ztat.net/outfit/9572562317c7457a92e2ba6250839496/e6af0dade39b42cf97078b04c3e01d32.jpg?imwidth=1800",
        username: "Anthony",
        isFav: true
    };

    let data = fakeData;

    if (props.data) {
        data = {
            pic: props.data.look[0],
            username: props.data.name,
            isFav: false
        }
    }

    let displayFavBtn = (props.displayFavBtn == undefined || props.displayFavBtn) ? true : false;

    let btnFav = (displayFavBtn) ? <FAB
        style={styles.fab}
        onPress={_ => dispatch(ReducerAction.setFavA(props.data.id))}
        small
        icon={allData.favorisLook.includes(props.data.id) ? "heart" : "heart-outline"}
    /> : undefined;

    return <View style={stylesCard.content}>
        <TouchableOpacity onPress={_ => props.nav.navigate("DetailLook", props.data)}>
            <Image
                style={stylesCard.image}
                source={{
                    uri: data.pic
                }}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={_ => console.log("ee")}>
            <Text style={{ fontWeight: "bold" }}>@{data.username}</Text>
        </TouchableOpacity>
        {btnFav}
    </View>
}
