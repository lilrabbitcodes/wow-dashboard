
import React, { useState, useCallback } from 'react';
import { generateDashboardSummary } from '../services/geminiService';
import type { Finding } from '../types';

interface AiSummaryCardProps {
    findings: Finding[];
}

const SparkleIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 01-1.414 1.414L12 6.414l-2.293 2.293a1 1 0 01-1.414-1.414L10 5m0 14l2.293-2.293a1 1 0 011.414 1.414L12 19.586l2.293-2.293a1 1 0 011.414 1.414L14 21m-4-11l2.293-2.293a1 1 0 011.414 1.414L12 11.586l2.293-2.293a1 1 0 011.414 1.414L14 13m-4 1v-4m-2 2h4"></path></svg>
);

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue-mid"></div>
    </div>
);

export const AiSummaryCard: React.FC<AiSummaryCardProps> = ({ findings }) => {
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateSummary = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setSummary('');
        try {
            const result = await generateDashboardSummary(findings);
            setSummary(result);
        } catch (err: any) {
            setError(err.message || 'Failed to generate summary.');
        } finally {
            setIsLoading(false);
        }
    }, [findings]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-semibold text-brand-blue-dark">AI Executive Summary</h3>
                 <button 
                    onClick={handleGenerateSummary}
                    disabled={isLoading}
                    className="flex items-center px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                     <SparkleIcon/>
                     {isLoading ? 'Generating...' : 'Generate'}
                 </button>
            </div>
            <div className="flex-grow min-h-[150px]">
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {summary && <p className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</p>}
                {!isLoading && !summary && !error && (
                    <div className="flex items-center justify-center h-full text-center text-brand-grey">
                        <p>Click "Generate" to create an AI-powered summary of the key findings.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
