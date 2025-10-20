
import React from 'react';

interface HeaderProps {
    onMenuClick: () => void;
}

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
);

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 lg:px-8 bg-white border-b sticky top-0 z-10">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-brand-grey md:hidden mr-4" aria-label="Open menu">
            <MenuIcon />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-brand-blue-dark">Q3 2025 Performance Overview</h1>
      </div>
    </header>
  );
};