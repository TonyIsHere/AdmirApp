import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { FAB, Title } from 'react-native-paper';

//CSS
import style from '../../styles';

import ItemCard from '../../components/ItemCard';
import { useSelector } from 'react-redux';

export default function FavorisAll(props) {
    let allData = useSelector((state) => state.lookData);
    const styles = style(allData.settings.theme)

    let favArray = allData.favorisLook;

    return (
        <>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Favoris</Text>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {favArray.map(x => <ItemCard key={x} nav={props.navigation} data={allData.allLook.find(y => y.id == x)} displayFavBtn={false} />)}
                        </View>
                        {favArray.length == 0 ? <Title style={{ textAlign: "center" }}>Your fav is empty</Title> : undefined}
                    </View>
                </ScrollView>
                <FAB
                    style={styles.fab}
                    onPress={_ => props.navigation.navigate("Wish")}
                    icon={"gift"}
                    label="Wishlist"
                />
            </View>
        </>
    )
}