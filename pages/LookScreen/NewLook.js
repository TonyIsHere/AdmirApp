import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Text, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { ListItem, Avatar, Image, Button, Icon, Input } from 'react-native-elements';
import Tags from "react-native-tags";
import { FAB, Chip } from 'react-native-paper';
import RNUrlPreview from 'react-native-url-preview';

//CSS
import style, { stylesList, colorPrimaryFn, colorSecondaryFn } from '../../styles';

//Redux
import * as ReducerAction from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

import Carousel from 'react-native-snap-carousel';

import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import ComboBox from "../../components/ComboBox";

export default function NewLook(props) {
    let allData = useSelector((state) => state.lookData);
    const categories = allData.categories
    const brands = allData.brands

    const colorPrimary = colorPrimaryFn(allData.settings.theme);
    const colorSecondary = colorSecondaryFn(allData.settings.theme)
    const styles = style(allData.settings.theme)
    let fakeData = false;

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
    const comboBoxCategory = useRef(null); //Combobox category ref 

    const [showInput, setShowInput] = useState(false); //Input new Category state

    let inputCatView = showInput ? <View>
        <Text>New Category</Text>
        <Input placeholder="New Category name" />
    </View> : null;


    let fakeTags = ["nike", "coat", "khaki"]
    let catagoryFakeSelected = ["1", "3"]

    const [data, setData] = useState({
        tag: (fakeData) ? fakeTags : [],
        category: (fakeData) ? catagoryFakeSelected : [],
        article: [],
        look: []
    });


    useEffect(() => {
        if (fakeData) {
            setData({
                ...data,
                article: [{
                    name: "JJEMOULDER COAT - Manteau classique - khaki",
                    pic: "https://img01.ztat.net/article/spp-media-p1/6e81c667c70f3155b0851ea7f7ce6d1b/c82119333c6242c18428763270c25a17.jpg?imwidth=200&filter=packshot",
                    link: "https://www.google.com/"
                }, {
                    name: "OVERDYE FLOW HOODIECORE COLOURS - Sweatshirt - khaki",
                    pic: "https://img01.ztat.net/article/spp-media-p1/455583ebedec4ef9a207fc31551a7d00/dbc5232f6b4e498da1e8ff869e58d609.jpg?imwidth=200&filter=packshot",
                    link: "https://www.google.com/"
                }, {
                    name: "DAD FIT - Jeans fuselé - blue",
                    pic: "https://img01.ztat.net/article/spp-media-p1/ac804ad6880539fea62743addfc0402d/edff82e884a0437a8842bb9966f9cf63.jpg?imwidth=200&filter=packshot",
                    link: "https://www.google.com/"
                }, {
                    name: "AIR FORCE 1 '07 - Baskets basses - white/black",
                    pic: "https://img01.ztat.net/article/spp-media-p1/cd9af3bae33d30d9868195b7c5366ce6/a3909902ece64ec79724da3587d78590.jpg?imwidth=200&filter=packshot",
                    link: "https://www.google.com/"
                }, {
                    name: "Casquette - dark driftwood/white",
                    pic: "https://img01.ztat.net/article/spp-media-p1/5ed85f522b1c4c62911b51db893a8693/ec137faa43ec4917a74a2ff9ad0a6e73.jpg?imwidth=200&filter=packshot",
                    link: "https://www.google.com/"
                }],
                look: ["https://img01.ztat.net/outfit/9572562317c7457a92e2ba6250839496/e6af0dade39b42cf97078b04c3e01d32.jpg?imwidth=1800", "https://img01.ztat.net/outfit/dcb940d17d1345908ae01566ac0fa625/ae4a95714d3349cea10ff3415c00dee8.jpg?imwidth=1800"]
            }
            );
            comboBoxCategory.current.defineSeletected(data.category)
        }
    }, []);

    let lookCarousel = [...data.look, "Add"];

    /**
     * Render image from carousel
     * @param {object} item link or base64Data of picture  
     * @returns 
     */
    function renderImageCarousel({ item, index }) {
        let content;
        if (item != "Add") {
            content = <Image
                source={{ uri: item }}
                containerStyle={{ flex: 1 }}
                PlaceholderContent={<ActivityIndicator />}
            />
        }
        else {

            content = <TouchableOpacity onPress={pickImage}><Icon type='font-awesome' name="plus" size={40} />
                <Text style={{ textAlign: "center", marginTop: 40 }}>ADD PICTURE</Text>
            </TouchableOpacity>
        }
        return (
            <View style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: 250,
                marginLeft: 25,
                marginRight: 25,
                justifyContent: "center"
            }}>
                {content}
            </View>

        )
    }

    /**
     * Function to open/close overlay
     */
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    /**
     * onClickBtnCreateNewRef 
     */
    const onClickCreateNewRef = _ => {
        setData({ ...data, article: [...data.article, inputRef] })
        setInputRef({
            name: "",
            pic: "",
            link: ""
        })
        toggleOverlay();
    }

    /**
     * Function to open library
     */
    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [2, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let imageUri = result.uri;
            const base64String = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
            console.log("ee");
            setData({ ...data, look: [...data.look, 'data:image/png;base64,' + base64String] })
        }
    };

    function onClickCreateLook() {


        //  console.log(data);
        if (data.article.length > 0 && data.category.length > 0 && data.look.length > 0 && data.tag.length > 0) {
            dispatch(ReducerAction.addNewLookA(data));
            props.navigation.navigate("AllLock")
        }
        else {
            Alert.alert("Warning", "a field is empty")
        }
    }

    //Use Effect

    /**
     * Ask User to access to library
     */
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

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
                <Text style={styles.title}>New Look</Text>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Carousel
                                    layout={"default"}
                                    data={lookCarousel}
                                    sliderWidth={1000}
                                    itemWidth={200}
                                    renderItem={renderImageCarousel}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <ComboBox ref={comboBoxCategory} data={categories} callBackOnChange={_ => {
                                    let selected = comboBoxCategory.current.getSelectedItems()
                                    console.log(selected);
                                    setData({ ...data, category: selected })
                                }} />
                                <Text>Reference</Text>
                                {data.article.map(x => <ListItem.Swipeable key={x.name} style={stylesList.container}
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
                                                    {
                                                        text: "OK", onPress: () => {

                                                            let article = data.article;
                                                            if (article.includes(x)) { //if exist in the list
                                                                article.splice(article.indexOf(x), 1); //remove 
                                                            }

                                                            setData({ ...data, article: article })
                                                        }
                                                    },
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
                                </ListItem.Swipeable>)}
                                <Button
                                    title="Add more..."
                                    onPress={toggleOverlay}
                                    buttonStyle={{
                                        backgroundColor: colorSecondary.primary,
                                        width: 150,
                                        alignSelf: "center"
                                    }}

                                />

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
                                            }}>New Reference</Text>
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
                                                                    //console.log(brand.name.toLowerCase() + " = " + word.toLowerCase() + "  result : " + result);
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
                                                title="Add new Reference"
                                                onPress={onClickCreateNewRef}
                                                buttonStyle={{
                                                    backgroundColor: colorSecondary.primary
                                                }}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <Text>Tags</Text>

                            <Tags
                                initialText=""
                                onChangeTags={e => setData({ ...data, tag: e })}
                                initialTags={data.tag}
                                textInputProps={{
                                    placeholder: "type a tag..."
                                }}
                                containerStyle={{ justifyContent: "center", flex: 1 }}
                                deleteTagOnPress
                                inputContainerStyle={{ height: 50, backgroundColor: "white" }}

                                renderTag={({ tag, index, onPress }) => (
                                    <View key={index}>
                                        <Chip icon={"tag"} style={{ backgroundColor: colorPrimary.primary, margin: 3, }} textStyle={{ color: "white", fontWeight: "bold" }} key={index} onPress={onPress}>{tag}</Chip>
                                    </View>

                                )}
                            />
                            <Button
                                title="Validate"
                                onPress={_ => onClickCreateLook()}
                                buttonStyle={{
                                    backgroundColor: colorPrimary.dark,
                                    marginTop: 20
                                }}

                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            <FAB style={styles.fabGoBack} small icon={"arrow-left"} onPress={() => props.navigation.goBack()} />
        </>
    )
}