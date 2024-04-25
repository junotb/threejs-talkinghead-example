'use client';

// Import necessary libraries
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default function Home() {
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Load the 3D model
    const loader = new FBXLoader();
    loader.load('/models/Dobby.fbx', (object) => {
      // Add the model to the scene
      scene.add(object);
    
      // Get the head mesh
      const headMesh = object.getObjectByName('Head');
    
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
        requestAnimationFrame(animate);
    
        // Update the viseme based on the audio or other input
        updateViseme('A'); // Example viseme
    
        renderer.render(scene, camera);
      }
    
      //animate();
    });
  }, [])
  
  return (
    <p>Home</p>
  );
}
