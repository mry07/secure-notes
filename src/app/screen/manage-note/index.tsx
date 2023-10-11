import React from "react";
import Input from "../../components/input";
import CryptoJS from "crypto-js";
import EncryptComponent from "./EncryptComponent";
import ActionButtonComponent from "./ActionButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../../context/general";
import { TextInput, StyleSheet, Dimensions, ScrollView } from "react-native";

const CreateNote = ({ navigation, route }: any) => {
  const { id } = route.params ?? {};
  const { encryptionKey, getNoteById } = React.useContext(GeneralContext);

  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");
  const [encryptedNote, setEncryptedNote] = React.useState("");

  /** **************************************** */

  // effect

  React.useEffect(() => {
    (async () => {
      if (id) {
        const result = await getNoteById(id);
        setTitle(result.title);

        if (!encryptionKey) {
          setNote(result.note);
        } else {
          const decrypted = CryptoJS.AES.decrypt(result.note, encryptionKey);
          setNote(decrypted.toString(CryptoJS.enc.Utf8));
          setEncryptedNote(result.note);
        }
      }
    })();
  }, [id]);

  /** **************************************** */

  // function

  const handleEncryptNote = async (text) => {
    const encrypted = CryptoJS.AES.encrypt(text, encryptionKey);
    setNote(text);
    setEncryptedNote(encrypted.toString());
  };

  /** **************************************** */

  // render

  return (
    <SafeAreaView style={styles.container}>
      <Input
        containerStyle={styles.inputTitle}
        label="Title"
        placeholder="Enter title"
        value={title}
        editable={!!encryptionKey}
        onChangeText={setTitle}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          style={styles.inputNote}
          placeholder="Enter your note"
          value={note}
          multiline
          editable={!!encryptionKey}
          onChangeText={handleEncryptNote}
        />

        <EncryptComponent encryptedNote={encryptedNote} />
      </ScrollView>

      <ActionButtonComponent
        noteId={id}
        encryptedNote={encryptedNote}
        title={title}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 16,
    paddingVertical: 16,
  },
  content: {
    flexGrow: 1,
    rowGap: 8,
  },
  inputTitle: {
    marginHorizontal: 16,
  },
  inputNote: {
    textAlignVertical: "top",
    marginHorizontal: 16,
    minHeight: Dimensions.get("window").height * 0.1,
  },
});

export default CreateNote;
