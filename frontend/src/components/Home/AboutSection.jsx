import { Button } from '@nextui-org/react';

export default function AboutSection() {
	return (
		<div className="grid md:grid-cols-2 gap-4 px-4 py-8 border-y items-center">
			<div className="flex flex-col gap-4 px-4 lg:px-8 py-8">
				<h2 className="text-3xl font-bold">About VibeQuest</h2>
				<p className="text-lg text-justify">
					VibeQuest is your ultimate gaming platform where adventure, strategy,
					and fun collide. Explore various genres, discover new challenges, and
					immerse yourself in thrilling experiences.
				</p>
				<div>
					<a href="/about">
						<Button color="primary" size="lg">
							Learn More
						</Button>
					</a>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<img
					src="/images/about.jpg"
					alt="About Section"
					className="rounded-xl max-w-[80%]"
				/>
			</div>
		</div>
	);
}
