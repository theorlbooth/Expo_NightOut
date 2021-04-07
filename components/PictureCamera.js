import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'


const PictureCamera = () => {

  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.Back)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <></>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return <>
    <View styles={styles.container}>
      <Camera type={type} styles={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
              )
            }}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  </>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    color: 'red'
  }
})

export default PictureCamera