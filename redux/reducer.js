import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    sendEmailVerification,
    signOut

} from "firebase/auth";

import { push, ref, onValue, query, orderByChild, equalTo, child, get, set } from 'firebase/database';
import * as utility from "../helper"

import { auth, database } from '../firebase/config'

export const authRegister = createAsyncThunk(
    'auth/register', async (obj, { dispatch, getState }) => {
        let user = obj;
        const res = await createUserWithEmailAndPassword(auth, user.mail, user.password)

        await updateProfile(res.user, {
            displayName: user.name
        })
        console.log(res.user);
        await sendEmailVerification(res.user)
        dispatch(addNewUser({
            uid: res.user.uid,
            name: user.name,
            mail: user.mail
        }))
    }
)

export const checkLogin = createAsyncThunk(
    'auth/logged', async (obj, { dispatch, getState }) => {
        if (getState().lookData.isLog == false) {
            const res = onAuthStateChanged(auth, async user => {
                if (user && user.emailVerified) {
                    console.log("USER EXIST");
                    dispatch(fn.login({
                        id: user.uid,
                        name: user.displayName,
                        mail: user.email
                    }));
                }
                else {
                    //console.log("ERROR");
                }
            })
        }
    }
)

export const authLogin = createAsyncThunk(
    'auth/login', async (obj, { dispatch, getState }) => {
        let user = obj;
        const res = await signInWithEmailAndPassword(auth, user.mail, user.password)
        if (!res.user.emailVerified) {
            return false;
        }
        else {
            dispatch(fn.login({
                id: res.user.uid,
                name: res.user.displayName,
                mail: res.user.email
            }));

            return res.user.displayName;
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout', async (obj, { dispatch, getState }) => {
        await signOut(auth)
        dispatch(fn.logout());
    }
)

export const loadDatabase = createAsyncThunk(
    'loadData', async (obj, { dispatch, getState }) => {
        let myState = getState().lookData; //read only

        let dataBrands = query(ref(database, "brands"))
        onValue(dataBrands, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                dispatch(fn.updateBrands([]));
            }
            else {
                dispatch(fn.updateBrands(Object.entries(data)));
            }
        })


        let dataCategory = query(ref(database, "categories"))
        onValue(dataCategory, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                dispatch(fn.updateCategory([]));
            }
            else {
                dispatch(fn.updateCategory(Object.entries(data)));
            }
        })


    }
)

export const getMyLooks = createAsyncThunk(
    'myLook', async (obj, { dispatch, getState }) => {

        let myState = getState().lookData; //read only


        let dataR = query(ref(database, "looks"), orderByChild("uid"), equalTo(myState.user.id))
        onValue(dataR, async (snapshot) => {
            const data = snapshot.val();

            if (data == null) {
                dispatch(fn.updateMyLooks([]));
            }
            else {
                let dataReturn = [];
                for (let iterator of Object.entries(data)) {

                    let name = await (await dispatch(getUser(iterator[1].uid))).payload
                    let item = JSON.parse(JSON.stringify(iterator))
                    item[1].name = name
                    dataReturn.push(item[1]);
                }
                dispatch(fn.updateMyLooks(dataReturn));
            }
        })

        //https://firebase.google.com/docs/reference/node/firebase.database.Query
    }
)

export const loadFav = createAsyncThunk(
    'loadFav', async (obj, { dispatch, getState }) => {
        let uid = getState().lookData.user.id


        let dataR = query(ref(database, "users/" + uid + "/fav/"))
        onValue(dataR, async (snapshot) => {
            const data = snapshot.val();
            let finalData = []
            if (data != null) {
                for (let iterator of Object.entries(data)) {
                    let item = JSON.parse(JSON.stringify(iterator))
                    if (item[0] != "length") {
                        finalData.push(item[1])
                    }
                }
            }
            dispatch(fn.initFav(finalData));
        })
        //https://firebase.google.com/docs/reference/node/firebase.database.Query
    }
)
export const getAllLooks = createAsyncThunk(
    'alllooks', async (obj, { dispatch, getState }) => {
        let dataR = query(ref(database, "looks"))
        onValue(dataR, async (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                dispatch(fn.updateAllLooks([]));
            }
            else {
                let dataReturn = [];
                for (let iterator of Object.entries(data)) {

                    let name = await (await dispatch(getUser(iterator[1].uid))).payload
                    //   console.log(name);
                    let item = JSON.parse(JSON.stringify(iterator))
                    item[1].name = name
                    // console.log(item);
                    dataReturn.push(item[1]);
                }
                // console.log(dataReturn);
                dispatch(fn.updateAllLooks(dataReturn));
            }
        })

        //https://firebase.google.com/docs/reference/node/firebase.database.Query
    }
)

export const getUser = createAsyncThunk(
    'myLook', async (obj, { dispatch, getState }) => {

        let dataR = await get(query(ref(database, "users/" + obj)))
        let k = JSON.parse(JSON.stringify(dataR));
        return k.name

    }
)

