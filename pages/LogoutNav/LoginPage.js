import React from 'react';
import { View, Text, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';

//CSS
import style from '../../styles';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as ReducerAction from '../../redux/reducer';

export default function LoginPage(props) {

    const dispatch = useDispatch();
    let allData = useSelector((state) => state.lookData);
    const styles = style(allData.settings.theme)

    const [formData, setFormData] = React.useState({
        mail: "anthony.chevrolet.1217@gmail.com",
        password: "123456",
    })

    
    let onClickLogin = async () => {
        if (formData.mail != "" && formData.password != "") {
            //Process to login
            let res = await dispatch(ReducerAction.authLogin(formData));
            if (!res.payload) {
                Alert.alert("Error", "an error was encountered during the authentification")
            }
            else {
                // Alert.alert("Welcome", res.payload);
            }
        }
        else {
            Alert.alert("Error", "A field is empty")
        }
    }

    return (
        <View style={{ ...styles.container, marginHorizontal: 0, justifyContent: "flex-start" }}>
            <Text style={styles.title}>Connection</Text>
            <View>
                <Input value={formData.mail} onChangeText={e => setFormData({ ...formData, mail: e })} placeholder='E-mail' />
                <Input value={formData.password} onChangeText={e => setFormData({ ...formData, password: e })} secureTextEntry={true} placeholder='Password' />
                <Button onPress={_ => onClickLogin()} buttonStyle={styles.btnMain} title={"Log in"} />
            </View>
            <FAB style={styles.fabGoBack} small icon={"arrow-left"} onPress={() => props.navigation.goBack()} />
        </View>
    )
}