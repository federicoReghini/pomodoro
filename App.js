import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// COMPONENTS AND FEATURES
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/timer';
import { paddingSizes } from './src/utils/sizes';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
}

export default function App() {

  const [focusSubject, setFocusSubject] = useState(null);
  const [history, setHistory] = useState([]);
  
  const addHistoryWithStatus = (subject, status) => {
    setHistory([...history, {key: String(history.length + 1), subject, status }])
  }

  const onClear = () => {
    setHistory([]);
  }

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(history));
    } catch(e) {
      console.log(e);
    }
  }
  
  const loadHistory = async () => {
    try {
      const load = await AsyncStorage.getItem("focusHistory");

      if(load && JSON.parse(load).length) {
        setHistory(JSON.parse(load));
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadHistory();
  }, [])

  useEffect(() => {
    saveHistory();
  }, [history])
  
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject={focusSubject} 
        onTimerEnd={() => {
          addHistoryWithStatus(focusSubject, STATUSES.COMPLETE);
          setFocusSubject(null);
        }}
        clearSubject={() =>{
          addHistoryWithStatus(focusSubject, STATUSES.CANCELLED);
          setFocusSubject(null)}
        } 
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={history} onClear={ onClear } />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? paddingSizes.md : paddingSizes.lg,
    backgroundColor: '#451c75'
  },
});
