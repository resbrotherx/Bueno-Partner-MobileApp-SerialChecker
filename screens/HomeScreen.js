import React, {useState, useEffect} from 'react';
import { FlatList, Image, Animated,Alert, Text, View, Dimensions, TextInput, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, Button, StatusBar, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import filese from '../model/files';
import getsinglePost from '../model/api/apicall';
import {httpRequest} from '../components/loginHandle';

const BG_IMG = 'https://media.istockphoto.com/photos/abstract-blue-cyan-background-picture-id995719694?b=1&k=20&m=995719694&s=612x612&w=0&h=YnCNbO97fgYLyp2YhLEovN9-DA9mJUFWGXYi5iIu31o='
const SPACING = 20;
const AVATAR_SIZE = 30;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;


const HomeScreen = ({navigation,props}) => {

  const { colors } = useTheme();

  const theme = useTheme();

  const [search,setSearch] = useState('');

  const [feed,setFeed] = useState([]);
  const [originalfeed,originalsetFeed] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchData = ()=>{

    httpRequest({
      url: 'http://157.245.69.172/api/home',
        method: 'get'
      })
      .then((re)=>{
      originalsetFeed(re.data)
      setFeed(re.data);
      setLoading(false)
      }).catch(err=>{
        Alert.alert("somthing went wrong")
      })
      // fetch('http://157.245.69.172/api/home')
      // .then((re)=>re.json())
      // .then((re)=>{
      //   setFeed(re.data);
      // })
  }

  useEffect(() => {
    fetchData()
  }, []);
  const searchFilter = (text) => {
    if (text) {
      const newData = feed.filter((item) => {
        const itemData = item.serial_number ? item.serial_number.toUpperCase()
                    : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFeed(newData);
      setSearch(text);
    } else {
      setFeed(originalfeed);
      setSearch(text);
    }
  }

    
    return (
      <View style={styles.container}>

          <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        
            <Image
              source={{uri:BG_IMG}}
              style={StyleSheet.absoluteFillObject}
              blurRadius={80}
            />
            <View style={styles.searchs}>
            <TextInput 
                    placeholder="Search Specific Serial"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#000',
                        fontSize:19,
                        paddingLeft:20
                    }]}
                    autoCapitalize="none"
                    onChangeText={(text) => searchFilter(text)}
                    value={search}
              />
            </View>
            {feed.length < 1?
              <ActivityIndicator size={"large"} color={"#2FBBF0"}/>
                :
                <FlatList
                  data={feed}
                  keyExtraction={(item,index)=>{return item.id.toString()}}
                  onRefresh={()=>fetchData()}
                  refreshing={loading}
                  contentContainerStyle={{
                    padding:SPACING,
                    paddingTop: StatusBar.currentHeight || 42
                  }}
                  renderItem={({item, index}) => {
                    return <TouchableOpacity onPress={() => navigation.navigate('Notifications', {'screen': 'Details', params: item})}>
                    <View style={{flexDirection:'row',padding:SPACING, marginBottom:SPACING, backgroundColor:'rgba(255,255,255,0.8)', borderRadius:12,
                        shadowColor:"#000",
                        shadowOffset: {
                          width:0,
                          height:10,
                        },
                        shadowOpacity:.3,
                        shadowRadius:20,
                    }}>
                      <Image
                          source={require('../assets/default.png')}
                          style={{
                            width:AVATAR_SIZE, height:AVATAR_SIZE, borderRadius:AVATAR_SIZE,
                            marginRight: SPACING / 2
                          }}
                      />
                      <View>
                        
                        <Text style={{fontSize:22, fontSize: 22}}>{item.serial_number}</Text>
                        <Text style={{fontSize:18, opacity: .7}}>{item.contact}</Text>
                        <Text style={{fontSize:12, opacity: .8, color:'#0099cc'}}>{item.date_sold}</Text>
                      </View>
                    </View>
                    </TouchableOpacity>
                  }}

                />
            }
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'#666',
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
