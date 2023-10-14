import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { Custom3Html } from './Custom3Html'
import ReactDOM from 'react-dom';
import { CustomInputArea } from './CustomInputArea';
import { ParentContext } from '../../pages/threes/3dmain';
import { Html } from '@react-three/drei';

export function ChatArea()
{
  const [setMsg, clearFlag, setClearFlag, onMsgSend, loading, onBack] = useContext(ParentContext);

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() =>
  {
    ref.current.disabled = !loading;
    ref2.current.disabled = !loading;
    ref3.current.className = loading ? 'py-2 bg-white' : 'py-2 bg-gray-600';

  }, [loading])

  return (
    <div className='flex absolute bottom-0 inset-x-0 w-full z-200'>
      <button ref={ref2} className='w-1/12 block items-center text-center rounded-l-xl bg-blue-50 px-2 py-1 text-4xl font-sans text-blue-500 hover:text-blue-900 ring-1 ring-inset ring-blue-300/20 disabled:bg-gray-600 disabled:hover:text-blue-500 font-extrabold' type='button' style={{ "pointerEvents": "auto" }} onClick={onBack}>←</button>
      <div ref={ref3}>
        <img className="h-16 w-16 flex-none rounded-full bg-white align-middle " src={"/que-10278654555.png"} alt="" />
      </div>
      <CustomInputArea className='pl-8 w-10/12 h-20 font-medium font-sans text-4xl' clearFlag={clearFlag} setClearFlag={setClearFlag} setValue={setMsg} loading={loading}></CustomInputArea>
      <button ref={ref} className='w-1/12 block items-center text-center rounded-r-xl bg-green-50 px-2 py-1 text-4xl font-medium font-sans text-green-500 hover:text-green-700 ring-1 ring-inset ring-green-300/20 disabled:bg-gray-600 disabled:hover:text-green-500' type='button' style={{ "pointerEvents": "auto" }} onClick={onMsgSend}>TALK</button>
    </div>
  );
}
