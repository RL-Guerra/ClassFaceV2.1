import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, LogOut, Settings, User, Bell, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';

export const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState({name:'', email:''});

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    // In a real app, this would clear auth state
    router.replace('/(auth)/login');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3106/3106807.png' }}
            style={styles.profileImage}
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Frequência</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Disciplinas</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Faltas</Text>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Configurações</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <User size={20} color={colors.primary[600]} />
            </View>
            <Text style={styles.menuItemText}>Informações Pessoais</Text>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Bell size={20} color={colors.primary[600]} />
            </View>
            <Text style={styles.menuItemText}>Notificações</Text>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Shield size={20} color={colors.primary[600]} />
            </View>
            <Text style={styles.menuItemText}>Privacidade e Segurança</Text>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Settings size={20} color={colors.primary[600]} />
            </View>
            <Text style={styles.menuItemText}>Configurações do Aplicativo</Text>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <HelpCircle size={20} color={colors.primary[600]} />
            </View>
            <Text style={styles.menuItemText}>Ajuda e Suporte</Text>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.red[600]} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>ClassFace v1.0.1</Text>
          <Text style={styles.footerCopyright}>© 2025 ClassFace</Text>
        </View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[600],
    marginBottom: 2,
  },
  profileMeta: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[500],
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.primary[100],
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.primary[600],
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[600],
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.gray[300],
  },
  menuSection: {
    backgroundColor: colors.white,
    paddingTop: 16,
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.gray[800],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.red[600],
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[500],
    marginBottom: 4,
  },
  footerCopyright: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.gray[400],
  },
});