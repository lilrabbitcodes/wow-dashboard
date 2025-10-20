
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartCardProps {
  title: string;
  data: any[];
  dataKey: string;
  xAxisKey: string;
  barColor: string;
  isPercentage?: boolean;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, data, dataKey, xAxisKey, barColor, isPercentage }) => {
    
    const formatYAxis = (tickItem: number) => {
        if (isPercentage) {
            return `${tickItem}%`;
        }
        if (tickItem >= 1000000) {
            return `${tickItem / 1000000}M`;
        }
        if (tickItem >= 1000) {
            return `${tickItem / 1000}K`;
        }
        return tickItem;
    };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-brand-blue-dark mb-4">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xAxisKey} tick={{ fill: '#808080', fontSize: 12 }} />
            <YAxis tickFormatter={formatYAxis} tick={{ fill: '#808080', fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: 'rgba(230, 230, 230, 0.5)' }}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Bar dataKey={dataKey} fill={barColor} name={dataKey.charAt(0).toUpperCase() + dataKey.slice(1)} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
