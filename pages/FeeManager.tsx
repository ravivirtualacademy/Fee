
import React, { useMemo, useState } from 'react';
import { Student, Fee } from '../types';

interface FeeManagerProps {
  students: Student[];
  fees: Fee[];
  updateFeeStatus: (studentId: string, month: string, year: number, status: 'Paid' | 'Unpaid') => void;
}

const FeeManager: React.FC<FeeManagerProps> = ({ students, fees, updateFeeStatus }) => {
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  const feeRecords = useMemo(() => {
    return fees.map(fee => {
      const student = students.find(s => s.id === fee.studentId);
      return {
        ...fee,
        studentName: student?.name || 'N/A',
        className: student?.class || 'N/A',
      };
    }).sort((a,b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
  }, [fees, students]);
  
  const filteredRecords = useMemo(() => {
      if(filter === 'all') return feeRecords;
      return feeRecords.filter(record => record.status.toLowerCase() === filter);
  }, [feeRecords, filter])

  const handleStatusChange = (record: typeof feeRecords[0], newStatus: 'Paid' | 'Unpaid') => {
      updateFeeStatus(record.studentId, record.month, record.year, newStatus);
  };

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fee Records</h2>
          <div className="flex items-center space-x-2">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as 'all' | 'paid' | 'unpaid')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Student Name</th>
                <th scope="col" className="px-6 py-3">Class</th>
                <th scope="col" className="px-6 py-3">Month/Year</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3">Due Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={`${record.studentId}-${record.month}-${record.year}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{record.studentName}</td>
                  <td className="px-6 py-4">{record.className}</td>
                  <td className="px-6 py-4">{record.month}, {record.year}</td>
                  <td className="px-6 py-4">${record.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">{record.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {record.status === 'Unpaid' && (
                      <button onClick={() => handleStatusChange(record, 'Paid')} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            {filteredRecords.length === 0 && (
                <p className="text-center py-4 text-gray-500 dark:text-gray-400">No fee records found for this filter.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default FeeManager;
