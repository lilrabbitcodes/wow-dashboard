
import React from 'react';
import type { Finding } from '../types';

interface FindingsListProps {
  title: string;
  findings: Finding[];
}

const PositiveIcon = () => (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const ImprovementIcon = () => (
    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
);

const CriticalIcon = () => (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const categoryIcon = {
    'Positive': <PositiveIcon />,
    'Improvement': <ImprovementIcon />,
    'Critical': <CriticalIcon />
};

export const FindingsList: React.FC<FindingsListProps> = ({ title, findings }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-brand-blue-dark mb-4">{title}</h3>
      <ul className="space-y-4">
        {findings.map((finding, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 mt-1">
                {categoryIcon[finding.category]}
            </div>
            <p className="ml-3 text-sm text-gray-700">{finding.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
