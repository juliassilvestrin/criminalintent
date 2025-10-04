import { StyleSheet } from 'react-native';
import { useTheme, themes } from '../context/ThemeContext';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Pick a Theme</ThemedText>
      
      {Object.keys(themes).map((themeName) => (
        <ThemedButton
          key={themeName}
          title={themes[themeName as keyof typeof themes].name}
          style={[
            styles.themeButton,
            { 
              backgroundColor: themes[themeName as keyof typeof themes].card,
              borderColor: theme.border,
              borderWidth: 1,
            }
          ]}
          onPress={() => setTheme(themeName as keyof typeof themes)}
        />
      ))}
    </ThemedView>
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
    marginBottom: 15,
  },
});