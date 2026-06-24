import React, { useState, useEffect, createContext, useContext, useRef, Component } from 'react';
import './App.css';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  useNavigate, 
  useParams, 
  Navigate, 
  Outlet, 
  useLocation 
} from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Star, 
  Clock, 
  Heart, 
  MapPin, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle, 
  Award, 
  Percent, 
  LogOut, 
  PlusCircle, 
  Edit2, 
  TrendingUp, 
  ShieldAlert, 
  ChevronRight,
  Info
} from 'lucide-react';

// ==========================================
// 1. SEED DATA & MODELS
// ==========================================
const seedRestaurants = [
  {
    id: 1,
    name: "Pizza Hut",
    cuisine: "Italian, Pizzas, Garlic Bread",
    rating: 4.5,
    deliveryTime: 25,
    costForTwo: 500,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "Indulge in fresh, hot pizzas with cheese pulls that make your day.",
    reviews: [
      { name: "John Doe", rating: 5, comment: "Best garlic bread and cheese pizza in town!", date: "2026-06-10" },
      { name: "Sarah Miller", rating: 4, comment: "Super fast delivery, was piping hot.", date: "2026-06-15" }
    ],
    offers: [
      { code: "FOODHUB50", desc: "Get 50% discount up to ₹150 on your order" },
      { code: "FREESHIP", desc: "Free delivery on orders above ₹300" }
    ]
  },
  {
    id: 2,
    name: "Burger King",
    cuisine: "Burgers, Fast Food, Wraps",
    rating: 4.2,
    deliveryTime: 20,
    costForTwo: 400,
    category: "burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Flame-grilled burgers made with premium ingredients and signature spices.",
    reviews: [
      { name: "David Stark", rating: 4, comment: "Whoppers are juicy and delicious.", date: "2026-06-12" }
    ],
    offers: [
      { code: "FOODHUB50", desc: "Get 50% discount up to ₹150 on your order" }
    ]
  },
  {
    id: 3,
    name: "Sushi House",
    cuisine: "Japanese, Sushi, Asian Fusion",
    rating: 4.8,
    deliveryTime: 35,
    costForTwo: 800,
    category: "sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    description: "Authentic sushi rolls, fresh sashimi, and traditional bento boxes.",
    reviews: [
      { name: "Bruce Wayne", rating: 5, comment: "Premium quality sushi. Best in Gotham.", date: "2026-06-16" }
    ],
    offers: [
      { code: "FREESHIP", desc: "Free delivery on orders above ₹300" }
    ]
  },
  {
    id: 4,
    name: "The Salad Bowl",
    cuisine: "Healthy, Salads, Diet Bowls",
    rating: 3.9,
    deliveryTime: 15,
    costForTwo: 300,
    category: "salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    description: "Fresh, healthy, organic salads tossed with homemade vinaigrettes.",
    reviews: [
      { name: "Clark Kent", rating: 4, comment: "Fresh veggies and wholesome toppings.", date: "2026-06-14" }
    ],
    offers: [
      { code: "FOODHUB50", desc: "Get 50% discount up to ₹150 on your order" }
    ]
  }
];

