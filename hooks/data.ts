export type Student = {
    id: string;
    name: string;
    selectedSubjects: string[];
};

export type Subject = {
    id: string;
    name: string;
};

export const initialSubjects: Subject[] = [
    { id: '1', name: 'Matemática' },
    { id: '2', name: 'Português' },
    { id: '3', name: 'História' },
    { id: '4', name: 'Geografia' },
];

export const initialStudents: Student[] = [
    { id: '1', name: 'João Silva', selectedSubjects: [] },
    { id: '2', name: 'Maria Oliveira', selectedSubjects: [] },
    { id: '3', name: 'Carlos Souza', selectedSubjects: [] },
];