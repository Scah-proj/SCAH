import StoryAvatar from './StoryAvatar';
import { currentUser, mockUserStories } from '../data/userstories';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ViewStory from './ViewStory';
export default function StoryComponent() {
  const [activeIndex, setActiveIndex] = useState(null);

  const [users, setUsers] = useState([currentUser, ...mockUserStories]);

  const activeUser = activeIndex !== null ? users[activeIndex] : null;

  const closeStories = () => setActiveIndex(null);

  const goToNextUser = () => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      if (prev + 1 < users.length) return prev + 1;
      return null; // all stories finished
    });
  };
const markViewedAndGoNext = () => {
  setUsers(prev =>
    prev.map((u, i) =>
      i === activeIndex
        ? { ...u, viewedCount: u.stories.length }
        : u
    )
  );

  setTimeout(goToNextUser, 0);
};
  return (
    <div className="flex space-x-4 p-3 overflow-x-auto">
      {users.map((user, index) => {
        const viewedCount = user.viewedCount || 0;

        return (
          <StoryAvatar
            key={user.id}
            avatar={user.avatar}
            owner={user.id === currentUser.id}
            hasStory={user.stories.length > 0}
            hasUnseenStories={viewedCount < user.stories.length}
            onClick={() => setActiveIndex(index)}
          />
        );
      })}

      {activeUser && (
       <ViewStory
  user={activeUser}
  onClose={closeStories}
  onNextUser={markViewedAndGoNext}
/>

      )}
    </div>
  );
}
