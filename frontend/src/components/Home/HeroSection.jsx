import { Button } from '@nextui-org/react';

export default function HeroSection() {
	return (
		<div className="flex items-center justify-center flex-col gap-4 min-h-[50vh] border-y px-4">
			<h1 className="text-5xl font-bold text-center">Welcome to VibeQuest</h1>
			<p className="text-center text-lg">
				Your ultimate destination for all things gaming.
			</p>
			<div className="flex gap-4 flex-wrap justify-center">
				<Button color="primary" size="lg">
					Start Playing
				</Button>
				<Button size="lg">Explore Games</Button>
			</div>
		</div>
	);
}
