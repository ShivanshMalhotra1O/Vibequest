import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Form,
	Input,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SignUpForm() {
	const [name, setName] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [image, setImage] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const onSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}
		const formData = new FormData();
		formData.append('name', name);
		formData.append('username', username);
		formData.append('password', password);
		formData.append('image', image);
		try {
			await axios.post(BACKEND_URL + '/user/signup', formData, {
				withCredentials: true,
			});
			queryClient.invalidateQueries('user_data');
			queryClient.refetchQueries('user_data');
			setTimeout(() => {
				navigate('/home');
			}, 500);
		} catch {
			toast.error('Signup failed!');
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 px-4 py-16 min-h-[calc(100dvh-157px)]">
			<Card className="min-w-[300px]">
				<CardHeader>
					<h1 className="w-full text-3xl font-bold text-center">Signup</h1>
				</CardHeader>
				<CardBody>
					<Form
						className="w-full"
						validationBehavior="native"
						onSubmit={onSubmit}
					>
						<Input
							isRequired
							errorMessage="Please enter a valid name"
							label="Name"
							labelPlacement="outside"
							name="name"
							placeholder="Enter your name"
							value={name}
							onValueChange={setName}
						/>
						<Input
							isRequired
							errorMessage="Please enter a valid username"
							label="Username"
							labelPlacement="outside"
							name="username"
							placeholder="Enter your username"
							type="text"
							value={username}
							onValueChange={setUsername}
						/>
						{/* <Input
							isRequired
							errorMessage="Please enter a valid email"
							label="Email"
							labelPlacement="outside"
							name="email"
							placeholder="Enter your email"
							type="email"
							value={email}
							onValueChange={setEmail}
						/> */}
						<Input
							isRequired
							errorMessage="Please enter a valid password"
							label="Password"
							labelPlacement="outside"
							name="password"
							placeholder="Enter your password"
							type={isPasswordVisible ? 'text' : 'password'}
							endContent={
								<button
									type="button"
									tabIndex={-1}
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								>
									{isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
								</button>
							}
							value={password}
							onValueChange={setPassword}
						/>
						<Input
							isRequired
							errorMessage="Please confirm your password"
							label="Confirm Password"
							labelPlacement="outside"
							name="confirmPassword"
							placeholder="Confirm your password"
							value={confirmPassword}
							type={isPasswordVisible ? 'text' : 'password'}
							endContent={
								<button
									type="button"
									tabIndex={-1}
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								>
									{isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
								</button>
							}
							onValueChange={setConfirmPassword}
						/>
						<Input
							isRequired
							type="file"
							label="Profile Pic"
							name="image"
							onChange={(e) => {
								setImage(e.target.files[0]);
							}}
							accept="image/*"
							errorMessage="Please upload a valid image"
						/>
						<Button type="submit" variant="bordered" className="ml-auto">
							Submit
						</Button>
						<p>
							Already have an account?{' '}
							<a href="/login" className="underline">
								Login
							</a>
						</p>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
}
