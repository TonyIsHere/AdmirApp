import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { FAB, Title } from 'react-native-paper';

//CSS
import style from '../../styles';

import ItemCard from '../../components/ItemCard';

import { useSelector } from 'react-redux';

export default function AllLook(props) {
    let allData = useSelector((state) => state.lookData);
    const styles = style(allData.settings.theme)

    let myLooks = allData.myLooks
    return (
        <>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>MyLooks</Text>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {myLooks.map(x => <ItemCard key={x.id} nav={props.navigation} data={x} displayFavBtn={false} />)}
                        </View>
                        {myLooks.length == 0 ? <Title style={{ textAlign: "center", }}>Your dressing is empty</Title> : undefined}
                    </View>
                </ScrollView>
            </View>
            <FAB
                style={styles.fab}
                onPress={_ => props.navigation.navigate('NewLook')}
                icon={"plus"}
            />
        </>
    )
}