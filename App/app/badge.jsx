import React, { useEffect } from 'react';
import { View, Button, Platform, Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const ShareImage = () => {
  const [imageUri, setImageUri] = React.useState(null);


  useEffect(()=>{
    const loadAsset = async () => {
      const asset = Asset.fromModule(require('./../assets/images/logo.png'));
      await asset.downloadAsync();
      setImageUri(asset.localUri || null);
    }
    loadAsset();

  }, [])
  

  // Function to share image
  const shareImage = async () => {
    try{
      if(imageUri){
        await Sharing.shareAsync(imageUri);
      }
      else{
        console.log('Image not found');
      }
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('./../assets/images/logo.png') }
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Button title="Share Image" onPress={shareImage} />
    </View>
  );
};

export default ShareImage;

