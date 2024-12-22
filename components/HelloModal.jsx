import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
const HelloModal = ({ visible, onClose }) => {
  const [dayTimes, setDayTimes] = useState(1);
  const [periodSelect, setPeriodSelect] = useState("daily");
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalContainer}
       activeOpacity={1}
       onPress={onClose}
      >
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
        <TouchableOpacity style={{position:'absolute',left:'104%',top:-10}} onPress={onClose}>
        <AntDesign name="closecircle" size={34} color="white"  />
        </TouchableOpacity>
          <Text style={styles.createText}>Create Habit 😀!</Text>
          <Text style={styles.labelText}>Name your habbit</Text>
          <TextInput
            placeholder="Book reading 📒"
            style={styles.inputBox}
            placeholderTextColor="lightgray"
          />
          <Text style={styles.labelText}>
            Describe your habbit{" "}
            <Text style={styles.optionalText}>
              {"("}optional{")"}
            </Text>{" "}
          </Text>
          <TextInput
            placeholder="I will read a book daily till december 2025 📒"
            style={styles.inputBox}
            placeholderTextColor="lightgray"
          />
          <Text style={styles.labelText}>
            Describe your habbit{" "}
            <Text style={styles.optionalText}>
              {"("}optional{")"}
            </Text>{" "}
          </Text>
          <TextInput
            placeholder="I will read a book daily till december 2025 📒"
            style={styles.inputBox}
            placeholderTextColor="lightgray"
          />
          <Text style={styles.labelText}>
            How many times will you want to do this in a day!
            <Text style={styles.optionalText}>
              {"("}optional{")"}
            </Text>{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
              width: "100%",
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: 50,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                backgroundColor: "#7C55FE",
                borderRadius: 10,
                borderColor: "white",
              }}
            >
              <FontAwesome
                name="minus"
                size={30}
                color="white"
                style={{ textAlign: "center" }}
              />
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 40 }}
              >
                {dayTimes}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 50,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                backgroundColor: "#7C55FE",
                borderRadius: 10,
                borderColor: "white",
              }}
            >
              <FontAwesome
                name="plus"
                size={30}
                color="white"
                style={{ textAlign: "center" }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>
            Is this daily or weekly?
            <Text style={styles.optionalText}>
              {" ("}optional{")"}
            </Text>{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
              width: "100%",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: "40%",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                backgroundColor: "#7C55FE",
                borderRadius: 10,
                borderColor: "white",
                position: "relative",
              }}
            >
              <Text style={{ color: "white", fontSize: 24 }}>Daily</Text>
              <AntDesign
                name="checkcircle"
                size={18}
                color="#FFB254"
                style={{
                  position: "absolute",
                  right: -5,
                  top: -5,
                  backgroundColor: "white",
                  borderRadius: 40,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "40%",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                backgroundColor: "transparent",
                borderRadius: 10,
                borderColor: "white",
              }}
            >
              <Text style={{ color: "white", fontSize: 24 }}>Weekly</Text>
              <AntDesign
                name="checkcircle"
                size={18}
                color="#FFB254"
                style={{
                  position: "absolute",
                  right: -5,
                  top: -5,
                  backgroundColor: "white",
                  borderRadius: 40,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#7C55FE",
              padding: 10,
              marginVertical: 20,
              borderRadius: 10,
            }}
            onPress={onClose}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#262626",
    borderRadius: 10,
    position:'relative'
  },
  createText: {
    color: "white",
    fontSize: 28,
    fontWeight: 600,
    paddingBottom: 4,
    marginBottom: 18,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  labelText: {
    color: "white",
    marginVertical: 5,
    fontSize: 16,
  },
  optionalText: {
    color: "gray",
    marginVertical: 5,
    fontSize: 15,
  },
  inputBox: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 6,
    marginVertical: 5,
    fontSize: 14,
  },
});

export default HelloModal;
