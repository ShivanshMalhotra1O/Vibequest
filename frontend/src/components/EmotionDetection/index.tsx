import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Webcam from 'react-webcam';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export default function EmotionDetection() {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [detection, setDetection] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket(SOCKET_URL);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setConnectionAttempts(0); // Reset connection attempts on successful connection
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);

      // Retry logic for WebSocket connection
      if (connectionAttempts < 5) {
        console.log(`Retrying WebSocket connection (attempt ${connectionAttempts + 1})`);
        setTimeout(() => {
          setConnectionAttempts((prev) => prev + 1);
          connectWebSocket();
        }, 1000 * (connectionAttempts + 1)); // Exponential backoff
      } else {
        console.error('Failed to establish WebSocket connection after multiple attempts');
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket message:', data);

        // Check if faces is an array and has at least one element
        if (data && Array.isArray(data.faces)) {
          const faces = data.faces;
          if (faces.length > 0) {
            setDetection(faces[0]?.emotion || 'Unknown');
          } else {
            setDetection('No faces detected');
          }
        } else if (data.error) {
          console.error('Error:', data.error);
        } else {
          setDetection('No emotions detected');
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };

    setSocket(ws);
  }, [connectionAttempts]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      socket?.close();
    };
  }, [connectWebSocket]);

  useEffect(() => {
    if (detection) {
      const timeout = setTimeout(() => {
        alert(`Emotion detected: ${detection}. Suggesting Games!`);
        navigate(`/emotion/${detection.toLowerCase()}`);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [detection, navigate]);

  const sendFrame = useCallback(() => {
    if (webcamRef.current && socket && socket.readyState === WebSocket.OPEN) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        const base64Data = imageSrc.split(',')[1];
        if (base64Data) {
          socket.send(base64Data);
        } else {
          console.error('Failed to extract Base64 data from screenshot');
        }
      } else {
        console.error('Failed to capture screenshot');
      }
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
  }, [sendFrame, detection]);

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
