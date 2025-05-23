import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { UserCheck, UserX, Award, Users, Star, Mail } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  expertise: string;
  available: boolean;
  bio: string;
  rating: number;
  reviews: number;
  email: string;
}

const initialMentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Robert Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    expertise: 'Machine Learning',
    available: true,
    bio: '10+ years in AI research. Loves mentoring students in ML and data science.',
    rating: 4.9,
    reviews: 32,
    email: 'robert.chen@example.com',
  },
  {
    id: '2',
    name: 'Prof. Lisa Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    expertise: 'Web Development',
    available: true,
    bio: 'Full-stack web developer and university professor. Passionate about React and Node.js.',
    rating: 4.8,
    reviews: 27,
    email: 'lisa.johnson@example.com',
  },
  {
    id: '3',
    name: 'Dr. Emily Carter',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    expertise: 'Data Science',
    available: false,
    bio: 'Data scientist at a Fortune 500 company. Loves Python and big data.',
    rating: 4.7,
    reviews: 19,
    email: 'emily.carter@example.com',
  },
  {
    id: '4',
    name: 'Mr. Ahmed Khan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    expertise: 'Cybersecurity',
    available: true,
    bio: 'Certified ethical hacker and security trainer. Here to help you stay safe online.',
    rating: 4.6,
    reviews: 15,
    email: 'ahmed.khan@example.com',
  },
  {
    id: '5',
    name: 'Ms. Priya Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    expertise: 'Cloud Computing',
    available: false,
    bio: 'AWS certified architect. Loves teaching cloud concepts to beginners.',
    rating: 4.8,
    reviews: 22,
    email: 'priya.patel@example.com',
  },
];

const motivationalTips = [
  'Mentorship is the shortcut to mastery.',
  'Connect with mentors to unlock your potential!',
  'Every great achiever is inspired by a great mentor.',
  "Don't hesitate—reach out and grow your network!",
];

const AvailableMentors: React.FC = () => {
  const [mentors, setMentors] = useState(initialMentors);
  const [requestedId, setRequestedId] = useState<string | null>(null);

  const availableCount = mentors.filter(m => m.available).length;

  const handleRequest = (id: string) => {
    setRequestedId(id);
    setTimeout(() => {
      setMentors(ms => ms.map(m => (m.id === id ? { ...m, available: false } : m)));
      setRequestedId(null);
      alert('Mentorship request sent!');
    }, 900);
  };

  return (
    <DashboardLayout
      title="Available Mentors"
      description="Browse and request mentorship from available mentors."
    >
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-lg">
        {/* Stats & Motivation */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <Users className="text-primary-600 mb-1" size={22} />
              <span className="text-xl font-bold text-primary-700">{mentors.length}</span>
              <span className="text-xs text-gray-500">Total Mentors</span>
            </div>
            <div className="flex flex-col items-center">
              <UserCheck className="text-green-600 mb-1" size={22} />
              <span className="text-xl font-bold text-green-600">{availableCount}</span>
              <span className="text-xs text-gray-500">Available Now</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Award className="text-highlight-500 mr-2" size={18} />
            <span className="italic text-highlight-700 font-medium">
              {motivationalTips[availableCount % motivationalTips.length]}
            </span>
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {mentors.map(mentor => (
            <div
              key={mentor.id}
              className={`flex flex-col items-center p-6 bg-white  rounded-lg shadow-md border-t-4 transition-all hover:shadow-xl ${
                mentor.available ? 'border-green-400' : 'border-gray-300 opacity-80'
              }`}
            >
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-primary-200"
              />
              <div className="font-semibold text-lg text-primary-900">{mentor.name}</div>
              <div className="mt-1 mb-2">
                <span className="inline-block bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full">
                  {mentor.expertise}
                </span>
              </div>
              <div className="text-xs text-gray-600 mb-2 text-center">{mentor.bio}</div>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(mentor.rating)
                        ? 'text-highlight-500 fill-highlight-500'
                        : 'text-gray-300'
                    }
                  />
                ))}
                <span className="ml-1 text-xs text-gray-500">
                  {mentor.rating} ({mentor.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                {mentor.available ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    <UserCheck size={14} className="mr-1" /> Available
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-200 text-gray-500 text-xs font-semibold">
                    <UserX size={14} className="mr-1" /> Not Available
                  </span>
                )}
              </div>
              <a
                href={`mailto:${mentor.email}`}
                className="mb-2 text-xs text-blue-600 hover:underline flex items-center"
              >
                <Mail size={14} className="mr-1" /> {mentor.email}
              </a>
              <button
                onClick={() => handleRequest(mentor.id)}
                className={`btn btn-primary btn-sm w-full transition-all ${
                  !mentor.available || requestedId === mentor.id
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:scale-105'
                }`}
                disabled={!mentor.available || requestedId === mentor.id}
              >
                {requestedId === mentor.id
                  ? 'Requesting...'
                  : mentor.available
                  ? 'Request Mentorship'
                  : 'Unavailable'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AvailableMentors;