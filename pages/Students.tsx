
import React, { useState, useMemo } from 'react';
import { Student } from '../types';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

interface StudentsProps {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
}

const StudentForm: React.FC<{onSave: (student: Omit<Student, 'id'>) => void, onCancel: () => void}> = ({onSave, onCancel}) => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [parentContact, setParentContact] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, class: className, rollNumber, parentContact, address });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
             <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Class</label>
                <input type="text" value={className} onChange={e => setClassName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="e.g., 5-A" required />
            </div>
             <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Roll Number</label>
                <input type="text" value={rollNumber} onChange={e => setRollNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
             <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Parent's Contact</label>
                <input type="tel" value={parentContact} onChange={e => setParentContact(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
             <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onCancel} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Student</button>
            </div>
        </form>
    )
}

const Students: React.FC<StudentsProps> = ({ students, addStudent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const handleAddStudent = (student: Omit<Student, 'id'>) => {
    addStudent(student);
    setIsModalOpen(false);
    setToast({message: 'Student added successfully!', type: 'success'});
  };
  
  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);


  return (
    <div className="p-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Student List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add New Student
          </button>
        </div>
        
        <div className="mb-4">
            <input 
                type="text"
                placeholder="Search by name, class, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Class</th>
                <th scope="col" className="px-6 py-3">Roll No.</th>
                <th scope="col" className="px-6 py-3">Parent Contact</th>
                <th scope="col" className="px-6 py-3">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {student.name}
                  </th>
                  <td className="px-6 py-4">{student.class}</td>
                  <td className="px-6 py-4">{student.rollNumber}</td>
                  <td className="px-6 py-4">{student.parentContact}</td>
                  <td className="px-6 py-4">{student.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
            {filteredStudents.length === 0 && (
                <p className="text-center py-4 text-gray-500 dark:text-gray-400">No students found.</p>
            )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Student">
        <StudentForm onSave={handleAddStudent} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Students;
