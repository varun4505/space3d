import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas>
        {/* Controls to rotate and zoom */}
        <OrbitControls />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight intensity={0.6} position={[1, 2, 3]} />
        
        {/* Load the 3D model */}
        <Suspense fallback={null}>
          <Model url="model.glb" />
        </Suspense>
        
        {/* Add environment for realistic lighting */}
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

export default App;
