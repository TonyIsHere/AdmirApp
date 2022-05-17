import { StyleSheet,Dimensions } from 'react-native';

//Create new theme
//https://material.io/resources/color/#!/?view.left=0&view.right=1
//https://color.adobe.com/create/color-wheel



export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

let other = {
    blue: {
        primary: { primary: '#694eef', light: "#a17cff", dark: "#2622bb" },
        secondary: { primary: '#a899f2', light: "#dbcaff", dark: "#776bbf" }
    },
    lightblue: {
        primary: { primary: '#54bcf0', light: "#8deeff", dark: "#008cbd" },
        secondary: { primary: '#9dd6f2', light: "#d0ffff", dark: "#6ca5bf" }
    },
    lime: {
        primary: { primary: '#86f084', light: "#baffb5", dark: "#52bd55" },
        secondary: { primary: '#cff2ce', light: "#ffffff", dark: "#9ebf9d" }
    },
    yellow: {
        primary: { primary: '#f0d654', light: "#ffff85", dark: "#baa51f" },
        secondary: { primary: '#f2e49d', light: "#ffffcf", dark: "#beb26e" }
    },
    red: {
        primary: { primary: '#f01202', light: "#ff5b36", dark: "#b40000" },
        secondary: { primary: '#f25a64', light: "#ff8d92", dark: "#ba233a" }
    },
    purple: {
        primary: { primary: '#973de0', light: "#cc6fff", dark: "#6300ad" },
        secondary: { primary: '#d7b5e6', light: "#ffe7ff", dark: "#a585b4" }
    }
}

export let colorAvailable = Object.keys(other)


export let colorPrimaryFn = (color = "red") => {
    return other[color].primary
}
export let colorSecondaryFn = (color = "red") => {
    return other[color].secondary
}


const style = (color = "red") => {

    let colorPrimary = other[color].primary
    let colorSecondary = other[color].secondary

    return {
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ecf0f1',
            marginHorizontal: 20
        },
        title: {
            backgroundColor: colorPrimary.primary,
            fontSize: 30,
            color: "white",
            textAlign: 'center',
            paddingBottom: 20,
            paddingTop: 60,
            marginBottom: 20
        },
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: colorSecondary.primary
        },
        fabGoBack: {
            position: 'absolute',
            margin: 16,
            left: 0,
            top: 42,
            backgroundColor: colorPrimary.dark
        },
        btnMain: {
            borderRadius: 10, height: 50, marginBottom: 10, width: "60%", alignSelf: "center", backgroundColor: colorPrimary.primary
        }
    }
};

export const stylesList = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    urlText: {
        color: 'grey'
    },
    avatar: {
        width: 64,
        height: 64
    },
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
});


export default style;