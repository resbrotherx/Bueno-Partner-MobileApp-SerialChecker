import React, {useState, useEffect}  from 'react';
import { FlatList, Image, Animated, Text, View, Dimensions, TextInput, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, Button, StatusBar, ActivityIndicator } from 'react-native';

const ProfileScreen = (props) => {
      const [value, setValue] = useState('');
      const [result, setResult] = useState([]);
      console.log("kkkkkkkkkkkkkkkkkhh", (props.route.params.item))
      useEffect(() => {
        if(value.length > 0){
          fetch('http://157.245.69.172/api/home').then(
            response => response.json()
          ).then(responseData => {
            setResult([]);
            let searchQuery = value.toLowerCase();
            for(const key in response){
              let fruit = responseData[key].serial_number.toLowerCase();
              if(fruit.slice(0, searchQuery.length).indexof(searchQuery) !== -1){
                setResult(prevResult => {
                  return [...prevResult, responseData[key].serial_number]
                });
              }
            }
          }).catch(error => {
            console.log(error);
          })
        }else{
          setResult([]);
        }
      }, [value])

    return (

      <View style={styles.searchs}>
            <TextInput 
                    placeholder="Search Spacific Serial"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#000',
                        fontSize:19,
                        paddingLeft:20
                    }]}
                    autoCapitalize="none"
                    onChangeText={(event) => setValue(event.target.value)}
                    value={value}
              />

      
        <View>
          {result.map((result, index) => (
            <Text key={index}>
              <View>
                {result}
              </View>
            </Text>
          ))}

        </View>
       
      </View>

    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'#666',
    alignItems: 'center', 
    justifyContent: 'center'
},
textInput: {
  height:50,
  width:'90%',
  backgroundColor:'#F0F8FF',
  borderRadius:10,
  paddingLeft:15,
  marginTop:20
},
searchs: {
  display:'flex',
  alignItems:'center',
},
});
