import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Carousel from 'react-native-snap-carousel';

const HomeScreen = ({navigation, route}) => {
  const userData = route.params?.userData;

  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(10);

  const apiUrl =
    'https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setCarouselData(data.photos);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderCarouselItem = ({item, index}) => (
    <View style={styles.carouselItem}>
      <Image
        source={{uri: item.url}}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </View>
  );

  const SignOut = async () => {
    try {
      await GoogleSignin.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50}}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to the Home Screen</Text>
        <Carousel
          layout={'default'}
          data={carouselData}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get('screen').width}
          // sliderWidth={500}
          itemWidth={300}
          // useScrollView={true}
          onSnapToItem={index => setActiveIndex(index)}
        />
        {userData && (
          <View style={styles.userData}>
            <Text>User Information:</Text>
            <Text>Name: {userData.name}</Text>
            <Text>Email: {userData.email}</Text>
          </View>
        )}

        <Button title="Sign Out" onPress={SignOut} />
      </View>
    </SafeAreaView>
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
  carouselItem: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 250,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  carouselImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carouselDescription: {
    fontSize: 16,
  },
});

export default HomeScreen;
