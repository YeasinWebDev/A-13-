"use client";
import GetTicket from "@/components/GetTicket";
import Loader from "@/components/Loader";
import RelatedEvents from "@/components/events/RelatedEvents";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { escape } from 'lodash';

function Page() {
  const [event, setEvent] = useState<Event | null>(null);
  const { id } = useParams();

  const getEvent = async (id: string) => {
    try {
      const res = await axios.post(`/events/oneEvent`, { id });
      setEvent(res.data);
    } catch (error) {
      console.error("Failed to fetch event", error);
    }
  };

  useEffect(() => {
    if (id) {
      getEvent(String(id));
    }
  }, [id]);

  const sanitizeEventName = (name: string | undefined) => {
    return name ? escape(name.replace(/'/g, "&apos;")) : "";
  };

  return (
    <div className="py-10">
      {event ? (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="rounded-xl">
            <Image className="rounded-xl" src={event?.image} width={500} height={500} alt="" />
          </div>
          <div className="lg:w-[40%] md:w-[60%] w-[90%]">
            <h1 className="font-bold lg:text-5xl text-2xl" dangerouslySetInnerHTML={{ __html: sanitizeEventName(event?.name) }}></h1>

            <div className="flex items-center gap-5 py-5 ">
              <h3 className="bg-green-200 px-3 py-1 rounded-xl w-fit text-green-700 font-semibold">
                {event?.price === 0 ? "Free" : `$${event?.price}`}
              </h3>
              <h3 className="bg-gray-200 px-3 py-1 rounded-xl w-fit text-gray-600 font-semibold">
                {event?.category}
              </h3>
              <h3 className="font-bold text-sm flex ">
                by:<span className="text-green-600" dangerouslySetInnerHTML={{ __html: sanitizeEventName(event?.by) }}></span>
              </h3>
            </div>
            <GetTicket event={event}/>

            <h3 className="flex items-center pt-8 pb-2 gap-4">
              <div className="text-purple-900">
                <FaCalendarAlt />
              </div>
              <span className="font-semibold">
                {event?.startDate} to {event?.endDate}
              </span>
            </h3>

            <h3 className="flex items-center pb-4 gap-4">
              <div className="text-purple-900">
                <FaLocationDot />
              </div>
              <span className="font-semibold" dangerouslySetInnerHTML={{ __html: sanitizeEventName(event?.location) }}></span>
            </h3>

            <h3 className="font-bold pt-5 text-xl ">
              What You'll Learn: <br /> <span className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: sanitizeEventName(event?.description) }}></span>
            </h3>
          </div>
        </div>
      ) : (
        <Loader/>
      )}

      <div className=" w-[80vw] mx-auto mt-10">
          <h1 className="font-semibold text-4xl">Related Events</h1>
          <div className="mt-10">
            <RelatedEvents category ={event?.category!} name={event?.name!}/>
          </div>
      </div>
    </div>
  );
}

interface Event {
  _id: string;
  image: string;
  price: number;
  category: string;
  startDate: string;
  name: string;
  by: string;
  endDate:string;
  location:string;
  description:string;
  eventId: string;
}

export default Page;
