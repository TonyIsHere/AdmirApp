import React from 'react';


//CSS
import style, { colorPrimaryFn } from '../../styles';

import { View, ScrollView, Text } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements'
import { Title } from 'react-native-paper';

//Redux
import * as ReducerAction from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function MyAccount(props) {

    const dispatch = useDispatch();
    let allData = useSelector((state) => state.lookData);
    const styles = style(allData.settings.theme)
    const colorPrimary = colorPrimaryFn(allData.settings.theme)


    let onClickLogout = _ => {
        dispatch(ReducerAction.logout())
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>AdmirAccount</Text>
            <ScrollView>
                <View style={styles.container}>
                    <Title>Personnal information</Title>
                    <View style={{ borderRadius: 15, overflow: "hidden", marginTop: 5, marginBottom: 5 }}>
                        <ListItem bottomDivider>
                            <Icon name={"mail"} />
                            <ListItem.Content>
                                <ListItem.Title>Mail</ListItem.Title>
                                <ListItem.Subtitle>{allData.user.mail}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <Icon name={"user"} type={"font-awesome"} />
                            <ListItem.Content>
                                <ListItem.Title>{allData.user.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </View>
                    <Title>Customize</Title>
                    <View style={{ borderRadius: 15, overflow: "hidden", marginTop: 5, marginBottom: 5 }}>
                        <ListItem bottomDivider onPress={_ => props.navigation.navigate("Settings")} >
                            <Icon name={"tag"} color={colorPrimary.primary} />
                            <ListItem.Content>
                                <ListItem.Title>Change Theme</ListItem.Title>
                                <ListItem.Subtitle>{allData.settings.theme}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </View>
                    <Button onPress={_ => onClickLogout()} buttonStyle={{ backgroundColor: "red", borderRadius: 10, marginTop: 10 }} title={"Logout"}></Button>
                </View>
            </ScrollView>
        </View>
    )
}








