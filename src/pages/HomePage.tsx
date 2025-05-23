import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  BookOpen,
  Award,
  Brain,
  Wallet,
  MessageSquare,
  Star,
  UserCheck,
} from 'lucide-react';
import Navbar from '../components/layout/NavbarHome';

const stats = [
  { icon: <Users className="h-6 w-6 text-primary-600" />, label: 'Mentors', value: '120+' },
  { icon: <UserCheck className="h-6 w-6 text-accent-600" />, label: 'Students', value: '800+' },
  { icon: <Award className="h-6 w-6 text-highlight-600" />, label: 'Assignments Completed', value: '2,500+' },
  { icon: <Star className="h-6 w-6 text-yellow-400" />, label: 'Avg. Mentor Rating', value: '4.8/5' },
];

const features = [
  {
    icon: <Users className="h-8 w-8 text-primary-600" />,
    title: 'AI-Powered Matching',
    description:
      'Our advanced AI pairs mentors and mentees based on skills, goals, and learning styles for the perfect match.',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary-600" />,
    title: 'Premium Resources',
    description:
      'Access a vast library of high-quality learning materials, curated by experts and mentors in the field.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary-600" />,
    title: 'Chain-Mines Gamification',
    description:
      'Complete assignments and challenges to earn points that unlock premium resources and features.',
  },
  {
    icon: <Brain className="h-8 w-8 text-primary-600" />,
    title: 'Smart AI Assistant',
    description:
      'Get instant answers from our AI chatbot, with seamless escalation to human mentors when needed.',
  },
  {
    icon: <Wallet className="h-8 w-8 text-primary-600" />,
    title: 'Blockchain Integration',
    description:
      'Connect your crypto wallet to unlock special features and purchase premium resources with earned points.',
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary-600" />,
    title: 'Direct Communication',
    description:
      'Connect directly with mentors and peers through our integrated messaging platform.',
  },
];

const roles = [
  {
    title: 'Join as a Mentor',
    description:
      'Share your knowledge, guide students, and make a difference in their learning journey.',
    image: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg',
    linkText: 'Start Mentoring',
    link: '/register?role=mentor',
  },
  {
    title: 'Join as a Student',
    description:
      'Connect with expert mentors, access quality resources, and accelerate your learning.',
    image: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg',
    linkText: 'Start Learning',
    link: '/register?role=student',
  },
  {
    title: 'Join as Both',
    description:
      'Learn from experts while sharing your own expertise in a hybrid role that maximizes growth.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    linkText: 'Get Started',
    link: '/register?role=hybrid',
  },
];

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-200 to-primary-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative py-28 md:py-36">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-48 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-accent-500 opacity-20 blur-3xl"></div>
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-highlight-500 opacity-20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight text-primary-900 sm:text-5xl xl:text-6xl">
                Connect, Learn, and Grow with{' '}
                <span className="text-highlight-500">MentorMatch</span>
              </h1>
              <p className="mt-6 text-xl text-primary-700">
                The ultimate platform connecting students with mentors,
                powered by AI, blockchain, and a vibrant community of learners and teachers.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="btn btn-primary px-6 py-3 text-base font-medium"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-primary px-6 py-3 text-base font-medium"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-outline border-primary-600 px-6 py-3 text-base font-medium text-primary-700 hover:bg-primary-100"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-200">
                <img
                  src="https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg"
                  alt="Student learning"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 z-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white bg-opacity-80 rounded-xl shadow p-6"
            >
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
              Why Choose MentorMatch?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-primary-700">
              Our platform offers unique features designed to enhance your learning journey
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white bg-opacity-80 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-primary-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-primary-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className="bg-primary-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
              Choose Your Path
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-primary-700">
              Select the role that best describes your journey
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {roles.map((role, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white bg-opacity-80 shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col"
              >
                <img
                  src={role.image}
                  alt={role.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-primary-900">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-primary-700 flex-1">{role.description}</p>
                  <div className="mt-6">
                    <Link
                      to={role.link}
                      className="btn btn-primary w-full"
                    >
                      {role.linkText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-600 text-white">
                  <BookOpen size={24} />
                </div>
                <span className="ml-2 text-xl font-bold">MentorMatch</span>
              </div>
              <p className="mt-4 text-primary-200">
                Connecting mentors and students through technology and community.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-primary-200 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-200 hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-200 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-primary-200 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-200 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-200 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-primary-800 pt-8">
            <p className="text-center text-primary-200">
              &copy; {new Date().getFullYear()} MentorMatch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;