import { Button } from '@nextui-org/react';
import { motion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

export default function HeroSection() {
	const targetRef = useRef(null);
	const [top, setTop] = useState(0);
	const { scrollY } = useScroll({
		target: targetRef,
	});

	scrollY.on('change', (val) => {
		const fullHeight = document.documentElement.clientHeight;
		setTop(val / fullHeight);
	});

	return (
		<div className="relative min-h-[80vh] overflow-hidden" ref={targetRef}>
			{/* Parallax Background */}
			<motion.img
				src="/vertical_new.jpg"
				alt="bg-vibequest"
				className="absolute top-0 object-cover w-full -z-50 brightness-50"
				style={{ top: `-${top * 100}%` }}
			/>
			<div className="backdrop-blur-[8px] w-full min-h-[80vh]" />
			{/* Foreground Content */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="flex flex-col items-center w-full gap-4 px-4 py-8 text-white">
					<h1 className="text-5xl font-bold text-center">
						Welcome to VibeQuest
					</h1>
					<p className="text-lg text-center">
						Your ultimate destination for all things gaming.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<a href="#popular-games" className="text-primary">
							<Button color="primary" size="lg">
								Start Playing
							</Button>
						</a>
						<a href="/emotion-detection" className="text-primary">
							<Button size="lg">Emotion Detection</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
