import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';

// Plants grouped into categories. Each category has six unique houseplants.
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: 15 },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity to the air and removes toxins.', cost: 20 },
      { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Easy to care for and effective at removing toxins.', cost: 17 },
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Purifies the air and has healing properties for skin.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=600&auto=format&fit=crop', description: 'Calming scent, used in aromatherapy.', cost: 20 },
      { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=600&auto=format&fit=crop', description: 'Sweet fragrance, promotes relaxation.', cost: 18 },
      { name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'Invigorating scent, often used in cooking.', cost: 15 },
      { name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'Refreshing aroma, used in teas and cooking.', cost: 12 },
      { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'Citrusy scent, relieves stress and promotes sleep.', cost: 14 },
      { name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'Beautiful flowering plant known for its fragrance.', cost: 22 },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Echinacea', image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg', description: 'Boosts immune system, helps fight colds.', cost: 16 },
      { name: 'Peppermint', image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg', description: 'Relieves digestive issues and headaches.', cost: 13 },
      { name: 'Chamomile', image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', description: 'Soothes anxiety and promotes sleep.', cost: 15 },
      { name: 'Calendula', image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', description: 'Heals wounds and soothes skin irritations.', cost: 12 },
      { name: 'Holy Basil (Tulsi)', image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg', description: 'Helps the body cope with stress and supports immunity.', cost: 11 },
      { name: 'Oregano', image: 'https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg', description: 'Rich in antioxidants and has antibacterial properties.', cost: 10 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'Zebra Haworthia', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=600&auto=format&fit=crop', description: 'Striped succulent that thrives on little water.', cost: 9 },
      { name: 'Echeveria', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop', description: 'Rosette-shaped succulent, perfect for sunny desks.', cost: 8 },
      { name: 'Cactus Collection', image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=600&auto=format&fit=crop', description: 'Hardy desert plants that need watering only every few weeks.', cost: 19 },
      { name: 'Ficus Elastica Cutting', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=600&auto=format&fit=crop', description: 'Glossy leaves and happy in bright, indirect light.', cost: 11 },
      { name: 'Asparagus Fern', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?q=80&w=600&auto=format&fit=crop', description: 'Feathery foliage that tolerates low light.', cost: 13 },
      { name: 'Ginseng Ficus Bonsai', image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=600&auto=format&fit=crop', description: 'Sculptural bonsai that forgives irregular watering.', cost: 25 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items in the cart, shown on the cart icon
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // A plant's "Add to Cart" button is disabled while that plant is in the cart
  const isInCart = (plantName) => cartItems.some((item) => item.name === plantName);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* Navbar: shown on both the product listing page and the cart page */}
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/" onClick={handleHomeClick} className="brand-link">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="Paradise Nursery logo"
              className="brand-logo"
            />
            <div>
              <h3 className="brand-title">Paradise Nursery</h3>
              <i className="brand-tagline">Where Green Meets Serenity</i>
            </div>
          </a>
        </div>
        <ul className="navbar-links">
          <li>
            <a href="#" onClick={handleHomeClick}>Home</a>
          </li>
          <li>
            <a href="#" onClick={handlePlantsClick}>Plants</a>
          </li>
          <li>
            <a href="#" onClick={handleCartClick} className="cart-link" aria-label="Cart">
              <span className="cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="44" width="44">
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span className="cart-count">{totalQuantity}</span>
              </span>
            </a>
          </li>
        </ul>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h1 className="category-title">{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-price">${plant.cost}</div>
                    <button
                      className={`product-button ${isInCart(plant.name) ? 'added-to-cart' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
