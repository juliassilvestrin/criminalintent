import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, themes } from '../context/ThemeContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Pick a Theme</Text>
      
      {Object.keys(themes).map((themeName) => (
        <TouchableOpacity
          key={themeName}
          style={[
            styles.themeButton,
            { 
              backgroundColor: themes[themeName as keyof typeof themes].card,
              borderColor: theme.border,
              borderWidth: 1,
            }
          ]}
          onPress={() => setTheme(themeName as keyof typeof themes)}
        >
          <Text style={[
            styles.themeButtonText,
            { color: themes[themeName as keyof typeof themes].text }
          ]}>
            {themes[themeName as keyof typeof themes].name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
  },
  themeButton: {
    width: '90%',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});