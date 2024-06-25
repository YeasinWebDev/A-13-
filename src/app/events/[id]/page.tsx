"use client";
import Loader from "@/components/Loader";
import RelatedEvents from "@/components/events/RelatedEvents";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Page() {
  const [event, setEvent] = useState<Event | null>(null);
  const { id } = useParams();

  const getEvent = async (id: string) => {
    try {
      const res = await axios.post("/events/oneEvent", { id });
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

  return (
    <div className="py-10">
      {event ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="rounded-xl">
            <Image className="rounded-xl" src={event?.image} width={500} height={500} alt="" />
          </div>
          <div className="w-[40%]">
            <h1 className="font-bold lg:text-5xl text-2xl">{event?.name}</h1>

            <div className="flex items-center gap-5 py-5 ">
              <h3 className="bg-green-200 px-3 py-1 rounded-xl w-fit text-green-700 font-semibold">
                {event?.price === 0 ? "Free" : `$${event?.price}`}
              </h3>
              <h3 className="bg-gray-200 px-3 py-1 rounded-xl w-fit text-gray-600 font-semibold">
                {event?.category?.tag}
              </h3>
              <h3 className="font-bold text-sm flex ">
                by:<span className="text-green-600"> {event?.by}</span>
              </h3>
            </div>

            <Link
              className="bg-purple-900 px-5 py-2 text-white rounded-2xl"
              href={""}
            >
              Get Ticket
            </Link>

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
              <span className="font-semibold">
              {event?.location}
              </span>
            </h3>

            <h3 className="font-bold pt-5 text-xl ">
             What You'll Learn: <br /> <span className="font-semibold text-lg">{event?.description}</span>
            </h3>
          </div>
        </div>
      ) : (
        <Loader/>
      )}

      <div className=" w-[80vw] mx-auto mt-10">
          <h1 className="font-semibold text-4xl">Related Events</h1>
          <div className="mt-10">
            <RelatedEvents category ={event?.category!?.tag} name={event?.name!}/>
          </div>
      </div>
    </div>
  );
}

interface Event {
  _id: string;
  image: string;
  price: number;
  category: {
    tag: string;
  };
  startDate: string;
  name: string;
  by: string;
  endDate:string;
  location:string;
  description:string;
}

export default Page;
