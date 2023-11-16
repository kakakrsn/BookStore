/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router";
import FlashMessage from "react-native-flash-message";

const App = () => {
  return(
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" floating={true} animated={true} duration={2000} /> 
    </>
  )
}

export default App