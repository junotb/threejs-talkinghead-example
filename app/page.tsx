'use client';

// Import necessary libraries
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default function Home() {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const loadModel = () => {
    console.log('loadModel');

    // Load the 3D model
    const loader = new FBXLoader();
    loader.load('/models/Dobby.fbx', (object) => {
      console.log('FBXLoader');

      // Add the model to the scene
      if (!scene) {
        return;
      }
      scene.add(object);

      console.log(object);
    
      // Get the head mesh
      const headMesh = object.getObjectByName('');
      
      /*
      // Create a map of viseme shapes
      const visemeShapes = {
        'A': { // Viseme for 'A' sound
          'blendShapes': {
            'Jaw': 0.5,
            'Mouth_Open': 0.5,
            'Lips_Stretch': 0.3
          }
        },
        'B': { // Viseme for 'B' sound
          'blendShapes': {
            'Lips_Puckered': 0.7,
            'Mouth_Open': 0.3
          }
        },
        // Add more viseme shapes as needed
      };
    
      // Function to update the viseme
      function updateViseme(viseme) {
        const blendShapes = visemeShapes[viseme].blendShapes;
        for (const blendShape in blendShapes) {
          headMesh.morphTargetInfluences[headMesh.morphTargetDictionary[blendShape]] = blendShapes[blendShape];
        }
      }
    
      // Animate the talking-head
      function animate() {
        if (!scene || !camera || !renderer) {
          return;
        }

        requestAnimationFrame(animate);
    
        // Update the viseme based on the audio or other input
        // updateViseme('A'); // Example viseme
    
        renderer.render(scene, camera);
      }
    
      //animate();
      */
    });
  }

  useEffect(() => {
    if (!scene || !camera || !divRef || !renderer) {
      return;
    }
    if (!divRef.current) {
      return;
    }
    divRef.current.appendChild(renderer.domElement);
  }, [scene, camera, renderer, divRef]);

  useEffect(() => {
    // Create a scene
    const newScene = new THREE.Scene();
    setScene(newScene);
    
    // Create a camera
    const newCamera = new THREE.PerspectiveCamera(75, 320 / 320, 0.1, 1000);
    newCamera.position.z = 5;
    setCamera(newCamera);
    
    // Create a renderer
    const newRenderer = new THREE.WebGLRenderer();
    newRenderer.setSize(320, 320);
    setRenderer(newRenderer);
  }, [])
  
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <h1>Talking Head</h1>
      <button onClick={loadModel}>Load</button>
      <div
        ref={divRef}
        className='border w-80 h-80'
      ></div>
    </div>
  );
}
