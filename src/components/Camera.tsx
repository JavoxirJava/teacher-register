import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";

const Camera: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string | null>(null);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) setImage(imageSrc);
        }
    }, [webcamRef]);

    return (
        <div className={styles.container}>
            <h2>📷 Kamera</h2>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className={styles.webcam} width={400} height={300} />
            <div className={styles["button-group"]}>
                <button onClick={capture}>📸 Rasm olish</button>
            </div>

            {image && (
                <div>
                    <h3>🖼 Olingan rasm:</h3>
                    <img src={image} alt="Captured" width={400} height={300} />
                </div>
            )}
        </div>
    );
};

export default Camera;
