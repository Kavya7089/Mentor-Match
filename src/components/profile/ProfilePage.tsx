import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isEditing, setIsEditing] = useState(false);

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
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
  );
};

export default ProfilePage;