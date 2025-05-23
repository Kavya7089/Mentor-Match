import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  expertise: string;
  available: boolean;
}

const initialMentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Robert Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    expertise: 'Machine Learning',
    available: true,
  },
  {
    id: '2',
    name: 'Prof. Lisa Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    expertise: 'Web Development',
    available: true,
  },
  {
    id: '3',
    name: 'Dr. Emily Carter',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    expertise: 'Data Science',
    available: false,
  },
];

const AvailableMentors: React.FC = () => {
  const [mentors, setMentors] = useState(initialMentors);

  const handleRequest = (id: string) => {
    setMentors(ms =>
      ms.map(m =>
        m.id === id ? { ...m, available: false } : m
      )
    );
    alert('Mentorship request sent!');
  };

  return (
    <DashboardLayout
      title="Available Mentors"
      description="Browse and request mentorship from available mentors."
    >
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
        <ul className="space-y-4">
          {mentors.map(mentor => (
            <li
              key={mentor.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{mentor.name}</div>
                  <div className="text-sm text-gray-600">{mentor.expertise}</div>
                </div>
              </div>
              <div>
                {mentor.available ? (
                  <button
                    onClick={() => handleRequest(mentor.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Request Mentorship
                  </button>
                ) : (
                  <span className="text-gray-400 font-semibold">Not Available</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default AvailableMentors;