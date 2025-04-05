import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useStudents } from '@/contexts/StudentContext';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function StudentSubjects() {
    const { id } = useLocalSearchParams();
    const { students, subjects, updateStudentSubjects } = useStudents();
    const student = students.find(s => s.id === id);

    return (
        <LinearGradient
            colors={['#F8FAFC', '#E2E8F0']}
            style={styles.container}
        >
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                    {student?.name}
                </ThemedText>
                <ThemedText style={styles.subtitle}>
                    {student?.selectedSubjects.length} disciplinas selecionadas
                </ThemedText>
            </View>

            <FlatList
                data={subjects}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.subjectCard} onPress={() => updateStudentSubjects(student?.id || '', item.id)}>
                        <CustomCheckbox
                            checked={student?.selectedSubjects.includes(item.id) || false}
                            onPress={() => updateStudentSubjects(student?.id || '', item.id)}
                        />
                        <IconSymbol
                            name="book.fill"
                            size={20}
                            color="#64748B"
                            style={styles.subjectIcon}
                        />
                        <ThemedText type="defaultSemiBold" style={styles.subjectName}>
                            {item.name}
                        </ThemedText>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <IconSymbol
                            name="book.closed.fill"
                            size={48}
                            color="#CBD5E1"
                        />
                        <ThemedText style={styles.emptyText}>
                            Nenhuma disciplina disponível
                        </ThemedText>
                    </View>
                }
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    header: {
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 28,
        color: '#0F172A',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
    },
    listContent: {
        paddingBottom: 24,
    },
    subjectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    subjectIcon: {
        marginHorizontal: 12,
    },
    subjectName: {
        flex: 1,
        fontSize: 16,
        color: '#0F172A',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        color: '#94A3B8',
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    },
});