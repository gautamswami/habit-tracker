import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export const ModalContext = createContext(null);
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  const [modalVisible,setModalVisible] = useState({
    action:"Create",
    state:false,
    data:[],
    id:""
  })
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  };
const [homeData, setHomeData] = useState([]);
const [completeData,setCompleteData] = useState([]);
const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
const [habitsData,setHabitsData] = useState([]);

  useEffect(() => {
    const homeDataGet = async () => {
      try {
        const data = await getData("home-habits");
        const completedata = await getData("completed-habits");
        const habitsData = await getData("habits-data");
        setHomeData(data || []);
        setCompleteData(completedata || []);
        setHabitsData(habitsData || []);
      } catch (e) {
      }
    };
    homeDataGet();
  }, []);
  useEffect(() => {
    // AsyncStorage.clear();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ModalContext.Provider value={{modalVisible,setModalVisible,homeData, setHomeData,completeData,setCompleteData,selectedDate, setSelectedDate,habitsData,setHabitsData}}>
      <StatusBar  style='auto' />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </ModalContext.Provider>
    </ThemeProvider>
  );
}
