import TryoutForm from "../../../components/TryoutForm";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
const Page = () => {
return (
<div>
  <div className="max-w-2xl mx-auto px-4 py-8">
                  <Link
                    href="/userfeed/tryout"
                    className="flex items-center text-gray-500 hover:text-black mb-4"
                  >
                    <MdArrowBack />
                    <span className="ml-2">Back to Tryout</span>
                  </Link>

<TryoutForm mode="create" />
                </div>
</div>
)
};

export default Page;