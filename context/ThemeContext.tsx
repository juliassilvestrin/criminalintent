import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


//themes
export const themes = {
  light: {
  name: 'White',
  background: '#ffffff',
  card: '#f5f5f5',
  text: '#000000',
  border: '#dddddd',
  button: '#757575',  
  buttonText: '#ffffff',
},
  lightBlue: {
    name: 'Blue',
    background: '#e3f2fd',
    card: '#bbdefb',
    text: '#0d47a1',
    border: '#90caf9',
    button: '#1976d2',
    buttonText: '#ffffff',
  },
  lightGreen: {
    name: 'Green',
    background: '#e8f5e9',
    card: '#c8e6c9',
    text: '#1b5e20',
    border: '#81c784',
    button: '#388e3c',
    buttonText: '#ffffff',
  },
  dark: {
    name: 'Black',
    background: '#000000',
    card: '#1a1a1a',
    text: '#ffffff',
    border: '#333333',
    button: '#6c3fb5',
    buttonText: '#ffffff',
  },
  purple: {
    name: 'Purple',
    background: '#2d1b3d',
    card: '#3d2550',
    text: '#ffffff',
    border: '#6c3fb5',
    button: '#9b5de5',
    buttonText: '#ffffff',
  },
  red: {
    name: 'Red',
    background: '#2d1515',
    card: '#3d2020',
    text: '#ffffff',
    border: '#8b3131',
    button: '#d64545',
    buttonText: '#ffffff',
  },
};

type ThemeContextType = {
  currentTheme: keyof typeof themes;
  theme: typeof themes.light;
  setTheme: (themeName: keyof typeof themes) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'selectedTheme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>('light');

  // load saved theme
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved && saved in themes) {
        setCurrentTheme(saved as keyof typeof themes);
      }
    } catch (error) {
      console.error('error loading', error);
    }
  };

  const setTheme = async (themeName: keyof typeof themes) => {
    try {
      setCurrentTheme(themeName);
      await AsyncStorage.setItem(THEME_KEY, themeName);
    } catch (error) {
      console.error('erpr saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, theme: themes[currentTheme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

//hook yo use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheeme error');
  }
  return context;
};