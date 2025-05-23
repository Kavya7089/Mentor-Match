import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../layout/DashboardLayout';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isEditing, setIsEditing] = useState(false);

  // Example fallback values if not present in user object
  const points = user?.points ?? 120;
  const connections = user?.connections ?? 5;

  // Registration fields
  const expertise = user?.expertise || '—';
  const experience = user?.experience || '—';
  const interests = user?.interests || '—';
  const learningGoals = user?.learningGoals || '—';

  const handleSave = () => {
    updateUser({ name, email, avatar });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout
      title="Your Profile Info"
      description="Here you can see and edit your profile"
    >
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-primary-200 shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h1>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
              alt="Avatar"
              className="h-24 w-24 rounded-full object-cover"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary-500 text-white p-1 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                Edit
              </label>
            )}
          </div>
          <div>
            {isEditing ? (
              <>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-primary-100 "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-primary-100 "
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-800">{name}</p>
                <p className="text-sm text-gray-600">{email}</p>
              </>
            )}
          </div>
        </div>

        {/* User Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-primary-700">{points}</span>
            <span className="text-gray-600">Earned Points</span>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-primary-700">{connections}</span>
            <span className="text-gray-600">Connections Made</span>
          </div>
        </div>

        {/* Registration Data */}
        <div className="mt-8 bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">Registration Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Expertise:</span>
              <span className="ml-2 text-gray-800">{expertise}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Experience:</span>
              <span className="ml-2 text-gray-800">{experience}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Interests:</span>
              <span className="ml-2 text-gray-800">{interests}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Learning Goals:</span>
              <span className="ml-2 text-gray-800">{learningGoals}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {isEditing ? (
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="btn btn-primary"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;