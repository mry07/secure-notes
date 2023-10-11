import React from "react";
import { GeneralContext } from "../../context/general";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** ********************************************************************** */

// SCREEN

import Auth from "../screen/auth";

import Notes from "../screen/notes";

import ManageNote from "../screen/manage-note";

/** ********************************************************************** */

// NAVIGATOR

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { hasLogged } = React.useContext(GeneralContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {hasLogged ? (
          <>
            <Stack.Screen name="Notes" component={Notes} />
            <Stack.Screen name="ManageNote" component={ManageNote} />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ animationTypeForReplace: "pop" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
