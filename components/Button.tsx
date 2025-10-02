// components/Button.tsx
import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: 'primary' | 'navigation';
  isLandscape?: boolean;
}

export default function Button({ title, onPress, style = 'primary', isLandscape = false }: ButtonProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button, 
        style === 'navigation' ? styles.navigationButton : styles.primaryButton,
        isLandscape && (style === 'navigation' ? styles.landscapeNavigationButton : styles.landscapePrimaryButton),
        pressed && (isLandscape ? styles.pressedButtonLandscape : styles.pressedButton)
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.buttonText,
        style === 'navigation' ? styles.navigationText : styles.primaryText,
        isLandscape && styles.landscapeText
      ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  navigationButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  landscapePrimaryButton: {
    backgroundColor: '#FFD700', 
  },
  landscapeNavigationButton: {
    backgroundColor: '#FFD700', 
  },
  pressedButton: {
    backgroundColor: '#6A1B9A',
    transform: [{ scale: 0.95 }],
  },
  pressedButtonLandscape: {
    backgroundColor: '#FFA500', 
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  primaryText: {
    fontSize: 16,
  },
  navigationText: {
    fontSize: 14,
  },
  landscapeText: {
    color: 'black',
  },
});