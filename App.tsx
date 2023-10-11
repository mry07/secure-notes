import 'react-native-get-random-values'
import App from "./src/app";
import React from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Context from "./src/context";

library.add(fas, far, fab);

export default () => {
  return (
    <SafeAreaProvider>
      <Context>
        <App />
      </Context>
    </SafeAreaProvider>
  );
};
