import React from 'react'

export function CustomTextArea({value} : {value : string[]})
{


  return (<div>
    {value.map((v) => (
      <p>{v}</p>
    )
    )}
  </div>)
}
