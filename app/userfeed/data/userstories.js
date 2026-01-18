
const currentUser = {
  id: 0,
  username: "Nimi.a.a",
  avatar: "/namee.png",
  stories: [], 
};
const mockUserStories = [
  {
    id: 1,
    username: "john_doe",
    avatar: "/roa.webp",
    Unseen: true,
    stories: [
      { url: "/roa.webp" },
      { url: "/pen.webp" },
    ],
    views: 0,
  },
  {
    id: 2,
    username: "Neymar_jnr",
    avatar: "/pen.webp",
    Unseen: true,
    stories: [
      { url: "/stories/john1.jpg" },
      { url: "/stories/john2.jpg" },
    ],
        views: 0,

  },
  {
    id: 3,
    username: "Fabrizo_smith",
    avatar: "/balll.webp",
    Unseen: true,
    stories: [
      { url: "/stories/john1.jpg" },
      { url: "/stories/john2.jpg" },
    ],
        views: 0,

  },
  {
    id: 4,
    username: "David_u",
    avatar: "/ath.webp",
    Unseen: true,
    stories: [
      { url: "/stories/john1.jpg" },
      { url: "/stories/john2.jpg" },
    ],
        views: 0,

  },
];

export { currentUser, mockUserStories };