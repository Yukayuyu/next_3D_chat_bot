import React, { MouseEventHandler } from 'react'

export function CustomButton({ func, text, style }: { func: MouseEventHandler, text: string, style?: string })
{


  return (<>
    <button className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' type='button' style={{ "pointerEvents": "auto" }} onClick={func}>{text}</button>
  </>)
}
