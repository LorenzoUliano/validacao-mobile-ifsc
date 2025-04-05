import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useStudents } from '@/contexts/StudentContext';
import { CustomCheckbox } from '@/components/CustomCheckbox';

export default function StudentSubjects() {
  const { id } = useLocalSearchParams();
  const { students, subjects, updateStudentSubjects } = useStudents(); // Adicione subjects aqui
  
  const student = students.find(s => s.id === id);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Disciplinas de {student?.name}</ThemedText>
      
      <FlatList
        data={subjects} // Alterado para usar subjects do contexto
        renderItem={({ item }) => (
          <View style={styles.subjectItem}>
            <CustomCheckbox
              checked={student?.selectedSubjects.includes(item.id) || false}
              onPress={() => updateStudentSubjects(student?.id || '', item.id)}
            />
            <ThemedText style={styles.subjectName}>{item.name}</ThemedText>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

// Mantenha os mesmos estilos anteriores

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  subjectName: {
    fontSize: 16,
    marginLeft: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    borderColor: '#4630EB',
    backgroundColor: '#4630EB20',
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#4630EB',
  },
});