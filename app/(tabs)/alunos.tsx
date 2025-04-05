import { Link } from 'expo-router';
import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useStudents } from '@/contexts/StudentContext';

export default function Alunos() {
    const { students } = useStudents();

    return (
        <View style={styles.container}>
            <FlatList
                data={students}
                renderItem={({ item }) => (
                    <Link href={`/alunos/${item.id}`} asChild>
                        <TouchableOpacity style={styles.studentItem}>
                            <ThemedText style={styles.studentName}>{item.name}</ThemedText>
                            <ThemedText>
                                Disciplinas selecionadas: {item.selectedSubjects.length}
                            </ThemedText>
                        </TouchableOpacity>
                    </Link>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    studentItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginBottom: 8,
        borderRadius: 8,
    },
    studentName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
});