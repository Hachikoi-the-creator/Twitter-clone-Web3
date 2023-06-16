1. **Endpoint: `/user-twits`**

   - Method: GET
   - Parameters:
     - `id` (Path parameter) - ID of the user
   - Description: Retrieves the tweets of a specific user.
   - Example: `GET /user-twits/:id`

2. **Endpoint: `/:id`**

   - Method: GET
   - Parameters:
     - `id` (Path parameter) - ID of the user
   - Description: Retrieves user information by their ID.
   - Example: `GET /:id`

3. **Endpoint: `/all-twits`**

   - Method: GET
   - Parameters:
     - `page` (Query parameter) - Page number
   - Description: Retrieves a paginated list of all tweets.
   - Example: `GET /all-twits?page=:page`

4. **Endpoint: `/follow-user`**

   - Method: POST
   - Body:
     - `follower_id` - ID of the follower user
     - `followed_id` - ID of the user to be followed
   - Description: Allows a user to follow another user.
   - Example: `POST /follow-user`
     ```json
     {
       "follower_id": "follower_user_id",
       "followed_id": "user_to_follow_id"
     }
     ```

5. **Endpoint: `/make-user`**

   - Method: POST
   - Body:
     - `username` - The username of the user.
     - `profile_pic` - The URL of the user's profile picture.
     - `web3_address` - The user's Web3 address.
   - Description: Creates a new user with the provided details.
   - Example: `POST /make-user`
     ```json
     {
       "username": "follower_user_id",
       "profile_pic": "user_to_follow_id",
       "web3_address": "user_to_follow_id"
     }
     ```

6. **Endpoint: `/twit-it`**

   - Method: POST
   - Body:
     - `content` - Content of the tweet
     - `imageUrl` - Link of the tweet image
     - `userId` - ID of the user posting the tweet
   - Description: Creates a new tweet for a user.
   - Example: `POST /twit-it`
     ```json
     {
       "content": "Tweet content",
       "imageUrl": "" | "some-url",
       "userId": "user_id"
     }
     ```

7. **Endpoint: `/user-pic`**
   - Method: PUT
   - Body:
     - `picLink` - Link or path to the new profile picture
     - `userId` - ID of the user
   - Description: Updates the profile picture of a user.
   - Example: `PUT /user-pic`
     ```json
     {
       "picLink": "new_profile_pic_link",
       "userId": "user_id"
     }
     ```
