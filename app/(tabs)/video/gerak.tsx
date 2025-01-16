import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import Navbar from '../../../components/navbar';

const VideoScreen: React.FC = () => {
  const videos = [
    { id: 1, title: 'Pengantar Gerak Lurus', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 2, title: 'Gerak Lurus Beraturan', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 3, title: 'Gerak Lurus Berubah Beraturan', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ];

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Video Pembelajaran</Text>
        {videos.map((video) => (
          <View key={video.id} style={styles.videoContainer}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <WebView
              style={styles.video}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: video.url }}
            />
          </View>
        ))}
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
  videoContainer: {
    marginBottom: 30,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEEEEE',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 200,
  },
});

export default VideoScreen;