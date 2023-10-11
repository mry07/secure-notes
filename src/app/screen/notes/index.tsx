import React from "react";
import FabComponent from "./FabComponent";
import WarningComponent from "./WarningComponent";
import * as Colors from "../../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../../context/general";
import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";

const Notes = ({ navigation, route }: any) => {
  const { reload } = route.params ?? { reload: true };
  const { getNotes } = React.useContext(GeneralContext);

  const [data, setData] = React.useState([]);

  /** **************************************** */

  // effect

  React.useEffect(() => {
    (async () => {
      if (reload) {
        const notes = await getNotes();
        setData(notes);
        navigation.setParams({ reload: false });
      }
    })();
  }, [reload]);

  /** **************************************** */

  // render

  const renderItem = React.useCallback(({ item }) => {
    return (
      <Pressable
        style={styles.list}
        onPress={() => navigation.navigate("ManageNote", { id: item.id })}
      >
        <Text style={styles.title}>{item.title}</Text>
      </Pressable>
    );
  }, []);

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text>Data not found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <WarningComponent />

      <FlatList
        contentContainerStyle={styles.content}
        data={data}
        keyExtractor={(_, i) => `key-${i}`}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
      />

      <FabComponent navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  list: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  separator: {
    height: 1.5,
    width: "100%",
    backgroundColor: Colors.grey(undefined, "300"),
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notes;
