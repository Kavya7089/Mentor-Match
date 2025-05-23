import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

interface MenteeRequest {
  id: string;
  name: string;
  topic: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}

const initialRequests: MenteeRequest[] = [
  {
    id: '1',
    name: 'Alice Smith',
    topic: 'React Basics',
    status: 'pending',
    date: '2024-06-01',
  },
  {
    id: '2',
    name: 'Bob Johnson',
    topic: 'Machine Learning',
    status: 'accepted',
    date: '2024-06-02',
  },
];

const MenteeRequests: React.FC = () => {
  const [requests, setRequests] = useState(initialRequests);

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
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
        {requests.length === 0 ? (
          <p className="text-gray-500">No requests found.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map(req => (
              <li
                key={req.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 p-4 rounded"
              >
                <div>
                  <div className="font-medium">{req.name}</div>
                  <div className="text-sm text-gray-600">Topic: {req.topic}</div>
                  <div className="text-xs text-gray-400">Requested: {req.date}</div>
                </div>
                <div className="mt-2 md:mt-0 flex items-center space-x-2">
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
                      className={
                        req.status === 'accepted'
                          ? 'text-green-600 font-semibold'
                          : 'text-red-500 font-semibold'
                      }
                    >
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
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