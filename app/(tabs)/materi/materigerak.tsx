import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../../../components/navbar';
interface MaterialCardProps {
    title: string;
    description: string;
    url: string;
  }
  
const MateriGerak: React.FC = () => {
    const MaterialCard: React.FC<MaterialCardProps> = ({ title, description, url }) => (
    <View style={styles.materialCard}>
      <Ionicons name="book-outline" size={48} color="#00ADB5" />
      <Text style={styles.materialTitle}>{title}</Text>
      <Text style={styles.materialDescription}>{description}</Text>
      <TouchableOpacity
        style={styles.readButton}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.readButtonText}>Read Me</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Daftar E-Book</Text>
        <MaterialCard
          title="GLB dan GLBB"
          description="Gerak suatu benda pada lintasan lurus yang mempunyai kecepatan tetap atau berubah tergantung percepatan."
          url="https://www.ruangguru.com/blog/perbedaan-glb-dan-glbb"
        />
        <MaterialCard
          title="Gerak Melingkar"
          description="Gerak melingkar adalah gerak menempuh lintasan melingkar dengan kecepatan tetap atau berubah"
          url="https://www.ruangguru.com/blog/gerak-melingkar-beraturan-dan-penjelasannya"
        />
        <MaterialCard
          title="Gerak Parabola"
          description="Gerak parabola adalah gerak menempuh lintasan yang berbentuk kurva dengan kecepatan tetap atau berubah"
          url="https://www.ruangguru.com/blog/rumus-gerak-parabola"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 20,
    textAlign: 'center',
  },
  materialCard: {
    backgroundColor: '#393E46',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  materialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEEEEE',
    marginTop: 10,
    marginBottom: 5,
  },
  materialDescription: {
    fontSize: 14,
    color: '#EEEEEE',
    textAlign: 'center',
    marginBottom: 15,
  },
  readButton: {
    backgroundColor: '#00ADB5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  readButtonText: {
    color: '#EEEEEE',
    fontWeight: 'bold',
  },
});

export default MateriGerak;