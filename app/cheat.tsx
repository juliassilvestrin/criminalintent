import { Text, View, StyleSheet, Pressable, Alert } from "react-native"; 
import { useLocalSearchParams, Stack, useRouter } from "expo-router"; 
import { Ionicons } from "@expo/vector-icons"; 
import { useState, useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import Button from "../components/Button";

export default function Cheat() {
  const { answer } = useLocalSearchParams<{ answer: string; question: string }>();
  const [orientation, setOrientation] = useState('portrait');
  const router = useRouter();
  const currentAnswer = answer === "true";

  //orientation handling
  useEffect(() => {
    const setupOrientation = async () => {
      const initialOrientation = await ScreenOrientation.getOrientationAsync();
      const isLandscape = initialOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || 
                         initialOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
      setOrientation(isLandscape ? 'landscape' : 'portrait');
    };

    const orientationListener = ScreenOrientation.addOrientationChangeListener((event) => {
      const { orientation: newOrientation } = event.orientationInfo;
      const isLandscape = newOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || 
                         newOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
      const orientationString = isLandscape ? 'landscape' : 'portrait';
      setOrientation(orientationString);
    });

    setupOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientationListener);
    };
  }, []);

  const goBack = () => {
    router.back();
  };

  const showAnswer = () => {
    Alert.alert(
      "Answer Revealed", 
      `The answer is: ${currentAnswer ? "TRUE" : "FALSE"}`,
      [{ text: "OK" }]
    );
  };

  //get styles based on orientation
  const currentStyles = orientation === 'landscape' ? landscapeStyles : styles;

  return (
    <View style={currentStyles.container}>
      {/* hide header */}
      <Stack.Screen options={{ headerShown: false }} />
             
      <View style={currentStyles.header}>
        <Pressable 
          style={({ pressed }) => [
            currentStyles.backButton,
            pressed && { opacity: 0.7 }
          ]} 
          onPress={goBack}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
        <Text style={currentStyles.headerText}>GeoQuiz</Text>
      </View>

      <View style={currentStyles.mainContent}>
        <Text style={currentStyles.confirmationText}>
          Are you sure you want to do this?
        </Text>

        <View style={currentStyles.buttonContainer}>
          <Button title="SHOW ANSWER" onPress={showAnswer} style="primary" isLandscape={orientation === 'landscape'} />
        </View>
      </View>
    </View>
  );
}

//portrait styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#8A2BE2",
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 65,
    zIndex: 1,
  },
  headerText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  confirmationText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

//landscape styles
const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#8A2BE2",
    paddingTop: 40,
    paddingBottom: 15,
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 45,
    zIndex: 1,
  },
  headerText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    gap: 30,
  },
  confirmationText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
});