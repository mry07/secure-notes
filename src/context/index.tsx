import { GeneralProvider } from "./general";
import React, { createElement } from "react";

const createContextProvider = (...providers: any[]) => {
  return ({ children }: any): React.JSX.Element => {
    const provider = providers.shift();

    if (providers.length === 0) {
      return createElement(provider, {}, children);
    }

    return createElement(
      provider,
      {},
      createContextProvider(...providers)({ children })
    );
  };
};

const Context = createContextProvider(
  // add context provider here
  GeneralProvider
);

export default Context;
