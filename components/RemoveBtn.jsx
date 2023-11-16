"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const api = process.env.API_URI;

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `https://nextjs-deploy-sand.vercel.app/api/topics?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
