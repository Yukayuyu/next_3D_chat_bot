import * as THREE from 'three';
import { useEffect, useRef, memo, Ref } from "react";
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { useFrame, useThree } from '@react-three/fiber';

function ModuleLoader({ path, motion }: { path: string, motion: string })
{
  const { scene, camera } = useThree()
  scene.fog = new THREE.FogExp2(0xaaccff, 0.001)

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  //const containerRef = useRef(null);

  useEffect(() =>
  {

    // MMDLoader を初期化
    const loader = new MMDLoader();

    const helper = new MMDAnimationHelper();

    loader.loadWithAnimation(path, motion, (mmd2) =>
    {
      const mesh = mmd2.mesh;
      const animation = mmd2.animation;

      mesh.position.set(-20, -10, 0);

      scene.add(mesh)
      const mixer = new THREE.AnimationMixer(mesh);
      mixer.clipAction(animation).play();

      mixerRef.current = mixer;

    })

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

type MMDModelProps = {
  path: string,
  motion: string
}

export const MMDModelComponent: React.FC<MMDModelProps> = memo(function (props)
{
  return (
    <>
      <ModuleLoader path={props.path} motion={props.motion} ></ModuleLoader>
    </>)
},
  (p, n) => p.path === n.path && p.motion === n.motion
)
