import React, { ReactNode } from 'react'
import { elementType } from '../../pages/threes/3dmain'

type ChildrenNodes = {
  children: ReactNode[]
}

export function CustomMessageArea({ elements }: { elements: elementType[] })
{
  return (<>
    <div>{elements.map((e, i) =>
      (<div key={i}>{e.jsxElement}</div>)
    )}</div>
  </>)
}
