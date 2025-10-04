import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getCrimeById, saveCrime, Crime } from '../utils/storage';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ThemedButton } from '../components/ThemedButton';

export default function Detail() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date());
  const [solved, setSolved] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadCrime();
  }, [id]);

  const loadCrime = async () => {
    if (id && typeof id === 'string') {
      const crime = await getCrimeById(id);
      if (crime) {
        setTitle(crime.title);
        setDetails(crime.details);
        setDate(new Date(crime.date));
        setSolved(crime.solved);
        setPhotoUri(crime.photoUri);
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera roll permissions to add photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!id || typeof id !== 'string') return;

    const crime: Crime = {
      id,
      title,
      details,
      date: date.toISOString(),
      solved,
      photoUri,
    };

    await saveCrime(crime);
    Alert.alert('Success', 'Crime saved successfully!');
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.topSection}>
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
              <View style={[styles.photoPlaceholder, { backgroundColor: theme.card }]} />
            )}
          </View>
          <TouchableOpacity style={[styles.cameraButton, { backgroundColor: theme.card }]} onPress={pickImage}>
            <MaterialCommunityIcons name="camera" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={[styles.label, { color: theme.text }]}>Title</Text>
          <TextInput
            style={[styles.titleInput, { borderBottomColor: theme.border, color: theme.text }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={theme.text + '80'}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Details</Text>
        <TextInput
          style={[styles.input, styles.textArea, { borderColor: theme.border, color: theme.text, backgroundColor: theme.card }]}
          value={details}
          onChangeText={setDetails}
          placeholder="What happened?"
          placeholderTextColor={theme.text + '80'}
          multiline
          numberOfLines={4}
        />
      </View>

      <ThemedButton
        title={date.toDateString().toUpperCase()}
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setSolved(!solved)}
      >
        <View style={[styles.checkbox, { borderColor: theme.text }]}>
          {solved && <MaterialCommunityIcons name="check" size={20} color={theme.text} />}
        </View>
        <Text style={[styles.checkboxLabel, { color: theme.text }]}>Solved</Text>
      </TouchableOpacity>

      <ThemedButton 
        title="SAVE" 
        onPress={handleSave}
        style={styles.saveButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginRight: 16,
  },
  photoContainer: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleInput: {
    borderBottomWidth: 1,
    padding: 8,
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  saveButton: {
    marginBottom: 40,
  },
});