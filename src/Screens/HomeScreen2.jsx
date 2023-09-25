import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const HomeScreen = ({navigation, route}) => {
  // Extract the user data from the route parameter
  const userData = route.params?.userData;
  const SignOut = () => {
    GoogleSignin.signOut();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Home Screen</Text>

      {userData && (
        <View style={styles.userData}>
          <Text>User Information:</Text>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
        </View>
      )}

      <Button title="Sign Out" onPress={SignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userData: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default HomeScreen;
