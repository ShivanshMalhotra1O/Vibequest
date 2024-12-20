import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import { useUser } from '@/utils';

import './Parallax.css';

// Image paths (use paths relative to your public folder)
const LAPTOP_IMAGE = '/images/Group-7.png'; // Place this in public/images/
const ICON_1 = '/images/game-1.jpg';
const ICON_2 = '/images/game-2.jpg';
const ICON_3 = '/images/game-3.jpg';
const ICON_4 = '/images/game-4.jpg';
const ICON_5 = '/images/game-5.jpg';
const TOP_IMAGE = '/images/Device5.png';

export default function ParallaxPage() {
	const { data } = useUser();

	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = () => {
		setScrollPosition(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="parallax-container">
			{/* Top Container */}
			<div className="top-container"></div>

			{/* Laptop Image */}
			<div className="laptop-wrapper">
				<img src={LAPTOP_IMAGE} alt="Laptop" className="laptop" />
				{/* Game Icons */}
				<img
					src={ICON_1}
					alt="Icon 1"
					className="icon-1"
					style={{
						transform: `translateX(${scrollPosition / -3}px)`,
					}}
				/>
				<img
					src={ICON_2}
					alt="Icon 2"
					className="icon-2"
					style={{
						transform: `translateX(${scrollPosition / -4}px)`,
					}}
				/>
				<img
					src={ICON_3}
					alt="Icon 3"
					className="icon-3"
					style={{
						transform: `translateX(${scrollPosition / 5}px)`,
					}}
				/>
				<img
					src={ICON_4}
					alt="Icon 4"
					className="icon-4"
					style={{
						transform: `translateX(${scrollPosition / 6}px)`,
					}}
				/>
				<img
					src={ICON_5}
					alt="Icon 5"
					className="icon-5"
					style={{
						transform: `translateX(${scrollPosition / 2}px)`,
					}}
				/>

				<img src={TOP_IMAGE} alt="Top-laptop" className="Top-laptop" />
			</div>

			<div className="white-container">
				<div className="content">
					<h1 className="title">Welcome to VibeQuest</h1>
					<p className="subtitle">
						Your ultimate destination for all things gaming.
					</p>
					<a href={data ? '/home' : '/login'} className="text-primary">
						<Button color="primary" size="lg">
							{data ? "Let's Play" : 'Login to Play'}
						</Button>
					</a>
				</div>
			</div>
		</div>
	);
}
