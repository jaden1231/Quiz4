

import React, { useState, useEffect } from "react";
import { View,
Text,
FlatList,
StyleSheet,
Alert,
TextInput,
Button,
TouchableOpacity } from "react-native";

export default function Quiz() {
 const githubURL = "https://api.github.com/users/%username%/repos";
 const [githubApiResult, setGithubApiResult] = useState([]);

 const [userInput, setUserInput] = useState();
 const [showRepos, setShowRepos] = useState(false);

 useEffect(() => {
   if (userInput != null) {
       fetchGithub(githubURL.replace("%username%", userInput ));
   } else {
       setGithubApiResult([{"name" : "None"}])
   }
 }, []);


 async function fetchGithub(url) {
   await fetch(url)
     .then((apiResponse) => apiResponse.json())
     .then((jsonResponse) => {
       setGithubApiResult(jsonResponse);
     })
     .catch((error) => {
       console.error(error);
     });
 }


 function renderRepo(repo) {
   return (
     <View style={{backgroundColor: "lightgray",
   padding: 10,
   margin: 10,
   marginRight: 60,}}>
       <Text style={{fontSize:20}}>{repo.item.name}</Text>
     </View>
   );
 }


 async function usernameChange() {
   if (showRepos == false) {
       if (userInput != null) {
           setUserInput(userInput);
           await fetchGithub(githubURL.replace("%username%", userInput));
       }
   }
   setShowRepos(!showRepos)
 }

 return (
   <View style={styles.container}>
     <View style={{backgroundColor: "black", alignItems: "center", height: 50,}}>
       <Text style={{color: "red", fontSize: 25,}}>Github Viewer</Text>
     </View>
     <View style={{flex: 1,}}>
       <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "flex-start"}}>
         <Text style={{fontSize: 30, alignSelf: "center"}}>github Id: </Text>
         <TextInput style={{fontSize: 25}}
         placeholder={"userid"}
         value={userInput}
         onChangeText={(text) => setUserInput(text)} />
       </View>
       <TouchableOpacity onPress={() => usernameChange()}>
         <Text style={{ color: "blue"}}>
         {showRepos ? "hide" : "show"} repositories
         </Text>
       </TouchableOpacity>
       {showRepos ?
         <FlatList
           data={githubApiResult}
           keyExtractor={(item, index) => index.toString()}
           renderItem={(item) => renderRepo(item)}
           extraData = {userInput}
           ListFooterComponent={
               <View>
                   <Text>DEBUG</Text>
                   <Text>User ID: {userInput}</Text>
                   <Text>Show Repos: {showRepos.toString()}</Text>
                   <Text>Repos Size: {githubApiResult.length}</Text>
                   <Text>API URL: {githubURL}</Text>
               </View>
             }
         /> :
     <View style={{backgroundColor: "lightgray", padding: 10}}>
             <Text style={{fontSize:25}}>NONE</Text>
     </View>
         }

     </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: "center",
   backgroundColor: "#f3f2f5",
   marginVertical:20,
 },
});
