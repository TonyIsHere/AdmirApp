import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Text,Alert } from 'react-native';
import { FAB, Title } from 'react-native-paper';
import { Icon, Input,Button,ListItem, Avatar } from 'react-native-elements';
import Modal from "react-native-modal";

//CSS
import style, { stylesList, colorSecondaryFn } from '../../styles';


import { useDispatch, useSelector } from 'react-redux';
import * as ReducerAction from '../../redux/reducer';

import RNUrlPreview from 'react-native-url-preview';
import ComboBox from "../../components/ComboBox";

export default function Wishlist(props) {
    let allData = useSelector((state) => state.lookData);
    let wishList = allData.wish
    const brands = allData.brands

    const colorSecondary = colorSecondaryFn(allData.settings.theme)
    const styles = style(allData.settings.theme)

    const dispatch = useDispatch();

    const [time, setTime] = useState(undefined); //Timeout state
    const [previewLink, setPreviewLink] = useState(""); //RNUrlPreview state
    const urlData = useRef(null); //RNUrlPreview ref
    const [visible, setVisible] = useState(false); //Modal state

    const [inputRef, setInputRef] = useState({
        name: "",
        pic: "",
        link: ""
    });//Input addNewRef

    const comboBoxBrands = useRef(null); //Combobox brands ref from add new Ref 
    const [showInput, setShowInput] = useState(false); //Input new Category state



    let inputCatView = showInput ? <View>
        <Text>New Category</Text>
        <Input placeholder="New Category name" />
    </View> : null;

    /**
     * Function to open/close overlay
     */
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    /**
     * onClickBtnCreateNewWish 
     */
    const onClickCreateNewWish = _ => {
        dispatch(ReducerAction.updateWish(inputRef))
        setInputRef({
            name: "",
            pic: "",
            link: ""
        })
        toggleOverlay();
    }

    /**
    * Change URLPreview after 1 sec when input link is updatated 
    */
    useEffect(() => {
        if (time != undefined) {
            clearTimeout(time);
        }
        setTime(setTimeout(() => {
            setPreviewLink(inputRef.link)
        }, 1000))
    }, [inputRef.link]);


    return (
        <>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>WishList</Text>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {wishList.map(x =>
                                <ListItem.Swipeable onPress={_ => props.navigation.navigate("DetailProduct",x)} key={x.name} style={stylesList.container}
                                    rightContent={
                                        <Button
                                            title="Delete"
                                            icon={{ name: 'delete', color: 'white' }}
                                            onPress={_ => {
                                                Alert.alert("Delete", "Are you sure to delete this item ?", [
                                                    {
                                                        text: "Cancel",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    { text: "OK", onPress: () => dispatch(ReducerAction.updateWish(x)) },
                                                ])
                                            }}
                                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                        />
                                    }
                                >
                                    <Avatar style={stylesList.avatar} source={{ uri: x.pic }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{x.name}</ListItem.Title>
                                        <View style={stylesList.subtitleView}>
                                            <Text style={stylesList.urlText}>{x.link}</Text>
                                        </View>
                                    </ListItem.Content>
                                </ListItem.Swipeable>
                            )}
                        </View>
                        {wishList.length == 0 ? <Title style={{ textAlign: "center" }}>Your wish is empty</Title> : undefined}
                    </View>
                </ScrollView>
                <Modal avoidKeyboard isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: 5,
                            padding: 10,
                        }}>
                            <Text style={{
                                marginVertical: 20,
                                textAlign: 'center',
                                fontSize: 20,
                            }}>I want {inputRef.name} soon :D</Text>
                            <View style={{ width: 300 }}>
                                <Input
                                    onChangeText={e => setInputRef({ ...inputRef, link: e })}
                                    placeholder='URL of product'
                                    value={inputRef.link}
                                    leftIcon={
                                        <Icon
                                            name='link'
                                            size={24}
                                            color='black'
                                        />
                                    }
                                />
                                <RNUrlPreview ref={urlData}
                                    onLoad={_ => {
                                        setTimeout(() => {
                                            let brandFound;
                                            let descSplit = urlData.current.state.linkTitle.split(" ")
                                            for (let brand of brands) {
                                                for (let word of descSplit) {
                                                    let result = brand.name.toLowerCase() === word.toLowerCase()
                                                    if (result) {
                                                        brandFound = brand;
                                                        break;
                                                    }
                                                }
                                                if (brandFound != undefined) {
                                                    break;
                                                }
                                            }
                                            if (brandFound != undefined) {
                                                comboBoxBrands.current.defineSeletected([brandFound.id])
                                                setShowInput(false)
                                            }
                                            else {
                                                comboBoxBrands.current.defineSeletected([brands[0].id])
                                                setShowInput(true)
                                            }
                                            setInputRef({
                                                ...inputRef,
                                                pic: urlData.current.state.linkImg,
                                                name: urlData.current.state.linkTitle
                                            })


                                        }, 1000);
                                    }}
                                    titleStyle={{
                                        fontFamily: Platform.OS === "ios" ? undefined : "sans-serif",
                                        color: "black",
                                        fontSize: 17
                                    }}
                                    imageStyle={{
                                        width: 80,
                                        height: 120
                                    }}
                                    descriptionStyle={{
                                        fontFamily: Platform.OS === "ios" ? undefined : "sans-serif",
                                        color: "gray",
                                        fontSize: 15,
                                    }}

                                    key={previewLink} text={previewLink} />
                                <Text>Brand</Text>
                                <ComboBox data={brands} ref={comboBoxBrands} single viewSelectedItems={false} callBackOnChange={_ => {
                                    let selected = comboBoxBrands.current.getSelectedItems()
                                    console.log(selected);
                                    if (selected[0] == 0) {
                                        setShowInput(true);
                                    }
                                    else {
                                        setShowInput(false)
                                    }
                                }} />
                                {inputCatView}
                                <Text>Name</Text>
                                <Input onChangeText={e => setInputRef({ ...inputRef, name: e })} value={inputRef.name} placeholder="Name of product" />
                            </View>
                            <Button
                                title="Add on my wishlist"
                                onPress={onClickCreateNewWish}
                                buttonStyle={{
                                    backgroundColor: colorSecondary.primary
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <FAB
                    style={styles.fab}
                    onPress={toggleOverlay}
                    icon={"plus"}
                    label="Add"
                />
            </View>
            <FAB style={styles.fabGoBack} small icon={"arrow-left"} onPress={() => props.navigation.goBack()} />
        </>
    )
}