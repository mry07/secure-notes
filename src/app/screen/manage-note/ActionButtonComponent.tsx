import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { GeneralContext } from "../../../context/general";
import * as Colors from "../../../utils/colors";
import Button from "../../components/button";

const ActionButtonComponent = ({
  noteId,
  encryptedNote,
  title,
  navigation,
}: any) => {
  const { encryptionKey, createNote, updateNote } =
    React.useContext(GeneralContext);

  const onSubmit = async () => {
    const d = new Date();
    const time = d.getTime();
    const newTitle = title || "Untitled";

    if (noteId) {
      const ok = await updateNote({
        id: noteId,
        title: newTitle,
        note: encryptedNote,
      });
      if (ok) {
        navigation.navigate("Notes", { reload: true });
        return;
      }
    } else {
      const ok = await createNote({
        id: time,
        title: newTitle,
        note: encryptedNote,
      });
      if (ok) {
        navigation.navigate("Notes", { reload: true });
        return;
      }
    }

    Alert.alert("Failed", `Failed to ${noteId ? "update" : "create"} note`, [
      { text: "OK" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.back}
        title="Back"
        onPress={() => navigation.goBack()}
      />
      {encryptionKey && (
        <Button style={styles.submit} title="Submit" onPress={onSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    columnGap: 12,
  },
  back: {
    flex: 1,
    backgroundColor: Colors.red(undefined, "400"),
  },
  submit: {
    flex: 1,
  },
});

export default ActionButtonComponent;
