import { ModalContext } from '@/app/_layout';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

export default function Completed({calendarDate}) {
  const {completeData,setCompleteData,selectedDate, setSelectedDate} = useContext(ModalContext)
  const [completedArray, setCompletedArray] = useState([]);
  useEffect(() => {
    const currentDate = calendarDate ? calendarDate : selectedDate;
    const currentData = completeData[currentDate] || {};
    setCompletedArray(Object.values(currentData).map(item => item));
  }, [selectedDate, completeData,calendarDate]);
    const renderCompletedCards = ({ item, id }) => {
        return (
          <LinearGradient
            colors={["#97E3FF", "#9A5FFF", "#FF989A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              // width:"50%",
              padding: 20,
              borderRadius: 20,
            }}
            key={`card-${id}`}
          >
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "600",
                textDecorationLine: "line-through",
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </LinearGradient>
        );
      }; 
  return (
    <View>
          {completedArray.length>0 &&<Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "600",
              marginBottom: 20,
            }}
          >
            Completed
          </Text>}
          <FlatList
            data={completedArray}
            renderItem={renderCompletedCards}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: "center", gap: 10 }}
          />
        </View>
  )
}
