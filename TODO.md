# TODO

## Task: Fix "View All Posts" routing for own and other profiles

- [x] Update `app/profile/profile/page.jsx` so "View All Posts" routes to `/profile/profile/${targetUserId}/allPosts` for both own and other profiles
- [x] Rewrite `app/profile/profile/[id]/allPosts/page.jsx` to use `params.id` as the target user id instead of query params
- [x] Verify own-profile & other-profile flows route and display correct posts

## Task: PostCard 3-dot menu behavior

- [x] Save — always present
- [x] Save to Camera Roll — only when post has an image
- [x] Copy link to post — always present
- [x] Delete post — only for owner

## Task: Copied post link auth redirect

- [x] Route unauthenticated users to `/auth/login?redirectTo=<post path>` when opening a post link
- [x] After login, redirect back to the post (login page already handles `redirectTo`)
</content>
