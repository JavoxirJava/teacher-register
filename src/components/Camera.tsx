import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";

const Camera: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string | null>(null);

    // 📸 Rasm olish funksiyasi
    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) setImage(imageSrc);
        }
    }, [webcamRef]);

    // 📨 Rasmni serverga yuborish funksiyasi
    const sendImageToServer = async () => {
        if (!image) return;

        const response = await fetch("YOUR_API_URL", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image }),
        });

        const data = await response.json();
        console.log("Server javobi:", data);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>📷 Kamera</h2>
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={400}
                height={300}
            />
            <br />
            <button onClick={capture}>📸 Rasm olish</button>

            {image && (
                <div>
                    <h3>🖼 Olingan rasm:</h3>
                    <img src={image} alt="Captured" width={400} height={300} />
                    <br />
                    <button onClick={sendImageToServer}>📤 Serverga yuborish</button>
                </div>
            )}
        </div>
    );
};

export default Camera;
