import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, View, Modal, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useStudents } from '@/contexts/StudentContext';

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
        <View style={styles.container}>
            {/* Modal de Confirmação */}
            <Modal
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ThemedText style={styles.modalTitle}>Confirmação</ThemedText>
                        <ThemedText style={styles.modalText}>
                            Tem certeza que deseja excluir esta matéria?
                        </ThemedText>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowModal(false)}
                            >
                                <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleDelete}
                            >
                                <ThemedText style={styles.buttonText}>Excluir</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Formulário e Lista */}
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nova disciplina"
                    value={newSubject}
                    onChangeText={setNewSubject}
                    placeholderTextColor="#666"
                />
                <TouchableOpacity
                    style={[styles.addButton, !newSubject && styles.disabledButton]}
                    onPress={handleAddSubject}
                    disabled={!newSubject}
                >
                    <ThemedText style={styles.buttonText}>Adicionar</ThemedText>
                </TouchableOpacity>
            </View>

            <FlatList
                data={subjects}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.subjectCard}>
                        <ThemedText style={styles.subjectName}>{item.name}</ThemedText>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteConfirmation(item.id)}
                        >
                            <ThemedText style={styles.deleteButtonText}>×</ThemedText>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <ThemedText style={styles.emptyText}>Nenhuma disciplina cadastrada</ThemedText>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    formContainer: {
        flexDirection: 'row',
        gap: 10,
        margin: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#94a3b8',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
    },
    subjectName: {
        fontSize: 16,
        color: '#1e293b',
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#64748b',
    },
    subjectCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        color: '#dc2626',
        fontSize: 24,
        lineHeight: 24,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: '#6b7280',
    },
    confirmButton: {
        backgroundColor: '#dc2626',
    },
});