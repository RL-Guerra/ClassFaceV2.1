import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, UserPlus } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { StatusBar } from 'expo-status-bar';

import api from '../../services/api';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  
  const router = useRouter();


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem. Por favor, verifique.');
      return;
    }

    if (!photoTaken) {
      Alert.alert('Foto necessária', 'Por favor, capture sua foto para o reconhecimento facial.');
     return;
    }

    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
   }

      setLoading(true);
      await api.post('/users/register', {
        name,
        email,
        password: password,
        photo: "PHOTO"
      }).then((response) => {
        console.log(response.data);
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        router.replace('/(auth)/login');
      }).catch((error) => {
        console.error(error);
        Alert.alert('Erro', error.response?.data?.message || 'Erro ao cadastrar usuário.');
      }).finally(() => {
        setLoading(false);
      })
  };

  // const handleRegister = () => {
  //   if (password !== confirmPassword) {
  //     Alert.alert('Erro', 'As senhas não coincidem. Por favor, verifique.');
  //     return;
  //   }
    
  //   if (!photoTaken) {
  //     Alert.alert('Foto necessária', 'Por favor, capture sua foto para o reconhecimento facial.');
  //     return;
  //   }
    
  //   setLoading(true);
  //   // Simulate API call
  //   setTimeout(() => {
  //     setLoading(false);
  //     // Navigate to login after successful registration
  //     router.replace('/(auth)/login');
  //   }, 1500);
  // };

  

  const takeFacialPhoto = () => {
    // In a real app, this would navigate to camera screen or use camera API
    // Here we'll just simulate taking a photo
    setTimeout(() => {
       setPhotoTaken(true);
      Alert.alert('Sucesso', 'Foto capturada com sucesso!');
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.gray[700]} />
          </TouchableOpacity>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha os dados abaixo para se cadastrar</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome completo"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail Acadêmico</Text>
            <TextInput
              style={styles.input}
              placeholder="seu.email@academico.edu.br"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Crie uma senha forte"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.photoSection}>
            <Text style={styles.label}>Foto para Reconhecimento Facial</Text>
            <TouchableOpacity 
              style={[styles.photoButton, photoTaken && styles.photoTaken]} 
              onPress={takeFacialPhoto}
            >
              <Camera size={24} color={photoTaken ? colors.white : colors.primary[600]} />
              <Text style={[styles.photoButtonText, photoTaken && styles.photoButtonTextTaken]}>
                {photoTaken ? 'Foto Capturada' : 'Capturar Foto'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.photoHelp}>
              Esta foto será usada para verificar sua presença nas aulas
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonLoading]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.buttonText}>Processando...</Text>
            ) : (
              <View style={styles.buttonContent}>
                <UserPlus size={20} color="white" />
                <Text style={styles.buttonText}>Cadastrar</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.gray[600],
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.gray[700],
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.gray[900],
  },
  photoSection: {
    marginBottom: 24,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  photoTaken: {
    backgroundColor: colors.primary[600],
  },
  photoButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.primary[600],
    marginLeft: 8,
  },
  photoButtonTextTaken: {
    color: colors.white,
  },
  photoHelp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.gray[500],
  },
  button: {
    backgroundColor: colors.primary[600],
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonLoading: {
    backgroundColor: colors.primary[400],
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    marginLeft: 8,
  },
});