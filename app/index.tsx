import { Text, View, Pressable, StyleSheet, Alert, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import Button from "../components/Button";

// questions
const questionBank = [
  { question: "Canberra is the capital of Australia", answer: true },
  { question: "The Pacific Ocean is the largest ocean", answer: true },
  { question: "Brazil is in North America", answer: false },
  { question: "Mount Everest is the tallest mountain", answer: true },
  { question: "Africa has 54 countries", answer: true },
];

export default function Index() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [orientation, setOrientation] = useState('portrait');
  const router = useRouter();

  console.log("Current orientation:", orientation);

  useEffect(() => {
    const setupOrientation = async () => {
      await ScreenOrientation.unlockAsync();
      
     //get initial orientation
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
      console.log('Orientation changed to:', orientationString);
      setOrientation(orientationString);
    });

    setupOrientation();

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientationListener);
    };
  }, []);

  //handles answer button presses 
  const handleAnswer = (userAnswer: boolean) => {
    const correctAnswer = questionBank[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
      Alert.alert("Correct!", "Well done!", [
        {
          text: "Next Question",
          onPress: () => {
            const nextIndex = (currentQuestionIndex + 1) % questionBank.length;
            setCurrentQuestionIndex(nextIndex);
          }
        }
      ]);
    }
  };

  // navigation functions
  const goToPrevious = () => {
    const prevIndex =
      currentQuestionIndex === 0
        ? questionBank.length - 1
        : currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = (currentQuestionIndex + 1) % questionBank.length;
    setCurrentQuestionIndex(nextIndex);
  };

  const goToCheat = () => {
    router.push({
      pathname: "/cheat",
      params: {
        answer: questionBank[currentQuestionIndex].answer.toString(),
        question: questionBank[currentQuestionIndex].question,
      },
    });
  };

  //get styles based on orientation
  const currentStyles = orientation === 'landscape' ? landscapeStyles : styles;

  return (
    <View style={currentStyles.container}>
      {/* header */}
      <View style={currentStyles.header}>
        <Text style={currentStyles.title}>GeoQuiz</Text>
      </View>

      <View style={currentStyles.mainContent}>
        {/* question display */}
        <View style={currentStyles.questionContainer}>
          <Text style={currentStyles.questionText}>
            {questionBank[currentQuestionIndex].question}
          </Text>
        </View>

        {/* answer buttons */}
        <View style={currentStyles.buttonContainer}>
          <Button title="TRUE" onPress={() => handleAnswer(true)} style="primary" isLandscape={orientation === 'landscape'} />
          <Button title="FALSE" onPress={() => handleAnswer(false)} style="primary" isLandscape={orientation === 'landscape'} />
        </View>

        {/* navigation and cheat buttons */}
        <View style={currentStyles.controlsContainer}>
          {/* navigation buttons */}
          <View style={currentStyles.navigationContainer}>
            <Pressable 
              style={({ pressed }) => [
                currentStyles.navigationButton,
                pressed && currentStyles.pressedButton
              ]} 
              onPress={goToPrevious}
            >
              <Ionicons name="chevron-back" size={16} color={orientation === 'landscape' ? "black" : "white"} />
              <Text style={currentStyles.navigationText}>PREV</Text>
            </Pressable>

            <Pressable 
              style={({ pressed }) => [
                currentStyles.navigationButton,
                pressed && currentStyles.pressedButton
              ]} 
              onPress={goToNext}
            >
              <Text style={currentStyles.navigationText}>NEXT</Text>
              <Ionicons name="chevron-forward" size={16} color={orientation === 'landscape' ? "black" : "white"} />
            </Pressable>
          </View>

          {/* cheat button */}
          <Pressable 
            onPress={goToCheat} 
            style={({ pressed }) => [
              currentStyles.cheatButton,
              pressed && { opacity: 0.7 }
            ]}
          >
            <Text style={currentStyles.cheatText}>CHEAT</Text>
          </Pressable>
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
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    minHeight: 100,
    justifyContent: "center",
    maxWidth: "90%",
  },
  questionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  controlsContainer: {
    alignItems: "center",
  },
  navigationContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: "#8A2BE2",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pressedButton: {
    backgroundColor: "#6A1B9A",
    transform: [{ scale: 0.95 }],
  },
  navigationText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  cheatButton: {
    alignItems: "center",
  },
  cheatText: {
    color: "#8A2BE2",
    fontSize: 18,
    fontWeight: "bold",
  },
});

//landscape styles with yellow buttons
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  questionContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    minHeight: 80,
    justifyContent: "center",
    maxWidth: "70%",
  },
  questionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  controlsContainer: {
    alignItems: "center",
  },
  navigationContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: 80,
    justifyContent: "center",
  },
  pressedButton: {
    backgroundColor: "#FFA500", 
    transform: [{ scale: 0.95 }],
  },
  navigationText: {
    color: "black", 
    fontSize: 12,
    fontWeight: "bold",
  },
  cheatButton: {
    alignItems: "center",
  },
  cheatText: {
    color: "#8A2BE2",
    fontSize: 16,
    fontWeight: "bold",
  },
});