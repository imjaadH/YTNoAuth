//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Image,TouchableOpacity,StatusBar,Alert,AsyncStorage,ActivityIndicator,Button } from 'react-native';
import FastImage from 'react-native-fast-image'
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
const LINK = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,player,contentDetails&maxResults=40&key=AIzaSyAeoJnFtKPTajCvIqNr-TyRruzwRZ1qMsY&chart=mostPopular&regionCode=us&videoCategoryId='

// create a component
class Sports extends Component {


    static navigationOptions =({navigation})=> ({

        title:typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Loading': navigation.state.params.title,
        tabBarLabel:typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Loading': navigation.state.params.title,
        headerStyle:{
            //elevation:0,

        },
        headerTitleStyle: { textAlign:"center",alignSelf:"center"},
        headerLeft: (
        <View style={{left:5}}><Icon name="menu" size={27} color="#fff" onPress={()=>navigation.navigate('DrawerOpen')}/></View>

    ),

       
});


    constructor(){
        super()
        this.state={
            store:[],
            selected:[],
            notified:false,
            index:0,  
            isLoading: false

        }
    }
   async componentDidMount(){
    this.setState({isLoading: true})

var names = await AsyncStorage.getItem('names')
var conames =JSON.parse(names)
this.setState({datitle:conames[0]})
var name1 = conames[0]
this.props.navigation.setParams({ title: name1 })
    var res = await AsyncStorage.getItem('categories')
    var final = JSON.parse(res)
    console.log(final)
        axios.get(LINK+final[0])
  .then((response) => {
    console.log(response);
    this.setState({store:response.data.items})
    this.setState({isLoading: false})

  })
  .catch((error) => {
    this.setState({isLoading: false})
    Alert.alert('Ops..','Request failed, please check your internet connection')
    console.log(error);
  });


  

    }


    showTime(props) {
        var match = props.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      
        match = match.slice(1).map(function(x) {
          if (x != null) {
              return x.replace(/\D/, '');
          }
        });
      
        var hours = (parseInt(match[0]) || 0);
        var minutes = (parseInt(match[1]) || 0);
        var seconds = (parseInt(match[2]) || 0);
      
        var ans= (hours * 3600 + minutes * 60 + seconds)/60;
        var ddew = ans.toFixed(0);
        return <Text style={{color:'red'}}>{ddew} minutes</Text>
      }


        async addChannel(props){
        var store =[]
        this.state.selected.push(props)
        console.log(this.state.selected)
        
            let value = await AsyncStorage.getItem('channels');
            if (value != null){
                var arr1 = (JSON.parse(value))
                var arr2 = this.state.selected
                Array.prototype.push.apply(arr1, arr2);
                this.state.selected.pop()
                console.log('after pushing new values')
            console.log(arr1)
            AsyncStorage.setItem('channels',JSON.stringify(arr1))
            console.log('data pushed')
            Alert.alert('Added','Channel added to the list.')

        
            }
            else if(value == null){
                AsyncStorage.setItem('channels',JSON.stringify(this.state.selected))
                console.log('friends store is null')
                console.log('new items pushed')
                this.state.selected.pop()
                let res = await AsyncStorage.getItem('channels');
                var arr = (JSON.parse(res))
                console.log('the result updated : '+arr)
                Alert.alert('Added','Channel added to the list.')

                // do something else
           }

      }



    render() {

        return (

            <View style={styles.container}>
<StatusBar
     backgroundColor="#0b091e"
     barStyle="light-content"
   />

   {this.state.isLoading ? (
    <ActivityIndicator
      animating
      color="#e00"
      size="large"
      style={styles.activityIndicator}
    />
  ) : 
  <View>
  
  <FlatList
  showsHorizontalScrollIndicator={false}
  //extraData={this.state.index}
//horizontal={true}
keyExtractor={(item, index) => index.toString()}
data={this.state.store}
extraData={this.state.index}
renderItem={({item}) => (
  <View style={{marginVertical:10}}>
<Text style={{color:'white',fontWeight:"600"}}>{item.snippet.localized.title}</Text>
<Text style={{color:'white'}}>{item.snippet.channelTitle}</Text>
{this.showTime(item.contentDetails.duration)}
<View style={{flexDirection:'row',alignItems:'center'}}>
<Text style={{color:'white'}}>Add to favourites </Text>
<Icon name="add-circle" color='#e00' size={26} onPress={()=>this.addChannel(item.snippet.channelId,item.id)}/>
</View>
<TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('webview',{id:item.id})}>
<FastImage
style={{width:400,height:280,alignSelf:'center'}}
source={{
uri: item.snippet.thumbnails.high.url,
priority: FastImage.priority.normal,

}}
resizeMode={FastImage.resizeMode.contain}
/>
</TouchableOpacity>

  </View>
)}/>
</View>}
        
       </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:5,
        backgroundColor: '#000',
    },activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
      }
});

//make this component available to the app
export default Sports;



{/*try {
    let value = await AsyncStorage.getItem('channels');
    if (value != null){
        var arr1 = (JSON.parse(value))
        var arr2 = this.state.selectedFruits
        Array.prototype.push.apply(arr1, arr2);
        console.log('after pushing new values')
    console.log(arr1)
    AsyncStorage.setItem('friends',JSON.stringify(arr1))
    this.setState({list:arr1})
        this._toggleModal()               


    }
    else if(value == null){
        AsyncStorage.setItem('friends',JSON.stringify(this.state.selectedFruits))
        console.log('friends store is null')
        console.log('new items pushed')
        this.setState({list:this.state.selectedFruits})

        this._toggleModal()               
        // do something else
   }
 } catch (error) {
   // Error retrieving data
 }
*/}