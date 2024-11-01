"use client";

import React, { useEffect, useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  altText: string;
  artistName: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Realism Tattoo",
    imageUrl:
      "https://lovemachinenyc.com/wp-content/uploads/2024/02/039-sivak.webp",
    link: "https://lovemachinenyc.com/style/realism-tattoo/",
    altText: "Realism tattoo style",
    artistName: "Bayaraa_tattoo",
  },
  {
    id: 2,
    title: "Surrealism Tattoo",
    imageUrl:
      "https://lovemachinenyc.com/wp-content/uploads/2024/02/mel-5.webp",
    link: "https://lovemachinenyc.com/style/dark-surrealism-tattoo/",
    altText: "Surrealism tattoo style",
    artistName: "Bayaraa_tattoo",
  },
  {
    id: 3,
    title: "Black and Grey Tattoo",
    imageUrl:
      "https://lovemachinenyc.com/wp-content/uploads/2024/02/05-sivak.webp",
    link: "https://lovemachinenyc.com/style/black-grey-tattoo/",
    altText: "Black and grey tattoo style",
    artistName: "Bayaraa_tattoo",
  },
  {
    id: 4,
    title: "3D Tattoo Style",
    imageUrl:
      "https://lovemachinenyc.com/wp-content/uploads/2024/02/011-sivak.webp",
    link: "https://lovemachinenyc.com/style/3d-tattoo/",
    altText: "3D tattoo style",
    artistName: "Bayaraa_tattoo",
  },
];

const Gallery: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const [firstItem, ...otherItems] = galleryItems;

  return (
    <section className="flex flex-col items-center">
      <div className="m-4 border border-gray-300 rounded-lg overflow-hidden w-80">
        {firstItem && (
          <div className="p-2">
            <figure>
              <a href={firstItem.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={firstItem.imageUrl}
                  alt={firstItem.altText}
                  className="rounded-lg"
                  width={400}
                  height={300}
                />
              </a>
            </figure>
            <figcaption className="text-center mt-2">
              {firstItem.title} by {firstItem.artistName}
            </figcaption>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-2">
        {otherItems.map((item) => (
          <article
            key={item.id}
            className="border border-gray-300 rounded-lg overflow-hidden w-28"
          >
            <div className="p-2">
              <figure>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    className="rounded-lg"
                    width={80}
                    height={60}
                  />
                </a>
              </figure>
              <figcaption className="text-center mt-1">{item.title}</figcaption>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

