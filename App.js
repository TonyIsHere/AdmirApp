import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Navigation
import LogoutNav from './pages/LogoutNav';
import LoginNav from './pages/LoginNav';

//Redux
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import myStore from './redux/store';
import * as ReducerAction from './redux/reducer';


import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
LogBox.ignoreLogs(['AsyncStorage has been extracted']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

LogBox.ignoreLogs(['@firebase/database']);
console.warn = message => {
  if (message.indexOf('@firebase/database') <= -1) {
    _console.warn(message);
  }
};

//Link for strcture
//https://learn.habilelabs.io/best-folder-structure-for-react-native-project-a46405bdba7
//https://cheesecakelabs.com/blog/atomic-design-react/
//https://github.com/danilowoz/react-atomic-design

function ContentApp() {

  let allData = useSelector((state) => state.lookData);
  let nav;

  const dispatch = useDispatch();
  
  useEffect(async () => {
    console.log("Loading2");
    if (!allData.isLog) {
      console.log("not logged");
    }
    else {
      console.log("logged");

      dispatch(ReducerAction.loadDatabase());

      dispatch(ReducerAction.getAllLooks());

      dispatch(ReducerAction.getMyLooks());

      dispatch(ReducerAction.loadFav());
      dispatch(ReducerAction.loadWishlist());
    }

  }, [allData.isLog]);


  useEffect(async () => {
    console.log("Loading");
    if (!allData.isLog) {
      dispatch(ReducerAction.checkLogin())
      dispatch(ReducerAction.loadSettings());
    }
  }, []);
  
  if (allData.isLog) {
    nav = <LoginNav />
  }
  else {
    nav = <LogoutNav />
  }

  return (<NavigationContainer>
    {nav}
  </NavigationContainer>)
}

export default function App() {

  return (
    <ReduxProvider store={myStore}>
      <ContentApp />
    </ReduxProvider>
  );
}