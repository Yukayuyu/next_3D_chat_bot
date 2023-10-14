import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { useFrame, useThree } from '@react-three/fiber';

function ModuleLoader({ path, motion }: { path: string, motion: string })
{
  const { scene } = useThree()
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() =>
  {

    // MMDLoader を初期化
    const loader = new MMDLoader();
    //loader.setPath("/modules/yuzuki_yukari/");
    const helper = new MMDAnimationHelper();


    loader.loadWithAnimation(path, motion, (mmd2) =>
    {
      const mesh = mmd2.mesh;
      const animation = mmd2.animation;
      mesh.renderOrder = 100

      scene.add(mesh)
      const mixer = new THREE.AnimationMixer(mesh);
      mixer.clipAction(animation).play();

      mixerRef.current = mixer;

    })

    // camera.position.z = 5;
    const CLOCK = new THREE.Clock();
    const animate = function ()
    {
      requestAnimationFrame(animate);
      // renderer.render(scene, camera);
      // controls.update()
      helper.update(CLOCK.getDelta());
    };

    animate();
  }, [scene]);

  useFrame((state, delta) =>
  {
    if (mixerRef.current)
    {
      mixerRef.current.update(delta)
    }
  })

  return null;
}


export default function MMDModelComponent({ path, motion }: { path: string, motion: string })
{
  return <ModuleLoader path={path} motion={motion}></ModuleLoader>
}
