import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircleCheck as CheckCircle2, Clock, Circle as XCircle, Filter, CalendarDays, BookOpen } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export const AttendanceScreen = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock attendance data
  const attendanceData = [
    {
      id: '1',
      date: '08 Abr 2025',
      subject: 'Game Development',
      time: '19:00 - 22:00',
      status: 'absent',
    },
    {
      id: '2',
      date: '09 Abr 2025',
      subject: 'Quality Assurance',
      time: '19:00 - 22:00',
      status: 'present',
    },
    {
      id: '3',
      date: '10 Abr 2025',
      subject: 'Mobile Development',
      time: '19:00 - 22:00',
      status: 'present',
    },
    {
      id: '4',
      date: '14 Abr 2025',
      subject: 'Game Development',
      time: '19:00 - 22:00',
      status: 'present',
    },
    {
      id: '5',
      date: '15 Abr 2025',
      subject: 'Quality Assurance',
      time: '19:00 - 22:00',
      status: 'absent',
    },
    {
      id: '6',
      date: '16 Abr 2025',
      subject: 'Mobile Development',
      time: '19:00 - 22:00',
      status: 'present',
    },
  ];

  const filteredData = activeFilter === 'all' 
    ? attendanceData 
    : attendanceData.filter(item => item.status === activeFilter);

  // Group by date
  const groupedData = filteredData.reduce((groups, item) => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  // Convert grouped data to array for FlatList
  const sections = Object.keys(groupedData).map(date => ({
    date,
    data: groupedData[date]
  }));

  const renderAttendanceCard = ({ item }) => (
    <View style={styles.attendanceCard}>
      <View style={styles.cardHeader}>
        <View style={styles.subjectContainer}>
          <BookOpen size={16} color={colors.gray[600]} />
          <Text style={styles.subjectText}>{item.subject}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Clock size={14} color={colors.gray[500]} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
      
      <View style={styles.statusContainer}>
        {item.status === 'present' ? (
          <View style={[styles.statusBadge, styles.presentBadge]}>
            <CheckCircle2 size={16} color={colors.green[600]} />
            <Text style={[styles.statusText, styles.presentText]}>Presente</Text>
          </View>
        ) : (
          <View style={[styles.statusBadge, styles.absentBadge]}>
            <XCircle size={16} color={colors.red[600]} />
            <Text style={[styles.statusText, styles.absentText]}>Falta</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={styles.dateHeader}>
      <CalendarDays size={16} color={colors.gray[600]} />
      <Text style={styles.dateText}>{section.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Registro de Presenças</Text>
        <Text style={styles.subtitle}>Acompanhe sua frequência nas aulas</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <Filter size={16} color={colors.gray[700]} />
          <Text style={styles.filterTitle}>Filtrar por</Text>
        </View>
        
        <View style={styles.filterOptions}>
          <TouchableOpacity 
            style={[styles.filterOption, activeFilter === 'all' && styles.activeFilterOption]}
            onPress={() => setActiveFilter('all')}
          >
            <Text 
              style={[
                styles.filterOptionText, 
                activeFilter === 'all' && styles.activeFilterOptionText
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterOption, activeFilter === 'present' && styles.activeFilterOption]}
            onPress={() => setActiveFilter('present')}
          >
            <Text 
              style={[
                styles.filterOptionText, 
                activeFilter === 'present' && styles.activeFilterOptionText
              ]}
            >
              Presenças
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterOption, activeFilter === 'absent' && styles.activeFilterOption]}
            onPress={() => setActiveFilter('absent')}
          >
            <Text 
              style={[
                styles.filterOptionText, 
                activeFilter === 'absent' && styles.activeFilterOptionText
              ]}
            >
              Faltas
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={sections}
        keyExtractor={(item) => item.date}
        renderItem={({ item: section }) => (
          <View>
            {renderSectionHeader({ section })}
            {section.data.map(item => (
              <View key={item.id}>
                {renderAttendanceCard({ item })}
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterTitle: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.gray[700],
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: colors.gray[100],
  },
  activeFilterOption: {
    backgroundColor: colors.primary[100],
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.gray[700],
  },
  activeFilterOptionText: {
    color: colors.primary[700],
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.gray[700],
  },
  attendanceCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.gray[900],
    marginLeft: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[600],
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  presentBadge: {
    backgroundColor: colors.green[100],
  },
  absentBadge: {
    backgroundColor: colors.red[100],
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  presentText: {
    color: colors.green[700],
  },
  absentText: {
    color: colors.red[700],
  },
});