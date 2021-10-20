import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes } from '../../utils/sizes.js'

export const Focus = ({ addSubject }) => {
  const [focusItem, setFocusItem] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}> What would you like to focus on?</Text>
        <View style={styles.inputContainer}>

          <TextInput style={styles.inputText}
            value= { focusItem }
            onSubmitEditing={
              ({ nativeEvent }) => {
                setFocusItem(nativeEvent.text)
              }
            }
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() =>
            addSubject(focusItem)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  innerContainer: {
    flex: 0.7,
    padding: Platform.os === 'android' ? 16 : 50,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.md,
  },
  inputContainer: {
    paddingTop: paddingSizes.lg,
    flexDirection: "row",
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    marginRight: 20,
  }
});
