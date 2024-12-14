import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const SOCKET_URL = 'ws://127.0.0.1:8000/ws/detect-emotion/';
export default function EmotionDetection() {
	const webcamRef = useRef(null);
	const [detections, setDetections] = useState([]);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const ws = new WebSocket(SOCKET_URL);
		setSocket(ws);

		return () => {
			ws.close();
		};
	}, []);

	useEffect(() => {
		if (socket) {
			socket.onmessage = (event) => {
				const data = JSON.parse(event.data);
				if (data.faces) {
					setDetections(data.faces.map((face) => face.emotion));
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

			const base64Data = imageSrc.split(',')[1];
			socket.send(base64Data);
		}
	}, [socket]);

	useEffect(() => {
		const interval = setInterval(() => {
			sendFrame();
		}, 500);

		return () => clearInterval(interval);
	}, [socket, sendFrame]);

	return (
		<div className="box-border flex flex-col items-center justify-center h-[calc(100dvh-197px)] p-5 bg-gray-100">
			<h1 className="mb-5 text-4xl font-bold text-gray-800">
				Real-Time Emotion Detection
			</h1>
			<div className="w-4/5 max-w-4xl mb-8 overflow-hidden rounded-lg shadow-md aspect-video">
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
					{detections.length > 0 ? (
						detections.map((emotion, index) => (
							<li key={index} className="my-1 text-lg text-gray-700">
								{emotion}
							</li>
						))
					) : (
						<li className="my-1 text-lg text-gray-700">No emotions detected</li>
					)}
				</ul>
			</div>
		</div>
	);
}
