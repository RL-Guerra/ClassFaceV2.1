import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import { ArrowLeft, ExternalLink, Mail, MessageSquare, Phone } from 'lucide-react-native';
import { colors } from '@/constants/colors';


export const SupportScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const supportUrl = 'https://www.unifecaf.com.br/contato';
  
  const handleOpenBrowser = async () => {
    const canOpen = await Linking.canOpenURL(supportUrl);
    if (canOpen) {
      Linking.openURL(supportUrl);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Suporte</Text>
        <Text style={styles.subtitle}>Estamos aqui para ajudar</Text>
      </View>
      
      {Platform.OS === 'web' ? (
        <View style={styles.webContactInfo}>
          <Text style={styles.webInfoText}>
            Para entrar em contato com nossa equipe de suporte, acesse:
          </Text>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={handleOpenBrowser}
          >
            <Text style={styles.linkButtonText}>{supportUrl}</Text>
            <ExternalLink size={16} color={colors.primary[600]} />
          </TouchableOpacity>
          
          <View style={styles.contactOptions}>
            <View style={styles.contactCard}>
              <View style={styles.contactIconContainer}>
                <MessageSquare size={24} color={colors.primary[600]} />
              </View>
              <Text style={styles.contactTitle}>Chat</Text>
              <Text style={styles.contactDescription}>Converse com nosso time de suporte em tempo real</Text>
            </View>
            
            <View style={styles.contactCard}>
              <View style={styles.contactIconContainer}>
                <Mail size={24} color={colors.primary[600]} />
              </View>
              <Text style={styles.contactTitle}>Atendimento</Text>
              <Text style={styles.contactDescription}>On-line: Seg. à Sex. das 09h às 19h</Text>
              <Text style={styles.contactDescription}>Presencial: Seg. à Sex. das 07h às 21h na unidade sede em Taboão da Serra - SP</Text>
            </View>
            
            <View style={styles.contactCard}>
              <View style={styles.contactIconContainer}>
                <Phone size={24} color={colors.primary[600]} />
              </View>
              <Text style={styles.contactTitle}>Telefone</Text>
              <Text style={styles.contactDescription}>(11) 4210-4950</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.webViewContainer}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary[600]} />
              <Text style={styles.loadingText}>Carregando suporte...</Text>
            </View>
          )}
          
          <WebView
            source={{ uri: supportUrl }}
            style={styles.webView}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
          
          <View style={styles.browserButton}>
            <TouchableOpacity 
              style={styles.openBrowserButton}
              onPress={handleOpenBrowser}
            >
              <ExternalLink size={18} color={colors.white} />
              <Text style={styles.openBrowserText}>Abrir no Navegador</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[600],
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.gray[700],
  },
  browserButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  openBrowserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[600],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  openBrowserText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.white,
    marginLeft: 8,
  },
  webContactInfo: {
    flex: 1,
    padding: 24,
  },
  webInfoText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.gray[700],
    marginBottom: 16,
    textAlign: 'center',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[100],
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 32,
  },
  linkButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.primary[600],
    marginRight: 8,
  },
  contactOptions: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
  },
  contactCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[600],
  },
});