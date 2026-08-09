import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  modelType?: 'brain' | 'vision' | 'trading' | 'globe';
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ modelType = 'brain' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Emerald wireframe material
    const wireframeMaterial = new THREE.MeshPhongMaterial({
      color: 0x34d399,
      emissive: 0x064e3b,
      specular: 0xffffff,
      shininess: 100,
      wireframe: true,
    });

    // Indigo accent material
    const purpleMaterial = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      emissive: 0x1e1b4b,
      specular: 0xffffff,
      shininess: 80,
      wireframe: true,
    });

    let mainMesh: THREE.Mesh;

    if (modelType === 'brain') {
      const coreGeom = new THREE.IcosahedronGeometry(1.8, 2);
      mainMesh = new THREE.Mesh(coreGeom, wireframeMaterial);
      group.add(mainMesh);

      // Torus rings
      const ringGeom = new THREE.TorusGeometry(2.8, 0.03, 16, 100);
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(ringGeom, i % 2 === 0 ? wireframeMaterial : purpleMaterial);
        ring.rotation.x = Math.PI * (i / 3) + Math.random() * 0.5;
        ring.rotation.y = Math.PI * (i / 2);
        group.add(ring);
      }
    } else if (modelType === 'vision') {
      const coreGeom = new THREE.OctahedronGeometry(2.0, 2);
      mainMesh = new THREE.Mesh(coreGeom, wireframeMaterial);
      group.add(mainMesh);

      // Orbiting camera target markers
      const markerGeom = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      for (let i = 0; i < 6; i++) {
        const marker = new THREE.Mesh(markerGeom, purpleMaterial);
        const angle = (i / 6) * Math.PI * 2;
        marker.position.set(Math.cos(angle) * 3.2, Math.sin(angle) * 3.2, 0);
        group.add(marker);
      }
    } else if (modelType === 'trading') {
      const coreGeom = new THREE.DodecahedronGeometry(1.9, 1);
      mainMesh = new THREE.Mesh(coreGeom, purpleMaterial);
      group.add(mainMesh);

      // Financial grid rings
      const ringGeom = new THREE.TorusGeometry(3.0, 0.04, 8, 80);
      const ring = new THREE.Mesh(ringGeom, wireframeMaterial);
      ring.rotation.x = Math.PI / 3;
      group.add(ring);
    } else {
      // Globe / Spatial Network
      const coreGeom = new THREE.SphereGeometry(2.0, 16, 16);
      mainMesh = new THREE.Mesh(coreGeom, wireframeMaterial);
      group.add(mainMesh);
    }

    // Floating particles around the core
    const particleCount = 120;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeom, particleMaterial);
    group.add(particles);

    // Lights
    const pointLight = new THREE.PointLight(0x34d399, 2.5, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0x6366f1, 2, 100);
    purpleLight.position.set(-5, -5, -2);
    scene.add(purpleLight);

    scene.add(new THREE.AmbientLight(0x222222));

    camera.position.z = 6.8;

    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetRotationY = (x / rect.width) * 0.8;
      targetRotationX = (y / rect.height) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      group.rotation.y += 0.006;
      group.rotation.x += 0.002;

      // Smooth mouse follow interpolation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

      // Gentle pulsing effect
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.04;
      if (mainMesh) {
        mainMesh.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelType]);

  return <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center pointer-events-auto" />;
};
