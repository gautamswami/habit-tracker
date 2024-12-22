import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { FlatList, Text, View } from 'react-native'

export default function Completed() {
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
              {item.title}{" "}
              {item.complete !== item?.total && (
                <>
                  {"("}
                  {item.complete}/{item.total}
                  {")"}
                </>
              )}
            </Text>
          </LinearGradient>
        );
      }; 
  return (
    <View>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "600",
              marginBottom: 20,
            }}
          >
            Completed
          </Text>
          <FlatList
            data={[
              {
                title: "Drink water",
                complete: 6,
                total: 10,
              },
              {
                title: "Read book",
                complete: 1,
                total: 1,
              },
              {
                title: "Workout",
                complete: 1,
                total: 1,
              },
              {
                title: "Yoga",
                complete: 1,
                total: 1,
              },
            ]}
            renderItem={renderCompletedCards}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: "center", gap: 10 }}
          />
        </View>
  )
}
