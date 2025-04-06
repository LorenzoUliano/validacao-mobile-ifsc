import React, { createContext, useContext, useState } from 'react';
import { initialStudents, Student, initialSubjects, Subject } from '@/hooks/data';

type StudentContextType = {
    students: Student[];
    subjects: Subject[];
    updateStudentSubjects: (studentId: string, subjectId: string) => void;
    addSubject: (name: string) => void;
    deleteSubject: (subjectId: string) => void;
    addStudent: (name: string) => void;
    deleteStudent: (studentId: string) => void;
};

const StudentContext = createContext<StudentContextType>({
    students: [],
    subjects: initialSubjects,
    updateStudentSubjects: () => { },
    addSubject: () => { },
    deleteSubject: () => { },
    addStudent: () => { },
    deleteStudent: () => { }
});

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

    const updateStudentSubjects = (studentId: string, subjectId: string) => {
        setStudents(prevStudents =>
            prevStudents.map(student => {
                if (student.id === studentId) {
                    const updatedSubjects = student.selectedSubjects.includes(subjectId)
                        ? student.selectedSubjects.filter(id => id !== subjectId)
                        : [...student.selectedSubjects, subjectId];
                    return { ...student, selectedSubjects: updatedSubjects };
                }
                return student;
            })
        );
    };

    const addSubject = (name: string) => {
        const newSubject = {
            id: Date.now().toString(),
            name: name.trim(),
        };
        setSubjects(prev => [...prev, newSubject]);
    };

    const deleteSubject = (subjectId: string) => {
        setSubjects(prev => prev.filter(subject => subject.id !== subjectId));

        setStudents(prevStudents =>
            prevStudents.map(student => ({
                ...student,
                selectedSubjects: student.selectedSubjects.filter(id => id !== subjectId)
            }))
        );
    };

    const addStudent = (name: string) => {
        const newStudent = {
          id: Date.now().toString(),
          name: name.trim(),
          selectedSubjects: [],
        };
        setStudents(prev => [...prev, newStudent]);
    };
    
    const deleteStudent = (studentId: string) => {
        setStudents(prev => prev.filter(student => student.id !== studentId));
    };
    
    return (
        <StudentContext.Provider value={{ 
            students, 
            subjects, 
            updateStudentSubjects, 
            addSubject, 
            deleteSubject,
            addStudent,
            deleteStudent 
        }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudents = () => useContext(StudentContext);