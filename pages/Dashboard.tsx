
import React from 'react';
import { Student, Fee } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
    <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full p-3">
      {icon}
    </div>
  </div>
);

interface DashboardProps {
  students: Student[];
  fees: Fee[];
}

const Dashboard: React.FC<DashboardProps> = ({ students, fees }) => {
  const totalStudents = students.length;
  const totalFeesCollected = fees.filter(f => f.status === 'Paid').reduce((acc, f) => acc + f.amount, 0);
  const totalFeesPending = fees.filter(f => f.status === 'Unpaid').reduce((acc, f) => acc + f.amount, 0);

  const feeStatusData = [
      { name: 'Fees', Paid: totalFeesCollected, Unpaid: totalFeesPending },
  ];

  const studentsByClass = students.reduce((acc, student) => {
      acc[student.class] = (acc[student.class] || 0) + 1;
      return acc;
  }, {} as Record<string, number>);

  const classData = Object.entries(studentsByClass).map(([name, value]) => ({ name, students: value }));

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Students" value={totalStudents} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
        <StatCard title="Fees Collected (This Month)" value={`$${totalFeesCollected.toLocaleString()}`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
        <StatCard title="Fees Pending" value={`$${totalFeesPending.toLocaleString()}`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8C9.79 8 8 9.79 8 12s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6a2 2 0 100-4 2 2 0 000 4z" /></svg>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Fee Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={feeStatusData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.2)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgb(107 114 128)'}} />
                    <YAxis tick={{ fill: 'rgb(107 114 128)'}} />
                    <Tooltip cursor={{fill: 'rgba(243, 244, 246, 0.5)'}} contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', color: '#fff', borderRadius: '0.5rem' }}/>
                    <Legend />
                    <Bar dataKey="Paid" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Unpaid" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Students per Class</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(128,128,128,0.2)"/>
                    <XAxis type="number" tick={{ fill: 'rgb(107 114 128)'}} />
                    <YAxis type="category" dataKey="name" width={80} tick={{ fill: 'rgb(107 114 128)'}}/>
                    <Tooltip cursor={{fill: 'rgba(243, 244, 246, 0.5)'}} contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', color: '#fff', borderRadius: '0.5rem' }}/>
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
