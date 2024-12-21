import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomTabBar from './CustomTabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            display: 'none',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
            name="chart"
            options={{
              title: 'Chart',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            }}
          />
        <Tabs.Screen
          name="notification"
          options={{
            title: 'Notification',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: 'Setting',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}