import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signUp } from '../../shared/services/authService';
import { emitEvent } from '../../shared/utils/eventBus';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password);
      // Emit a user sign-up event to Firestore
      await emitEvent('userSignUp', { userId: user.uid, email: user.email });
      navigation.navigate('Login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;