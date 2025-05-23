import React, { useState } from 'react';
  
import DashboardLayout from './../components/layout/DashboardLayout';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

const initialAssignments: Assignment[] = [
  {
    id: '1',
    title: 'React Components',
    description: 'Build a simple React component for a profile card.',
    dueDate: '2024-06-10',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    description: 'Complete the quiz on supervised vs unsupervised learning.',
    dueDate: '2024-06-12',
    status: 'completed',
  },
];

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState(initialAssignments);

  const handleComplete = (id: string) => {
    setAssignments(asgns =>
      asgns.map(a =>
        a.id === id ? { ...a, status: 'completed' } : a
      )
    );
  };

  const handleSubmit = (id: string) => {
    alert(`Assignment ${id} submitted!`);
    // You can add your submit logic here
  };

  return (
    <DashboardLayout 
      title="Assignments" 
      description="Complete Assignments, earn points."
    >
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments found.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map(a => (
              <li
                key={a.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 p-4 rounded"
              >
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-gray-600">{a.description}</div>
                  <div className="text-xs text-gray-400">Due: {a.dueDate}</div>
                </div>
                <div className="mt-2 md:mt-0 flex items-center space-x-2">
                  {a.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleComplete(a.id)}
                        className="btn btn-primary btn-sm"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => handleSubmit(a.id)}
                        className="btn btn-outline btn-sm"
                      >
                        Submit
                      </button>
                    </>
                  ) : (
                    <span className="text-green-600 font-semibold">Completed</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Assignments;