
## Usage/Examples

This directory (```controllers```) contains the routes which are used for CRUD operations.

Examples are demonstrated below as to how these routes work.

#### ***Make sure to install dependencies before starting the server***
```npm install```

#### ***Make sure the server is started by running either command below in the root directory***
```npm start``` or ```npm run dev```


### Posting an article
```
http://localhost:3001/api/posts
```
Send an ```HTTP POST``` request with the contents of the artilce in ```JSON``` format to upload it to the database. Search index is auto created for each new article that is added to the db.

![image](https://github.com/user-attachments/assets/6e8f1168-62d3-4d1e-9d78-15b0428120a7)


### Fetching posts from database
```
http://localhost:3001/api/posts
```
Make a ```HTTP GET``` request to above URL to get all posts in the database 

![image](https://github.com/user-attachments/assets/b93d6f83-2dd0-4bde-be62-80822c42c38a)



###  Searching through posts
```
http://localhost:3001/api/posts?term=tech
```
Make a ```HTTP GET``` request to the base URL but provide the term you are filtering based on. This will return all the posts with word ```'tech'``` in them.

![image](https://github.com/user-attachments/assets/43bea051-6501-416d-927f-050b7acefacd)


```javadcript
{
  $search: {
    index: "postSearch",
    text: {
      query: term,
      path: {
        wildcard: "*"
      }
    }
  }
}
```
Above is the ```search query``` for Mongo's full text search. The ```wildcard``` basically means it will look at each post's title, category, tags, and content to find matching results and return an array of those matched posts.

### Fetching a specific post
```
http://localhost:3001/api/posts/:id
```
Provide a specific post id in the ```HTTP GET``` request to fetch that specific post.

![image](https://github.com/user-attachments/assets/fcffeccb-799d-46c2-a026-fb74da8c5a78)


### Updating a post
```
http://localhost:3001/api/posts/:id
```
This ones a little different than ```HTTP POST``` request as sending an ```HTTP PUT``` request to the above URL will only replace the specific part of the post and instead of saving the original one, it will create a whole new post with everything from previous post but just the specific field being changed. Basically creates a new post with new content/changes.
To combat having duplicates in the database, I decided to delete the previous post after saving the new post with changes.

```javascript
const savedPost = await post.save()
await Post.findByIdAndDelete(request.params.id)
response.status(201).json(savedPost)
```

![image](https://github.com/user-attachments/assets/e282993e-5b5b-4f28-bb4a-4ec9103dbf77)


### Deleting a post is pretty straightforward
```
http://localhost:3001/api/posts/:id
```
Simply send an ```HTTP DELETE``` request with the post id you want to delete.

![image](https://github.com/user-attachments/assets/7a57ac3c-7199-4096-b65d-0b525f2c808f)
