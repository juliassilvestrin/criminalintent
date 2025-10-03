import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

//crime object
export interface Crime {
  id: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photoUri?: string;
}

// saves crime list under this key
const CRIMES_KEY = 'crimes';

// get crimes from storage
export const getCrimes = async (): Promise<Crime[]> => {
  try {
    const data = await AsyncStorage.getItem(CRIMES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('error getting crimes:', error);
    return [];
  }
};

// get one specific crime by its id
export const getCrimeById = async (id: string): Promise<Crime | null> => {
  try {
    const crimes = await getCrimes();
    return crimes.find(crime => crime.id === id) || null;
  } catch (error) {
    console.error('erroe getting crime by id:', error);
    return null;
  }
};

// save a crime (updates if it exists or adds if new)
export const saveCrime = async (crime: Crime): Promise<void> => {
  try {
    const crimes = await getCrimes();
    const index = crimes.findIndex(c => c.id === crime.id);
    
    //if exists update it
    if (index >= 0) {
      crimes[index] = crime;
    } else {
      // else adds new crime
      crimes.push(crime);
    }
    
    await AsyncStorage.setItem(CRIMES_KEY, JSON.stringify(crimes));
  } catch (error) {
    console.error('error saving crime:', error);
  }
};

// create a new empty crime with a unique id
export const createNewCrime = (): Crime => ({
  id: uuid.v4() as string,
  title: '',
  details: '',
  date: new Date().toISOString(),
  solved: false,
});