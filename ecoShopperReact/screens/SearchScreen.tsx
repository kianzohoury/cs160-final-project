import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { useTheme, NavigationContainer } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';

import { BlackButton } from '../components/BlackButton';
import { HomeEcoScore } from '../components/HomeEcoScore';
import { HomeButtons } from '../components/HomeButtons';
import { HomeHistory } from '../components/HomeHistory';

export default function SearchScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  const onSubmitChange = (e: any) => {
    navigation.navigate('Loading');
    const getResult = (code: any) =>
      fetch(`http://e1c925f9a2ba.ngrok.io/ecoshopper/barcode/${code}`)
        .then(resp => resp.json())
        .then(json => {
          console.log(json);
          navigation.pop();
          navigation.navigate('FoundScreen', {
            screen: 'Overview',
            params: json
          });
        })
        .catch(err => {
          console.error(err);
          navigation.navigate('NotFoundScreen');
        })
    getResult(searchQuery);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
      paddingTop: 50,
      paddingHorizontal: 20
    },
    imageBackground: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 100
    },
    input: {
      fontSize: 30,
      width: 300,
      textAlign: 'center',
      marginBottom: 100,
      borderBottomWidth: 2
    },
  });


  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        onSubmitEditing={onSubmitChange}
        value={searchQuery}
      />
    </View>
  );
}
