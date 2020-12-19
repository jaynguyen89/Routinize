import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

export const openCamera = (task : string, saveMediaToLocalStorage : any) => {
    if (task === 'image') { //Take photo
        ImagePicker.launchCamera({
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response: any) => saveMediaToLocalStorage(response, 'image'));
    }
    else { //Record video
        ImagePicker.launchCamera({
                mediaType : 'video'
            },
            (response : any) => saveMediaToLocalStorage(response, 'video'));
    }
}

export const openGallery = (task : string, saveMediaToLocalStorage : any) => {
    if (task === 'image') { //Select photo
        ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response: any) => saveMediaToLocalStorage(response, 'image'));
    }
    else { //Select video
        ImagePicker.launchImageLibrary({
                mediaType : 'video'
            },
            (response : any) => saveMediaToLocalStorage(response, 'video'));
    }
}

export const selectFiles = async (saveFileToLocalStorage : any, saveMediaToLocalStorage : any) => {
    try {
        const files = await DocumentPicker.pickMultiple({ type : ["*/*"] });

        files.forEach(file => {
            if (file.type.indexOf('audio') !== -1) saveMediaToLocalStorage(file, 'audio');
            else saveFileToLocalStorage(file, 'others');
        });
    } catch (error) {
        if (!DocumentPicker.isCancel(error)) console.log('selectFiles: ' + error);
        return error.message;
    }
}