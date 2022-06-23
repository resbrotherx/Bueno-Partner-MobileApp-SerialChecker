import React, {use} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {httpRequest} from '../components/loginHandle';  
import {getToken} from '../components/loginHandle';

const DetailsScreen = (props) => {
    const sendFile = async () => {
      const result = await httpRequest({
            url: 'http://157.245.69.172/api/verify',
            data: {user_id: await getToken(), sold_id:(props.route.params.id)},
            method: 'post'
        })
      console.log(result)
      if(result){
        alert("Serial Number has been Archive successfull")
        props.navigation.goBack()
      }else("Failed")
    }
    console.log("kkkkkkkkkkkkkkkkkhh", (props.route.params))
    const navigation = props.navigation
    const item = props.route.params.item
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Serial Details</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Serial Numbers</Text>
            <View style={styles.action}>
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={props.route.params.serial_number}
                />
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Contact Number</Text>
            <View style={styles.action}>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={props.route.params.contact}
                />

            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Date Created</Text>
            <View style={styles.action}>
            
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"

                    value={props.route.params.date_created}

                />
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Time Created</Text>
            <View style={styles.action}>
            
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={props.route.params.time_created}
                />
            </View>

             <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Date Sold</Text>
            <View style={styles.action}>
            
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={props.route.params.date_sold}
                />
            </View>

             <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Time Sold</Text>
            <View style={styles.action}>
            
                <TextInput 
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={props.route.params.time_sold}
                />
            </View>


                 <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#154478',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => sendFile()}
                >
                    <Text style={[styles.textSign, {
                        color: '#154478'
                    }]}>Archive Serial Number</Text>
                </TouchableOpacity>
           
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#134076'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });

