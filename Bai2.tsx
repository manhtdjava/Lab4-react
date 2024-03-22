import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from "react-native";
import { ImageLibraryOptions, ImagePickerResponse, OptionsCommon, launchImageLibrary } from "react-native-image-picker";

const Bai2 = () => {
    const [image, setImage] = useState([]);

    const commonOptions: OptionsCommon = {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500
    };

    const libraryOptions: ImageLibraryOptions = {
        selectionLimit: 10,
        ...commonOptions,
    };

    const onOpenLibrary = async () => {
        try {
            const response: ImagePickerResponse = await launchImageLibrary(libraryOptions);
            if (response?.assets) {
                setImage(response.assets);
            } else if (response?.errorMessage) {
                Alert.alert('Error', response.errorMessage);
            }
        } catch (error) {
            console.error('Error opening image library:', error);
            Alert.alert('Error', 'An error occurred while opening the image library.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={{ uri: image?.[0]?.uri || 'https://th.bing.com/th/id/OIP.0Dyeq_52EESdiwfLD2YrHQHaE0?rs=1&pid=ImgDetMain' }}
                resizeMode="cover"
                style={styles.img}
            />
            <TouchableOpacity style={styles.captureButton} onPress={onOpenLibrary}>
                <Text style={styles.captureText}>Select Image</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Bai2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
    },
    captureText: {
        color: 'white',
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 200,
        marginVertical: 20,
    },
});
