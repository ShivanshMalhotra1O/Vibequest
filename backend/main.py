from fastapi import FastAPI, WebSocket
from fastapi.responses import JSONResponse
import cv2
from deepface import DeepFace
import numpy as np
import base64
import json

app = FastAPI()

# Load face cascade classifier
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)


@app.websocket("/ws/detect-emotion/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Receive data (base64 image) from the client
            data = await websocket.receive_text()
            image_data = base64.b64decode(data)

            # Convert the image data to NumPy array
            nparr = np.frombuffer(image_data, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Convert frame to grayscale
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            # Convert grayscale frame to RGB format
            rgb_frame = cv2.cvtColor(gray_frame, cv2.COLOR_GRAY2RGB)

            # Detect faces in the frame
            faces = face_cascade.detectMultiScale(
                gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30)
            )

            results = []
            for x, y, w, h in faces:
                # Extract the face ROI (Region of Interest)
                face_roi = rgb_frame[y : y + h, x : x + w]

                # Perform emotion analysis on the face ROI
                analysis = DeepFace.analyze(
                    face_roi, actions=["emotion"], enforce_detection=False
                )

                # Append the dominant emotion to results
                results.append(
                    {
                        "box": {"x": int(x), "y": int(y), "w": int(w), "h": int(h)},
                        "emotion": analysis[0]["dominant_emotion"],
                    }
                )

            # Send the results back to the client
            await websocket.send_text(json.dumps({"faces": results}))

    except Exception as e:
        await websocket.send_text(json.dumps({"error": str(e)}))
        await websocket.close()
