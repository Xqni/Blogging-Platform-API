
## Usage/Examples

This directory (```controllers```) contains the routes which are used for CRUD operations.

Examples are demonstrated below as to how these routes work.

#### ***Make sure to install dependencies before starting the server***
```npm install```

#### ***Make sure the server is started by running either command below in the root directory***
```npm start``` or ```npm run dev```

### Fetching posts from database
```
http://localhost:3001/api/posts
```
Make a ```HTTP GET``` request to above URL to get all posts in the database 

![image](https://github.com/user-attachments/assets/69bc34f7-874e-4032-9660-7829b8dc4a23)

###  Searching through posts
```
http://localhost:3001/api/posts?term=tech
```
Make a ```HTTP GET``` request to the base URL but provide the term you are filtering based on. This will return all the posts with word ```'tech'``` in them.
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

### Updating a post
```
http://localhost:3001/api/posts
```

This ones a little different than ```HTTP POST``` request as sending an ```HTTP PUT``` request to the above URL will only replace the specific part of the post and instead of saving the original one, it will create a whole new post with everything from previous post but just the specific field being changed. Basically creates a new post with new content/changes.
To combat having duplicates in the database, I decided to delete the previous post after saving the new post with changes.
```javascript
const savedPost = await post.save()
await Post.findByIdAndDelete(request.params.id)
response.status(201).json(savedPost)
```

### Deleting a post is pretty straightforward
```
http://localhost:3001/api/posts/:id
```
Simply send an ```HTTP DELETE``` request with the post id you want to delete.
