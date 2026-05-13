const reviews = [
  {
    id: "rev-dishoom-1",
    user: "user-den",
    text: "Очень насыщенное карри и классный сервис.",
    rating: 5,
  },
  {
    id: "rev-dishoom-2",
    user: "user-andrey",
    text: "Нан отличный, но посадка была плотной.",
    rating: 4,
  },
  {
    id: "rev-greens-1",
    user: "user-irina",
    text: "Свежие боулы и приятная атмосфера.",
    rating: 5,
  },
  {
    id: "rev-greens-2",
    user: "user-den",
    text: "Хотелось бы меню побольше, но вкусно.",
    rating: 4,
  },
  {
    id: "rev-flat-1",
    user: "user-andrey",
    text: "Стейк прям как надо, сочный и без лишнего.",
    rating: 5,
  },
  {
    id: "rev-flat-2",
    user: "user-irina",
    text: "Бургер хороший, картошка тоже не подвела.",
    rating: 4,
  },
];

const users = [
  {
    id: "user-den",
    name: "Den",
  },
  {
    id: "user-andrey",
    name: "Andrey",
  },
  {
    id: "user-irina",
    name: "Irina",
  },
];

const dishes = [
  {
    id: "dish-tikka",
    name: "Chicken tikka masala",
    price: 12,
    ingredients: ["chicken", "tomato", "cream", "rice"],
  },
  {
    id: "dish-naan",
    name: "Garlic naan",
    price: 4,
    ingredients: ["flour", "garlic", "butter"],
  },
  {
    id: "dish-samosa",
    name: "Samosa",
    price: 6,
    ingredients: ["potato", "spices", "dough"],
  },
  {
    id: "dish-bowl",
    name: "Green bowl",
    price: 9,
    ingredients: ["quinoa", "avocado", "cucumber", "spinach"],
  },
  {
    id: "dish-soup",
    name: "Pumpkin soup",
    price: 7,
    ingredients: ["pumpkin", "cream", "ginger"],
  },
  {
    id: "dish-cheesecake",
    name: "Lime cheesecake",
    price: 5,
    ingredients: ["cream cheese", "lime", "cookies"],
  },
  {
    id: "dish-steak",
    name: "Flat iron steak",
    price: 18,
    ingredients: ["beef", "pepper", "salt"],
  },
  {
    id: "dish-burger",
    name: "Smash burger",
    price: 13,
    ingredients: ["bun", "beef", "cheddar", "pickle"],
  },
  {
    id: "dish-potato",
    name: "Roasted potato",
    price: 6,
    ingredients: ["potato", "rosemary", "olive oil"],
  },
];

const restaurants = [
  {
    id: "rest-dishoom",
    name: "Dishoom",
    description: "Индийский ресторан с пряным меню и плотными ужинами.",
    cuisine: "Indian",
    format: "casual dining",
    averageCheck: "1 500 ₽",
    reviews: ["rev-dishoom-1", "rev-dishoom-2"],
    dishes: ["dish-tikka", "dish-naan", "dish-samosa"],
  },
  {
    id: "rest-greens",
    name: "Greens & Grains",
    description: "Лёгкое городское кафе с боулами, супами и десертами.",
    cuisine: "Healthy food",
    format: "urban cafe",
    averageCheck: "900 ₽",
    reviews: ["rev-greens-1", "rev-greens-2"],
    dishes: ["dish-bowl", "dish-soup", "dish-cheesecake"],
  },
  {
    id: "rest-flatiron",
    name: "Flat Iron",
    description: "Мясной ресторан с понятным меню и хорошими порциями.",
    cuisine: "Steak house",
    format: "grill",
    averageCheck: "1 800 ₽",
    reviews: ["rev-flat-1", "rev-flat-2"],
    dishes: ["dish-steak", "dish-burger", "dish-potato"],
  },
];

module.exports = {
  restaurants,
  dishes,
  reviews,
  users,
};
