// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
// import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from "react-native-select-dropdown";

import Recorder from "../components/home/recorder";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Index() {
  //dropdown states
  const [items, setItems] = useState([
    { title: 'Fr', icon: 'option1' },
    { title: 'Eng', icon: 'option2' },
  ]);

  const styles = StyleSheet.create({
    dropdownButtonStyle: {
      // width: 150,
      minWidth: 120,
      maxWidth: 150,
      height: 40,

      backgroundColor: useThemeColor({}, "tabIconDefault"),

      borderRadius: 10,
      borderWidth: 1,
      borderColor: useThemeColor({}, "icon"),

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 15,
      marginLeft: 8,
      color: useThemeColor({}, "text"),
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      marginTop: -30,
      backgroundColor: useThemeColor({}, "tabIconDefault"),
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: useThemeColor({}, "text"),
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: useThemeColor({}, "background"),
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: 'center', position: 'relative', top: 30, width: '100%', height: '10%', padding: 10 }} >
        <Text style={{ color: useThemeColor({}, 'text'), fontWeight: 600, fontSize: 33 }}>NUESIS</Text>
        <SelectDropdown
          data={items}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <MaterialIcons size={18} name={'translate'} color={useThemeColor({}, 'text')} />
                {selectedItem && (
                  <Text style={styles.dropdownButtonTxtStyle}>{selectedItem.title}</Text>
                )}
                <MaterialIcons size={18} name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} color={useThemeColor({}, 'text')} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle }}>
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
      <View style={{height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Recorder />
      </View>
    </View >
  );
}
