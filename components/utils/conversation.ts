


interface fetchInterface { id: string, msg: string }
export interface fetchAudioInterface extends fetchInterface { }
export interface fetchMessageInterface extends fetchInterface { }

export async function fetchAudio({ id, msg }: fetchAudioInterface)
{
  const res = await fetch('/api/getUrl')
  const config = await res.json();
  const url = config.url


  const requestOptions = {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "id": id, "msg": msg })
  };
  // fetch() returns a promise that
  // resolves once headers have been received
  return fetch(url + 'audio/', requestOptions)
    .then(res =>
    {
      if (!res.ok)
        throw new Error(`${res.status} = ${res.statusText}`);
      // response.body is a readable stream.
      // Calling getReader() gives us exclusive access to
      // the stream's content

      // var reader = res.body.getReader();

      // read() returns a promise that resolves
      // when a value has been received


      // return reader
      //   .read()
      //   .then((result) => {
      //     return result;
      //   });
      return res
    })
}

export async function fetchMessage({ id, msg }: fetchAudioInterface)
{
  const res = await fetch('/api/getUrl')
  const config = await res.json();
  const url = config.url

  const requestOptions = {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "id": id, "msg": msg })
  };
  // fetch() returns a promise that
  // resolves once headers have been received
  return fetch(url + 'msg/', requestOptions)
    .then(res => res.json())
}
