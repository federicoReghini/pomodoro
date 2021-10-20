import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
      <Text
        style={[styles(size).text, textStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>

  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
      borderWidth: 1,
    },
    text: {
      color: '#fff', 
      fontSize: size / 3, 
      padding: 1,
      textShadowColor: '#000',
      textShadowOffset: { width: 0.5, height: 0.5 },
      textShadowRadius: 1,
      },
  });
