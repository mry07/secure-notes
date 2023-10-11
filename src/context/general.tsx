import React from "react";
import { View, Text, Alert } from "react-native";
import { getStorage, setStorage } from "../utils/storage";
import { ContextProps } from "./general.types";
import CryptoJS from "crypto-js";

export const GeneralContext = React.createContext<ContextProps>(null);

export const GeneralProvider = ({ children }: any) => {
  const [hasLogged, setHasLogged] = React.useState(false);
  const [encryptionKey, setEncryptionKey] = React.useState("");

  const value = React.useMemo<ContextProps>(
    () => ({
      hasLogged,
      setHasLogged,
      encryptionKey,
      setEncryptionKey,

      login: ({ biometric, password }) => {
        if (biometric || password === "test1234") {
          const hash = CryptoJS.SHA256("KeyForNote").toString();
          setEncryptionKey(hash);
        }

        setHasLogged(true);
      },

      logout: async () => {
        Alert.alert("Logout", "Are you sure?", [
          {
            text: "Yes",
            onPress: () => {
              setEncryptionKey("");
              setHasLogged(false);
            },
          },
          { text: "No" },
        ]);
      },

      getNotes: async () => {
        const result = [];
        const data = await getStorage("@notes");

        if (data !== null) {
          for (let i = 0; i < data.length; i++) {
            let id = data[i].id;
            let title = data[i].title;
            let note = data[i].note;

            if (encryptionKey) {
              note = CryptoJS.AES.decrypt(data[i].note, encryptionKey).toString(
                CryptoJS.enc.Utf8
              );
            }

            result.push({ id, title, note });
          }
        }

        return result;
      },

      createNote: async ({ id, title, note }) => {
        try {
          let data = await getStorage("@notes");
          if (data !== null) {
            data.push({ id, title, note });
          } else {
            data = [{ id, title, note }];
          }

          await setStorage("@notes", data);

          return true;
        } catch (error) {
          return false;
        }
      },

      getNoteById: async (id) => {
        const data = await getStorage("@notes");
        if (data !== null) {
          return data.find((e) => e.id === id);
        }
      },

      updateNote: async ({ id, title, note }) => {
        try {
          const data = await getStorage("@notes");
          if (data !== null) {
            const index = data.findIndex((e) => e.id === id);
            data[index].title = title;
            data[index].note = note;

            await setStorage("@notes", data);
          }

          return true;
        } catch (error) {
          return false;
        }
      },
    }),
    [hasLogged, encryptionKey]
  );

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};
