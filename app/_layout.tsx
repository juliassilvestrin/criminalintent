import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { createNewCrime, saveCrime } from '../utils/storage';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

function LayoutContent() {
  const router = useRouter();
  const { theme } = useTheme();

  const handleAddCrime = async () => {
    const newCrime = createNewCrime();
    await saveCrime(newCrime);
    router.push(`/detail?id=${newCrime.id}`);
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.button,
        },
        headerTintColor: theme.buttonText,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        title: 'Criminal Intent',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <>
              <TouchableOpacity onPress={handleAddCrime} style={{ marginRight: 15 }}>
               <Text style={{ fontSize: 36, color: theme.buttonText }}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/settings')}>
                <MaterialCommunityIcons name="cog" size={28} color={theme.buttonText} />
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <MaterialCommunityIcons name="cog" size={28} color={theme.buttonText} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{}}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}