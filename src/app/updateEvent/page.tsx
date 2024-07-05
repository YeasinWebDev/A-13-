'use client'
import EventForm from '@/components/shared/EventForm'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function UpdatePage() {
    const parmas = useSearchParams()
    const id = parmas.get('id')!
  return (
    <>
      <section className="py-5 md:py-10">
        <h3 className="font-semibold text-2xl flex items-center justify-center">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-6">
        <EventForm type="update" eventId={id}/>
      </div>
    </>
  )
}

export default UpdatePage