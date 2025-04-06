import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useStudents } from '@/contexts/StudentContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { Modal } from 'react-native';

export default function Alunos() {
    const [newStudent, setNewStudent] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { students, addStudent, deleteStudent } = useStudents();

    const handleAddStudent = () => {
        if (newStudent.trim()) {
            addStudent(newStudent);
            setNewStudent('');
        }
    };

    const handleDeleteConfirmation = (studentId: string) => {
        setSelectedStudent(studentId);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (selectedStudent) {
            deleteStudent(selectedStudent);
            setShowModal(false);
            setSelectedStudent(null);
        }
    };

    return (
        <LinearGradient
            colors={['#F8FAFC', '#E2E8F0']}
            style={styles.container}
        >
            {/* Adicione o formulário de cadastro */}
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                    Alunos Cadastrados
                </ThemedText>
                <ThemedText style={styles.count}>
                    Total: {students.length}
                </ThemedText>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Novo aluno..."
                    placeholderTextColor="#94A3B8"
                    value={newStudent}
                    onChangeText={setNewStudent}
                />
                <TouchableOpacity
                    style={[styles.addButton, !newStudent && styles.disabledButton]}
                    onPress={handleAddStudent}
                    disabled={!newStudent}
                >
                    <IconSymbol
                        name="plus.circle.fill"
                        size={24}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={students}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.studentCard}>
                        <Link href={`/alunos/${item.id}`} asChild>
                            <TouchableOpacity style={styles.studentLink}>
                                <View style={styles.infoContainer}>
                                    <IconSymbol
                                        name="person.fill"
                                        size={24}
                                        color="#64748B"
                                        style={styles.icon}
                                    />
                                    <View>
                                        <ThemedText type="defaultSemiBold" style={styles.studentName}>
                                            {item.name}
                                        </ThemedText>
                                        <View style={styles.badge}>
                                            <ThemedText style={styles.badgeText}>
                                                {item.selectedSubjects.length} disciplinas
                                            </ThemedText>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteConfirmation(item.id)}
                        >
                            <IconSymbol
                                name="trash.fill"
                                size={18}
                                color="#DC2626"
                            />
                        </TouchableOpacity>
                    </View>
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

            {/* Modal de Confirmação */}
            <Modal transparent visible={showModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <IconSymbol
                            name="exclamationmark.triangle.fill"
                            size={40}
                            color="#F59E0B"
                            style={styles.modalIcon}
                        />
                        <ThemedText type="title" style={styles.modalTitle}>
                            Confirmar Exclusão
                        </ThemedText>
                        <ThemedText style={styles.modalText}>
                            Tem certeza que deseja excluir permanentemente este aluno?
                        </ThemedText>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowModal(false)}
                            >
                                <ThemedText style={styles.modalButtonText}>Cancelar</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleDelete}
                            >
                                <ThemedText style={styles.modalButtonText}>Excluir</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        paddingBottom: 64,
    },
    studentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        flex: 1,
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
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginTop: 4,
        alignSelf: 'flex-start',
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        width: '80%',
        alignItems: 'center',
    },
    modalIcon: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        color: '#0F172A',
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 24,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F1F5F9',
    },
    confirmButton: {
        backgroundColor: '#DC2626',
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    studentLink: {
        flex: 1,
    },
    formContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#0F172A',
        backgroundColor: '#FFFFFF',
    },
    addButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#CBD5E1',
    },
    deleteButton: {
        marginLeft: 12,
        padding: 8,
    },
});