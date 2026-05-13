const http = require("http");
const { URL } = require("url");
const { randomUUID } = require("crypto");
const { restaurants, dishes, users, reviews } = require("./api/mock");

const port = 3001;

const getById = (entities, id) => entities.find((entity) => entity.id === id);

const mapRestaurantToClient = (restaurant) => ({
  id: restaurant.id,
  name: restaurant.name,
  description: restaurant.description,
  cuisine: restaurant.cuisine,
  format: restaurant.format,
  averageCheck: restaurant.averageCheck,
});

const mapReviewToClient = (review) => ({
  id: review.id,
  userId: review.user,
  text: review.text,
  rating: review.rating,
});

const sendJson = (res, body, statusCode = 200) => {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json",
  });

  setTimeout(() => {
    res.end(JSON.stringify(body));
  }, 300);
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });

const server = http.createServer(async (req, res) => {
  if (!req.url || !req.method) {
    sendJson(res, { error: "Bad request" }, 400);
    return;
  }

  if (req.method === "OPTIONS") {
    sendJson(res, {});
    return;
  }

  const url = new URL(req.url, `http://localhost:${port}`);
  const { pathname, searchParams } = url;

  try {
    if (req.method === "GET" && pathname === "/api/restaurants") {
      sendJson(res, restaurants.map(mapRestaurantToClient));
      return;
    }

    if (req.method === "GET" && pathname.startsWith("/api/restaurant/")) {
      const restaurantId = pathname.split("/").pop();
      const restaurant = restaurantId && getById(restaurants, restaurantId);

      sendJson(res, restaurant ? mapRestaurantToClient(restaurant) : null);
      return;
    }

    if (req.method === "GET" && pathname === "/api/dishes") {
      const restaurantId = searchParams.get("restaurantId");
      const restaurant = restaurantId && getById(restaurants, restaurantId);

      if (!restaurant) {
        sendJson(res, []);
        return;
      }

      const restaurantDishes = restaurant.dishes
        .map((dishId) => getById(dishes, dishId))
        .filter(Boolean);

      sendJson(res, restaurantDishes);
      return;
    }

    if (req.method === "GET" && pathname.startsWith("/api/dish/")) {
      const dishId = pathname.split("/").pop();
      const dish = dishId && getById(dishes, dishId);

      sendJson(res, dish ?? null);
      return;
    }

    if (req.method === "GET" && pathname === "/api/reviews") {
      const restaurantId = searchParams.get("restaurantId");
      const restaurant = restaurantId && getById(restaurants, restaurantId);
      const restaurantReviews = restaurant
        ? restaurant.reviews.map((reviewId) => getById(reviews, reviewId)).filter(Boolean)
        : reviews;

      sendJson(res, restaurantReviews.map(mapReviewToClient));
      return;
    }

    if (req.method === "GET" && pathname === "/api/users") {
      sendJson(res, users);
      return;
    }

    if (req.method === "POST" && pathname.startsWith("/api/review/")) {
      const restaurantId = pathname.split("/").pop();
      const restaurant = restaurantId && getById(restaurants, restaurantId);
      const body = await readBody(req);

      if (!restaurant) {
        sendJson(res, null, 404);
        return;
      }

      const newReview = {
        id: randomUUID(),
        user: body.userId,
        text: body.text,
        rating: body.rating,
      };

      reviews.push(newReview);
      restaurant.reviews.push(newReview.id);

      sendJson(res, mapReviewToClient(newReview), 201);
      return;
    }

    if (req.method === "PATCH" && pathname.startsWith("/api/review/")) {
      const reviewId = pathname.split("/").pop();
      const body = await readBody(req);
      const reviewIndex = reviews.findIndex((review) => review.id === reviewId);

      if (reviewIndex === -1) {
        sendJson(res, null, 404);
        return;
      }

      reviews[reviewIndex] = {
        ...reviews[reviewIndex],
        user: body.userId ?? reviews[reviewIndex].user,
        text: body.text ?? reviews[reviewIndex].text,
        rating: body.rating ?? reviews[reviewIndex].rating,
      };

      sendJson(res, mapReviewToClient(reviews[reviewIndex]));
      return;
    }

    sendJson(res, { error: "Not found" }, 404);
  } catch (error) {
    sendJson(res, { error: error.message }, 500);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
});
