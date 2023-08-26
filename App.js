// import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
  StatusBar,
} from "react-native";

import { TailwindProvider } from "tailwindcss-react-native";
import uuid from "react-native-uuid";

function App() {
  const [message, setMessage] = useState(null);
  const [list, setList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);

  function saveHandler() {
    if (!message) {
      return alert("Please type something");
    }

    const obj = {
      id: uuid.v4(),
      message,
    };
    setList([...list, obj]);
    setMessage("");
  }

  function deleteHandler(id) {
    let itemSort = list.filter((item) => item.id !== id);
    setList(itemSort);
  }

  function editHandler() {
    let editItemKey = list.map((item) => {
      if (item.id === editItem.id) {
        item.message = message;
        setMessage("");
        return setIsEdit(false);
      }
    });
  }
  return (
    <TailwindProvider>
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          <View className="m-5">
            <StatusBar backgroundColor={"gray"} />
            {/* INPUT FIELD AND ACTION BUTTON */}
            <View className="flex flex-row">
              <TextInput
                className="border border-black w-[85%] p-1 rounded-md"
                placeholder="Go to Gym"
                value={message}
                onChangeText={(e) => {
                  setMessage(e);
                }}
              />
              {isEdit ? (
                <Button title="Update" onPress={editHandler} />
              ) : (
                <Button
                  className="rounded-3xl"
                  title="Save"
                  onPress={saveHandler}
                />
              )}
            </View>

            {/* List to be displayed*/}
            <View>
              {list?.map((item, index) => (
                <View className="flex-row justify-between px-5 py-2">
                  <Text key={index}>{item?.message}</Text>
                  <View className="flex-row">
                    <Button
                      title="Edit"
                      onPress={() => {
                        setIsEdit(true);
                        setMessage(item.message);
                        setEditItem(item);
                      }}
                    />
                    <Button
                      title="Delete"
                      onPress={() => deleteHandler(item.id)}
                      color={"red"}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </TailwindProvider>
  );
}

export default App;