const seedMenuItems = [
  { id: 101, restaurantId: 1, name: "Margherita Pizza", price: 249, description: "Classic tomato sauce, fresh mozzarella cheese, and fragrant fresh basil.", category: "Veg", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80" },
  { id: 102, restaurantId: 1, name: "Pepperoni Feast", price: 349, description: "Loaded with double pepperoni, extra mozzarella cheese, and Italian seasoning.", category: "Non-Veg", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80" },
  { id: 103, restaurantId: 1, name: "Stuffed Garlic Bread", price: 129, description: "Baked bread stuffed with sweet corn, cheese, and jalapenos, served with dip.", category: "Veg", image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=300&q=80" },
  { id: 104, restaurantId: 1, name: "Choco Lava Cake", price: 99, description: "Freshly baked cake filled with molten hot liquid chocolate center.", category: "Dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80" },
  
  { id: 201, restaurantId: 2, name: "Flame-Grilled Whopper", price: 179, description: "Flame-grilled beefy patty, lettuce, tomatoes, creamy mayo, crunchy pickles.", category: "Non-Veg", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" },
  { id: 202, restaurantId: 2, name: "Crispy Paneer Burger", price: 139, description: "Thick paneer patty fried to golden crispiness, layered with chipotle mayo.", category: "Veg", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80" },
  { id: 203, restaurantId: 2, name: "Cheesy Crinkle Fries", price: 109, description: "Crinkled golden fries drizzled with liquid cheese sauce and fresh parsley.", category: "Veg", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80" },
  
  { id: 301, restaurantId: 3, name: "Salmon Maki Sushi", price: 399, description: "Fresh Norwegian salmon rolled with vinegared sushi rice and nori sheets.", category: "Non-Veg", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80" },
  { id: 302, restaurantId: 3, name: "Avocado Cucumber Roll", price: 299, description: "Creamy avocado slices and crisp cucumber spears rolled with sushi rice.", category: "Veg", image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=300&q=80" },
  { id: 303, restaurantId: 3, name: "Japanese Mochi Icecream", price: 149, description: "Sweet sticky rice dough wrapped around premium green tea ice cream.", category: "Dessert", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=300&q=80" },
  
  { id: 401, restaurantId: 4, name: "Classic Caesar Salad", price: 189, description: "Crisp romaine, parmesan cheese, herb croutons, served with Caesar dressing.", category: "Veg", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=300&q=80" },
  { id: 402, restaurantId: 4, name: "Detox Green Bowl", price: 249, description: "Avocado, spinach, edamame beans, broccoli florets, pumpkin seeds, olive oil.", category: "Veg", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80" }
];

// ==========================================
// 2. CONTEXT & STATE MANAGEMENT
// ==========================================
export const FoodContext = createContext(null);

export function FoodProvider({ children }) {
  // Authentication State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Cart State (Lifted State)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Restaurants & Menu Items (Dynamically modifiable by Admin)
  const [restaurants, setRestaurants] = useState(() => {
    const savedRes = localStorage.getItem('restaurants');
    return savedRes ? JSON.parse(savedRes) : seedRestaurants;
  });

  const [menuItems, setMenuItems] = useState(() => {
    const savedMenu = localStorage.getItem('menuItems');
    return savedMenu ? JSON.parse(savedMenu) : seedMenuItems;
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Favorites/Wishlist State
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  // Save states to local storage on changes (Browser Storage integration)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Auth Operations
  const login = (email, password) => {
    // Demo Credentials
    if (email === 'admin@foodhub.com' && password === 'admin123') {
      const adminSession = { token: 'admin-token-xyz', username: 'Admin FoodHub', email, isAdmin: true };
      setUser(adminSession);
      return { success: true };
    } else if (email === 'user@foodhub.com' && password === 'user123') {
      const userSession = { token: 'user-token-abc', username: 'John Doe', email, isAdmin: false };
      setUser(userSession);
      return { success: true };
    }
    // Generic auto-login for custom registered users
    const userSession = { token: 'custom-token-' + Date.now(), username: email.split('@')[0], email, isAdmin: false };
    setUser(userSession);
    return { success: true };
  };

  const register = (name, email, phone, password) => {
    const userSession = { token: 'custom-token-' + Date.now(), username: name, email, phone, isAdmin: false };
    setUser(userSession);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCartItems([]);
  };

  // Cart Operations
  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(i => i.id === item.id);
      if (existing) {
        return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(i => i.id === item.id);
      if (existing && existing.quantity > 1) {
        return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prevItems.filter(i => i.id !== item.id);
    });
  };

  const clearCartItem = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  // Wishlist Operations
  const toggleFavorite = (resId) => {
    setFavorites(prev => {
      if (prev.includes(resId)) {
        return prev.filter(id => id !== resId);
      }
      return [...prev, resId];
    });
  };

  // Checkout Processing
  const checkout = (address, couponCode = '') => {
    // Derived Calculations
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    let freeDelivery = false;

    if (couponCode === 'FOODHUB50') {
      discount = Math.min(subtotal * 0.5, 150);
    } else if (couponCode === 'FREESHIP' && subtotal >= 300) {
      freeDelivery = true;
    }

    const deliveryFee = freeDelivery ? 0 : 40;
    const total = subtotal - discount + deliveryFee;

    const newOrder = {
      id: 'FH-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cartItems],
      subtotal,
      discount,
      deliveryFee,
      total,
      address,
      status: 'Placed', // Placed -> Preparing -> Out for Delivery -> Delivered
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      coupon: couponCode || 'None'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    return newOrder;
  };

  // Admin: Manage Orders
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Admin: Manage Restaurants
  const addRestaurant = (res) => {
    const newRes = { ...res, id: restaurants.length + 1, rating: 4.0, reviews: [], offers: [{ code: "FOODHUB50", desc: "Get 50% discount up to ₹150 on your order" }] };
    setRestaurants(prev => [...prev, newRes]);
  };

  const deleteRestaurant = (id) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
    setMenuItems(prev => prev.filter(item => item.restaurantId !== id));
  };

  const addMenuItem = (item) => {
    const newItem = { ...item, id: menuItems.length + 101 };
    setMenuItems(prev => [...prev, newItem]);
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  // Restaurant Feedback Form Submission (Uncontrolled ref handling)
  const addRestaurantReview = (resId, review) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === resId) {
        const updatedReviews = [review, ...(r.reviews || [])];
        const newRating = parseFloat((updatedReviews.reduce((sum, rev) => sum + rev.rating, 0) / updatedReviews.length).toFixed(1));
        return {
          ...r,
          reviews: updatedReviews,
          rating: newRating
        };
      }
      return r;
    }));
  };

  return (
    <FoodContext.Provider value={{
      user, login, register, logout,
      cartItems, addToCart, removeFromCart, clearCartItem,
      restaurants, addRestaurant, deleteRestaurant, addRestaurantReview,
      menuItems, addMenuItem, deleteMenuItem,
      orders, checkout, updateOrderStatus,
      favorites, toggleFavorite
    }}>
      {children}
    </FoodContext.Provider>
  );
}

// ==========================================
// 3. ERROR BOUNDARY
// ==========================================
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fallback-container">
          <div className="fallback-card">
            <div className="fallback-icon">
              <ShieldAlert size={40} />
            </div>
            <h1 className="fallback-title">Oops! Something went wrong.</h1>
            <p className="fallback-text">
              We encountered a runtime rendering exception. This might be due to a faulty API call or data discrepancy.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = "/";
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// 4. PROTECTED ROUTES WRAPPERS
// ==========================================
function ProtectedRoute({ children }) {
  const { user } = useContext(FoodContext);
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user } = useContext(FoodContext);
  return user && user.isAdmin ? children : <Navigate to="/" replace />;
}

// ==========================================
// 5. NAVBAR & FOOTER
// ==========================================
function Navbar() {
  const { user, cartItems, logout } = useContext(FoodContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          🍔 Food<span>Hub</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className={({ active }) => active ? "nav-link active" : "nav-link"} end>Home</NavLink>
          <NavLink to="/restaurants" className={({ active }) => active ? "nav-link active" : "nav-link"}>Restaurants</NavLink>
          
          {user ? (
            <>
              <NavLink to="/orders" className={({ active }) => active ? "nav-link active" : "nav-link"}>Orders</NavLink>
              <NavLink to="/profile" className={({ active }) => active ? "nav-link active" : "nav-link"}>Profile</NavLink>
              {user.isAdmin && (
                <NavLink to="/admin" className={({ active }) => active ? "nav-link active" : "nav-link"}>Admin Panel</NavLink>
              )}
              <Link to="/cart" className="cart-icon-btn">
                <ShoppingBag size={22} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <button onClick={logout} className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', gap: '0.25rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3 style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>🍔 FoodHub</h3>
            <p>Your ultimate destination for lightning-fast deliveries and absolute gourmet satisfaction.</p>
          </div>
          <div className="footer-col">
            <h4>Menu</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/restaurants">Browse Restaurants</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund & Cancellations</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href="#">support@foodhub.com</a></li>
              <li><a href="#">Helpline: +91 9876543210</a></li>
              <li><a href="#">Bengaluru, India</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 FoodHub Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Orange & White Theme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 6. PAGE: HOME
// ==========================================
function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/restaurants');
    }
  };

  const categories = [
    { name: "Pizza", icon: "🍕", value: "pizza" },
    { name: "Burger", icon: "🍔", value: "burger" },
    { name: "Sushi", icon: "🍣", value: "sushi" },
    { name: "Salads", icon: "🥗", value: "salad" }
  ];

  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1 className="hero-title">Delicious Meals, Delivered <span>Fast</span></h1>
            <p className="hero-subtitle">
              Satisfy your cravings with the best restaurants in town. Fast delivery, fresh food, and endless choices.
            </p>
            <form className="hero-search" onSubmit={handleSearchSubmit}>
              <Search size={20} style={{ margin: '1rem 0.5rem 1rem 1rem', color: '#64748B' }} />
              <input 
                type="text" 
                placeholder="Search pizza, burger, cuisines, or restaurants..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Find Food</button>
            </form>
          </div>
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" 
              alt="Delicious Food Spread" 
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <div className="container">
        <div className="section-header">
          <h2>Popular Categories</h2>
        </div>
        <div className="categories-container">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="category-chip"
              onClick={() => navigate(`/restaurants?category=${cat.value}`)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </div>
          ))}
        </div>

        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Top Rated Restaurants</h2>
          <Link to="/restaurants" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem' }}>View All →</Link>
        </div>

        <div className="restaurant-grid" style={{ marginBottom: '5rem' }}>
          {seedRestaurants.slice(0, 3).map(res => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. RESTAURANT CARD (DUMB PRESENTER COMPONENT)
// ==========================================
export function RestaurantCard({ restaurant }) {
  const { favorites, toggleFavorite } = useContext(FoodContext);
  const isFavorite = favorites.includes(restaurant.id);

  return (
    <div className="restaurant-card" data-testid="restaurant-card">
      <div className="card-img-wrapper">
        <img src={restaurant.image} alt={restaurant.name} className="card-img" />
        <button 
          className={isFavorite ? "favorite-btn active" : "favorite-btn"} 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(restaurant.id);
          }}
          title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isFavorite ? "#EF4444" : "none"} />
        </button>
      </div>
      <Link to={`/restaurants/${restaurant.id}/menu`} className="restaurant-info" style={{ display: 'block' }}>
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-cuisine">{restaurant.cuisine}</p>
        <div className="card-meta">
          <span className={restaurant.rating >= 4.0 ? "rating-badge" : "rating-badge rating-low"}>
            <Star size={12} fill="currentColor" /> {restaurant.rating}
          </span>
          <span className="card-time">{restaurant.deliveryTime} mins</span>
          <span className="card-cost">₹{restaurant.costForTwo} for two</span>
        </div>
      </Link>
    </div>
  );
}

// ==========================================
// 8. PAGE: RESTAURANT LISTING (STATE COLOCATION)
// ==========================================
function RestaurantListing() {
  const { restaurants } = useContext(FoodContext);
  const location = useLocation();

  // Parse queries from location
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';
  const initialSearch = queryParams.get('search') || '';

  // Colocated filters inside RestaurantListing.jsx
  const [search, setSearch] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default'); // default, rating, time, cost

  // Sync state if url queries change
  useEffect(() => {
    setCategoryFilter(queryParams.get('category') || '');
    setSearch(queryParams.get('search') || '');
  }, [location.search]);

  // Derived filter logic
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) || 
                              res.cuisine.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter ? res.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'time') return a.deliveryTime - b.deliveryTime;
        if (sortBy === 'cost') return a.costForTwo - b.costForTwo;
        return 0;
      });
  }, [restaurants, search, categoryFilter, sortBy]);

  const categories = [
    { label: "All", value: "" },
    { label: "Pizzas", value: "pizza" },
    { label: "Burgers", value: "burger" },
    { label: "Sushi", value: "sushi" },
    { label: "Salads", value: "salad" }
  ];

  return (
    <div className="container" style={{ minHeight: '80vh', padding: '2rem 1.5rem' }}>
      <div className="section-header" style={{ marginTop: '1rem' }}>
        <h2>Explore Restaurants</h2>
      </div>

      {/* Filter Toolbar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem',
        marginBottom: '2rem',
        backgroundColor: 'white',
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          <input 
            type="text" 
            placeholder="Search restaurants..." 
            className="form-input" 
            style={{ paddingLeft: '2.5rem' }} 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>

        {/* Categories selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`btn btn-outline`}
              style={{ 
                padding: '0.4rem 1rem', 
                fontSize: '0.85rem',
                backgroundColor: categoryFilter === cat.value ? 'var(--primary)' : 'white',
                color: categoryFilter === cat.value ? 'white' : 'var(--secondary)',
                borderColor: categoryFilter === cat.value ? 'var(--primary)' : 'var(--border)'
              }}
              onClick={() => setCategoryFilter(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort by selector */}
        <div>
          <select 
            className="form-select" 
            style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', width: '170px' }}
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Recommended</option>
            <option value="rating">Sort: High Rating</option>
            <option value="time">Sort: Delivery Time</option>
            <option value="cost">Sort: Low Cost</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredRestaurants.length > 0 ? (
        <div className="restaurant-grid">
          {filteredRestaurants.map(res => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h3>No Restaurants Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try modifying your search or category filters.</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. PAGE: RESTAURANT DETAILS (NESTED OUTLET)
// ==========================================
function RestaurantDetails() {
  const { id } = useParams();
  const { restaurants } = useContext(FoodContext);
  const restaurant = restaurants.find(r => r.id === parseInt(id));

  if (!restaurant) {
    return (
      <div className="container" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <h2>Restaurant Not Found</h2>
        <Link to="/restaurants" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Restaurants</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="restaurant-details-header">
        <div className="container res-header-info">
          <img src={restaurant.image} alt={restaurant.name} className="res-header-img" />
          <div style={{ flex: 1 }}>
            <h1 className="res-header-title">{restaurant.name}</h1>
            <p style={{ color: 'var(--text-muted)' }}>{restaurant.cuisine}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#475569' }}>{restaurant.description}</p>
            <div className="res-header-meta">
              <div className="res-meta-item">
                <span className="rating-badge"><Star size={14} fill="currentColor" /> {restaurant.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({restaurant.reviews?.length || 0} reviews)</span>
              </div>
              <div className="res-meta-item" style={{ color: 'var(--text-muted)' }}>
                <Clock size={16} /> <span>{restaurant.deliveryTime} mins</span>
              </div>
              <div className="res-meta-item" style={{ color: 'var(--text-muted)' }}>
                <span>₹{restaurant.costForTwo} for two</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Sub-Navigation for Nested Routes */}
        <div className="tabs-nav">
          <NavLink to={`/restaurants/${id}/menu`} className={({ active }) => active ? "tab-btn active" : "tab-btn"}>Menu</NavLink>
          <NavLink to={`/restaurants/${id}/reviews`} className={({ active }) => active ? "tab-btn active" : "tab-btn"}>Reviews</NavLink>
          <NavLink to={`/restaurants/${id}/offers`} className={({ active }) => active ? "tab-btn active" : "tab-btn"}>Offers</NavLink>
        </div>

        {/* Nested Content Outlet */}
        <Outlet context={{ restaurant }} />
      </div>
    </div>
  );
}

// ==========================================
// 10. NESTED ROUTE: RESTAURANT MENU
// ==========================================
function RestaurantMenu() {
  const { restaurant } = useOutletContext();
  const { menuItems, addToCart, removeFromCart, cartItems } = useContext(FoodContext);
  
  // Filter menu items colocated by restaurant
  const items = menuItems.filter(item => item.restaurantId === restaurant.id);
  const [menuFilter, setMenuFilter] = useState("All");

  const categories = ["All", "Veg", "Non-Veg", "Dessert"];

  const filteredItems = items.filter(item => {
    if (menuFilter === "All") return true;
    return item.category === menuFilter;
  });

  return (
    <div className="menu-layout">
      {/* Sidebar Filter */}
      <aside className="menu-sidebar">
        <h3 className="sidebar-title">Categories</h3>
        <div>
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={menuFilter === cat ? "sidebar-item active" : "sidebar-item"}
              onClick={() => setMenuFilter(cat)}
            >
              <span>{cat}</span>
              <ChevronRight size={14} />
            </div>
          ))}
        </div>
      </aside>

      {/* Menu List */}
      <div className="menu-list">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            const qty = cartItem ? cartItem.quantity : 0;
            return (
              <FoodCard key={item.id} item={item} qty={qty} onAdd={addToCart} onRemove={removeFromCart} />
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>No items in this category for this restaurant.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 11. FOOD CARD (DUMB PRESENTER COMPONENT)
// ==========================================
export function FoodCard({ item, qty, onAdd, onRemove }) {
  return (
    <div className="food-card" data-testid="food-card">
      <div className="food-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span 
            className="badge" 
            style={{ 
              backgroundColor: item.category === 'Veg' ? '#E1F5FE' : item.category === 'Dessert' ? '#F3E5F5' : '#FFEBEE',
              color: item.category === 'Veg' ? '#0288D1' : item.category === 'Dessert' ? '#7B1FA2' : '#D32F2F',
              padding: '0.1rem 0.4rem',
              fontSize: '0.7rem'
            }}
          >
            {item.category}
          </span>
        </div>
        <h4 className="food-name" style={{ marginTop: '0.35rem' }}>
          <Link to={`/food/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="food-link">
            {item.name}
          </Link>
        </h4>
        <p className="food-price">₹{item.price}</p>
        <p className="food-desc">{item.description}</p>
      </div>

      <div className="food-img-wrapper">
        <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80"} alt={item.name} className="food-img" />
        <div className="add-to-cart-wrapper">
          {qty > 0 ? (
            <div className="qty-control">
              <button className="qty-btn" onClick={() => onRemove(item)}>-</button>
              <span className="qty-val">{qty}</span>
              <button className="qty-btn" onClick={() => onAdd(item)}>+</button>
            </div>
          ) : (
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '0.4rem 0.5rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
              onClick={() => onAdd(item)}
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 12. DYNAMIC PAGE: SINGLE FOOD ITEM DETAIL
// ==========================================
function FoodDetail() {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { menuItems, addToCart, removeFromCart, cartItems, restaurants } = useContext(FoodContext);

  const item = menuItems.find(m => m.id === parseInt(foodId));
  const cartItem = cartItems.find(ci => ci.id === parseInt(foodId));
  const qty = cartItem ? cartItem.quantity : 0;

  if (!item) {
    return (
      <div className="container" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <h2>Food Item Not Found</h2>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/restaurants')}>Back to Restaurants</button>
      </div>
    );
  }

  const restaurant = restaurants.find(r => r.id === item.restaurantId);

  return (
    <div className="container" style={{ minHeight: '70vh', padding: '3rem 1.5rem' }}>
      <button className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.4rem 1rem' }} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '3rem', 
        backgroundColor: 'white', 
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', objectFit: 'cover', maxHeight: '380px', boxShadow: 'var(--shadow)' }} 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="badge badge-primary" style={{ alignSelf: 'start', marginBottom: '1rem' }}>{item.category}</span>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{item.name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>₹{item.price}</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>{item.description}</p>
          
          {restaurant && (
            <div style={{ 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius)', 
              padding: '1rem', 
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Prepared By</p>
                <h4 style={{ margin: '0.15rem 0' }}>{restaurant.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{restaurant.cuisine}</p>
              </div>
              <Link to={`/restaurants/${restaurant.id}/menu`} className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                Visit Restaurant
              </Link>
            </div>
          )}

          <div style={{ width: '200px' }}>
            {qty > 0 ? (
              <div className="qty-control" style={{ padding: '0.25rem' }}>
                <button className="qty-btn" onClick={() => removeFromCart(item)}>-</button>
                <span className="qty-val" style={{ fontSize: '1.1rem' }}>{qty} Added</span>
                <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
              </div>
            ) : (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => addToCart(item)}>
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 13. NESTED ROUTE: RESTAURANT REVIEWS & FEEDBACK FORM (UNCONTROLLED REFS)
// ==========================================
function RestaurantReviews() {
  const { restaurant } = useOutletContext();
  const { addRestaurantReview } = useContext(FoodContext);

  // Uncontrolled Refs for Feedback Form
  const reviewerNameRef = useRef(null);
  const ratingRef = useRef(null);
  const reviewTextRef = useRef(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const name = reviewerNameRef.current.value.trim();
    const rating = parseInt(ratingRef.current.value);
    const comment = reviewTextRef.current.value.trim();

    if (!name || !comment) {
      setFormError("All fields are required!");
      setSuccessMsg("");
      return;
    }

    const newReview = {
      name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    addRestaurantReview(restaurant.id, newReview);

    // Reset uncontrolled fields directly using ref
    reviewerNameRef.current.value = "";
    ratingRef.current.value = "5";
    reviewTextRef.current.value = "";
    
    setFormError("");
    setSuccessMsg("Thank you for your valuable feedback!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const reviews = restaurant.reviews || [];

  return (
    <div className="reviews-grid">
      {/* Review List */}
      <div>
        <div className="reviews-summary">
          <h3>Customer Rating Summary</h3>
          <div className="rating-summary-row" style={{ marginTop: '1rem' }}>
            <span className="rating-big-number">{restaurant.rating}</span>
            <div>
              <div style={{ display: 'flex', gap: '0.1rem', color: 'var(--accent)' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.round(restaurant.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Based on {reviews.length} ratings
              </p>
            </div>
          </div>
        </div>

        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">{rev.name}</span>
                  <span className="reviewer-date">{rev.date}</span>
                </div>
                <div className="review-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="review-text">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No reviews yet. Be the first to add one!</p>
          )}
        </div>
      </div>

      {/* Uncontrolled Feedback Form */}
      <div className="form-card">
        <h3 className="form-title">Submit Customer Feedback</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Your feedback is directly read using refs, avoiding state re-renders for a snappier input experience.
        </p>
        <form onSubmit={handleSubmitFeedback}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input type="text" ref={reviewerNameRef} className="form-input" placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label className="form-label">Rating</label>
            <select ref={ratingRef} className="form-select" defaultValue="5">
              <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
              <option value="4">⭐⭐⭐⭐ Very Good (4/5)</option>
              <option value="3">⭐⭐⭐ Good (3/5)</option>
              <option value="2">⭐⭐ Fair (2/5)</option>
              <option value="1">⭐ Poor (1/5)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Review Comment</label>
            <textarea ref={reviewTextRef} className="form-textarea" placeholder="Share your experience..."></textarea>
          </div>

          {formError && <p className="error-text" style={{ marginBottom: '1rem' }}>⚠️ {formError}</p>}
          {successMsg && <p style={{ color: 'var(--success)', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem' }}>✅ {successMsg}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 14. NESTED ROUTE: RESTAURANT OFFERS
// ==========================================
function RestaurantOffers() {
  const { restaurant } = useOutletContext();
  const offers = restaurant.offers || [];

  return (
    <div>
      <div className="section-header" style={{ marginTop: '0' }}>
        <h3>Exclusive Deals</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Use these discount coupon codes during checkout.</p>
      </div>
      <div className="offers-grid">
        {offers.length > 0 ? (
          offers.map((off, idx) => (
            <div key={idx} className="coupon-card">
              <div>
                <span className="coupon-code">{off.code}</span>
                <p className="coupon-desc" style={{ fontWeight: '600', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                  {off.desc}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  *T&C Apply. Applicable on selected items.
                </p>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '700' }}>
                <Percent size={16} /> <span>Save Big with FoodHub</span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No promotional offers currently available.</p>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 15. PAGE: CART & CHECKOUT (DERIVED STATS, REF COUPONS)
// ==========================================
function Cart() {
  const { cartItems, removeFromCart, addToCart, clearCartItem, checkout } = useContext(FoodContext);
  const navigate = useNavigate();

  // Uncontrolled Ref for Coupon Code
  const couponRef = useRef(null);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  // Derived State calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const discount = useMemo(() => {
    if (appliedCoupon === 'FOODHUB50') {
      return Math.min(subtotal * 0.5, 150);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const freeShipping = useMemo(() => {
    return appliedCoupon === 'FREESHIP' && subtotal >= 300;
  }, [appliedCoupon, subtotal]);

  const deliveryFee = subtotal > 0 ? (freeShipping ? 0 : 40) : 0;
  const grandTotal = subtotal - discount + deliveryFee;

  const handleApplyCoupon = () => {
    const code = couponRef.current.value.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      setCouponSuccess('');
      return;
    }

    if (code === 'FOODHUB50') {
      setAppliedCoupon('FOODHUB50');
      setCouponSuccess('Coupon "FOODHUB50" applied! 50% discount has been applied.');
      setCouponError('');
    } else if (code === 'FREESHIP') {
      if (subtotal < 300) {
        setCouponError('Coupon "FREESHIP" is valid only for orders above ₹300.');
        setCouponSuccess('');
      } else {
        setAppliedCoupon('FREESHIP');
        setCouponSuccess('Coupon "FREESHIP" applied! Free shipping activated.');
        setCouponError('');
      }
    } else {
      setCouponError('Invalid coupon code. Try FOODHUB50 or FREESHIP.');
      setCouponSuccess('');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponSuccess('');
    setCouponError('');
    if (couponRef.current) couponRef.current.value = '';
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setAddressError('Delivery address is required!');
      return;
    }
    setAddressError('');
    checkout(address.trim(), appliedCoupon);
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '70vh' }}>
        <ShoppingBag size={64} style={{ color: 'var(--border)', marginBottom: '1.5rem' }} />
        <h2>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>
          Add savory delights from your favorite restaurants and check back here.
        </p>
        <Link to="/restaurants" className="btn btn-primary">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '80vh', padding: '2rem 1.5rem' }}>
      <div className="section-header" style={{ marginTop: '1rem' }}>
        <h2>My Shopping Cart</h2>
      </div>

      <div className="cart-layout">
        {/* Cart items listing */}
        <div className="cart-items-container">
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>Items List</h3>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-row">
              <img src={item.image} alt={item.name} className="cart-item-thumb" />
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-actions">
                <div className="qty-control" style={{ width: '90px' }}>
                  <button className="qty-btn" onClick={() => removeFromCart(item)}>-</button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                </div>
                <button className="remove-item-btn" onClick={() => clearCartItem(item.id)} title="Delete item">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Delivery Address Details */}
          <form style={{ marginTop: '2.5rem' }} onSubmit={handlePlaceOrder}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>Delivery Details</h3>
            <div className="form-group">
              <label className="form-label">Delivery Address</label>
              <textarea 
                className="form-textarea" 
                placeholder="Enter complete shipping address (building, block, street, pincode)..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
              {addressError && <p className="error-text">⚠️ {addressError}</p>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }}>
              Confirm & Place Order (₹{grandTotal})
            </button>
          </form>
        </div>

        {/* Pricing calculations card */}
        <div className="cart-summary-card">
          <h3 className="cart-summary-title">Order Summary</h3>
          
          {/* Coupon Code Ref */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Apply Promo Coupon</label>
            <div className="coupon-section">
              <input 
                type="text" 
                ref={couponRef} 
                className="form-input" 
                placeholder="e.g. FOODHUB50" 
                disabled={!!appliedCoupon}
                style={{ textTransform: 'uppercase' }}
              />
              {appliedCoupon ? (
                <button type="button" className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'var(--error)' }} onClick={handleRemoveCoupon}>
                  Remove
                </button>
              ) : (
                <button type="button" className="btn btn-outline" onClick={handleApplyCoupon}>
                  Apply
                </button>
              )}
            </div>
            {couponError && <p className="error-text">⚠️ {couponError}</p>}
            {couponSuccess && <p style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: '600' }}>✅ {couponSuccess}</p>}
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              *Try codes: <b>FOODHUB50</b> (50% off up to ₹150) or <b>FREESHIP</b> (free delivery over ₹300).
            </p>
          </div>

          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <div className="summary-row">
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ fontWeight: '600' }}>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span style={{ color: 'var(--text-muted)' }}>Discount</span>
              <span style={{ color: 'var(--success)', fontWeight: '600' }}>- ₹{discount}</span>
            </div>
            <div className="summary-row">
              <span style={{ color: 'var(--text-muted)' }}>Delivery Fee</span>
              <span style={{ fontWeight: '600' }}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
            </div>
          </div>

          <div className="summary-row summary-total">
            <span>Grand Total</span>
            <span style={{ color: 'var(--primary)' }} data-testid="cart-total-price">₹{grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 16. PAGE: ORDERS & LIVE TRACKING PROGRESS
// ==========================================
function Orders() {
  const { orders } = useContext(FoodContext);

  const getStepProgressWidth = (status) => {
    if (status === 'Placed') return '0%';
    if (status === 'Preparing') return '33%';
    if (status === 'Out for Delivery') return '66%';
    if (status === 'Delivered') return '100%';
    return '0%';
  };

  return (
    <div className="container" style={{ minHeight: '80vh', padding: '2rem 1.5rem' }}>
      <div className="section-header" style={{ marginTop: '1rem' }}>
        <h2>My Food Orders</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Track the progress of your cooking and delivery live.</p>
      </div>

      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header-info">
                <div>
                  <span className="order-id-label">Order ID: #{order.id}</span>
                  <p className="order-date-val">Placed on {order.date} at {order.time}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)' }}>₹{order.total}</span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payment: COD</p>
                </div>
              </div>

              {/* Items Summary */}
              <div className="order-items-summary">
                <p style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Items Ordered:</p>
                {order.items.map((item, idx) => (
                  <p key={idx} className="order-item-spec">
                    • {item.name} <span style={{ color: 'var(--text-muted)' }}>x {item.quantity}</span> (₹{item.price * item.quantity})
                  </p>
                ))}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', backgroundColor: 'var(--background)', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                <b>Delivery Destination:</b> {order.address}
              </div>

              {/* Visual Live Tracker Progress Stepper */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--secondary)' }}>Live Delivery Progress Tracker:</p>
                
                <div className="tracking-stepper">
                  <div 
                    className="tracking-stepper-progress" 
                    style={{ width: getStepProgressWidth(order.status) }}
                  ></div>
                  
                  {/* Step 1: Placed */}
                  <div className={`tracking-step ${order.status === 'Placed' ? 'active' : 'completed'}`}>
                    <span className="step-icon-circle">✓</span>
                    <span className="step-label">Placed</span>
                  </div>

                  {/* Step 2: Preparing */}
                  <div className={`tracking-step ${
                    order.status === 'Preparing' ? 'active' : 
                    ['Out for Delivery', 'Delivered'].includes(order.status) ? 'completed' : ''
                  }`}>
                    <span className="step-icon-circle">👩‍🍳</span>
                    <span className="step-label">Preparing</span>
                  </div>

                  {/* Step 3: Out for Delivery */}
                  <div className={`tracking-step ${
                    order.status === 'Out for Delivery' ? 'active' : 
                    order.status === 'Delivered' ? 'completed' : ''
                  }`}>
                    <span className="step-icon-circle">🛵</span>
                    <span className="step-label">Out for Delivery</span>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className={`tracking-step ${order.status === 'Delivered' ? 'active completed' : ''}`}>
                    <span className="step-icon-circle">🎁</span>
                    <span className="step-label">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <ShoppingBag size={50} style={{ color: 'var(--border)', marginBottom: '1.5rem' }} />
          <h3>No Orders Placed Yet</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Your past orders and active delivery logs will show up here.</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 17. PAGE: USER PROFILE (CONTROLLED FORMS)
// ==========================================
function Profile() {
  const { user, favorites, restaurants } = useContext(FoodContext);

  // Controlled Form States for Profile Details
  const [profileName, setProfileName] = useState(user?.username || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '9876543210');
  const [editSuccess, setEditSuccess] = useState('');
  const [editError, setEditError] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!profileName.trim() || !profileEmail.trim() || !profilePhone.trim()) {
      setEditError('All profile fields are required!');
      setEditSuccess('');
      return;
    }

    if (!profileEmail.includes('@')) {
      setEditError('Please enter a valid email address.');
      setEditSuccess('');
      return;
    }

    if (profilePhone.length !== 10) {
      setEditError('Phone number must be exactly 10 digits.');
      setEditSuccess('');
      return;
    }

    setEditError('');
    setEditSuccess('Profile details updated successfully! (Local state synced)');
    setTimeout(() => setEditSuccess(''), 3000);
  };

  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r.id));

  return (
    <div className="container" style={{ minHeight: '80vh', padding: '2rem 1.5rem' }}>
      <div className="section-header" style={{ marginTop: '1rem' }}>
        <h2>My FoodHub Profile</h2>
      </div>

      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="avatar-large">
            {profileName ? profileName.charAt(0).toUpperCase() : 'U'}
          </div>
          <h3>{profileName}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{profileEmail}</p>
          <span className="badge badge-primary">{user?.isAdmin ? "Admin Account" : "Premium Customer"}</span>
        </div>

        {/* Content Tabs */}
        <div className="profile-content">
          <h3 className="profile-section-title">Edit Personal Details</h3>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={profileName} 
                onChange={(e) => setProfileName(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={profileEmail} 
                onChange={(e) => setProfileEmail(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="text" 
                className="form-input" 
                value={profilePhone} 
                onChange={(e) => setProfilePhone(e.target.value)} 
              />
            </div>

            {editError && <p className="error-text">⚠️ {editError}</p>}
            {editSuccess && <p style={{ color: 'var(--success)', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem' }}>✅ {editSuccess}</p>}

            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>

          {/* Wishlist section */}
          <h3 className="profile-section-title" style={{ marginTop: '3rem' }}>My Favorites Wishlist</h3>
          {favoriteRestaurants.length > 0 ? (
            <div className="restaurant-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1rem' }}>
              {favoriteRestaurants.map(res => (
                <RestaurantCard key={res.id} restaurant={res} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No favorite restaurants pinned. Browse restaurants and click the heart icon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 18. PAGE: AUTH - LOGIN (CONTROLLED VALIDATION)
// ==========================================
function Login() {
  const { login, user } = useContext(FoodContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Email check
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Please enter a valid email containing "@"');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password check
    if (password.length < 6) {
      setPasswordError('Password must contain at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const res = login(email.trim(), password);
      if (res.success) {
        navigate('/');
      } else {
        setLoginError('Invalid login email or password.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Welcome to FoodHub</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          Log in to browse, buy delicious food, and get deals.
        </p>

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. user@foodhub.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-text">⚠️ {emailError}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-text">⚠️ {passwordError}</p>}
          </div>

          {loginError && <p className="error-text" style={{ marginBottom: '1rem' }}>⚠️ {loginError}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Log In
          </button>
        </form>

        <div style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.75rem', marginTop: '1.5rem', fontSize: '0.8rem', color: '#475569' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--secondary)' }}>
            <Info size={14} /> <span>Quick Testing Credentials:</span>
          </div>
          • User Login: <b>user@foodhub.com</b> / <b>user123</b><br/>
          • Admin Login: <b>admin@foodhub.com</b> / <b>admin123</b>
        </div>

        <p className="auth-redirect">
          Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 19. PAGE: AUTH - REGISTER (CONTROLLED VALIDATION)
// ==========================================
function Register() {
  const { register, user } = useContext(FoodContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (!email.trim() || !email.includes('@')) {
      setEmailError('Email must contain "@"');
      valid = false;
    } else {
      setEmailError('');
    }

    if (phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      register(name.trim(), email.trim(), phone, password);
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Create an Account</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          Join FoodHub to enjoy swift food delivery services.
        </p>

        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Jane Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="error-text">⚠️ {nameError}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. jane@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-text">⚠️ {emailError}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="10-digit number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && <p className="error-text">⚠️ {phoneError}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-text">⚠️ {passwordError}</p>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Register Now
          </button>
        </form>

        <p className="auth-redirect">
          Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 20. PAGE: ADMIN DASHBOARD (ANALYTICS & CRUD)
// ==========================================
function AdminDashboard() {
  const { 
    restaurants, addRestaurant, deleteRestaurant,
    menuItems, addMenuItem, deleteMenuItem,
    orders, updateOrderStatus
  } = useContext(FoodContext);

  // Colocated tab states inside Admin Dashboard
  const [activeAdminTab, setActiveAdminTab] = useState('analytics'); // analytics, restaurants, menu, orders

  // Form States for adding new restaurant
  const [newResName, setNewResName] = useState('');
  const [newResCuisine, setNewResCuisine] = useState('');
  const [newResTime, setNewResTime] = useState(20);
  const [newResCost, setNewResCost] = useState(300);
  const [newResCategory, setNewResCategory] = useState('pizza');
  const [newResImg, setNewResImg] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80');

  // Form States for adding new menu item
  const [newItemResId, setNewItemResId] = useState(restaurants[0]?.id || 1);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(199);
  const [newItemCategory, setNewItemCategory] = useState('Veg');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImg, setNewItemImg] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80');

  // Derived Analytics stats
  const analyticsStats = useMemo(() => {
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const totalDiscounts = orders.reduce((sum, o) => sum + o.discount, 0);
    const activeCustomers = new Set(orders.map(o => o.address)).size;
    return { totalOrders, totalSales, totalDiscounts, activeCustomers };
  }, [orders]);

  const handleAddRestaurantSubmit = (e) => {
    e.preventDefault();
    if (!newResName.trim() || !newResCuisine.trim()) return;
    addRestaurant({
      name: newResName.trim(),
      cuisine: newResCuisine.trim(),
      deliveryTime: parseInt(newResTime),
      costForTwo: parseInt(newResCost),
      category: newResCategory,
      image: newResImg
    });
    setNewResName('');
    setNewResCuisine('');
  };

  const handleAddMenuItemSubmit = (e) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemDesc.trim()) return;
    addMenuItem({
      restaurantId: parseInt(newItemResId),
      name: newItemName.trim(),
      price: parseInt(newItemPrice),
      category: newItemCategory,
      description: newItemDesc.trim(),
      image: newItemImg
    });
    setNewItemName('');
    setNewItemDesc('');
  };

  return (
    <div className="container" style={{ minHeight: '85vh', padding: '2rem 1.5rem' }}>
      <div className="section-header" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Admin Operations Console</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage restaurants, items catalog, analyze sales, and dispatch orders.</p>
        </div>
        <span className="badge badge-success" style={{ padding: '0.4rem 1rem' }}>
          🛡️ Admin Root Mode
        </span>
      </div>

      {/* Admin Tab Menu */}
      <div className="tabs-nav" style={{ marginBottom: '2.5rem' }}>
        <button className={activeAdminTab === 'analytics' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveAdminTab('analytics')}>Analytics Panel</button>
        <button className={activeAdminTab === 'restaurants' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveAdminTab('restaurants')}>Restaurants</button>
        <button className={activeAdminTab === 'menu' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveAdminTab('menu')}>Menu Catalog</button>
        <button className={activeAdminTab === 'orders' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveAdminTab('orders')}>Orders Dispatcher</button>
      </div>

      {/* RENDER ACTIVE ADMIN TAB */}
      
      {activeAdminTab === 'analytics' && (
        <div>
          <div className="admin-grid">
            <div className="stat-card">
              <div className="stat-icon"><TrendingUp size={24} /></div>
              <div>
                <span className="stat-label">Total Revenue</span>
                <p className="stat-val">₹{analyticsStats.totalSales}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#E0F2FE', color: '#0284C7' }}><ShoppingBag size={24} /></div>
              <div>
                <span className="stat-label">Orders Handled</span>
                <p className="stat-val">{analyticsStats.totalOrders}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}><Award size={24} /></div>
              <div>
                <span className="stat-label">Discounts Saved</span>
                <p className="stat-val">₹{analyticsStats.totalDiscounts}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}><User size={24} /></div>
              <div>
                <span className="stat-label">Delivery Zones</span>
                <p className="stat-val">{analyticsStats.activeCustomers}</p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '2rem', marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Active Live Monitoring Console</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Welcome back, administrator. Use the other tabs above to create restaurants, add menus, or update user orders to watch their live delivery progress stepper update in real-time.
            </p>
            <div style={{ border: '2px dashed var(--primary)', borderRadius: 'var(--radius)', padding: '2rem', textAlign: 'center', backgroundColor: '#FFFDFB' }}>
              <h4 style={{ color: 'var(--primary)' }}>⚡ Live Connection Verified</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Synchronized with browser LocalStorage</p>
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'restaurants' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem' }}>
          {/* Restaurant Table list */}
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Restaurant Details</th>
                  <th>Cuisine</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map(res => (
                  <tr key={res.id}>
                    <td>
                      <img src={res.image} alt={res.name} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    </td>
                    <td>
                      <span style={{ fontWeight: '700' }}>{res.name}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {res.id} • Rating: ⭐ {res.rating}</div>
                    </td>
                    <td>{res.cuisine}</td>
                    <td><span className="badge badge-primary">{res.category}</span></td>
                    <td>
                      <button className="btn btn-ghost" style={{ color: 'var(--error)', padding: '0.25rem' }} onClick={() => deleteRestaurant(res.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Restaurant Form */}
          <div className="form-card" style={{ alignSelf: 'start' }}>
            <h3 className="form-title">Create New Restaurant</h3>
            <form onSubmit={handleAddRestaurantSubmit}>
              <div className="form-group">
                <label className="form-label">Restaurant Name</label>
                <input type="text" className="form-input" placeholder="e.g. Taco Bell" value={newResName} onChange={(e) => setNewResName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Cuisine List</label>
                <input type="text" className="form-input" placeholder="e.g. Mexican, Fast Food" value={newResCuisine} onChange={(e) => setNewResCuisine(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Delivery Time (mins)</label>
                <input type="number" className="form-input" value={newResTime} onChange={(e) => setNewResTime(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Cost For Two (₹)</label>
                <input type="number" className="form-input" value={newResCost} onChange={(e) => setNewResCost(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={newResCategory} onChange={(e) => setNewResCategory(e.target.value)}>
                  <option value="pizza">Pizza</option>
                  <option value="burger">Burger</option>
                  <option value="sushi">Sushi</option>
                  <option value="salad">Salad</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input type="text" className="form-input" value={newResImg} onChange={(e) => setNewResImg(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Add Restaurant
              </button>
            </form>
          </div>
        </div>
      )}

      {activeAdminTab === 'menu' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem' }}>
          {/* Menu Catalog Table list */}
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Restaurant</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map(item => {
                  const res = restaurants.find(r => r.id === item.restaurantId);
                  return (
                    <tr key={item.id}>
                      <td>
                        <span style={{ fontWeight: '700' }}>{item.name}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {item.id}</div>
                      </td>
                      <td style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{item.price}</td>
                      <td>
                        <span 
                          className="badge" 
                          style={{ 
                            backgroundColor: item.category === 'Veg' ? '#E1F5FE' : item.category === 'Dessert' ? '#F3E5F5' : '#FFEBEE',
                            color: item.category === 'Veg' ? '#0288D1' : item.category === 'Dessert' ? '#7B1FA2' : '#D32F2F',
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.5rem'
                          }}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td>{res ? res.name : `Restaurant ID: ${item.restaurantId}`}</td>
                      <td>
                        <button className="btn btn-ghost" style={{ color: 'var(--error)', padding: '0.25rem' }} onClick={() => deleteMenuItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add Menu Item Form */}
          <div className="form-card" style={{ alignSelf: 'start' }}>
            <h3 className="form-title">Create Catalog Food Item</h3>
            <form onSubmit={handleAddMenuItemSubmit}>
              <div className="form-group">
                <label className="form-label">Target Restaurant</label>
                <select className="form-select" value={newItemResId} onChange={(e) => setNewItemResId(e.target.value)}>
                  {restaurants.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Food Item Name</label>
                <input type="text" className="form-input" placeholder="e.g. French Onion Soup" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input type="number" className="form-input" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)}>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Food Description</label>
                <textarea className="form-textarea" placeholder="Describe taste profile..." value={newItemDesc} onChange={(e) => setNewItemDesc(e.target.value)} required></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input type="text" className="form-input" value={newItemImg} onChange={(e) => setNewItemImg(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Add Catalog Item
              </button>
            </form>
          </div>
        </div>
      )}

      {activeAdminTab === 'orders' && (
        <div className="admin-table-container">
          {orders.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Address</th>
                  <th>Bill Total</th>
                  <th>Live Status</th>
                  <th>Change Status Dispatch</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <span style={{ fontWeight: '700' }}>#{order.id}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.date} • {order.time}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{order.address}</span>
                    </td>
                    <td style={{ fontWeight: '700', color: 'var(--primary)' }}>₹{order.total}</td>
                    <td>
                      <span 
                        className="badge" 
                        style={{ 
                          backgroundColor: 
                            order.status === 'Placed' ? '#FEF3C7' : 
                            order.status === 'Preparing' ? '#E0F2FE' : 
                            order.status === 'Out for Delivery' ? '#FFF2EC' : '#D1FAE5',
                          color: 
                            order.status === 'Placed' ? '#B45309' : 
                            order.status === 'Preparing' ? '#0369A1' : 
                            order.status === 'Out for Delivery' ? 'var(--primary)' : 'var(--success)'
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <select 
                          className="form-select" 
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', width: '140px' }}
                          value={order.status} 
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>No customer orders placed yet to dispatch.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 21. APP WRAPPER & SPA ROUTER CONFIG
// ==========================================
export default function App() {
  return (
    <ErrorBoundary>
      <FoodProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                {/* Public General Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/restaurants" element={<RestaurantListing />} />
                <Route path="/food/:foodId" element={<FoodDetail />} />
                
                {/* Dynamic & Nested Restaurant Routes */}
                <Route path="/restaurants/:id" element={<RestaurantDetails />}>
                  <Route index element={<Navigate to="menu" replace />} />
                  <Route path="menu" element={<RestaurantMenu />} />
                  <Route path="reviews" element={<RestaurantReviews />} />
                  <Route path="offers" element={<RestaurantOffers />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Customer Protected Routes */}
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Admin Operations Protected Route */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />

                {/* Catch-all Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </FoodProvider>
    </ErrorBoundary>
  );
}
