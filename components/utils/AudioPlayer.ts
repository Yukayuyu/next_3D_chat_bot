import { useEffect } from "react";
import { fetchAudio, fetchMessage } from "./conversation";

export default async function AudioPlayerYuakri({ id, text, loading, setLoading }: { id: string, text: string, loading: boolean, setLoading: Function })
{
  if (typeof window == 'undefined') { return };
  if (!loading) { return };
  console.log("sending message...")
  if (typeof window !== 'undefined')
  {
    setLoading(false);
  }

  const msgd = await fetchMessage({ id: id, msg: text });
  const msg = msgd['msg']
  console.log(new Date().toLocaleTimeString(), 'fetch1 finish')

  const res = await fetchAudio({ id: id, msg: msg })
  console.log(new Date().toLocaleTimeString(), 'fetch2 finish')

  const data = await res.arrayBuffer();
  const blob = new Blob([data], { type: 'audio/mp3' });
  const audio = new Audio(URL.createObjectURL(blob));
  console.log(new Date().toLocaleTimeString(), 'audio finish')

  let resolveMetadata;
  const handleMetadata = (e) =>
  {
    if (resolveMetadata)
    {
      console.log('resolveMetadata:', e.target.duration)
      resolveMetadata(e.target.duration);
    }
    audio.removeEventListener('loadedmetadata', handleMetadata);
  };
  const audioDuration = await new Promise((resolve) =>
  {
    resolveMetadata = resolve;
    audio.onloadedmetadata = handleMetadata;
  });

  console.log(new Date().toLocaleTimeString(), msg)
  audio.play()

  return [msg, audioDuration]
}
