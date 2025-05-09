import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CalendarClock, Clock, Fingerprint, School } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export const TelaApresentacao = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Capitalize first letter
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  const nextClasses = [
    {
      id: '1',
      subject: 'Game Development',
      time: '19:00 - 22:00',
      room: 'Laboratório 13',
      professor: 'Prof. Felipe Martelo',
    },
    {
      id: '2',
      subject: 'Mobile Development',
      time: '19:00 - 22:00',
      room: 'Laboratório 13',
      professor: 'Prof. Guilherme Henrique',
    },
    {
      id: '3',
      subject: 'Quality Assurance',
      time: '19:00 - 22:00',
      room: 'Laboratório 13',
      professor: 'Prof. Flavio Santarelli',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.date}>{capitalizedDate}</Text>
          <Text style={styles.greeting}>Olá, Estudante</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3106/3106807.png' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.teal[100] }]}>
              <Fingerprint size={22} color={colors.teal[600]} />
            </View>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Presenças</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.amber[100] }]}>
              <CalendarClock size={22} color={colors.amber[600]} />
            </View>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Faltas</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.purple[100] }]}>
              <School size={22} color={colors.purple[600]} />
            </View>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Disciplinas</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aulas 5º Semestre</Text>
          
          {nextClasses.map((classItem) => (
            <TouchableOpacity key={classItem.id} style={styles.classCard}>
              <View style={styles.classTime}>
                <Clock size={18} color={colors.primary[600]} />
                <Text style={styles.classTimeText}>{classItem.time}</Text>
              </View>
              
              <Text style={styles.classSubject}>{classItem.subject}</Text>
              <Text style={styles.classProfessor}>{classItem.professor}</Text>
              <View style={styles.classDetails}>
                <Text style={styles.classRoom}>{classItem.room}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: colors.primary[100] }]}>
                <Fingerprint size={24} color={colors.primary[600]} />
              </View>
              <Text style={styles.actionText}>Registrar Presença</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: colors.amber[100] }]}>
                <CalendarClock size={24} color={colors.amber[600]} />
              </View>
              <Text style={styles.actionText}>Ver Horários</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[600],
    marginBottom: 4,
  },
  greeting: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '31%',
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.gray[600],
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 16,
  },
  classCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  classTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  classTimeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.primary[600],
    marginLeft: 6,
  },
  classSubject: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  classProfessor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[700],
    marginBottom: 8,
  },
  classDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classRoom: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.gray[600],
  },
  quickActions: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.gray[900],
    textAlign: 'center',
  },
});