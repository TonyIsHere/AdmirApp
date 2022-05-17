import React from 'react';

//CSS
import style, { colorAvailable, colorPrimaryFn, colorSecondaryFn } from '../../styles';

import { View, ScrollView, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { Title, FAB } from 'react-native-paper';

//Redux
import * as ReducerAction from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function Settings(props) {
    const dispatch = useDispatch();
    let allData = useSelector((state) => state.lookData);
    const styles = style(allData.settings.theme)

    let onClickChangeTheme = color => {
        dispatch(ReducerAction.saveSettings(color))
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>Settings</Text>
            <ScrollView>
                <View style={styles.container}>
                    <Title></Title>
                    <View style={{ borderRadius: 15, overflow: "hidden", marginTop: 5, marginBottom: 5 }}>
                        {colorAvailable.map(x => <ListItem onPress={_ => onClickChangeTheme(x)} key={x} bottomDivider>
                            <Icon name={"tag"} color={colorPrimaryFn(x).primary} />
                            <ListItem.Content>
                                <ListItem.Title>{x.charAt(0).toUpperCase() + x.slice(1)}</ListItem.Title>
                                <ListItem.Subtitle style={{ color: colorSecondaryFn(x).primary }}>SecondaryColor</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>)}


                    </View>
                </View>
            </ScrollView>
            <FAB style={styles.fabGoBack} small icon={"arrow-left"} onPress={() => props.navigation.goBack()} />
        </View>

    )
}








