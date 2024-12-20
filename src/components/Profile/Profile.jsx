import { logOut} from '@/utils';
import React from 'react'

function Profile() {
    const user = {
		name: 'Shivansh',
		email: 'shivansh@example.com',
		joinedDate: '2024-01-01',
		profilePicture: '/images/profile-placeholder.png', // Add a placeholder image
	};
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
			{/* Profile Header */}
			<div className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg w-full max-w-3xl">
				{/* Profile Picture */}
				<img
					src={user.profilePicture}
					alt="Profile"
					className="w-32 h-32 rounded-full object-cover border-4 border-primary mb-4"
				/>

				{/* Name and Email */}
				<h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
				<p className="text-lg text-gray-600 mb-4">{user.email}</p>

				{/* Join Date */}
				<p className="text-sm text-gray-500">
					Member since: {new Date(user.joinedDate).toLocaleDateString()}
				</p>
			</div>

			{/* Profile Options */}
			<div className="w-full max-w-3xl mt-8">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">Leaderboard</h2>

			</div>
		</div>
  )
}

export default Profile
