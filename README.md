# InstagramFeedProject
This is my assignment project related to Instagram Feed

Here I have developed Instagram-like Feed API using GraphQL and Node.js
which has authentication and authorization flow implemented to 
1. Signup Users with email and password 
2. Login User with email and password 
3. Logout with refresh token

and other apis as follow
1. Query posts with their details (including the author, caption, and image/video URLs)
2. Query a single post by its ID
3. Create a new post with images/videos (max 10), caption, and other relevant details.
4. Update an existing post (e.g., edit caption, delete post).
5. Add a comment to a post.
6. Like/unlike a post.

User need to authenticate to perform task on server 
and user can Delete and Update only his created posts.

Also pagination is implemented for retrieving posts.
