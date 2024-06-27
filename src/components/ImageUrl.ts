'use client';
import axios from 'axios';

export const imageUrl = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error('IMGBB API key is not defined');
  }

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );

  return data.data.display_url;
};
