import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, CircleCheck as CheckCircle, RefreshCcw, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Platform } from 'react-native';

export const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const cameraRef = useRef(null);
  
  // Animation values
  // const scanLinePosition = useSharedValue(0);
  // const overlayOpacity = useSharedValue(0);
  // const successMessageScale = useSharedValue(0);
  
  // Request camera permissions if not already granted
  useEffect(() => {
    requestPermission();
  }, []);
  
  // Start scan animation
  useEffect(() => {
    if (!photoTaken && !isVerifying && !isVerified) {
      // scanLinePosition.value = 0;
      const duration = 2000;
      
      // Animation loop function
      // const animateScanLine = () => {
      //   scanLinePosition.value = 0;
      //   scanLinePosition.value = withTiming(1, { 
      //     duration,
      //     easing: Easing.linear
      //   }, () => {
      //     if (!photoTaken && !isVerifying && !isVerified) {
      //       setTimeout(animateScanLine, 500);
      //     }
      //   });
      // };
      
      // Start the animation
      // animateScanLine();
    }
  }, [photoTaken, isVerifying, isVerified]);
  
  // Scan line animation style
  // const scanLineStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateY: scanLinePosition.value * 280 }],
  //     opacity: withTiming(photoTaken ? 0 : 0.7, { duration: 300 }),
  //   };
  // });
  
  // Overlay animation style
  // const overlayStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: overlayOpacity.value,
  //   };
  // });
  
  // Success message animation style
  // const successMessageStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ scale: successMessageScale.value }],
  //   };
  // });
  
  const handleTakePicture = async () => {
    if (Platform.OS === 'web') {
      // On web, we'll just simulate taking a picture
      simulatePhotoCapture();
      return;
    }
    
    if (cameraRef.current) {
      try {
        setIsTakingPicture(true);
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoTaken(true);
        handleVerification();
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível capturar a foto.');
      } finally {
        setIsTakingPicture(false);
      }
    }
  };
  
  // Simulate taking a photo for web or when camera isn't available
  const simulatePhotoCapture = () => {
    setIsTakingPicture(true);
    setTimeout(() => {
      setPhotoTaken(true);
      setIsTakingPicture(false);
      handleVerification();
    }, 1000);
  };
  
  const handleVerification = () => {
    setIsVerifying(true);
    
    // Animate overlay
    // overlayOpacity.value = withTiming(0.5, { duration: 300 });
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      
      // Animate success message
      // successMessageScale.value = withTiming(1, { 
      //   duration: 400,
      //   easing: Easing.elastic(1.2)
      // });
      
      // Reset after 3 seconds
      setTimeout(resetCamera, 3000);
    }, 2000);
  };
  
  const resetCamera = () => {
    setPhotoTaken(false);
    setIsVerified(false);
    
    // Reset animations
    // successMessageScale.value = withTiming(0, { duration: 300 });
    // overlayOpacity.value = withTiming(0, { duration: 300 });
  };
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.loadingText}>Carregando câmera...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.permissionContainer}>
          <Camera size={64} color={colors.primary[600]} />
          <Text style={styles.permissionTitle}>Acesso à Câmera Necessário</Text>
          <Text style={styles.permissionText}>
            Precisamos de acesso à sua câmera para realizar o reconhecimento facial e registrar sua presença.
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Permitir Acesso</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Verificação de Presença</Text>
        <Text style={styles.subtitle}>Posicione seu rosto na câmera</Text>
      </View>
      
      <View style={styles.cameraContainer}>
        
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
          />
        
        {/* <View style={styles.faceOverlay}>
          <View style={styles.faceOutline} />
          <Animated.View style={[styles.scanLine, scanLineStyle]} />
        </View>
         */}
        {/* Verification overlay */}
        {/* <Animated.View style={[styles.verificationOverlay, overlayStyle]}>
          {isVerifying && (
            <View style={styles.loadingIndicator}>
              <Text style={styles.verifyingText}>Verificando...</Text>
            </View>
          )}
          
          {isVerified && (
            <Animated.View style={[styles.successMessage, successMessageStyle]}>
              <View style={styles.successIcon}>
                <CheckCircle size={40} color={colors.white} />
              </View>
              <Text style={styles.successText}>Presença Registrada!</Text>
            </Animated.View>
          )}
        </Animated.View> */}
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetCamera}
          disabled={!photoTaken}
        >
          <RefreshCcw size={24} color={photoTaken ? colors.white : colors.gray[400]} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.captureButton, 
            (isTakingPicture || photoTaken) && styles.captureButtonDisabled
          ]}
          onPress={handleTakePicture}
          disabled={isTakingPicture || photoTaken}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={resetCamera}
          disabled={!photoTaken}
        >
          <X size={24} color={photoTaken ? colors.white : colors.gray[400]} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Posicione seu rosto dentro do círculo e pressione o botão para verificar sua presença.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[900],
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.gray[300],
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.white,
    textAlign: 'center',
    marginTop: 40,
  },
  permissionContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  permissionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.gray[300],
    textAlign: 'center',
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.white,
  },
  cameraContainer: {
    marginTop: 10,
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    alignSelf: 'center',
    position: 'relative',
  },
  webCameraPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[800],
  },
  webPlaceholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  faceOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceOutline: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: colors.primary[400],
    borderStyle: 'dashed',
  },
  scanLine: {
    position: 'absolute',
    width: 280,
    height: 2,
    backgroundColor: colors.primary[400],
    top: 10,
  },
  verificationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.gray[900],
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    alignItems: 'center',
  },
  verifyingText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginTop: 12,
  },
  successMessage: {
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.green[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  resetButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonDisabled: {
    backgroundColor: colors.gray[700],
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.white,
  },
  cancelButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    paddingHorizontal: 40,
    marginTop: 40,
  },
  instructionText: {
    color: colors.gray[300],
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});