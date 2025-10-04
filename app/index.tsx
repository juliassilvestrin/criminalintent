import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { getCrimes, Crime } from '../utils/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';

export default function Index() {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const router = useRouter();
  const { theme } = useTheme();

  //reload crimes when screen starts
  useFocusEffect(
    useCallback(() => {
      loadCrimes();
    }, [])
  );

  // get all crimes from storage and put them in state
  const loadCrimes = async () => {
    const data = await getCrimes();
    setCrimes(data);
  };

  // render each crime item in the list
  const renderItem = ({ item }: { item: Crime }) => (
    <TouchableOpacity
      style={[styles.crimeItem, { backgroundColor: theme.button, borderColor: theme.border }]}
      onPress={() => router.push(`/detail?id=${item.id}`)}
    >
      <View style={styles.crimeContent}>
        <ThemedText style={[styles.crimeTitle, { color: theme.buttonText }]}>{item.title || 'Untitled Crime'}</ThemedText>
        <ThemedText style={[styles.crimeDate, { color: theme.buttonText, opacity: 0.7 }]}>
          {new Date(item.date).toLocaleDateString()}
        </ThemedText>
      </View>
      {item.solved && (
        <MaterialCommunityIcons name="handcuffs" size={24} color={theme.buttonText} />
      )}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={crimes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  crimeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  crimeContent: {
    flex: 1,
  },
  crimeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  crimeDate: {
    fontSize: 14,
  },
});