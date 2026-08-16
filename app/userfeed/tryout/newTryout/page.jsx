import TryoutForm from "../../../components/TryoutForm";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
const Page = () => {
return (
<div>
  <div className="space-y-10 max-w-2xl px-4 md:px-6 py-12 mx-auto">
                  <Link
                    href="/userfeed/tryout"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
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