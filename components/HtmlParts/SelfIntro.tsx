import { elementType } from "../../pages/threes/3dmain"


export const IntroContent = async (...props) =>
{


  const audio = new Audio("/selfIntrovoice.wav")
  const res = await fetch('/api/readFile')
  const message = await res.text()
  const res2 = await fetch('/api/getUrl')
  const jsondata = await res2.json()
  const duration = jsondata.duration
  const delay = jsondata.delay
  const [setElements, setLoading, ,] = props
  const msgElement: elementType = {
    orginMessage: message,
    jsxElement:
      (
        <div className='bg-blend-color-burn hover:bg-orange-300'>
          {
            message.split('').map((e, i) =>
            (
              <span key={i} className="text-animation" style={{ animation: 'fadeInUp ' + 0.1 + ' forwards', animationDelay: i * delay + 'ms' }}>{e}</span>
            ))
          }
        </div>
      ),
    type: 1,
    timeDelay: delay
  }

  audio.play()
  setLoading(false)
  setElements([msgElement])

  const dispElement: elementType = {
    orginMessage: message,
    jsxElement:
      (
        <>
          <div className='bg-blend-color-burn hover:bg-orange-300'>{message}</div>
        </>
      ),
    type: 1,
    timeDelay: 0
  }

  setTimeout(() =>
  {
    setElements([dispElement])
    setLoading(true)
  }, duration * 1000);

}
