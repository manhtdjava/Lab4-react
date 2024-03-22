import React, { useRef, useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import { CameraOptions, ImagePickerResponse, OptionsCommon, launchCamera } from "react-native-image-picker";

const Bai1 = () => {
    const [image, setImage] = useState([])
    const commonOptions: OptionsCommon ={
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
    };
    const cameraOptions : CameraOptions ={
        cameraType: 'front',
        saveToPhotos: true,
        ...commonOptions,
    }

    const onOpenCamera = async ()=>{
        const reponse : ImagePickerResponse = await launchCamera(cameraOptions);
        if(reponse?.assets){
            setImage(reponse.assets);
        }else{
            Alert.alert('Co loi ', reponse.errorMessage);
        }
    }
    return (
        <SafeAreaView style={styles.container}> 
            <Image source={{uri: image?.[0]?.uri || 
                    'https://th.bing.com/th/id/OIP.0Dyeq_52EESdiwfLD2YrHQHaE0?rs=1&pid=ImgDetMain'
            }} resizeMode="cover" style={styles.img}/>
            <TouchableOpacity style={styles.captureButton} onPress={()=> onOpenCamera()}>
                <Text style={styles.captureText}>Chup anh</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        height: '75%',
    },
    captureButton: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
    },
    captureText: {
        color: 'white',
    },
    img:{
        width: 200,
        height: 200,
        borderRadius: 200
    }
});

export default Bai1;
