import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomSnackBar from "./Components/Snackbar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [snackbarmessage,setsnackbarmessage] = useState('')
  const [snackbarvisible,setsnackbarvisible] = useState(false)
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit !!', 'Are you sure you want to exit ?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp()
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { id: messages.length, text: inputText }]);
      setInputText("");

      // Display toast message
      Toast.show({
        type: "success",
        text1: "Message Sent",
        visibilityTime: 2000,
      });
    } else {
      // Display error toast for empty message
      Toast.show({
        type: "error",
        text1: "Message cannot be empty",
        visibilityTime: 2000,
      });
    }
  };
   

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
       <ImageBackground style={styles.containerimage}
        source={require('./Components/images/img.jpg')}>
           <View style={styles.header}>
            <Text style={styles.headerText}>Andriod Developer</Text>
          </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
         <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.attachmentButton} >
          {/* Use the attachment icon from the icon library */}
          <Icon name="paperclip" size={25} color="#A020F0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Icon name="send" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.micButton}  onPress={() =>{
      setsnackbarmessage("Hold to Record")
      setsnackbarvisible(true)
    }}>
            <Icon name="microphone" size={20} color="white" />
          </TouchableOpacity>
      </View>

      {/* Toast message component */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <CustomSnackBar 
      message={snackbarmessage}
      visible={snackbarvisible}
      onDismiss={()=>{
        setsnackbarvisible(false)
      }}
      />
      </ImageBackground>

    </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    top:40,
  },
  messageContainer: {
    padding: 8,
    backgroundColor: "#000000",
    borderRadius: 8,
    margin: 8,
    maxWidth: "50%",
    marginHorizontal:18,
    marginTop:10
  },
  messageText: {
    fontSize: 16,
    color:"#A020F0"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d49cd6",
    bottom: 50,
    borderRadius:25,
    width:"84%",
    marginStart:10
  },
  input: {
    flex: 1,
    height: 47,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#A020F0",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft:-60,
    marginRight:8,
  },
  attachmentButton:{
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft:-100,
    marginRight:60,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  containerimage:{
    height:"100%",
    width:"100%",
    opacity:0.7,
  },
  micButton:{
    marginRight:-46,
    backgroundColor: "#A020F0",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  header: {
    padding: 16,
    backgroundColor: "#A020F0",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft:-190
  },
});

export default ChatPage;