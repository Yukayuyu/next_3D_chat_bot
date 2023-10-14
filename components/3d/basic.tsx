import * as THREE from 'three'

import { useRef, memo } from 'react'
import { Perf } from 'r3f-perf'
import { OrbitControls, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

type SceneryProps = {
  imga: string,
  imgb: string
}

export const Scenery: React.FC<SceneryProps> = memo(function Scenery(props)
{
  const directionalLight = useRef<THREE.DirectionalLight>(null);

  const texture = new THREE.TextureLoader().load(props.imga)
  const btexture = new THREE.TextureLoader().load(props.imgb)

  // useHelper(
  //   directionalLight as React.MutableRefObject<THREE.DirectionalLight>,
  //   THREE.DirectionalLightHelper,
  //   10, "white")

  return (
    <>

      <color args={['ivory']} attach={'backgournd'}></color>
      <ambientLight intensity={0.5}></ambientLight>
      <directionalLight
        castShadow
        ref={directionalLight}
        position={[50, 50, 50]}
        intensity={1}
        shadow-mapSize={[1024, 1024]}
      ></directionalLight>

      <group position={[0, 0, 0]}>
        <mesh receiveShadow scale={300} position={[0, -10, 0]} rotation={[-Math.PI * 0.5, 0, 0]} >
          <planeGeometry ></planeGeometry>
          <meshStandardMaterial map={btexture} opacity={0.1} transparent={true} ></meshStandardMaterial>

        </mesh>
        <mesh scale={200} rotation={[0, 0, 0]} position={[0, -30, -50]}>
          <sphereGeometry ></sphereGeometry>
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} ></meshBasicMaterial>
        </mesh>
      </group>
    </>


  )
}, (p, n) =>
{
  return p.imga === n.imga && p.imgb === n.imgb
})
