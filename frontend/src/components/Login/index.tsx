import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Form,
	Input,
} from '@nextui-org/react';
import axios from 'axios';
import * as React from 'react';
import { toast } from 'sonner';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function LoginForm() {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = {
			username,
			password,
		};
		try {
			await axios.post(BACKEND_URL + '/user/login', data, {
				withCredentials: true,
			});
			queryClient.invalidateQueries({
				queryKey: ['user_data'],
			});
			queryClient.refetchQueries({
				queryKey: ['user_data'],
			});
			toast.success('Login successful!');
			setTimeout(() => {
				navigate('/home');
			}, 500);
		} catch {
			toast.error('Login failed!');
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 px-4 py-16 min-h-[calc(100dvh-157px)]">
			<Card className="min-w-[300px]">
				<CardHeader>
					<h1 className="w-full text-3xl font-bold text-center">Login</h1>
				</CardHeader>
				<CardBody>
					<Form
						className="w-full"
						validationBehavior="native"
						onSubmit={onSubmit}
					>
						<Input
							isRequired
							errorMessage="Please enter a valid username"
							label="Username"
							name="username"
							value={username}
							onValueChange={setUsername}
						/>
						<Input
							isRequired
							errorMessage="Please enter a valid password"
							label="Password"
							name="password"
							type="password"
							value={password}
							onValueChange={setPassword}
						/>
						<Button type="submit" variant="bordered" className="ml-auto">
							Login
						</Button>
						<p>
							Don&apos;t have an account?{' '}
							<a href="/signup" className="underline">
								Sign up
							</a>
						</p>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
}
