import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

const MyCustomHeader = ({ options }: { options: { title?: string } }) => {
  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer}
    >
      <ThemedText style={styles.headerTitle}>{options.title ?? 'Meu App'}</ThemedText>
    </LinearGradient>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          headerShown: true,
          header: ({ options }: any) => <MyCustomHeader options={options} />,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              borderTopWidth: 0,
              bottom: 0,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }: any) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="alunos"
          options={{
            title: 'Alunos',
            tabBarIcon: ({ color }: any) => (
              <IconSymbol size={28} name="person.3.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="disciplinas"
          options={{
            title: 'Disciplinas',
            tabBarIcon: ({ color }: any) => (
              <IconSymbol size={28} name="book.closed.fill" color={color} />
            ),
          }}
        />
      </Tabs>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});