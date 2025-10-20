
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const ArrowUpIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
);

const ArrowDownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
);

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive }) => {
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-sm font-medium text-brand-grey">{title}</h3>
      <div className="flex items-baseline justify-between mt-2">
        <p className="text-3xl font-bold text-brand-blue-dark">{value}</p>
        <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
          {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
          <span className="ml-1">{change}</span>
        </div>
      </div>
    </div>
  );
};
