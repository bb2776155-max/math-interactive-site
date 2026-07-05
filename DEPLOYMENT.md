# bashuduhou.top Deployment Checklist

## Supabase

1. Open Supabase Dashboard -> SQL Editor.
2. Run `supabase-setup.sql`.
3. Open Storage and confirm the bucket `comment-images` exists.
4. Open Table Editor and confirm `comments.image_urls` exists.
5. Open Authentication -> URL Configuration if Supabase Auth is enabled later:
   - Site URL: `https://bashuduhou.top`
   - Redirect URLs: `https://bashuduhou.top/**`

## Website Smoke Test

Test these on `https://bashuduhou.top` after deployment:

1. Invite-code login unlocks the site.
2. Search shows matching lessons and match reasons.
3. Difficulty, stage, and mindset tags filter the sidebar.
4. Per-step status cycles through `未读 / 读懂 / 能复述 / 需回看`.
5. Review mode cycles through normal, thin, self-test, and needs-review.
6. Comments load, submit, reply, and delete only for the current user.
7. Comment image upload works and thumbnails open in a new tab.

## Current Security Model

The site uses invite-code hashes stored in `localStorage` as lightweight identity. Supabase RLS checks the same hash through the `x-user-hash` request header. This is stronger than front-end-only checks, but it is still not a full account system.

For stronger security later, replace this with Supabase Auth or another server-side identity layer.
