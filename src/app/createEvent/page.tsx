import EventForm from "@/components/shared/EventForm";
import React from "react";

function CreateEvent() {
  return (
    <>
      <section className="py-5 md:py-10">
        <h3 className="font-semibold text-2xl flex items-center justify-center">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-6">
        <EventForm type="create"/>
      </div>
    </>
  );
}

export default CreateEvent;
