
import React, { useState } from 'react';
import { calculateFeesWithAI, generateReportCommentAI, generateCommunicationDraftAI } from '../services/geminiService';
import Spinner from '../components/Spinner';

const AICard: React.FC<{
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  buttonText: string;
  action: (prompt: string) => Promise<any>;
  renderResult: (result: any) => React.ReactNode;
}> = ({ title, description, inputLabel, inputPlaceholder, buttonText, action, renderResult }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!prompt) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await action(prompt);
      setResult(response);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{inputLabel}</label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={inputPlaceholder}
          className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center"
        >
          {loading ? <Spinner /> : buttonText}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {result && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Result:</h4>
            {renderResult(result)}
          </div>
        )}
      </div>
    </div>
  );
};

const AIAssistant = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <AICard
        title="AI Fee Calculator"
        description="Calculate student fees using natural language. Mention name, month, and any special conditions like discounts or late fees."
        inputLabel="Fee Calculation Request"
        inputPlaceholder="e.g., Calculate fee for Alice Johnson for September with a sibling discount."
        buttonText="Calculate Fee"
        action={calculateFeesWithAI}
        renderResult={(result) => (
          <div className="text-gray-700 dark:text-gray-300 text-sm">
            <p><strong>Student:</strong> {result.studentName}</p>
            <p><strong>Month:</strong> {result.month}</p>
            <ul className="list-disc list-inside my-2">
                <li>Tuition: ${result.breakdown.tuition.toFixed(2)}</li>
                <li>Sports Fee: ${result.breakdown.sports.toFixed(2)}</li>
                <li>Library Fee: ${result.breakdown.library.toFixed(2)}</li>
                <li>Discount: ${result.breakdown.discount.toFixed(2)}</li>
                <li>Late Fee: ${result.breakdown.lateFee.toFixed(2)}</li>
            </ul>
            <p className="font-bold text-base text-gray-900 dark:text-white"><strong>Total:</strong> ${result.total.toFixed(2)}</p>
          </div>
        )}
      />
      <AICard
        title="AI Report Card Helper"
        description="Generate personalized and constructive comments for student report cards based on their performance."
        inputLabel="Student Performance Data"
        inputPlaceholder="e.g., Bob Smith: Math B+, Science A, English B, Attendance 92%, great participation in class."
        buttonText="Generate Comment"
        action={generateReportCommentAI}
        renderResult={(result) => <p className="text-gray-700 dark:text-gray-300 italic">"{result}"</p>}
      />
      <AICard
        title="AI Communication Assistant"
        description="Draft professional communications for parents regarding events, reminders, or general announcements."
        inputLabel="Communication Topic"
        inputPlaceholder="e.g., Reminder for parent-teacher meetings next Friday."
        buttonText="Draft Message"
        action={generateCommunicationDraftAI}
        renderResult={(result) => <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{result}</p>}
      />
    </div>
  );
};

export default AIAssistant;
