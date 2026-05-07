import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Головний екран каталогу */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* Екран деталей товару */}
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            title: 'Деталі товару',
            headerBackTitle: 'Назад'
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}