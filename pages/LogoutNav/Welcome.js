import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

import style, { windowHeight } from '../../styles';
import { Button } from 'react-native-elements';

//Redux
import { useSelector } from 'react-redux';

export default function Welcome(props) {
  let allData = useSelector((state) => state.lookData);
  const styles = style(allData.settings.theme)

  return <View>
    <Text style={styles.title}>AdmirApp</Text>
    <View>
      <ImageBackground style={{
        height: windowHeight - 150,
        paddingTop: 30,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
      }} source={{ uri: 'https://i.pinimg.com/564x/9b/50/14/9b50146a997ccd2efdcc2b7072d97a00.jpg', }}>
        <Button onPress={_ => props.navigation.navigate("Login")} buttonStyle={styles.btnMain} title={"Login"} />
        <Button onPress={_ => props.navigation.navigate("CreateAccount")} buttonStyle={styles.btnMain} title={"Create Account"} />
      </ImageBackground >
    </View>
  </View>
}