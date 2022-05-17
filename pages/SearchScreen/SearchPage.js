import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';

//CSS
import style, { colorPrimaryFn } from '../../styles';

import ItemCard from '../../components/ItemCard';

//Redux
import { useDispatch, useSelector } from 'react-redux';

export default function SearchPage(props) {
    const dispatch = useDispatch();
    let allData = useSelector((state) => state.lookData);

    const styles = style(allData.settings.theme);
    const colorPrimary = colorPrimaryFn(allData.settings.theme);

    let userData = allData.user;
    const categories = allData.categories

    const [searchInput, setSearchInput] = useState("");
    const [filterUsed, setFilterUsed] = useState([]);
    const [filterTag, setFilterTag] = useState([]);

    const [filterLook, setFilterLook] = useState([]);

    useEffect(() => {
        (async () => {
            filterSearch();
        })();
    }, [filterUsed, filterTag, allData.allLook]);

    //onCheck  categories
    function changeCategories(id) {
        let tempFilt = filterUsed;
        if (tempFilt.includes(id)) { //if exist in the list
            tempFilt.splice(tempFilt.indexOf(id), 1); //remove 
        }
        else {
            tempFilt.push(id); //else add check
        }
        setFilterUsed([...tempFilt])
    }

    //Check onKeyPress to create a new tag if # is found
    function checkSearch(text) {
        if (text[0] == "#" && text[text.length - 1] == " ") {
            //Créer un tag
            let tag = text.substring(1).trim();
            setFilterTag([...filterTag, tag])
            setSearchInput("")
        }
        else {
            setSearchInput(text)
        }
    }

    //Remove a tag
    function onClickTag(index) {
        let tags = filterTag;
        if (index > -1) {
            tags.splice(index, 1);
        }
        setFilterTag([...tags])
    }

    //Update filter
    function filterSearch() {
        console.log("filter");
        let result = allData.allLook
        for (var item of filterTag) {
            result = result.filter(x => x.tag.includes(item));
        }

        for (var item2 of filterUsed) {
            result = result.filter(x => x.category.includes((item2)))
        }
        setFilterLook(result)
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>AdmirApp</Text>
                <ScrollView>
                    <View style={styles.container}>
                        <Searchbar placeholder="Search" onChangeText={checkSearch} value={searchInput} style={{ marginBottom: 10 }} />
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "flex-start"
                        }}>
                            {filterTag.map((x, index) => <Chip key={x} onPress={_ => onClickTag(index)} icon="tag" style={{ backgroundColor: colorPrimary.primary }}><Text style={{ color: "white", fontWeight: 'bold' }}>{x}</Text></Chip>)}
                        </View>

                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                            {categories.map((x) =>
                                <CheckBox key={x.id}
                                    title={x.id + "-" + x.name}
                                    checked={filterUsed.includes(x.id) ? true : false}
                                    onPress={() => {
                                        changeCategories(x.id)
                                    }}
                                />
                            )}
                        </View>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {filterLook.map((x, index) => {
                                return <ItemCard key={index} nav={props.navigation} data={x} {...(x.uid == userData.id ? { displayFavBtn: false } : null)} />
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}