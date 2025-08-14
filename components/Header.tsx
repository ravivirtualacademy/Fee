
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
    </header>
  );
};

export default Header;
