import React from 'react';
import { View, ScrollView, Text, ActivityIndicator, Dimensions, Image } from 'react-native';
import { FAB, Chip, Title } from 'react-native-paper';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

//CSS
import style, { stylesList, colorPrimaryFn,windowWidth,windowHeight } from '../styles';

//Redux
import { useSelector, useDispatch } from 'react-redux';

import * as ReducerAction from '../redux/reducer';

export default function DetailLook(props) {

    let allData = useSelector((state) => state.lookData);
    const dispatch = useDispatch()
    let userinfo = allData.user
    let allCat = allData.categories;

    const styles = style(allData.settings.theme);
    const colorPrimary = colorPrimaryFn(allData.settings.theme);

    const fakedata = {
        tag: ["nike", "manteau", "khaki"],
        date: "2022-04-02",
        category: [{
            id: '1',
            name: 'Casual'
        }, {
            id: '2',
            name: 'StreetWear'
        }],
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
    };

    let btnFav = <FAB
        style={styles.fab}
        onPress={_ => dispatch(ReducerAction.setFavA(props.route.params.id))}
        icon={allData.favorisLook.includes(props.route.params.id) ? "heart" : "heart-outline"}
    />

    let data = fakedata;
    
    if (props.route.params) {
        let detail = props.route.params
        data = {
            tag: detail.tag,
            date: detail.date,
            category: detail.category,
            article: detail.article,
            look: detail.look,
            name: detail.name
        };

        if (data.name == userinfo.name) //User show his look
        {
            btnFav = undefined
        }
    }


    function renderImageCarousel({ item, index }) {

        return (
            <View style={{
                backgroundColor: 'floralwhite',
                height: windowHeight * 0.5,
                justifyContent: "center"
            }}>
                <Image
                    source={{ uri: item }}
                    style={{ flex: 1 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>

        )
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>DetailLook</Text>
                <ScrollView>
                    <View style={styles.container}>
                        <Carousel
                            layout={"default"}
                            data={data.look}
                            sliderWidth={windowWidth - 40}
                            itemWidth={windowWidth * 0.8}
                            renderItem={renderImageCarousel}
                        />
                        <Text style={{ textAlign: "right" }}>@{data.name} - {new Date(data.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                        <Title>Categories</Title>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", marginBottom: 20 }}>
                            {data.category.map(x => <Chip key={x} style={{ backgroundColor: colorPrimary.primary, margin: 2 }} textStyle={{ color: "white", fontWeight: "bold" }} >{allCat.find(y => y.id == x).name}</Chip>)}
                        </View>
                        <Title>Reference</Title>

                        {data.article.map(x => <ListItem onPress={_ => props.navigation.navigate("DetailProduct",x)} key={x.name} style={stylesList.container}>
                            <Avatar style={stylesList.avatar} source={{ uri: x.pic }} />
                            <ListItem.Content>
                                <ListItem.Title>{x.name}</ListItem.Title>
                                <View style={stylesList.subtitleView}>
                                    <Text style={stylesList.urlText}>{x.link}</Text>
                                </View>
                            </ListItem.Content>
                        </ListItem>)}

                        <Title>  <Icon name={"tag"} />Tags</Title>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                            {data.tag.map(x => <Chip key={x} style={{ backgroundColor: colorPrimary.primary, padding: 0, margin: 0 }} textStyle={{ color: "white", fontWeight: "bold", fontSize: 10 }}>{x}</Chip>)}
                        </View>
                    </View>
                </ScrollView>
            </View>
            {btnFav}
            <FAB style={styles.fabGoBack} small icon={"arrow-left"} onPress={() => props.navigation.goBack()} />
        </>
    )
}