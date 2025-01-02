import React, { useContext, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalContext } from "@/app/_layout";
const HelloModal = ({ visible, onClose,modalVisible }) => {
  const context = useContext(ModalContext);
  const {homeData, setHomeData,habitsData,setHabitsData} = context;
  const [input,setInputs] = useState({
    name:"",
    description: "",
    target: 1,
    frequency:"daily",
    createdDate:new Date().toISOString()
  })

  const storeData = async (updatedData,key) => {
    try {
      const jsonValue = JSON.stringify(updatedData);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error

    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {

      // error reading value
    }
  };
  const [error,setError] = useState({
    name:'',
  });

  const handleCreate = async () => {
    if (!input.name || input.name === '') {
      setError({ ...error, name: 'Please enter a valid name' });
      return;
    }
    const updatedHabitsData = { ...habitsData };

    const updateHabitsForDates = (habit) => {

      const today = new Date().toISOString();
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateString = date.toLocaleDateString();
        if (!updatedHabitsData[dateString]) {
          updatedHabitsData[dateString] = [];
        }

        const existingHabitIndex = updatedHabitsData[dateString].findIndex(
          (item) => item.id === habit.id
        );

        if (existingHabitIndex > -1) {
          updatedHabitsData[dateString][existingHabitIndex] = habit;
        } else {
          updatedHabitsData[dateString].push(habit);
        }
      }
      setHabitsData(updatedHabitsData);
    };

    if (modalVisible?.action === 'Edit') {
      const updatedData = homeData.map((item) => {
        if (item.id === modalVisible?.data?.id) {
          const updatedHabit = {
            ...item,
            name: input.name,
            description: input.description,
            target: input.target,
            frequency: input.frequency,
            createdDate: new Date().toISOString(),
          };
          updateHabitsForDates(updatedHabit);
          return updatedHabit;
        }
        return item;
      });
      setHomeData(updatedData);
      // setHabitsData(updatedHabitsData);
      storeData(updatedData,'home-habits');
      storeData(updatedHabitsData,'habits-data');
      onClose();
      return;
    }

    const newHabit = {
      id: homeData.length + 1 || 1,
      name: input.name,
      description: input.description,
      target: input.target,
      frequency: input.frequency,
      completed: 0,
      createdDate: new Date().toISOString(),
    };

    
    try {
      const updatedData = [...homeData, newHabit];
      setHomeData(updatedData);
      updateHabitsForDates(newHabit);
      // setHabitsData(updatedHabitsData);
      storeData(updatedData,'home-habits');
      storeData(updatedHabitsData,'habits-data');
      
    } catch (e) {
      // handle error

    } finally {
      onClose();
    }
  };

  useEffect(()=>{
    const homeDataGet = async()=>{
      try{
        const data = await getData('home-habits');
        setHomeData(data||[]);

      }catch(e){

      }
    }
    homeDataGet();
    if(modalVisible?.action === 'Edit'){
      setInputs({
        name:modalVisible?.data?.name || "",
        description:modalVisible?.data?.description || "",
        target:modalVisible?.data?.target || 1,
        frequency:modalVisible?.data?.frequency || "daily"
      })
    }
    else{
      setInputs({
        name:"",
        description: "",
        target: 1,
        frequency:"daily"
      })
    }
  },[modalVisible])
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
          <Text style={styles.createText}>{modalVisible?.action || "Create"} Habit 😀!</Text>
          <Text style={styles.labelText}>Name your habbit</Text>
          <TextInput
            placeholder="Book reading 📒"
            style={styles.inputBox}
            placeholderTextColor="lightgray"
            onChange={(e)=>{setInputs({...input,name:e.nativeEvent.text});setError({...error,name:''})}}
            value={input.name}
          />
         {error.name &&  <Text style={{color:'red',fontSize:14}}>{error.name}</Text>}
          <Text style={styles.labelText}>
            Describe your habbit{" "}
            <Text style={styles.optionalText}>
              {"("}optional{")"}
            </Text>{" "}
          </Text>
          <TextInput
            placeholder="I will read a book daily till december 2025"
            style={styles.inputBox}
            placeholderTextColor="lightgray"
            onChange={(e)=>setInputs({...input,description:e.nativeEvent.text})}
            value={input.description}

          />
          <Text style={styles.labelText}>
            How many times will you want to do this in a day!
            <Text style={styles.optionalText}>
              {"("}keep 1 for tasks like 🧘🏻  🏃🏻{")"}
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
              onPress={()=>setInputs({...input,target:Math.max(1, input.target-1)})}
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
              <TextInput
                style={{ textAlign: "center", color: "white", fontSize: 40,minWidth: 50,maxWidth: 120,
                height: 60,
                 }}
                keyboardType="number-pad"
                value={input.target ? input.target.toString() : '1'}
                onChange={(e) => {
                  const value = e.nativeEvent.text;
                  setInputs({ ...input, target: value === '' ? 1 : Math.max(1, parseFloat(value)) });
                }}
                placeholder={input.target ?  input.target.toString() : '1'}
                placeholderTextColor={"white"}
              />
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
              onPress={()=>setInputs({...input,target:input.target+1})}
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
                backgroundColor:input.frequency ==='daily'?  "#7C55FE" : "transparent",
                borderRadius: 10,
                borderColor: "white",
                position: "relative",
              }}
              onPress={()=>setInputs({...input,frequency:'daily'})}
            >
              <Text style={{ color: "white", fontSize: 24 }}>Daily</Text>
              {input.frequency==='daily' &&<AntDesign
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
              />}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "40%",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                backgroundColor:input.frequency ==='weekly'?  "#7C55FE" : "transparent",
                borderRadius: 10,
                borderColor: "white",
              }}
              onPress={()=>setInputs({...input,frequency:'weekly'})}
            >
              <Text style={{ color: "white", fontSize: 24 }}>Weekly</Text>
              {input.frequency==='weekly' &&<AntDesign
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
              />}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity
            style={{
              backgroundColor: "#7C55FE",
              padding: 10,
              marginVertical: 20,
              borderRadius: 10,
              width:modalVisible?.action === 'Edit' ? '80%' : '100%'
            }}
            onPress={handleCreate}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
          {modalVisible?.action === 'Edit' 
          &&
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              padding: 10,
              marginVertical: 20,
              borderRadius: 10,
              width:50,
              justifyContent:'center',
              alignItems:'center'
            }}
            onPress={()=>{
              const updatedData = homeData.filter((item) => item.id !== modalVisible?.data?.id);
              setHomeData(updatedData);
              storeData(updatedData,'home-habits');
              const updatedHabitsData = { ...habitsData };
              Object.keys(updatedHabitsData).forEach((date) => {
                updatedHabitsData[date] = updatedHabitsData[date].filter(
                  (habit) => habit.id !== modalVisible?.data?.id
                );
              });
              setHabitsData(updatedHabitsData);
              storeData(updatedHabitsData, 'habits-data');
              onClose();
            }}
          >
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
          
          }
        </View>
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
    color: "lightgray",
    marginVertical: 5,
    fontSize: 15,
    fontWeight:300
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
