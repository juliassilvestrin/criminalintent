import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function ThemedView({ style, ...props }: ViewProps) {
  const { theme } = useTheme();
  return <View style={[{ backgroundColor: theme.background }, style]} {...props} />;
}