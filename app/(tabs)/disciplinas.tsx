import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useStudents } from '@/contexts/StudentContext';

export default function Discisplinas() {
    const [newSubject, setNewSubject] = useState('');
    const { subjects, addSubject } = useStudents();

    const handleAddSubject = () => {
        if (newSubject.trim()) {
            addSubject(newSubject);
            setNewSubject('');
        }
    };

    return (
        <View>
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
    subjectCard: {
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
});