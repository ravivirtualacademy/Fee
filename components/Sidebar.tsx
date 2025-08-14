
import React from 'react';
import { Page } from '../types';
import { DashboardIcon, StudentsIcon, FeeIcon, AIIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
        isActive
          ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-white'
          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-white dark:bg-gray-800 h-full shadow-md">
        <div className="flex items-center pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">AI School Manager</span>
        </div>
        <ul className="space-y-2">
          <NavItem
            icon={<DashboardIcon />}
            label="Dashboard"
            isActive={currentPage === Page.Dashboard}
            onClick={() => onPageChange(Page.Dashboard)}
          />
          <NavItem
            icon={<StudentsIcon />}
            label="Students"
            isActive={currentPage === Page.Students}
            onClick={() => onPageChange(Page.Students)}
          />
          <NavItem
            icon={<FeeIcon />}
            label="Fee Manager"
            isActive={currentPage === Page.FeeManager}
            onClick={() => onPageChange(Page.FeeManager)}
          />
          <NavItem
            icon={<AIIcon />}
            label="AI Assistant"
            isActive={currentPage === Page.AIAssistant}
            onClick={() => onPageChange(Page.AIAssistant)}
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
