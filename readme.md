[Postman Collection](https://www.postman.com/spacecraft-observer-55350351/workspace/tokopediaplay)

[Postman ENV](https://www.postman.com/spacecraft-observer-55350351/workspace/tokopediaplay/environment/15808237-cea1a1bb-b1ab-4f88-80e0-612fc9ba37b9?action=share&creator=15808237)

[Deployed BE](gg30-tokopediaplayclone-production.up.railway.app) on Railway

## BONUS :

- Search video feature
- User profile picture
- SocketIO for comment

## How To Run On Local!!!

- Clear your port
- Clone this repository on branch **main**
- Setup yarn (if not installed)
- Set your **.env** according to **.env.example**
- Start your docker service
- Run on terminal :
  `docker compose up -d`
- Look if there's any error on docker terminal
- Try to hit with Postman (set your port on postman env)

## How To Run On Deployment

- Use URL of **gg30-tokopediaplayclone-production.up.railway.app**
- Then hit it with postman

# Users

**User Scheme**

```
{
  _id: ObjectId
  id: uuid
  username: string
  email: string
  password: string
  imgUrl: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## POST /users/login

Give authorization to user.

- **URL Params**  
  None
- **Body**  
  email, password
- **Headers**  
  Content-Type: application/json
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    token: string,
    user: {<userData>}
  }
}
```

- **Error Response:**

```
{
  status: "Error",
  statusCode: 400,
  message: <Invalid input value>
}
```

OR

```
{
  status: "Error",
  statusCode: 403,
  message: "User with this email or userName is exists"
}
```

## POST /users/signup

Add new user

- **URL Params**  
  None
- **Body**  
  email, password, userName, role
- **Headers**  
  Content-Type: application/json
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    token: string,
    user: {<userData>}
  }
}
```

- **Error Response:**

```
{
  status: "Error",
  statusCode: 401,
  message: <Invalid Email or Password>
}
```

# Videos

**Video Scheme**

```
{
  _id: ObjectId
  id: uuid
  userId: uuid
  thumbnailUrl: string
  videoUrl: string
  title: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## GET /videos?page=1&limit=10&search=Keyword

Returns all videos available
Video can be search by title
Added pagination feature

- **URL Params**  
  Query (optional): page, limit, search
- **Headers**  
  Content-Type: application/json
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    videos: [{<videoData, userId>}],
    currentPage: number,
    totalPage: number
  }
}
```

## GET /videos/:videoId

Returns one video by videoId

- **URL Params**  
  Params: videoId
- **Headers**  
  Content-Type: application/json
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {<videoData>}
}
```

## **POST /videos**

Add new video by Merchant only

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
  Authorization: Bearer <jwtToken>
- **Body**  
  thumbnailUrl, videoUrl, title
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    videos: [<newlyAddedVideo>],
    currentPage: number,
    totalPage: number
  }
}
```

# Products

**Product Scheme**

```
{
  _id: ObjectId,
  id: uuid
  videoId: uuid,
  productUrl: string,
  imgUrl: string,
  title: string,
  price: number,
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## GET /products/:productId

Get one product by productId

- **URL Params**  
  Params: productId
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    products: [<productData>],
    currentPage: number,
    totalPage: number
  }
}
```

## GET /products/:videoId

Retrieve all product inside video

- **URL Params**  
  Params: videoId  
  Query (optional): page, limit
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    products: [<productData>],
    currentPage: number,
    totalPage: number
  }
}
```

## **POST /products**

Add new product for one video

- **URL Params**  
  None
- **Body**  
  videoId, productUrl, imgUrl
  title, price
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    <newlyAddedProduct>
  }
}
```

# Comments

**Comment Scheme**

```
{
  _id: ObjectId
  id: uuid
  userName: string
  videoId: uuid
  comment: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## SocketIO GET Comment List

Get last 10 comments

- **Event name**  
  get_comment
- **Message**  
  room
- **Success Response:**

```
{
  comments: [<last10Comment>]
}
```

## SocketIO POST Comment

Send comment

- **Event name**  
  send_comment
- **Message**  
  room, userName, comment
- **Success Response:**

```
{
  userName,
  comment
}
```

## SocketIO GET Leave Room

User disconnect

- **Event name**  
  leave_room
