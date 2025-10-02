import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
          headerStyle: { backgroundColor: '#885eeb' },
        }} 
      />

      <Stack.Screen
        name="cheat" 
        options={{ 
          title: 'Cheat',
          headerStyle: { backgroundColor: '#885eeb' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      /> 
    </Stack>
  );
}
