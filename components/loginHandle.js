import RootNavigation from '../RootNavigation.js';
import AsyncStorage from '@react-native-community/async-storage';

export async function httpRequest({ url, data, method }) {
  const header = await generateHeader()
  console.log('header this the one',header)
  // const header = {}
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...header
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  if (data) requestOptions['body'] = PrepareData(data, 'json');

  return await fetch(`${url}`, requestOptions)
    .then(async (res) => {
      if(res.status==401){
        // RootNavigation.navigate('SignInScreen', {});
        alert('please login')
        return;
      }
      console.log(res)
      return await res.json();
    })
    .then(async (data) => {
      return data;
    })
}

export function PrepareData(Data, type = "json") {
    //change default based on app's api default content type
    if (type === "json") {
        return JSON.stringify(Data)
    } else if (type === "multipart") {
        const formData = new FormData()
        Object.keys(Data).forEach((e) => {
            formData.append(e, Data[e])
        });
        return formData;
    }
}
  
const generateHeader = async () => {
  var cons = await getToken()
  if(!cons) return{};
  return {
    Authorization: `Token ${cons}`,
  };
}

export const getToken = async () => {
  try{
   return await AsyncStorage.getItem('userToken');
  }

  catch(err){
    return '';
  }
}