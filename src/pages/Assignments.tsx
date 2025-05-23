import React, { useState } from 'react';
import DashboardLayout from './../components/layout/DashboardLayout';
import { CheckCircle, FileText, UploadCloud, Award, PlusCircle } from 'lucide-react';

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

const motivationalQuotes = [
  "Every assignment you create helps a student grow!",
  "Mentoring is planting seeds for the future.",
  "Your guidance shapes tomorrow's experts.",
  "Assignments given, knowledge shared!",
];

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const completed = assignments.filter(a => a.status === 'completed').length;
  const pending = assignments.length - completed;
  const progress = assignments.length ? Math.round((completed / assignments.length) * 100) : 0;

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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.dueDate) return;
    setAssignments([
      ...assignments,
      {
        id: (assignments.length + 1).toString(),
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        status: 'pending',
      },
    ]);
    setForm({ title: '', description: '', dueDate: '' });
    setShowForm(false);
  };

  return (
    <DashboardLayout 
      title="Assignments (Mentor)"
      description="Create and manage assignments for your students."
    >
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-lg">
        {/* Stats & Progress */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary-700">{assignments.length}</span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-600">{completed}</span>
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
            <div className="text-xs text-gray-600 mt-1 text-right">{progress}% completed</div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mb-6 flex items-center justify-center">
          <Award className="text-highlight-500 mr-2" size={18} />
          <span className="italic text-highlight-700 font-medium">
            {motivationalQuotes[progress % motivationalQuotes.length]}
          </span>
        </div>

        {/* Create Assignment Button & Form */}
        <div className="mb-8 flex justify-end">
          <button
            className="btn btn-primary flex items-center"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle size={18} className="mr-2" />
            {showForm ? 'Cancel' : 'Create Assignment'}
          </button>
        </div>
        {showForm && (
          <form
            className="mb-8 bg-white p-6 rounded-lg shadow flex flex-col gap-4"
            onSubmit={handleCreateAssignment}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md bg-primary-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md bg-primary-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md bg-primary-100"
                required
              />
            </div>
            <button type="submit" className="btn btn-highlight w-full mt-2">
              <UploadCloud size={16} className="mr-1" />
              Assign to Students
            </button>
          </form>
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
                  <div className={`rounded-full p-2 ${
                    a.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {a.status === 'completed' ? <CheckCircle size={28} /> : <FileText size={28} />}
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-primary-900">{a.title}</div>
                    <div className="text-sm text-gray-600 mb-1">{a.description}</div>
                    <div className="text-xs text-gray-400 mb-2">Due: {a.dueDate}</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2 min-w-[180px]">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    a.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {a.status === 'completed' ? (
                      <>
                        <CheckCircle size={14} className="mr-1" /> Completed
                      </>
                    ) : (
                      'Pending'
                    )}
                  </span>
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