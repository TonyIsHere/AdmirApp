import React, { useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Linking } from 'react-native';
import { FAB } from 'react-native-paper';
import { Image, Button } from 'react-native-elements';

//CSS
import style, { colorPrimaryFn, windowWidth, windowHeight, colorSecondaryFn } from '../styles';

//Redux
import { useSelector } from 'react-redux';

export default function DetailProduct(props) {

    let allData = useSelector((state) => state.lookData);

    const styles = style(allData.settings.theme);
    const colorPrimary = colorPrimaryFn(allData.settings.theme);
    const colorSecondary = colorSecondaryFn(allData.settings.theme);

    const [data, setData] = useState(props.route.params);

    return (
        <>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{data.name}</Text>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{
                            borderRadius: 5,
                            width: windowWidth,
                            height: windowHeight / 2,
                            justifyContent: "center",
                            alignSelf: "center"
                        }}>
                            <Image
                                resizeMode={'contain'}
                                source={{ uri: data.pic }}
                                containerStyle={{ flex: 1 }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        </View>
                        <Button onPress={_ => Linking.openURL(data.link)} buttonStyle={{ backgroundColor: colorSecondary.dark, borderRadius: 10, marginTop: 20 }} title={"Link product"}></Button>
                        <Button onPress={_ => Linking.openURL(`https://www.google.com/search?q=${data.name}`)} buttonStyle={{ backgroundColor: colorPrimary.dark, borderRadius: 10, marginTop: 20 }} title={"Search on Google"}></Button>
                    </View>
                </ScrollView>
            </View>
            <FAB style={styles.fabGoBack} small icon={"arrow-left"} onPress={() => props.navigation.goBack()} />
        </>
    )
}