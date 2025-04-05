import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, View, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useStudents } from '@/contexts/StudentContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';

export default function Discisplinas() {
    const [newSubject, setNewSubject] = useState('');
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { subjects, addSubject, deleteSubject } = useStudents();

    const handleAddSubject = () => {
        if (newSubject.trim()) {
            addSubject(newSubject);
            setNewSubject('');
        }
    };

    const handleDeleteConfirmation = (subjectId: string) => {
        setSelectedSubject(subjectId);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (selectedSubject) {
            deleteSubject(selectedSubject);
            setShowModal(false);
            setSelectedSubject(null);
        }
    };

    return (
        <LinearGradient
            colors={['#F8FAFC', '#E2E8F0']}
            style={styles.container}
        >
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                    Disciplinas
                </ThemedText>
                <ThemedText style={styles.count}>
                    Total: {subjects.length}
                </ThemedText>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nova disciplina..."
                    placeholderTextColor="#94A3B8"
                    value={newSubject}
                    onChangeText={setNewSubject}
                />
                <TouchableOpacity
                    style={[styles.addButton, !newSubject && styles.disabledButton]}
                    onPress={handleAddSubject}
                    disabled={!newSubject}
                >
                    <IconSymbol
                        name="plus.circle.fill"
                        size={24}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={subjects}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.subjectCard}>
                        <IconSymbol
                            name="book.fill"
                            size={20}
                            color="#64748B"
                            style={styles.subjectIcon}
                        />
                        <ThemedText type="defaultSemiBold" style={styles.subjectName}>
                            {item.name}
                        </ThemedText>
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
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <IconSymbol
                            name="book.closed.fill"
                            size={48}
                            color="#CBD5E1"
                        />
                        <ThemedText style={styles.emptyText}>
                            Nenhuma disciplina cadastrada
                        </ThemedText>
                    </View>
                }
            />

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
                            Tem certeza que deseja excluir permanentemente esta disciplina?
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
    listContent: {
        paddingBottom: 64,
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
        marginRight: 12,
    },
    subjectName: {
        flex: 1,
        fontSize: 16,
        color: '#0F172A',
    },
    deleteButton: {
        padding: 8,
        marginLeft: 8,
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
});