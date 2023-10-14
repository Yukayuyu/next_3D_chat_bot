import React, { Fragment, MouseEventHandler, useContext, useEffect, useRef, useState } from 'react'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

import { useFrame, useThree } from '@react-three/fiber';
import ReactDOMServer from 'react-dom/server';
import { ParentContext } from '../../pages/threes/3dmain';


const HtmlOverlay = ({ position, children }) =>
{
  const meshRef = useRef(null!);
  const labelRef = useRef(null!);

  useEffect(() =>
  {
    const div = document.createElement('div');
    div.className = 'label';
    div.style.zIndex = '-100';
    div.innerHTML = React.isValidElement(children) ? ReactDOMServer.renderToString(children) : children;

    const label = new CSS3DObject(div);
    label.position.set(0, 0, -50);

    meshRef.current.add(label);
    labelRef.current = label;

    return () => meshRef?.current?.remove(label);
  }, [children]);

  useFrame((state) =>
  {
    if (labelRef.current)
    {
      labelRef.current.quaternion.copy(state.camera.quaternion);

    }
    if (labelRef.current && meshRef.current)
    {
      // 3Dオブジェクトの位置と回転をCSS2DObjectにコピー
      labelRef.current.position.copy(meshRef.current.position);
      labelRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
    </mesh>
  );
  // <planeGeometry ></planeGeometry>
  // <meshBasicMaterial color="royalblue" />
};

export function Custom3Html()
{
  const [elements, pagestate] = useContext(ParentContext);


  const { scene, camera } = useThree();
  const labelRendererRef = useRef(null!);

  useEffect(() =>
  {
    labelRendererRef.current = new CSS3DRenderer();
    labelRendererRef.current.setSize(window.innerWidth, window.innerHeight);
    labelRendererRef.current.domElement.style.position = 'absolute';
    labelRendererRef.current.domElement.style.top = '0';
    labelRendererRef.current.domElement.style.zIndex = '5'
    labelRendererRef.current.domElement.style.pointerEvents = 'none';
    labelRendererRef.current.domElement.style.opacity = '0.6';

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

  return (<>
    <HtmlOverlay position={[50, 20, -100]}>
      <div className='bg-yellow-100 shadow w-96'>
        <header className="bg-white shadow">
          <div className="max-w-xl px-4 py-2 sm:px-4 lg:px-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">{pagestate === 1 ? '会話ボード' : '自己紹介'}</h1>
          </div>
        </header>

        <div className="mx-auto max-w-7xl py-2 sm:px-2 lg:px-2 overflow-y-auto h-40 ">

          {elements.map((e, i) => (<div className='flex flex-row' key={i}>
            <img className="h-10 w-10 flex-none rounded-full bg-gray-50" src={e.type == 1 ? "/6325959i.jpg" : "/que-10278654555.png"} alt="" />
            <div className='px-1 py-2 align-middle table-cell'>
              {e.jsxElement}
            </div>
          </div>))}
        </div>
      </div>
    </HtmlOverlay>
  </>)
}
