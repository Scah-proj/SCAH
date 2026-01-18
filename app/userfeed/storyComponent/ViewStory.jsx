import Stories from 'react-insta-stories';


export default function ViewStory({user, onClose, onNextUser})

{
  if (!user?.stories || user.stories.length === 0) {
    onClose();
    return null;
  }
  
    const stories = user.stories.map((story) => ({
    url: story.url,
    header: {
      heading: user.username,
      subheading: "Just now",
      profileImage: user.avatar,
    },
  }));
    return(
    <div className="
  fixed inset-0 bg-black/80 z-50 flex items-center justify-center 
">
    <div  className="
    relative bg-black
    w-full h-full
    sm:w-[420px] sm:h-[740px]
    sm:rounded-xl
    overflow-hidden
  ">

     <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl z-50 cursor-pointer"
      >
        ✕
      </button>
     
    <Stories
  stories={stories}
  defaultInterval={4000}
  height="100%"
  width="100%"
  onAllStoriesEnd={() => {
    setTimeout(() => {
      onNextUser();
    }, 0);
  }}
/>

    </div>
</div>
    )
}