// contexts/SubjectContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Subject = {
    id: string;
    name: string;
};

type SubjectContextType = {
    subjects: Subject[];
    addSubject: (name: string) => void;
    deleteSubject: (id: string) => void;
};

const SubjectContext = createContext<SubjectContextType>({
    subjects: [],
    addSubject: () => { },
    deleteSubject: () => { },
});

export const SubjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const addSubject = (name: string) => {
        if (name.trim()) {
            setSubjects(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    name: name.trim(),
                },
            ]);
        }
    };

    const deleteSubject = (id: string) => {
        setSubjects(prev => prev.filter(subject => subject.id !== id));
    };

    return (
        <SubjectContext.Provider value={{ subjects, addSubject, deleteSubject }}>
            {children}
        </SubjectContext.Provider>
    );
};

export const useSubjects = () => useContext(SubjectContext);