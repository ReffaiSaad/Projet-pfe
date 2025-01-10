import React from 'react';
import { View } from 'react-native';
import SignUpScreen from './screens/SignUpScreen'; // Assurez-vous que le chemin est correct

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <SignUpScreen />
    </View>
  );
}
