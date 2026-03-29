const router = require("express").Router();
const { nanoid } = require("nanoid");
const { products, codecs, users, reviews } = require("./mock");
const { reply, getById, updateById } = require("./utils");

const getCodecById = getById(codecs);
const getReviewById = getById(reviews);
const getUserById = getById(users);
const getProductById = getById(products);

const mapProductToRestaurant = (product) => ({
  id: product.id,
  name: product.name,
  description: `${product.brand} ${product.type}`,
  brand: product.brand,
  type: product.type,
  maxVolume: product.maxVolume,
});

const getDishPrice = (codec, product) =>
  codec.type.length * 7 + (product?.brand?.length || 0);

const mapCodecToDish = (codec, product) => ({
  id: codec.id,
  name: codec.type,
  price: getDishPrice(codec, product),
  ingredients: [product?.brand, product?.type, "bluetooth"].filter(Boolean),
});

const findProductByCodecId = (codecId) =>
  products.find((product) => product.codecs.includes(codecId));

const mapReviewToClient = (review) => ({
  id: review.id,
  userId: review.user,
  text: review.text,
  rating: review.rating,
});

router.get("/restaurants", (req, res, next) => {
  reply(res, products.map(mapProductToRestaurant));
});

router.get("/restaurant/:restaurantId", (req, res, next) => {
  const restaurantId = req.params?.restaurantId;
  const restaurant = restaurantId && getProductById(restaurantId);

  reply(res, restaurant ? mapProductToRestaurant(restaurant) : null);
});

router.get("/dishes", (req, res, next) => {
  const { restaurantId } = req.query;
  const restaurant = restaurantId && getProductById(restaurantId);

  if (!restaurant) {
    reply(res, []);
    return;
  }

  reply(
    res,
    restaurant.codecs.map(getCodecById).filter(Boolean).map((codec) =>
      mapCodecToDish(codec, restaurant)
    )
  );
});

router.get("/dish/:dishId", (req, res, next) => {
  const dishId = req.params?.dishId;
  const codec = dishId && getCodecById(dishId);
  const product = codec && findProductByCodecId(codec.id);

  reply(res, codec ? mapCodecToDish(codec, product) : null);
});

router.get("/reviews", (req, res, next) => {
  const { restaurantId, productId } = req.query;
  const targetId = restaurantId || productId;
  let result = reviews;

  if (targetId) {
    const product = getProductById(targetId);
    if (product) {
      result = product.reviews.map(getReviewById).filter(Boolean);
    }
  }

  reply(res, result.map(mapReviewToClient));
});

router.post("/review/:restaurantId", (req, res, next) => {
  const body = req.body;
  const restaurantId = req.params?.restaurantId;
  const restaurant = restaurantId && getProductById(restaurantId);
  let newReview = {};

  if (restaurant && body) {
    const newReviewId = nanoid();

    newReview = {
      id: newReviewId,
      user: body.userId,
      text: body.text,
      rating: body.rating,
    };

    restaurant.reviews.push(newReviewId);
    reviews.push(newReview);
  }

  reply(res, mapReviewToClient(newReview));
});

router.patch("/review/:reviewId", (req, res, next) => {
  const body = req.body;
  const reviewId = req.params?.reviewId;
  let updatedReview;

  if (reviewId) {
    updatedReview = updateById(reviews)(reviewId, {
      ...body,
      user: body.userId || body.user,
    });
  }

  reply(res, updatedReview ? mapReviewToClient(updatedReview) : null);
});

router.get("/products", (req, res, next) => {
  console.log("get products");
  reply(res, products);
});

router.get("/product/:productId", (req, res, next) => {
  const productId = req.params?.productId;
  console.log(productId);
  let product;

  if (productId) {
    product = getById(products)(productId);
  }

  reply(res, product);
});

router.get("/codecs", (req, res, next) => {
  const { productId } = req.query;
  let result = codecs;
  if (productId) {
    const product = getById(products)(productId);
    if (product) {
      result = product.codecs.map(getById(result));
    }
  }
  reply(res, result);
});

router.get("/reviews", (req, res, next) => {
  console.log("get reviews");
  const { productId } = req.query;
  let result = reviews;
  if (productId) {
    const product = getById(products)(productId);
    if (product) {
      result = product.reviews.map(getById(result));
    }
  }
  reply(res, result);
});

router.post("/review/:productId", (req, res, next) => {
  const body = req.body;
  const productId = req.params?.productId;
  const product = productId && getById(products)(productId);
  let newReview = {};

  if (product && body) {
    const newReviewId = nanoid();

    newReview = {
      ...body,
      id: newReviewId,
    };
    product.reviews.push(newReviewId);
    reviews.push(newReview);
  }

  reply(res, newReview);
});

router.patch("/review/:reviewId", (req, res, next) => {
  const body = req.body;
  const reviewId = req.params?.reviewId;
  let updatedReview;

  if (reviewId) {
    updatedReview = updateById(reviews)(reviewId, body);
  }

  reply(res, updatedReview);
});

router.get("/users", (req, res, next) => {
  console.log("get users");
  reply(res, users);
});

module.exports = router;