export const loadSettings = createAsyncThunk(
    'loadSettings', async (obj, { dispatch, getState }) => {
        const value = await AsyncStorage.getItem("theme");
        if (value != null) {
            dispatch(fn.changeTheme(value));
        }
    }
)
export const loadWishlist = createAsyncThunk(
    'loadWishlist', async (obj, { dispatch, getState }) => {

        let uid = getState().lookData.user.id


        let dataR = query(ref(database, "users/" + uid + "/wish/"))
        onValue(dataR, async (snapshot) => {
            const data = snapshot.val();
            let finalData = []
            if (data != null) {
                for (let iterator of Object.entries(data)) {
                    let item = JSON.parse(JSON.stringify(iterator))
                    if (item[0] != "length") {
                        finalData.push(item[1])
                    }
                }
            }
            dispatch(fn.initWish(finalData));
        })
        //https://firebase.google.com/docs/reference/node/firebase.database.Query


    }
)

export const saveSettings = createAsyncThunk(
    'saveSettings', async (obj, { dispatch, getState }) => {
        AsyncStorage.setItem("theme", obj);
        dispatch(fn.changeTheme(obj));
    }
)

export const addNewLookA = createAsyncThunk(
    'addNewLookA', async (obj, { dispatch, getState }) => {

        let data = { ...obj, uid: getState().lookData.user.id, date: new Date().toISOString().substring(0, 10), id: utility.generateUid() }
        console.log(data);
        push(ref(database, 'looks/'), data);
    }
)
export const addNewUser = createAsyncThunk(
    'addNewUser', async (obj, { dispatch, getState }) => {
        let data = obj;
        console.log("addddd");
        set(ref(database, "users/" + data.uid), data)
    }
)
export const setFavA = createAsyncThunk(
    'setFavA', async (obj, { dispatch, getState }) => {

        let favArray = [...getState().lookData.favorisLook]

        if (favArray.includes(obj)) { //if exist in the list
            favArray.splice(favArray.indexOf(obj), 1); //remove 
        }
        else {
            favArray.push(obj); //else add check

        }
        set(ref(database, "users/" + getState().lookData.user.id + "/fav"), favArray)

    }
)

export const updateWish = createAsyncThunk(
    'updateWish', async (obj, { dispatch, getState }) => {
        let wishList = [...getState().lookData.wish]

        if (wishList.includes(obj)) { //if exist in the list
            wishList.splice(wishList.indexOf(obj), 1); //remove 
        }
        else {
            wishList.push(obj); //else add check
        }
        set(ref(database, "users/" + getState().lookData.user.id + "/wish"), wishList)
    }
)

const favorisSlice = createSlice({
    name: 'admirApp',
    initialState: {
        isLog: false,
        settings: {
            theme: "purple"
        },
        user: {
            id: -1,
            name: "",
            mail: "",
            settings: ""
        },
        allLook: [],
        categories: [],
        brands: [],
        myLooks: [],
        favorisLook: [],
        wish: [],
    },
    reducers: {
        changeTheme: (state, action) => {
            state.settings.theme = action.payload
        },
        login: (state, action) => {
            state.isLog = true
            state.user = action.payload
        },
        logout: (state, action) => {
            console.log("LOGOOUT");
            state.isLog = false
            state.user = {
                id: -1,
                name: "",
                mail: "",
                settings: ""
            }
        },
        updateMyLooks: (state, action) => {
            state.myLooks = action.payload
        },
        updateAllLooks: (state, action) => {
            state.allLook = action.payload
        },
        updateBrands: (state, action) => {
            console.log("Brands Updated");
            let bran = [];
            for (const item of action.payload) {
                bran.push(item[1])
            }
            state.brands = bran
        },
        updateCategory: (state, action) => {
            console.log("Category Updated");
            let cat = [];
            for (const item of action.payload) {
                cat.push(item[1])
            }
            state.categories = cat
        },
        initFav: (state, action) => {
            state.favorisLook = action.payload
        },
        initWish: (state, action) => {
            state.wish = action.payload
        },
        initDatabase: (state, action) => {
            let categories = [{
                id: '1',
                name: 'Casual'
            }, {
                id: '2',
                name: 'StreetWear'
            }, {
                id: '3',
                name: 'SportWear'
            }, {
                id: '4',
                name: 'Chill'
            }
            ];

            for (const item of categories) {
                push(ref(database, 'categories/'), item);
            }

            const brands = [{
                id: 0,
                name: "Not Refered"
            }, {
                id: 1,
                name: "Nike"
            }, {
                id: 2,
                name: "Adidas"
            }, {
                id: 3,
                name: "Zara"
            }, {
                id: 4,
                name: "Lacoste"
            }, {
                id: 5,
                name: "Puma"
            }]

            for (const item of brands) {
                push(ref(database, 'brands/'), item);
            }


        },


    }
})


export const fn = favorisSlice.actions;
export default favorisSlice.reducer;