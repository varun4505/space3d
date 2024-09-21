import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Stars } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

function App() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [modelUrl, setModelUrl] = useState('model.glb');
  // Remove lightIntensity state
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const toggleModel = () => {
    setModelUrl(modelUrl === 'model.glb' ? 'model1.glb' : 'model.glb');
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#000', position: 'relative' }}>
      <Canvas>
        <OrbitControls autoRotate={autoRotate} autoRotateSpeed={0.5} />
        
        <ambientLight intensity={0.4} />
        <directionalLight intensity={0.6} position={[1, 2, 3]} />
        
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
        
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      </Canvas>

      {/* Futuristic UI overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px',
        color: '#0ff',
        fontFamily: 'Arial, sans-serif',
        textShadow: '0 0 10px #0ff',
      }}>
        <h1 style={{ margin: 0 }}>3D Model Viewer</h1>
      </div>

      {/* Control panel */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
      }}>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            backgroundColor: '#0ff',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
        </button>
        <button
          onClick={toggleModel}
          style={{
            backgroundColor: '#0ff',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Toggle Model
        </button>
        
        <button
          onClick={toggleFullscreen}
          style={{
            backgroundColor: '#0ff',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
}

export default App;
