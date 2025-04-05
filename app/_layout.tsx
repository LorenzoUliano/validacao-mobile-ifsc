// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StudentProvider } from '@/contexts/StudentContext';
import { SubjectProvider } from '@/contexts/SubjectContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <StudentProvider>
            <SubjectProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor: colorScheme === 'dark' ? '#1e293b' : '#f1f5f9',
                                },
                            }}
                        />
                        <Stack.Screen
                            name="alunos/[id]"
                            options={{
                                title: 'Selecionar Disciplinas',
                                headerBackTitle: 'Voltar',
                            }}
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                </ThemeProvider>
            </SubjectProvider>
        </StudentProvider>
    );
}