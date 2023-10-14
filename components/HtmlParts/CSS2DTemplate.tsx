import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { Html } from "@react-three/drei";
import * as ReactDOMServer from 'react-dom/server';
import { Custom3Html } from "./Custom3Html";
import ReactDOM from "react-dom";

extend({ CSS2DRenderer });

const HtmlOverlay = ({ position, children }) =>
{
  const meshRef = useRef(null!);
  const labelRef = useRef(null!);

  useEffect(() =>
  {
    const div = document.createElement('div');
    div.className = 'label';
    div.innerHTML = React.isValidElement(children) ? ReactDOMServer.renderToString(children) : children;

    const label = new CSS2DObject(div);
    label.position.set(0, 0.6, 0);
    meshRef.current.add(label);

    labelRef.current = label;

    return () => meshRef?.current.remove(label);
  }, [children]);

  useFrame((state) =>
  {
    if (labelRef.current)
    {
      labelRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshBasicMaterial color="royalblue" />
    </mesh>
  );
};
export function AppContent({ })
{
  const { scene, camera } = useThree();
  const labelRendererRef = useRef(null!);

  useEffect(() =>
  {
    labelRendererRef.current = new CSS2DRenderer();
    labelRendererRef.current.setSize(window.innerWidth, window.innerHeight);
    labelRendererRef.current.domElement.style.position = 'absolute';
    labelRendererRef.current.domElement.style.top = '0';
    document.body.appendChild(labelRendererRef.current.domElement);

    const animate = () =>
    {
      if (scene && camera)
      {
        labelRendererRef.current.render(scene, camera);
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () =>
    {
      if (labelRendererRef.current)
      {
        document.body.removeChild(labelRendererRef.current.domElement);
      }
    };
  }, [scene, camera]);

  return (
    <>
      <HtmlOverlay position={[0, 0, -1]}>
        <div></div>
      </HtmlOverlay>
    </>
  );
}
