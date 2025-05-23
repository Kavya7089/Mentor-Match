import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { CheckCircle, FileText, UploadCloud, Award } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
  fileUrl?: string;
}

const initialAssignments: Assignment[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Complete the JavaScript basics quiz.',
    dueDate: '2024-06-15',
    status: 'pending',
  },
  {
    id: '2',
    title: 'React Project',
    description: 'Build a to-do app using React.',
    dueDate: '2024-06-20',
    status: 'completed',
    fileUrl: 'https://example.com/assignment2.pdf',
  },
];

const motivationalQuotes = [
  'Keep pushing your limits!',
  'Every assignment completed is a step closer to mastery.',
  'Consistency is the key to success.',
  'Great job! Keep up the momentum.',
];

const MyAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const completed = assignments.filter(a => a.status === 'completed').length;
  const pending = assignments.length - completed;
  const progress = assignments.length
    ? Math.round((completed / assignments.length) * 100)
    : 0;
  const allDone =
    assignments.length > 0 && completed === assignments.length;

  const handleComplete = (id: string) => {
    setAssignments(asgns =>
      asgns.map(a => (a.id === id ? { ...a, status: 'completed' } : a))
    );
  };

  const handleUpload = (id: string, file: File) => {
    setUploadingId(id);
    // Simulate upload
    setTimeout(() => {
      setAssignments(asgns =>
        asgns.map(a =>
          a.id === id
            ? { ...a, fileUrl: URL.createObjectURL(file), status: 'completed' }
            : a
        )
      );
      setUploadingId(null);
    }, 1200);
  };

  return (
    <DashboardLayout
      title="My Assignments"
      description="View, upload, and manage your assignments."
    >
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-lg">
        {/* Stats & Progress */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary-700">
                {assignments.length}
              </span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-600">
                {completed}
              </span>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-yellow-500">{pending}</span>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-green-400 to-primary-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-1 text-right">
              {progress}% completed
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mb-6 flex items-center justify-center">
          <Award className="text-highlight-500 mr-2" size={18} />
          <span className="italic text-highlight-700 font-medium">
            {motivationalQuotes[progress % motivationalQuotes.length]}
          </span>
        </div>

        {/* Congratulatory Message */}
        {allDone && (
          <div className="mb-6 flex items-center justify-center bg-green-100 border border-green-300 rounded-lg p-4 shadow">
            <CheckCircle className="text-green-500 mr-2" size={22} />
            <span className="text-green-700 font-semibold">
              Congratulations! You have completed all assignments!
            </span>
          </div>
        )}

        {/* Assignment List */}
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments found.</p>
        ) : (
          <ul className="space-y-6">
            {assignments.map(a => (
              <li
                key={a.id}
                className={`flex flex-col md:flex-row md:items-center md:justify-between bg-white border-l-4 ${
                  a.status === 'completed'
                    ? 'border-green-400'
                    : 'border-yellow-400'
                } p-5 rounded-lg shadow-sm transition-all hover:shadow-md`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-full p-2 ${
                      a.status === 'completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {a.status === 'completed' ? (
                      <CheckCircle size={28} />
                    ) : (
                      <FileText size={28} />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-primary-900">
                      {a.title}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {a.description}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      Due: {a.dueDate}
                    </div>
                    {a.fileUrl && (
                      <a
                        href={a.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-1 text-xs text-blue-600 underline"
                      >
                        View Uploaded Assignment
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2 min-w-[180px]">
                  {a.status === 'pending' ? (
                    <>
                      <label className="block">
                        <span className="sr-only">Upload Assignment</span>
                        <input
                          type="file"
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary-100 file:text-primary-700
                            hover:file:bg-primary-200"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              handleUpload(a.id, e.target.files[0]);
                            }
                          }}
                          disabled={uploadingId === a.id}
                        />
                      </label>
                      <button
                        onClick={() => handleComplete(a.id)}
                        className="btn btn-primary btn-sm w-full flex items-center justify-center"
                        disabled={uploadingId === a.id}
                      >
                        <UploadCloud size={16} className="mr-1" />
                        {uploadingId === a.id ? 'Uploading...' : 'Mark as Completed'}
                      </button>
                    </>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <CheckCircle size={14} className="mr-1" /> Completed
                    </span>
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

export default MyAssignments;