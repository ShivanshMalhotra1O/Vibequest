import { toBase64, useUser } from '@/utils';

export default function ProfilePage() {
	const { data: userData } = useUser();
	return (
		<div className="flex flex-col items-center min-h-[calc(100dvh-157px)]">
			{/* Profile Header */}
			<div className="flex flex-col items-center w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
				{/* Profile Picture */}
				<img
					src={`data:image/png;base64,${toBase64(userData?.image?.data)}`}
					alt="Profile"
					className="w-24 rounded-full"
				/>

				{/* Name and Email */}
				<h1 className="mb-2 text-3xl font-bold text-gray-800">
					{userData?.name}
				</h1>
				<p className="mb-4 text-lg text-gray-600">{userData?.username}</p>

				{/* Join Date */}
				<p className="text-sm text-gray-500">
					Member since: {new Date(userData?.joinedDate).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
