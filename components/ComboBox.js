import React, { useEffect, useState, useRef } from 'react';
import MultiSelect from 'react-native-multiple-select';
import { View, StyleSheet } from 'react-native';

import { Chip } from 'react-native-paper';

import { useSelector } from 'react-redux';
import { colorPrimaryFn, colorSecondaryFn } from '../styles';

const styles2 = StyleSheet.create({
    inputCombo: {
        height: 50,
        borderRadius: 12,
        backgroundColor: "white",
        padding: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    inputSearchStyle: {
        height: 50,
        borderWidth: 1,
        borderColor: "gray",
        paddingRight: 20
    },
    styleInputDropdown: {
        borderBottomWidth: 0,

    },
    item: {
        height: 50
    },
    listContainer: {
        height: 200
    },
});

let ComboBox;
export default ComboBox = React.forwardRef((props, ref) => {

    let allData = useSelector((state) => state.lookData);
    let colorPrimary = colorPrimaryFn(allData.settings.theme);
    let colorSecondary = colorSecondaryFn(allData.settings.theme)

    let data = props.data;
    const [selectedItems, setSelectedItems] = useState([]);
    const multiSelect = useRef(null);

    let onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems)
    };

    useEffect(() => {
        if (props.callBackOnChange) {
            props.callBackOnChange()
        }
    }, [selectedItems]);


    React.useImperativeHandle(ref, () => ({
        defineSeletected(data) {
            setSelectedItems(data)
        },
        getSelectedItems() {
            return selectedItems;
        },
    }))

    let single = (props.single) ? { single: true } : undefined;

    let view = (props.viewSelectedItems == false) ? undefined : <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start"
    }}>
        {selectedItems.map((x, index) =>
            <Chip key={x}
                icon={"delete"}
                onPress={(e) => {
                    if (index > -1) {
                        let newArray = [...selectedItems];
                        newArray.splice(index, 1);
                        setSelectedItems(newArray);
                    }
                }}
                iconRight
                style={{ marginVertical: 15, backgroundColor: colorPrimary.primary }}
                textStyle={{ color: "white", fontWeight: "bold" }}
            >{data.find(y => y.id == x).name}</Chip>
        )}
    </View>;

    return <><MultiSelect
        hideTags
        styleDropdownMenu={styles2.inputCombo}
        styleDropdownMenuSubsection={styles2.styleInputDropdown}
        styleInputGroup={styles2.inputSearchStyle}
        styleRowList={styles2.item}
        styleListContainer={styles2.listContainer}
        items={data}
        uniqueKey="id"
        ref={multiSelect}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Pick Items"
        searchInputPlaceholderText="Search Category."
        onChangeInput={(text) => console.log(text)}
        selectedItemTextColor={colorSecondary.primary}
        selectedItemIconColor={colorSecondary.primary}
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor={colorSecondary.dark}
        submitButtonText="Filter"
        {...single}
    />
        {view}
    </>
});