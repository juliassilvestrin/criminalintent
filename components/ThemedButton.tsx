import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
}

export function ThemedButton({ title, style, ...props }: ThemedButtonProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: theme.button }, style]} 
      {...props}
    >
      <Text style={[styles.buttonText, { color: theme.buttonText }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});