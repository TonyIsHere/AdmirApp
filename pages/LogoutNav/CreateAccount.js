import React from 'react';
import { View, Text, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';

//CSS
import style from '../../styles';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as ReducerAction from '../../redux/reducer';



export default function CreateAccount(props) {

    const dispatch = useDispatch();
    let allData = useSelector((state) => state.lookData);
    const styles = style(allData.settings.theme)

    const [formData, setFormData] = React.useState({
        name: "Anth01217",
        mail: "anthony.chevrolet.1217@gmail.com",
        password: "123456",
        confirm: "123456"
    })

    let onClickCreateAccount = async () => {
        if (formData.name != "" && formData.mail != "" && formData.password != "" && formData.confirm != "") {
            if (formData.password == formData.confirm) {
                Alert.alert("Success", "you will receive a mail to confirm your account")
                dispatch(ReducerAction.authRegister(formData));
                props.navigation.navigate("Login")
            }
            else {
                Alert.alert("Error", "Password doesn't match")
            }
        }
        else {
            Alert.alert("Error", "A field is empty")
        }
    }
    
    return (
        <View style={{ ...styles.container, marginHorizontal: 0, justifyContent: "flex-start" }}>
            <Text style={styles.title}>New AdmirAccount</Text>
            <View>
                <Input value={formData.name} onChangeText={e => setFormData({ ...formData, name: e })} placeholder='Username' />
                <Input value={formData.mail} onChangeText={e => setFormData({ ...formData, mail: e })} placeholder='E-mail' />
                <Input value={formData.password} onChangeText={e => setFormData({ ...formData, password: e })} secureTextEntry={true} placeholder='Password' />
                <Input value={formData.confirm} onChangeText={e => setFormData({ ...formData, confirm: e })} secureTextEntry={true} placeholder='Confirmation' />
                <Button onPress={_ => onClickCreateAccount()} buttonStyle={styles.btnMain} title={"Create Account"} />
            </View>
            <FAB style={styles.fabGoBack} small icon={"arrow-left"} onPress={() => props.navigation.goBack()} />
        </View>
    )
}