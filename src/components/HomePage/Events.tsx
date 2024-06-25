"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  const getData = async () => {
    const data = await axios.get("/events/api");
    setEvents(data.data.events);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex items-center justify-center py-10">
      <div>
        {/* search bar */}
        {/* filter by category */}
      </div>
      <div className="flex items-center justify-center gap-10 flex-wrap">
        {events &&
          events.map((event) => (
            <Link href={`/events/${event?._id}`}>
              <div className="card card-compact bg-base-100 w-96 shadow-xl cursor-pointer">
                <figure>
                  <div className="h-[30vh] w-full">
                    <img
                      className="w-full h-full"
                      src={event.image}
                      alt="event"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center gap-5">
                    <h3 className="bg-green-200 px-3 py-1 rounded-xl w-fit text-green-700 font-semibold">
                      {event?.price === 0 ? "Free" : event?.price}
                    </h3>
                    <h3 className="bg-gray-200 px-3 py-1 rounded-xl w-fit text-gray-600 font-semibold">
                      {event?.category?.tag}
                    </h3>
                  </div>

                  <h3 className="font-semibold pt-5">
                    Start: <span>{event?.startDate}</span>
                  </h3>
                  <h3 className="font-bold py-5 text-2xl">
                    <span>{event?.name}</span>
                  </h3>

                  <h3 className="font-bold pt-5 text-sm">
                    by:<span className="text-green-600"> {event?.by}</span>
                  </h3>
                </div>
              </div>
            </Link>
          ))}
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
}
export default Events;
