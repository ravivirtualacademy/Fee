
import React, { useState } from 'react';
import { Page } from './types';
import { useSchoolData } from './hooks/useSchoolData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import FeeManager from './pages/FeeManager';
import AIAssistant from './pages/AIAssistant';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const { students, fees, addStudent, updateFeeStatus, loading } = useSchoolData();

  const renderPage = () => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>
        );
    }
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard students={students} fees={fees} />;
      case Page.Students:
        return <Students students={students} addStudent={addStudent} />;
      case Page.FeeManager:
        return <FeeManager students={students} fees={fees} updateFeeStatus={updateFeeStatus} />;
      case Page.AIAssistant:
        return <AIAssistant />;
      default:
        return <Dashboard students={students} fees={fees} />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return 'Dashboard';
      case Page.Students:
        return 'Student Management';
      case Page.FeeManager:
        return 'Fee Manager';
      case Page.AIAssistant:
        return 'AI Assistant';
      default:
        return 'School Manager';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
