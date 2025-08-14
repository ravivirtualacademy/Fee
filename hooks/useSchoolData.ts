
import { useState, useEffect, useCallback } from 'react';
import { Student, Fee } from '../types';

const initialStudents: Student[] = [
  { id: 'S001', name: 'Alice Johnson', class: '5-A', rollNumber: '12', parentContact: '111-222-3333', address: '123 Maple St' },
  { id: 'S002', name: 'Bob Smith', class: '6-B', rollNumber: '5', parentContact: '444-555-6666', address: '456 Oak Ave' },
  { id: 'S003', name: 'Charlie Brown', class: '5-A', rollNumber: '18', parentContact: '777-888-9999', address: '789 Pine Ln' },
];

const initialFees: Fee[] = [
    { studentId: 'S001', month: 'August', year: 2024, amount: 500, status: 'Paid', issueDate: '2024-08-01', dueDate: '2024-08-10' },
    { studentId: 'S002', month: 'August', year: 2024, amount: 550, status: 'Unpaid', issueDate: '2024-08-01', dueDate: '2024-08-10' },
];

export const useSchoolData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedStudents = localStorage.getItem('school_students');
      const storedFees = localStorage.getItem('school_fees');
      
      if (storedStudents) {
        setStudents(JSON.parse(storedStudents));
      } else {
        setStudents(initialStudents);
      }

      if (storedFees) {
        setFees(JSON.parse(storedFees));
      } else {
        setFees(initialFees);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setStudents(initialStudents);
      setFees(initialFees);
    } finally {
        setLoading(false);
    }
  }, []);

  const saveData = useCallback(<T,>(key: string, data: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, []);

  useEffect(() => {
      if(!loading) saveData('school_students', students);
  }, [students, saveData, loading]);

  useEffect(() => {
      if(!loading) saveData('school_fees', fees);
  }, [fees, saveData, loading]);

  const addStudent = (student: Omit<Student, 'id'>) => {
    setStudents(prev => {
      const newStudent = { ...student, id: `S${Date.now()}` };
      return [...prev, newStudent];
    });
  };

  const addFee = (fee: Fee) => {
    setFees(prev => [...prev, fee]);
  };
  
  const updateFeeStatus = (studentId: string, month: string, year: number, status: 'Paid' | 'Unpaid') => {
      setFees(prevFees => prevFees.map(fee => 
          fee.studentId === studentId && fee.month === month && fee.year === year
              ? { ...fee, status }
              : fee
      ));
  };


  return { students, fees, addStudent, addFee, updateFeeStatus, loading };
};
