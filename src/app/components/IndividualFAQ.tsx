import React, { useState } from 'react'

type Props = {
  data: {
    title: string,
    body: string
  }
}

export default function IndividualFAQ({data}: Props) {

  const [opened, setOpened] = useState(false);

  return (
    <div className='bg-[color:var(--textFieldBackground)] flex flex-col align-middle justify-center my-2 px-6 py-4 text-start'>
      <div className='flex flex-row align-middle justify-between cursor-pointer' onClick={(e)=>setOpened(!opened)}>
        <h4 className='font-semibold text-lg'>{data.title}</h4>
        {opened ? <img className='cursor-pointer h-[12px] my-auto ml-2' src='/assets/vectors/upArrow.svg' alt='Up Arrow' /> : <img className='cursor-pointer my-auto h-[12px] ml-2' src='/assets/vectors/downArrow.svg' alt='Down Arrow' /> }
      </div>
      {opened ? <div className='mt-6'>
        <p className='text-lg font-medium'>{data.body}</p>
      </div> : <></>}
    </div>
  )
}