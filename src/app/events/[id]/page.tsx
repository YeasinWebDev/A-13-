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
import { useSession } from "next-auth/react";

function Page() {
  const [event, setEvent] = useState<Event | null>(null);
  const [eventId, setEventId] = useState<Event[] | null>([]);
  const session = useSession()
  const email = session?.data?.user?.email;
  const [loading, setloading] = useState(false);
  const { id } = useParams();

  const getEvent = async (id: string) => {
    try {
      setloading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_Live_URL}/events/oneEvent`, { id });
      setEvent(res.data);
      const res2 = await axios.post(`/api/getAllProfile`, {email})
      setEventId(res2?.data?.events ||[])
      setloading(false);
    } catch (error) {
      console.error("Failed to fetch event", error);
    }
  };
  // console.log(`${process.env.NEXT_PUBLIC_Live_URL}/events/oneEvent`)

  useEffect(() => {
    if (id && email) {
      getEvent(String(id));
    }
  }, [id,email]);

  const isPaid = eventId?.some(i => i.eventId === event?.eventId);

  const sanitizeEventName = (name: string | undefined) => {
    return name ? escape(name.replace(/'/g, "&apos;")) : "";
  };

  if (loading) return <Loader />;

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
            {
              !isPaid? (
                <GetTicket event={event} />
              ) : (
                <h1 className="w-fit  px-4 py-2  bg-gray-200 text-green-600 rounded-xl font-bold">
                  You already have a ticket
                </h1>
              )
            }

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
        <h1 className="font-semibold ">No Event Found</h1>
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
  byEmail:string
}

export default Page;
