import React, { Component } from "react";
import {View} from 'react-native'
import { SafeAreaView } from "react-navigation";
import { Provider } from "react-redux";
import AppContainer from "./src/navigation/AppNavigation";
import configureStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {setNavigator } from './src/redux/services/Navigator'
import FlashMessage from "react-native-flash-message";
export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={configureStore().store}>
          <PersistGate loading={null} persistor={configureStore().persistor}>
            <AppContainer ref={nav => {setNavigator(nav);}}/>
          </PersistGate>
        </Provider>
        <FlashMessage position="top" animated={true} />
      </View>
    );
  }
}
