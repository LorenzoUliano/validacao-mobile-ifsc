import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useStudents } from '@/contexts/StudentContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedView } from '@/components/ThemedView';

export default function Alunos() {
    const { students } = useStudents();

    return (
        <LinearGradient
            colors={['#F8FAFC', '#E2E8F0']}
            style={styles.container}
        >
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                    Alunos Cadastrados
                </ThemedText>
                <ThemedText style={styles.count}>
                    Total: {students.length}
                </ThemedText>
            </View>

            <FlatList
                data={students}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <Link href={`/alunos/${item.id}`} asChild>
                        <TouchableOpacity style={styles.studentCard} activeOpacity={0.9}>
                            <View style={styles.cardContent}>
                                <View style={styles.infoContainer}>
                                    <IconSymbol
                                        name="person.fill"
                                        size={24}
                                        color="#64748B"
                                        style={styles.icon}
                                    />
                                    <ThemedText type="defaultSemiBold" style={styles.studentName}>
                                        {item.name}
                                    </ThemedText>
                                </View>
                                <View style={styles.badge}>
                                    <ThemedText style={styles.badgeText}>
                                        {item.selectedSubjects.length} disciplinas
                                    </ThemedText>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <IconSymbol
                            name="person.2.slash.fill"
                            size={48}
                            color="#CBD5E1"
                        />
                        <ThemedText style={styles.emptyText}>
                            Nenhum aluno cadastrado
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
        padding: 16,
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
    count: {
        fontSize: 16,
        color: '#64748B',
    },
    listContent: {
        paddingBottom: 24,
    },
    studentCard: {
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
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    studentName: {
        fontSize: 16,
        color: '#0F172A',
    },
    badge: {
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    badgeText: {
        color: '#64748B',
        fontSize: 14,
        fontWeight: '500',
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