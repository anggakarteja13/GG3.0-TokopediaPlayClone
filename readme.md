Postman -> https://www.postman.com/spacecraft-observer-55350351/workspace/tokopediaplay

Postman ENV -> https://www.postman.com/spacecraft-observer-55350351/workspace/tokopediaplay/environment/15808237-cea1a1bb-b1ab-4f88-80e0-

BONUS:
-search feature
-user profile picture
-websocket for comment

#How To Run!!!

- Clear your port & MongoDB connection
- Clone this repository
- Setup yarn (if not installed)
- Use NodeJS v18.16.0
- create folder named **dist** on rootDir of project
- set your **.env** according to **.env.example**
- Run on terminal :
  - yarn install
  - yarn build
  - yarn seed
  - yarn start
- Look if there's any error on console
- Try to hit with Postman (set your port on postman env)

#Users

- User object

```
{
  _id: ObjectId
  username: string
  email: string
  password: string
  imgUrl: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## **POST /users/login**

Give authorization to user.

- **URL Params**  
  None
- **Data Params**  
  None
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

## **POST /users/signup**

Add new user

- **URL Params**  
  None
- **Data Params**  
  None
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

#Videos

- Video object

```
{
  _id: ObjectId
  userId: ObjectId
  thumbnailUrl: string
  videoUrl: string
  title: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## **GET /videos?page=1&limit=10&search=Keyword**

Returns all videos available
Video can be search by title
Added pagination feature

- **URL Params**
  Query: page, limit, search
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

## **POST /videos**

Add new video by Merchant only

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
  Authorization: Bearer <jwtToken>
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

#Products

- Product object

```
{
  _id: ObjectId,
  videoId: ObjectId,
  productUrl: string,
  imgUrl: string,
  title: string,
  price: number,
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## **Get /products/:videoId**

Retrieve all product inside video event

- **URL Params**  
  Params: videoId
  Query: page, limit
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

## **Post /products**

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

#Comments

- Commentt object

```
{
  _id: ObjectId
  userId: ObjectId,
  videoId: ObjectId,
  comment: string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## **Get /comments/:videoId**

Retrieve last 10 comment on video

- **URL Params**  
  Params: videoId
  Query: page, limit
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    comments: [<last10Comment>]
  }
}
```

## **Post /comments**

Retrieve all product inside video event

- **URL Params**
  None
- **Body**
  userId, videoId,
  comment
- **Success Response:**

```
{
  status: "Success",
  statusCode: 200,
  data: {
    <new Added Comment>
  }
}
```
