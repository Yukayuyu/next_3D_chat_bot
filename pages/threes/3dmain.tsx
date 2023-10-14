import { Canvas } from "@react-three/fiber"
import * as THREE from 'three'
import { Scenery } from '../../components/3d/basic'
import { Custom3Html } from '../../components/HtmlParts/Custom3Html'
import { ChatArea } from '../../components/HtmlParts/3HtmlBox'
import { MMDModelComponent } from "../../components/module/yukariModule"

import { DefaultPerspectiveCamera } from "../../components/camera/defaultCamera"
import { CameraControls, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useState, createContext, MouseEventHandler, useEffect, ReactNode, useRef } from "react"
import AudioPlayerYuakri from "../../components/utils/AudioPlayer"

import idGenerator from "../../components/utils/idGenerator"
import { IntroContent } from "../../components/HtmlParts/SelfIntro"
import { GetStaticProps } from "next"

export const ParentContext = createContext(null);

export type elementType = {
  orginMessage: string,
  jsxElement: ReactNode,
  type: number,
  timeDelay: number
}

export default function Main()
{
  const defaultPerspectiveCamera = DefaultPerspectiveCamera(new THREE.Vector3(300, 300, 300));

  defaultPerspectiveCamera.updateProjectionMatrix();

  const [msg, setMsg] = useState('');
  const [talkCount, setTalkCount] = useState(0);
  const [elements, setElements] = useState<elementType[]>([]);
  const [clearFlag, setClearFlag] = useState(false);

  const [msgpop, setmsgpop] = useState('');
  const [loading, setLoading] = useState(true);

  const [pagestate, setpagestate] = useState(0)

  const [cameraposition, setcameraposition] = useState(new THREE.Quaternion())

  const [talkId, setTalkId] = useState(null);
  useEffect(() =>
  {
    setTalkId(idGenerator)
  }, [])

  const btnRef1 = useRef(null)
  const btnRef2 = useRef(null)

  useEffect(() =>
  {
    if (btnRef1.current)
    {
      btnRef1.current.disabled = !loading
    }
    if (btnRef1.current)
    {
      btnRef2.current.disabled = !loading
    }
  }, [loading])


  // 要素を動的に追加する関数
  const addElement = async () =>
  {

    setMsg('');
    setClearFlag(true);
    const sayElement: elementType = {
      orginMessage: msg,
      jsxElement:
        (
          <>
            <div className='bg-blend-color-burn hover:bg-orange-300'>{msg}</div>
          </>
        ),
      type: 0,
      timeDelay: 0
    }
    setElements(prevElements => [...prevElements, sayElement]);

    const [message, duration] = await AudioPlayerYuakri({ id: talkId, text: msg, loading: loading, setLoading: setLoading })

    setTimeout(() =>
    {
      setElements(elements =>
      {
        elements.forEach((e) =>
        {
          e.jsxElement = (
            <>
              <div className='bg-blend-color-burn hover:bg-orange-300'>{e.orginMessage}</div>
            </>
          )
        })
        return elements
      })
      setLoading(true)
    }, duration * 1000);


    const msgElement: elementType = {
      orginMessage: message,
      jsxElement:
        (
          <div className='bg-blend-color-burn hover:bg-orange-300'>
            {
              message.split('').map((e, i) =>
              (
                <span key={i} className="text-animation" style={{ animation: 'fadeInUp ' + getDuration(message, duration) + ' forwards', animationDelay: i * getDuration(message, duration) + 'ms' }}>{e}</span>
              ))
            }
          </div>
        ),
      type: 1,
      timeDelay: getDuration(message, duration)
    }
    setElements(prevElements => [...prevElements, msgElement]);

  };

  const getDuration = (message: string, audioDuration: number): number =>
  {
    const msgLength = message.replace(/(、|。|！|？)/, '').length;

    return audioDuration * 1000 / msgLength;
  }

  const displayMessage = (message, audioDuration) =>
  {
    const typeSprit = message.split('');
    const msgLength = message.replace(/(、|。|！|？)/, '').length;
    let typeLength = 0;
    const audioPlayInterval = setInterval(() =>
    {
      if (typeSprit[typeLength] == undefined)
      {
        clearInterval(audioPlayInterval);
        return false;
      }
      setmsgpop(typeSprit.slice(0, typeLength).join(''));
      typeLength++;
    }, audioDuration * 1000 / msgLength);
    return true
  }

  const onMsgSend: MouseEventHandler = () =>
  {
    console.log(msg)
    if (msg === '')
    {
      return;
    }
    setTalkCount(t => t + 1);
    addElement();
  }

  const onBack: MouseEventHandler = () =>
  {
    setpagestate(0)
  }

  const cameraRef = useRef(null)

  const setYKRPosition = (e) =>
  {
    if (cameraRef.current)
    {

      cameraRef.current.quaternion.set(
        e.target.camera.quaternion.x,
        e.target.camera.quaternion.y,
        e.target.camera.quaternion.z,
        e.target.camera.quaternion.w,
      )

      cameraRef.current.updateProjectionMatrix()
    }
  }

  useEffect(() =>
  {
    setElements([])
  }, [pagestate])

  const playSelfIntro = () =>
  {
    setElements([]);
    IntroContent(setElements, setLoading,)

  }

  return <div className="w-full h-screen" style={{ position: 'relative' }}>
    <Canvas
      flat
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.NoToneMapping,
      }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'auto' }}
    >
      <OrbitControls
        makeDefault
        minDistance={30}
        maxDistance={100}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2 - Math.PI / 36}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: undefined,
          RIGHT: THREE.MOUSE.ROTATE
        }}

      />
      <CameraControls camera={defaultPerspectiveCamera} onChange={setYKRPosition}></CameraControls>
      <Scenery imga='/modules/background/incskies_030_16k.png' imgb='/modules/background/water_00027.jpg'></Scenery>
      <MMDModelComponent path={"/modules/yuzuki_yukari/yukari_jun.pmd"} motion={"/modules/yuzuki_yukari/m/miku.vmd"}></MMDModelComponent>

      <ParentContext.Provider value={[elements, pagestate]}>
        <Custom3Html></Custom3Html>
      </ParentContext.Provider>
    </Canvas>

    <ParentContext.Provider value={[setMsg, clearFlag, setClearFlag, onMsgSend, loading, onBack]}>
      {
        pagestate === 0 ? (<>
          <div className='flex absolute bottom-0 inset-x-0 w-full z-200 h-20'>
            <div className="w-1/3"></div>
            <button className='w-1/6 block items-center text-center rounded-l-xl bg-blue-50 px-2 py-1 text-4xl font-sans text-blue-500 hover:text-blue-900 ring-1 ring-inset ring-blue-300/20 disabled:bg-gray-600 disabled:hover:text-blue-500 font-extrabold' type='button' style={{ "pointerEvents": "auto" }} onClick={playSelfIntro} ref={btnRef1}>自己紹介</button>
            <button className='w-1/6 block items-center text-center rounded-r-xl bg-blue-50 px-2 py-1 text-4xl font-sans text-green-500 hover:text-green-900 ring-1 ring-inset ring-green-300/20 disabled:bg-gray-600 disabled:hover:text-green-500 font-extrabold' type='button' style={{ "pointerEvents": "auto" }} onClick={() => { setpagestate(1) }} ref={btnRef2}>フリーチャット</button>
          </div>
        </>) : (<ChatArea></ChatArea>)
      }
    </ParentContext.Provider>
  </div>
}
