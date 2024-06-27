"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import CategoryModal from "../CategoryModal";
import { imageUrl } from "../ImageUrl";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

function EventForm({ type }) {
  const session = useSession();
  const router= useRouter()
  const [selectedImage, setSelectedImage] = useState(null);
  const [startDateValue, setStartDateValue] = useState<Date | null>(new Date());
  const [endDateValue, setEndDateVaule] = useState<Date | null>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    "Marketing",
    "Wellness",
    "Technology",
    "Art",
    "Networking",
  ]);

  // img upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const image = await imageUrl(file);
      setSelectedImage(image);
    }
  };

  // Add new categorie
  const handleAddCategory = (newCategory: string) => {
    setCategories([...categories, newCategory]);
    setIsModalOpen(false);
  };

  const handelSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLInputElement)
      .value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement)
      .value;
    const startDate = startDateValue ? formatDateTime(startDateValue) : "";
    const endDate = endDateValue ? formatDateTime(endDateValue) : "";
    const price = (form.elements.namedItem("price") as HTMLInputElement).value;
    const free = (form.elements.namedItem("free") as HTMLInputElement)?.checked;
    const by = session?.data?.user?.name;
    const image = selectedImage;

    const priceData = free ? 0 : price;

    const data = {
      name,
      category,
      description,
      location,
      startDate,
      endDate,
      price: priceData,
      by,
      image,
    }; 
    const res = await axios.post(`${process.env.NEXT_PUBLIC_Live_URL}/createEvent/api`, data)
   
    if(res){
      router.push(`/`)
    }

  };

  return (
    <div className="xl:w-[70vw] lg:w-[75vw] w-[98vw] mx-auto">
      <form onSubmit={handelSubmit}>
        <div className="flex items-center flex-col md:flex-row justify-center gap-5">
          <input
            className="bg-[#f2f2f2] text-sm px-4 py-2 rounded-xl w-full outline-none"
            placeholder="Event Name"
            type="text"
            name="name"
            required
          />
          <div className="flex gap-2 w-full">
            <select
              className="bg-[#f2f2f2] text-sm px-4 py-2 rounded-xl w-full outline-none"
              name="category"
              required
            >
              <option value="" disabled selected>
                Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="bg-purple-700 text-white px-4 py-2 rounded-xl"
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex items-center flex-col md:flex-row justify-center gap-5 pt-5">
          <textarea
            name="description"
            placeholder="Description"
            className="bg-[#f2f2f2] p-3 outline-none rounded-xl w-full resize-none"
            rows={7}
            required
          ></textarea>

          {selectedImage ? (
            <div className="w-full px-4 py-2 rounded-xl flex flex-col items-center ">
              <div className="lg:w-[20vw] h-[40vh]">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="rounded-xl w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div className="w-full bg-[#f2f2f2] px-4 py-2 rounded-xl flex flex-col items-center justify-center relative">
              <img src="/file-upload.svg" alt="Upload Icon" className="mb-2" />
              <div className="text-center">
                <h1 className="text-sm text-gray-600">Drag Photo Here</h1>
                <h3 className="text-[10px] text-gray-600">SVG, PNG, JPG</h3>
              </div>
              <input
                className="absolute inset-0 opacity-0 cursor-pointer"
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <h1 className="text-sm mt-3 bg-purple-700 text-white px-3 py-2  rounded-xl">
                Select from computer
              </h1>
            </div>
          )}
        </div>

        <div className="flex items-center flex-col md:flex-row justify-center gap-5 pt-5">
          <div className="flex items-center gap-4 w-full bg-[#f2f2f2] px-4 py-2 rounded-xl">
            <div className="flex items-center gap-2 text-gray-500">
              <FaCalendarAlt size={16}/> <h1 className="text-sm flex-nowrap">Start Date:</h1>
            </div>
            <DatePicker
              selected={startDateValue}
              onChange={(date) => setStartDateValue(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="EEE dd MMM HH:mm"
              className="bg-[#f2f2f2]"
              required
            />
          </div>
          <div className="w-full flex items-center gap-4 bg-[#f2f2f2] px-4 py-2 rounded-xl">
            <div className="flex   items-center gap-2 text-gray-500">
              <FaCalendarAlt size={16}/> <h1 className="text-sm flex-nowrap">End Date:</h1>
            </div>
            <DatePicker
              selected={endDateValue}
              onChange={(date) => setEndDateVaule(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="EEE dd MMM HH:mm"
              className="bg-[#f2f2f2]"
              required
            />
          </div>
        </div>

        <div className="flex items-center flex-col md:flex-row justify-center gap-5 pt-5">
          <div className="bg-[#f2f2f2] text-sm px-4 py-2 rounded-xl w-full outline-none flex items-center gap-2">
            <FaMapLocationDot color="gray" />
            <input
              className="bg-[#f2f2f2] text-sm p-2 rounded-xl w-full outline-none"
              placeholder="Event Location"
              type="text"
              name="location"
              required
            />
          </div>

          <div className="bg-[#f2f2f2] text-sm px-4 py-2 rounded-xl w-full outline-none flex items-center gap-2">
            <div className="flex items-center gap-2">
              <FaDollarSign color="gray" />
              <input
                className="bg-[#f2f2f2] text-sm p-2 rounded-xl w-full outline-none"
                placeholder="Price"
                type="text"
                name="price"
              />
            </div>
            <div className="flex gap-3 items-center w-full justify-end">
              <h1>Free Ticket</h1>
              <input type="checkbox" name="free" id="" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-purple-900  text-white w-full mt-4 py-2 rounded-xl"
        >
          {" "}
          Create{" "}
        </button>
      </form>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCategory}
      />
    </div>
  );
}

// Function to format date and time
const formatDateTime = (date: Date) => {
  const options:Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default EventForm;

type type = {
  type: "Create" | "Update";
};
