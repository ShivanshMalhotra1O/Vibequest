import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Form,
	Input,
} from '@nextui-org/react';
import * as React from 'react';

export default function LoginForm() {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [submitted, setSubmitted] = React.useState(null);

	const onSubmit = (e) => {
		e.preventDefault();

		const data = Object.fromEntries(new FormData(e.currentTarget));

		setSubmitted(data);
	};

	return (
		<div className="flex flex-col items-center gap-4 px-4 py-16 min-h-[calc(100dvh-197px)]">
			<Card className="w-[400px]">
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
							labelPlacement="outside"
							name="username"
							placeholder="Enter your username"
							value={username}
							onValueChange={setUsername}
						/>
						<Input
							isRequired
							errorMessage="Please enter a valid password"
							label="Password"
							labelPlacement="outside"
							name="password"
							placeholder="Enter your password"
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
						{submitted && (
							<div className="text-small text-default-500">
								You submitted: <code>{JSON.stringify(submitted)}</code>
							</div>
						)}
					</Form>
				</CardBody>
			</Card>
		</div>
	);
}
