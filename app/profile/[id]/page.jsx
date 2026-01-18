
import Profile from "./profile/page";

export default async function Page({ params }){
   

// const { id: profileId } = await params;
// const res = await fetch();
// if (!res.ok) {
//   throw new Error('Profile not found');
// }
// const profile = await res.json();
const profile = { id: 123 }

    return(
    <div className="">

       <Profile profile={profile} />
    </div>
)
}
