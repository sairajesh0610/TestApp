import React, { Component } from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, Text, View, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itunesData: [],
            modalVisible: false,
            selectedItune:{}
        }
    }

    componentWillMount() {
        this.getItunesData();
    }

    getItunesData(){
        fetch('https://itunes.apple.com/search?term=Michael+jackson')
        .then(response => response.json()).then((data) => 
            this.setState({itunesData:data.results})
        ).catch((error) => {
            console.error('Error:', error);
        });
    }

    openItuneDetails = (visible,selectedItem={}) => {
        this.setState({ modalVisible: visible, selectedItune:selectedItem });
      }




  

    render() {
        const { itunesData, modalVisible,selectedItune } = this.state;
       
        return (
            <SafeAreaView style={{ flex: 1 }}>
               <View style={styles.header}>
                    <Text style={styles.headerTitle}>Michael Jackson songs</Text>
               </View>
               <FlatList 
                data={itunesData}
                keyExtractor={(item, index) => item.trackId + '__' + index}
                initialNumToRender={10}
                renderItem={({item}) => (
                    <TouchableOpacity
                     activeOpacity={0.6}
                      key={item.trackId}
                      onPress={() => {
                        this.openItuneDetails(true,item);
                      }}
                     >
                      <View style={styles.listItem}>
                        <Image  source={{uri: item.artworkUrl100}} style={styles.thumbImage} />
                        <View style={{width:'80%'}}>
                            <Text style={styles.artistName}>{item.artistName}</Text>
                            <Text style={styles.title} numberOfLines={1}>{item.trackName}</Text>   
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
               />
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    this.openItuneDetails(false);
                }}
               >
                   <View style={{flex:1}}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                 onPress={()=>{
                                    this.openItuneDetails(false);
                                }}
                            >
                                <Image  source={require('../imgs/Left_Arrow.png')} 
                                style={{height:40,width:40,marginRight:6}} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle} numberOfLines={1}>{selectedItune.trackName}</Text>
                        </View>
                        <ScrollView>
                            <Image  source={{uri: selectedItune.artworkUrl100}} style={styles.imageStyle} />
                            <View style={{paddingHorizontal:20}}>
                                <Text style={{...styles.artistName,fontSize:14}}>{selectedItune.artistName}</Text>
                                <Text style={{...styles.title, fontSize:18,lineHeight:26,fontWeight:'bold'}}>{selectedItune.trackName}</Text>   
                                <Text style={{...styles.title, fontSize:16,marginVertical:8,fontWeight:'700', color:'#6572D3'}}>Description</Text>
                                <Text style={{...styles.title,color:'#333',fontWeight:'400',lineHeight:20}}>{selectedItune.longDescription}</Text>
                            </View>
                        </ScrollView>
                       
                   </View>

               </Modal>
              
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        height: 50,
        borderBottomColor: '#f7f7f7',
        borderBottomWidth: 1,
        shadowColor: '#aaa',
        shadowOpacity: 0.7,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 12,
        alignItems: 'center'
    },
    headerTitle:{
        fontSize:16,
        fontWeight:'700',
        width:'80%'
    },
    listItem:{
        backgroundColor:'#fff',
        flex:1,
        flexDirection:'row',
        padding:8,
        alignItems:'center',
        borderBottomColor:'#f7f7f7',
        borderBottomWidth:1 
    },
    thumbImage:{
        height:54,
        width:54,
        borderRadius:27,
        marginRight: 20,
    },
    imageStyle:{
        height:190,
        width:190,
        borderRadius:95,
        alignSelf:'center',
        marginVertical:20
    },
    title:{
        fontSize:14,
        fontWeight:'500',
        lineHeight:22
    },
    artistName:{
        fontSize:12,
        color:'#333'
    },
    
})

export default HomePage;