import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Webcam from 'react-webcam';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export default function EmotionDetection() {
	const navigate = useNavigate();
	const webcamRef = useRef<Webcam>(null);
	const [detection, setDetection] = useState('');
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket(SOCKET_URL);
		setSocket(ws);

		return () => {
			ws.close();
		};
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (detection) {
				alert(
					`Emotion detected: ${
						detection[0].toUpperCase() + detection.slice(1)
					}, Suggesting Games!!`
				);
				navigate(`/emotion/${detection.toLowerCase()}`);
			}
		}, 500);
		return () => clearTimeout(timeout);
	}, [detection, navigate]);

	useEffect(() => {
		if (socket) {
			socket.onmessage = (event) => {
				const data = JSON.parse(event.data);
				if (data.faces) {
					setDetection(data.faces?.[0].emotion as string);
				} else if (data.error) {
					console.error('Error:', data.error);
				}
			};

			socket.onerror = (error) => {
				console.error('WebSocket error:', error);
			};
		}
	}, [socket]);

	const sendFrame = useCallback(() => {
		if (webcamRef.current && socket && socket.readyState === WebSocket.OPEN) {
			const imageSrc = webcamRef.current.getScreenshot();

			const base64Data = imageSrc?.split(',')[1];
			if (!base64Data) {
				return;
			}
			socket.send(base64Data);
		}
	}, [socket]);

	useEffect(() => {
		const interval = setInterval(() => {
			sendFrame();
		}, 500);

		if (detection) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [socket, sendFrame, detection]);

	return (
		<div className="box-border flex flex-col items-center min-h-[calc(100dvh-157px)] p-5 bg-gray-100">
			<h1 className="mb-5 text-4xl font-bold text-gray-800">
				Real-Time Emotion Detection
			</h1>
			<div className="w-full md:w-4/5 max-w-4xl mb-8 overflow-hidden rounded-lg shadow-md aspect-square md:aspect-video">
				<Webcam
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="text-center">
				<h2 className="mb-2 text-2xl font-semibold text-gray-600">
					Detected Emotions:
				</h2>
				<ul className="p-0 m-0 uppercase list-none">
					{detection ? (
						<li className="my-1 text-lg text-gray-700">{detection}</li>
					) : (
						<li className="my-1 text-lg text-gray-700">No emotions detected</li>
					)}
				</ul>
			</div>
		</div>
	);
}
