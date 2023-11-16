"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const api = process.env.API_URI;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://nextjs-deploy-sand.vercel.app/api/topics`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await res.json();
        setTopics(data.topics);
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  return (
    <>
      {topics.map((t) => (
        <div
          key={t?._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t?.title}</h2>
            <div>{t?.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t?._id} />
            <Link href={`/editTopic/${t?._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
