import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const nextClasses = [
    {
      id: "1",
      subject: "Game Development",
      time: "19:00 - 22:00",
      room: "Laboratório 13",
      professor: "Prof. Felipe Martelo",
    },
    {
      id: "2",
      subject: "Mobile Development",
      time: "19:00 - 22:00",
      room: "Laboratório 13",
      professor: "Prof. Guilherme Henrique",
    },
    {
      id: "3",
      subject: "Quality Assurance",
      time: "19:00 - 22:00",
      room: "Laboratório 13",
      professor: "Prof. Flavio Santarelli",
    },
  ];

  const [user, setUser] = React.useState({ name: "" });
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.date}>{capitalizedDate}</Text>
          <Text style={styles.greeting}>Olá, {user.name || "Aluno"}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3106/3106807.png",
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Presenças</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Faltas</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Disciplinas</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aulas 5º Semestre</Text>

          {nextClasses.map((classItem) => (
            <TouchableOpacity key={classItem.id} style={styles.classCard}>
              <Text style={styles.classTimeText}>{classItem.time}</Text>
              <Text style={styles.classSubject}>{classItem.subject}</Text>
              <Text style={styles.classProfessor}>{classItem.professor}</Text>
              <Text style={styles.classRoom}>{classItem.room}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Registrar Presença</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Ver Horários</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  date: {
    fontSize: 16,
    color: "#555",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileButton: {
    padding: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  classCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  classTimeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 4,
  },
  classSubject: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  classProfessor: {
    fontSize: 14,
    color: "#555",
  },
  classRoom: {
    fontSize: 13,
    color: "#777",
  },
  quickActions: {
    marginBottom: 32,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#4e8cff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;