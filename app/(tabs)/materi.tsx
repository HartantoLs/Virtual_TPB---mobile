//materi
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Navbar from '../../components/navbar';

const SubjectBox: React.FC<{
  title: string;
  description: string;
  icon: string;
  isActive?: boolean;
  onPressMateri?: () => void;
  onPressVideo?: () => void;
  onPressGame?: () => void;
}> = ({ title, description, icon, isActive = false, onPressMateri, onPressVideo, onPressGame }) => (
  <View style={styles.box}>
    <Ionicons name={icon as any} size={48} color="#00ADB5" />
    <Text style={styles.boxTitle}>{title}</Text>
    <Text style={styles.boxDescription}>{description}</Text>
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={[styles.iconButton, !isActive && styles.buttonDisabled]} onPress={onPressMateri} disabled={!isActive}>
        <Ionicons name="book-outline" size={24} color="#F0F8FF" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconButton, !isActive && styles.buttonDisabled]} onPress={onPressVideo} disabled={!isActive}>
        <Ionicons name="videocam-outline" size={24} color="#F0F8FF" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconButton, !isActive && styles.buttonDisabled]} onPress={onPressGame} disabled={!isActive}>
        <Ionicons name="game-controller-outline" size={24} color="#F0F8FF" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>VIRTUAL TPB</Text>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>DAFTAR MATERI FISIKA DASAR</Text>
          <Text style={styles.contentSubtitle}>Materi yang berkaitan dengan Fisika Dasar IA</Text>

          <View style={styles.subjectGrid}>
            <SubjectBox
              title="Gerak"
              description="Materi gerak benda"
              icon="nuclear-outline"
              isActive={true}
              onPressMateri={() => router.push('/(tabs)/materi/materigerak')}
              onPressVideo={() => router.push('/video/gerak')}
              onPressGame={() => router.push('/game/gerak')}
            />
            <SubjectBox
              title="Hukum Newton"
              description="Coming Soon"
              icon="barbell-outline"
              isActive={false}
            />
            <SubjectBox
              title="Fluida"
              description="Coming Soon"
              icon="water-outline"
              isActive={false}
            />
            <SubjectBox
              title="Listrik"
              description="Coming Soon"
              icon="flash-outline"
              isActive={false}
            />
          </View>
        </View>

        <Text style={styles.footer}>Developed by Hartanto & Louis</Text>
      </ScrollView>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginTop: 40,
    marginBottom: 20,
    letterSpacing: 5,
  },
  navLinkContainer: {
    paddingHorizontal: 10,
  },
  navLink: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    paddingVertical: 15,
    backgroundColor: 'rgba(57, 62, 70, 0.3)',
    borderRadius: 25,
    marginBottom: 20,
  },
  
  content: {
    width: '90%',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 10,
    textAlign: 'center',
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#B0BEC5',
    marginBottom: 20,
    textAlign: 'center',
  },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '48%',
    backgroundColor: '#393E46',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F0F8FF',
    marginTop: 10,
    marginBottom: 5,
  },
  boxDescription: {
    fontSize: 12,
    color: '#B0BEC5',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: '#00ADB5',
    padding: 6,
    paddingVertical: 8,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#F0F8FF',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#222831',
  },
});