import React from 'react'
import IndividualFAQ from './IndividualFAQ'

type Props = {
  data: {
    title: string,
    body: string
  }[]
}

export default function FAQs({data}: Props) {
  return (
    <div className='flex flex-col align-middle justify-center my-8'>
      <h1 className='text-center text-4xl font-bold mb-6 text-[color:var(--mainTitleColor)]'>FAQ&apos;s</h1>
      {data.map((e, i)=><IndividualFAQ key={i} data={e} />)}
    </div>
  )
}