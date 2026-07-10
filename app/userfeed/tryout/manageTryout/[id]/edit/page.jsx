"use client";
import TryoutForm from "../../../../../components/TryoutForm";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { useParams } from "next/navigation";

const Page = () => {
      const { id } = useParams();

    return (
<div>
  <div className="max-w-2xl mx-auto px-4 py-8">
     <Link
                    href="/userfeed/tryout/manageTryout"
                    className="flex items-center text-gray-500 hover:text-black mb-4"
                  >
                    <MdArrowBack />
                    <span className="ml-2">Manage Tryout</span>
                  </Link>
<TryoutForm 
   mode="edit"
   tryoutId={id}
/>
   </div>
  </div>
)
};

export default Page;