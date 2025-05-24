import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { User, CheckCircle, XCircle, MessageSquare, Award } from 'lucide-react';

interface MenteeRequest {
  id: string;
  name: string;
  avatar: string;
  topic: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
  message: string;
}

const initialRequests: MenteeRequest[] = [
  {
    id: '1',
    name: 'Alice Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    topic: 'React Basics',
    status: 'pending',
    date: '2024-06-01',
    message: 'I want to learn the basics of React and build my first app.',
  },
  {
    id: '2',
    name: 'Bob Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    topic: 'Machine Learning',
    status: 'accepted',
    date: '2024-06-02',
    message: 'Need help understanding supervised vs unsupervised learning.',
  },
  {
    id: '3',
    name: 'Priya Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    topic: 'Cloud Computing',
    status: 'pending',
    date: '2024-06-03',
    message: 'Looking for guidance on AWS basics and certifications.',
  },
  {
    id: '4',
    name: 'Ahmed Khan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    topic: 'Cybersecurity',
    status: 'rejected',
    date: '2024-06-04',
    message: 'Interested in learning about ethical hacking.',
  },
  {
    id: '5',
    name: 'Emily Carter',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    topic: 'Data Science',
    status: 'pending',
    date: '2024-06-05',
    message: 'Want to start a career in data science. Where should I begin?',
  },
];

const motivationalTips = [
  'Every mentee is a future leader!',
  'Your guidance can change someone\'s journey.',
  'Mentoring is a two-way street—grow together!',
  'Responding to requests builds lasting connections.',
];

const MenteeRequests: React.FC = () => {
  const [requests, setRequests] = useState(initialRequests);

  const total = requests.length;
  const pending = requests.filter(r => r.status === 'pending').length;
  const accepted = requests.filter(r => r.status === 'accepted').length;
  const rejected = requests.filter(r => r.status === 'rejected').length;

  const handleAccept = (id: string) => {
    setRequests(reqs =>
      reqs.map(r => (r.id === id ? { ...r, status: 'accepted' } : r))
    );
  };

  const handleReject = (id: string) => {
    setRequests(reqs =>
      reqs.map(r => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
  };

  return (
    <DashboardLayout
      title="Mentee Requests"
      description="View and manage requests from mentees."
    >
      <div
        className="max-w-6xl mx-auto mt-8 p-6 bg-primary-50 bg-opacity-65 rounded-xl shadow-lg"
        
      >
        {/* Stats & Motivation */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <User className="text-primary-600 mb-1" size={22} />
              <span className="text-xl font-bold text-primary-700">{total}</span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-600 mb-1" size={22} />
              <span className="text-xl font-bold text-green-600">{accepted}</span>
              <span className="text-xs text-gray-500">Accepted</span>
            </div>
            <div className="flex flex-col items-center">
              <XCircle className="text-red-500 mb-1" size={22} />
              <span className="text-xl font-bold text-red-500">{rejected}</span>
              <span className="text-xs text-gray-500">Rejected</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageSquare className="text-yellow-500 mb-1" size={22} />
              <span className="text-xl font-bold text-yellow-500">{pending}</span>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Award className="text-highlight-500 mr-2" size={18} />
            <span className="italic text-highlight-700 font-medium">
              {motivationalTips[pending % motivationalTips.length]}
            </span>
          </div>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <p className="text-gray-500">No requests found.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map(req => (
              <li
                key={req.id}
                className={`flex flex-col md:flex-row md:items-center md:justify-between bg-white bg-opacity-75 border-l-4 ${
                  req.status === 'accepted'
                    ? 'border-green-400'
                    : req.status === 'rejected'
                    ? 'border-red-400'
                    : 'border-yellow-400'
                } p-5 rounded-lg shadow-sm transition-all hover:shadow-md`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={req.avatar}
                    alt={req.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
                  />
                  <div>
                    <div className="font-semibold text-lg text-primary-900">{req.name}</div>
                    <div className="text-xs text-gray-400 mb-1">Requested: {req.date}</div>
                    <div className="text-sm text-primary-700 mb-1">
                      Topic: <span className="font-medium">{req.topic}</span>
                    </div>
                    <div className="text-xs text-gray-600 italic">"{req.message}"</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-2 min-w-[160px] justify-end">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="btn btn-primary btn-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="btn btn-outline btn-sm"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {req.status === 'accepted' ? (
                        <>
                          <CheckCircle size={14} className="mr-1" /> Accepted
                        </>
                      ) : (
                        <>
                          <XCircle size={14} className="mr-1" /> Rejected
                        </>
                      )}
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

export default MenteeRequests;