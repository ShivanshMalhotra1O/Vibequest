import { useUser } from '@/utils';
import { CircleUserRoundIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProfilePage() {
  const { data: userData } = useUser();
  const [newName, setNewName] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newProfilePhoto, setNewProfilePhoto] = useState<File | null>(null);
  const [userImage, setUserImage] = useState<string | null>(userData?.image || '');

  useEffect(() => {
    if (userData) {
      setUserImage(userData?.image);
    }
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
  
	// Prepare form data for the update request
	const formData = new FormData();
	if (newName) formData.append('name', newName);
	if (newUsername) formData.append('username', newUsername);
	if (newPassword) formData.append('password', newPassword);
	if (newProfilePhoto) formData.append('image', newProfilePhoto);
  
	try {
	  const response = await axios.put(BACKEND_URL + '/profile/user/update', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
		withCredentials: true,
	  });
  
	  console.log('Profile updated successfully:', response.data);
	  alert('Profile updated successfully!');
	  window.location.reload();
	} catch (error) {
	  // Enhanced error logging
	  if (error.response) {
		console.error('Error Response:', error.response);
		alert(`Error: ${error.response?.data?.message || 'Unknown error'}`);
	  } else if (error.request) {
		console.error('Error Request:', error.request);
		alert('No response from server. Please check your network or server.');
	  } else {
		console.error('Error Message:', error.message);
		alert(`Error: ${error.message}`);
	  }
	}
  };
  
  return (
    <div className="flex flex-col items-center min-h-[calc(100dvh-157px)]">
      {/* Profile Header */}
      <div className="flex flex-col items-center w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        {/* Profile Picture */}
        {userImage ? (
          <img
            src={userImage}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <CircleUserRoundIcon className="w-24 h-24" />
        )}

        {/* Name and Email */}
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          {userData?.name}
        </h1>
        <p className="mb-4 text-lg text-gray-600">{userData?.username}</p>

        {/* Join Date */}
        <p className="text-sm text-gray-500">
          Member since:{' '}
          {new Date(userData?.joinedDate ?? '').toLocaleDateString()}
        </p>
      </div>

      {/* Update Profile Form */}
      <div className="mt-8 w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              onChange={(e) => setNewProfilePhoto(e.target.files?.[0] || null)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
