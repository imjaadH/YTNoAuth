//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Alert,AsyncStorage,Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GridView from 'react-native-super-grid';
//import Button from 'react-native-button'
// create a component
class Home extends Component {

    
    static navigationOptions={
        headerTintColor: 'white',
        drawerLockMode: 'locked-closed',
        headerStyle:{
            backgroundColor:'#030027',          
          },
          headerTitleStyle:{
            color:'white',
            flex:1,
            textAlign:'center'
          },
          
          headerTitle:"Select Categories"
    }

    constructor(){
        super()
        this.state={
            list:[],
            ids:[],
            index:0,
            items :[
        { name: 'MOVIES ', code: '#ED4C67', id:30, added:false }, { name: 'SPORTS ', code: '#2ecc71', id:17, added:false },
          { name: 'VIDEOBLOGGING ', code: '#3498db', id:21, added:false  }, { name: 'COMEDY ', code: '#9b59b6', id:23, added:false },
          { name: 'EDUCATION ', code: '#34495e', id:27, added:false }, { name: 'SCIENCE ', code: '#16a085', id:28, added:false },
          { name: 'DOCUMENTARY ', code: '#27ae60', id:35, added:false }, { name: 'DRAMA ', code: '#2980b9', id:36, added:false },
          { name: 'HORROR ', code: '#f1c40f', id:39, added:false }, { name: 'SHOWS ', code: '#e67e22', id:43, added:false },   
        ],
    
            
        }
    }


    async addList(props){
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        if(this.state.list.length < 3)
{
        let array = this.state.items

var objIndex = array.findIndex((obj => obj.id === props));
if(array[objIndex].added == false){
    array[objIndex].added = true
    var daname = capitalize(array[objIndex].name)
console.log(daname)
this.state.list.push(daname)
this.state.ids.push(array[objIndex].id)
this.setState({items:array})

}
else if(array[objIndex].added == true){
    array[objIndex].added = false
    this.state.ids.pop() 
    this.state.list.pop()
    


}



console.log(this.state.list)
console.log(this.state.ids)






    console.log(this.state.items)
    this.setState(prevState => ({index: prevState.index + 1})); 
}
else 
{
    return Alert.alert('Limit reached','You can select only 3 categories, or try resetting the list. ')
}
    
    }


reset(){
    var list2=[]
    var ids2=[]
    console.log(list2)
    while(this.state.list.length > 0) {
        this.state.list.pop();
        console.log('workin')
        this.setState({list:list2})
        console.log(this.state.list)
    }

    while(this.state.ids.length > 0) {
        this.state.ids.pop();
        console.log('workin')
        this.setState({ids:ids2})
        console.log(this.state.ids)
    }


    var newD = []
    newD = this.state.items
    console.log(newD)
    newD[0].added=false
    newD[1].added=false
    newD[2].added=false
    newD[3].added=false
    newD[4].added=false
    newD[5].added=false
    newD[6].added=false
    newD[7].added=false
    newD[8].added=false
    newD[9].added=false

       this.setState({items:newD})






    console.log(this.state.list)


}

async submit(){
    const { navigate } = this.props.navigation;

    if(this.state.ids.length == 3){
        AsyncStorage.setItem('categories',JSON.stringify(this.state.ids))
        AsyncStorage.setItem('names',JSON.stringify(this.state.list))
        await AsyncStorage.setItem('userToken', 'LoggedIn');

         navigate('App');
    }
    else {
        alert('select at least 3 categories')
    }
}



    
    render() {
        
        return (

       
    <View style={styles.container}>
      <View>
        {/*<Text style={{color:'#2ed573',alignSelf:'center',fontWeight:"400"}}>{this.state.list}</Text>*/}
          
          </View>      

    <GridView
         extraData={this.state.index}
        itemDimension={120}
        items={this.state.items}
        style={styles.gridView}
        renderItem={item => (
          <TouchableOpacity  activeOpacity={1.0} style={[styles.itemContainer, { backgroundColor: item.code }]} onPress={()=>this.addList(item.id)}>
            <Text style={styles.itemName}>{item.name}</Text>

            <Icon name="done" size={26} color={item.added ?  '#fff' : 'transparent' } />
          </TouchableOpacity>
        )}
      />
<View style={{flexDirection:'row',}}>
        

            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.reset()} style={{backgroundColor:'#4b6584',borderRadius:3,width:'50%',height:50,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'rgba(0, 22, 0, 0.3)'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#fff'}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.submit()} style={{backgroundColor:'#009432',borderRadius:3,width:'50%',height:50,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'rgba(0, 22, 0, 0.3)'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#fff'}}>Done</Text>
            </TouchableOpacity>
</View>

      </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight:2,
        paddingLeft:2,
        backgroundColor: '#000',
    },
    gridView: {
        
        flex: 1,
        backgroundColor:'black'
      },
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
      },
      itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
        
      },
});

//make this component available to the app
export default Home;