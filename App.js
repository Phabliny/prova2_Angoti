import { StyleSheet, Text, View, Button, Image, StatusBar, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


export default function App() {
  const [data, setData] = useState(new Date());
  const [dados, setDados] = useState(null);
  const [enviar, setEnviar] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setData(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: data,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const buscar = () => {
    const endereco = 'https://api.nasa.gov/planetary/apod?api_key=RrUmx5rvR7rgERTal3hNv1jMHjcgVZQcap14LceQ&date=' + data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate()
    console.log('---------------- ' + endereco)
    fetch(endereco)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setDados(json.url)
      })
      .catch(error => {
        console.error('error', error);
      })
  }
  // const formataDia = () =>{
  //   let dia = ''
  //   (data.getDate()<10? dia=('0'+data.getDate()).toLocaleString() : dia=data.getDate())
  // }

  return (
    <View style={styles.container}>
      {!dados ? (
        <>
          <Text style={styles.textoData}>{data.getDate()}/{data.getMonth()+1}/{data.getFullYear()}</Text>
          <View style={styles.botao}>
            <Button title="Escolher data" onPress={showDatepicker} />
          </View>
          <View style={styles.botao}>
          <Button title="buscar" onPress={() => buscar()} />
          </View>
          
        </>
      ) : (
        <TouchableOpacity style={{ flex: 1, width: "100%", height: "100%" }} onPress={() => setDados(null)} >
          <Image source={{ uri: dados }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
        </TouchableOpacity>
      )
      }
      <StatusBar />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoData: {
    fontSize: 24,
  },
  botao: {
    margin: 11,
  }
});
