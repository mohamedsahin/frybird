'use client';

import { useEffect, useRef } from 'react';

/*
  Procedural 3D fried-chicken drumstick with drag-to-rotate (OrbitControls).
  three.js is loaded via dynamic import inside the effect so it never runs on
  the server and stays out of the SSR bundle.
*/
function craggy(x: number, y: number, z: number) {
  return 0.5 * Math.sin(3.1 * x) * Math.sin(3.0 * y) * Math.sin(3.2 * z)
    + 0.28 * Math.sin(7.0 * x + 1) * Math.sin(6.7 * y + 2) * Math.sin(7.3 * z)
    + 0.14 * Math.sin(13 * x) * Math.sin(12 * y + 1) * Math.sin(13 * z + 2);
}

export default function Chicken3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const THREE: any = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      if (disposed || !mountRef.current) return;

      let W = mount.clientWidth || 400;
      let H = mount.clientHeight || 400;
      let raf = 0;
      let resumeT: ReturnType<typeof setTimeout>;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
      camera.position.set(0, 0.4, 6.4);

      let renderer: any;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch (e) {
        return; // WebGL unavailable
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H);
      if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const key = new THREE.DirectionalLight(0xfff1d0, 1.5); key.position.set(4, 6, 5); scene.add(key);
      const rim = new THREE.DirectionalLight(0xff5a3c, 0.9); rim.position.set(-5, 2, -4); scene.add(rim);
      const fill = new THREE.DirectionalLight(0xffffff, 0.4); fill.position.set(-3, -2, 4); scene.add(fill);

      // ---- build drumstick ----
      const group = new THREE.Group();
      const geo = new THREE.SphereGeometry(1.25, 140, 140);
      geo.scale(1.12, 1.28, 1.12);
      const pos = geo.attributes.position;
      const v = new THREE.Vector3();
      const deep = new THREE.Color(0x5d2c0c), gold = new THREE.Color(0xc9791f), light = new THREE.Color(0xf2b65c);
      const colors: number[] = [];
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        const dir = v.clone().normalize();
        const n = craggy(dir.x * 1.6, dir.y * 1.6, dir.z * 1.6);
        const taper = 1 - Math.max(0, v.y - 0.4) * 0.42;
        v.multiplyScalar(taper);
        v.addScaledVector(dir, 0.16 * n);
        pos.setXYZ(i, v.x, v.y, v.z);
        const t = Math.max(0, Math.min(1, n + 0.55));
        const c = deep.clone().lerp(gold, t);
        if (t > 0.62) c.lerp(light, (t - 0.62) * 1.6);
        colors.push(c.r, c.g, c.b);
      }
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geo.computeVertexNormals();
      group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0.04 })));

      const boneMat = new THREE.MeshStandardMaterial({ color: 0xefe6cd, roughness: 0.45 });
      const bone = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.26, 1.5, 28), boneMat);
      bone.position.set(0, 1.62, 0);
      group.add(bone);
      [-0.2, 0.2].forEach((dx) => {
        const k = new THREE.Mesh(new THREE.SphereGeometry(0.28, 28, 28), boneMat);
        k.position.set(dx, 2.32, 0);
        group.add(k);
      });
      group.position.y = -0.55;
      group.rotation.z = 0.32;
      scene.add(group);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; controls.dampingFactor = 0.08;
      controls.enablePan = false; controls.enableZoom = false;
      controls.autoRotate = true; controls.autoRotateSpeed = 1.7;
      controls.minPolarAngle = 0.55; controls.maxPolarAngle = 2.45;
      const onStart = () => { controls.autoRotate = false; clearTimeout(resumeT); };
      const onEnd = () => { clearTimeout(resumeT); resumeT = setTimeout(() => { controls.autoRotate = true; }, 2500); };
      controls.addEventListener('start', onStart);
      controls.addEventListener('end', onEnd);

      const resize = () => {
        if (!mountRef.current) return;
        W = mountRef.current.clientWidth; H = mountRef.current.clientHeight;
        if (!W || !H) return;
        camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H);
      };
      window.addEventListener('resize', resize);

      const render = () => { raf = requestAnimationFrame(render); controls.update(); renderer.render(scene, camera); };
      render();

      if (loaderRef.current) loaderRef.current.classList.add('hide');

      cleanup = () => {
        cancelAnimationFrame(raf);
        clearTimeout(resumeT);
        window.removeEventListener('resize', resize);
        controls.removeEventListener('start', onStart);
        controls.removeEventListener('end', onEnd);
        controls.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className="chicken3d__stage" data-reveal>
      <div className="chicken3d__glow" />
      <div ref={mountRef} className="chicken3d__canvas" role="img" aria-label="Interactive 3D fried chicken drumstick you can rotate" />
      <div ref={loaderRef} className="chicken3d__loading">Loading the bird…</div>
      <div className="chicken3d__badge">100% Hand-Breaded</div>
    </div>
  );
}
