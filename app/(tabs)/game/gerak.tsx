import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Modal, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs , addDoc, Timestamp} from 'firebase/firestore';
import { firestore, auth } from '../../firebaseconfig'; // Import konfigurasi Firestore Anda
import Navbar from '../../../components/navbar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GLBDistanceGame: React.FC = () => {
  const [start, setStart] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(10);
  const [time, setTime] = useState(10);
  const [distance, setDistance] = useState(0);
  const [finishPosition, setFinishPosition] = useState(0);
  const [objectStartPosition, setObjectStartPosition] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'start' | 'win' | 'lose' | 'error'>('start');
  const [gameHistory, setGameHistory] = useState<any[]>([]); // State untuk menyimpan riwayat permainan

  const simulationWidth = SCREEN_WIDTH * 0.9;

  useEffect(() => {
    loadGameHistory(); // Memuat riwayat permainan saat komponen pertama kali dirender
  }, []);

  const startGame = async () => {
    setStart(true);
    showCustomAlert("GAME START", 'start');

    const newFinishPosition = Math.floor(Math.random() * (0.25 * simulationWidth)) + (0.5 * simulationWidth);
    setFinishPosition(newFinishPosition);

    const newObjectStartPosition = Math.floor(Math.random() * (0.05 * simulationWidth));
    setObjectStartPosition(newObjectStartPosition);
    setPosition(newObjectStartPosition);

    const newDistance = newFinishPosition - newObjectStartPosition;
    setDistance(newDistance);
  };

  const resetGame = () => {
    setStart(false);
    setPosition(0);
    setSpeed(10);
    setTime(10);
    setDistance(0);
    setFinishPosition(0);
    setObjectStartPosition(0);
  };

  const check = () => {
    if (!start) {
      showCustomAlert("Game belum dimulai", 'error');
    } else {
      if (speed < 1 || speed > 40) {
        showCustomAlert('Masukan kecepatan dari 1px/s sampai 40px/s', 'error');
        return;
      }
      if (time < 1 || time > 20) {
        showCustomAlert('Masukan waktu dari 1s sampai 20s', 'error');
        return;
      }

      let currentPosition: number = position; 
      let distanceInput: number = speed * time;
      let newPosition: number = currentPosition + distanceInput;
      setPosition(newPosition);

      let newDistance: number = finishPosition - newPosition;
      setDistance(newDistance);

      if (newDistance < 0) {
        showCustomAlert("YOU'VE PASSED THE LINE, GAME OVER", 'lose');
        saveGameResult("lose", newDistance);
      } else if (newDistance === 0) {
        showCustomAlert("CONGRATS, YOU'VE WON THE GAME", 'win');
        saveGameResult("win", 0);
      }
    }
  };

  const showCustomAlert = (message: string, type: 'start' | 'win' | 'lose' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const saveGameResult = async (result: string, distanceToFinish: number) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(firestore, 'game_history'), {
          userId: user.uid,
          result,
          distanceToFinish,
          timestamp: Timestamp.now(),
        });
        loadGameHistory(); // Perbarui daftar riwayat setelah menyimpan hasil
      }
    } catch (error) {
      console.error("Error saving game result:", error);
    }
  };

  const loadGameHistory = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const gameHistoryQuery = query(collection(firestore, 'game_history'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(gameHistoryQuery);
        const history = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGameHistory(history);
      }
    } catch (error) {
      console.error("Error fetching game history:", error);
    }
  };

  const renderHistoryItem = ({ item }: any) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        Result: {item.result} | Distance: {item.distanceToFinish} px | Date: {item.timestamp.toDate().toLocaleString()}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title2}>VIRTUAL TPB</Text>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.title}>GLB Distance Game</Text>
        <Text style={styles.subtitle}>Try to Reach The Finish Line</Text>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Speed 1-40 (px/s)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={speed.toString()}
              onChangeText={(text) => setSpeed(Number(text))}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Time 1-20 (s)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={time.toString()}
              onChangeText={(text) => setTime(Number(text))}
            />
          </View>
        </View>

        <View style={styles.simulation}>
          <Text style={styles.simulationTitle}>Reach the Finish Line</Text>
          <Text style={styles.goalDistance}>
            {start ? `You are ${Math.max(0, distance).toFixed(2)} px away from the goal.` : "Distance to Goal"}
          </Text>
          {start && (
            <>
              <Image
                source={require('../../../assets/images/CarToy.gif')}
                style={[styles.carToy, { left: position }]}
              />
              <View style={[styles.finishLine, { left: finishPosition }]} />
            </>
          )}
          <TouchableOpacity style={styles.checkButton} onPress={check}>
            <Text style={styles.checkButtonText}>Check</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.result}>
          <Text style={styles.resultText}>Time: {time}s</Text>
          <Text style={styles.resultText}>Speed: {speed}px/s</Text>
          <Text style={styles.resultText}>Distance: {(speed * time).toFixed(2)}px</Text>
        </View>

        <TouchableOpacity style={styles.tutorialButton} onPress={() => setShowTutorial(true)}>
          <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.tutorialButtonText}>Tutorial</Text>
        </TouchableOpacity>

        <Modal
          visible={showTutorial}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowTutorial(false)}
        >
          <View style={styles.tutorialOverlay}>
            <View style={styles.tutorialContent}>
              <Text style={styles.tutorialTitle}>How to Play</Text>
              <Text style={styles.tutorialText}>
                1. Press 'Start' to begin the game.{'\n'}
                2. Enter the speed (1-40 px/s) and time (1-20 s).{'\n'}
                3. Press 'Check' to move the car.{'\n'}
                4. Try to reach the finish line without overshooting.{'\n'}
                5. Use the GLB formula: Distance = Speed × Time
              </Text>
              <TouchableOpacity
                style={styles.closeTutorialButton}
                onPress={() => setShowTutorial(false)}
              >
                <Text style={styles.closeTutorialButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {showAlert && (
          <View style={[styles.alert, styles[`alert${alertType}`]]}>
            <Text style={styles.alertText}>{alertMessage}</Text>
          </View>
        )}

        {/* Bagian untuk menampilkan riwayat permainan */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Game History</Text>
          <FlatList
            data={gameHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  historyContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#393E46',
    padding: 15,
    borderRadius: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    backgroundColor: '#222831',
    marginBottom: 10,
    borderRadius: 5,
  },
  historyText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginTop: 40,
    marginBottom: 20,
    letterSpacing: 5,
    textAlign: 'center',
    },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#222831',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  simulation: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  simulationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#222831',
  },
  goalDistance: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: '#222831',
  },
  carToy: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
  },
  finishLine: {
    width: 5,
    height: '100%',
    backgroundColor: '#222831',
    position: 'absolute',
  },
  checkButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#00ADB5',
    padding: 10,
    borderRadius: 5,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#393E46',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  tutorialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00ADB5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  tutorialButtonText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontSize: 16,
  },
  tutorialOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  tutorialTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222831',
  },
  tutorialText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#222831',
  },
  closeTutorialButton: {
    backgroundColor: '#00ADB5',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeTutorialButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  alert: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  alertstart: {
    backgroundColor: '#4CAF50',
  },
  alertwin: {
    backgroundColor: '#4CAF50',
  },
  alertlose: {
    backgroundColor: '#F44336',
  },
  alerterror: {
    backgroundColor: '#FF9800',
  },
  alertText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GLBDistanceGame;