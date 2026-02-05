# Cravella E-Commerce Platform

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application for a bakery and dessert shop.

## Features

### Backend
- ✅ JWT authentication with HTTP-only cookies
- ✅ Product management with variant support
- ✅ Shopping cart with persistent storage
- ✅ Wishlist functionality
- ✅ Order management
- ✅ RESTful API architecture

### Frontend
- ✅ React 18 with Vite
- ✅ Redux Toolkit for state management
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Product filtering and search
- ✅ Cart drawer with live updates
- ✅ Wishlist with heart toggle
- ✅ Protected routes

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## Installation

### 1. Install MongoDB

**On Ubuntu/Debian:**
```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

# Add MongoDB repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
mongosh --version
```

**On macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**On Windows:**
Download installer from https://www.mongodb.com/try/download/community

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Seed database with sample products
npm run seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## Test Account

After seeding the database, you can use:
- **Email:** test@cravella.com
- **Password:** password123

Or create a new account via the signup page.

## Project Structure

```
cravella-ecommerce/
├── backend/
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── seed/            # Database seed scripts
│   └── server.js        # Express server entry
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── store/       # Redux store & slices
    │   ├── utils/       # Utility functions
    │   ├── App.jsx      # Main App component
    │   └── main.jsx     # Entry point
    └── public/          # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:slug` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured` - Get featured products

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PATCH /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/toggle` - Add/remove item from wishlist

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## Features Implementation

### Dynamic Behaviors
- ✅ Variant selection updates price and image instantly
- ✅ Add to cart opens drawer automatically
- ✅ Cart quantity changes update total in real-time
- ✅ Wishlist heart toggle with instant UI feedback
- ✅ Login required for checkout with redirect back
- ✅ Cart persists after page refresh
- ✅ Product page slug routing
- ✅ Filter and search with query params
- ✅ Loading skeletons for better UX

### UI/UX Features
- ✅ Responsive grid layout (1/2/4 columns)
- ✅ Sidebar filters with checkboxes
- ✅ Price range slider
- ✅ Sort options (price, newest)
- ✅ Empty states for cart/wishlist
- ✅ Toast notifications for user actions
- ✅ Hover effects and transitions
- ✅ Cart badge with item count animation

### Security
- ✅ HTTP-only cookies for JWT
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation

## Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Runs Vite dev server with HMR
```

### Build for Production
```bash
cd frontend
npm run build  # Creates optimized production build
```

## Database Seeding

The seed script includes:
- 30 diverse products across 5 categories
- Each product has 2-5 variants (size/flavor/weight)
- Realistic pricing (₹50 - ₹2000)
- Stock levels for each variant
- Related products for cross-selling
- 1 test user account

To reseed:
```bash
cd backend
npm run seed
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `backend/.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### CORS Errors
- Ensure `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Check credentials are included in axios requests

### Cart Not Persisting
- Verify user is logged in
- Check browser cookies are enabled
- Ensure backend JWT_SECRET is set

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- bcrypt - Password hashing
- cookie-parser - Cookie handling

### Frontend
- React 18 - UI library
- Vite - Build tool
- Redux Toolkit - State management
- React Router - Routing
- Tailwind CSS - Styling
- Axios - HTTP client
- React Toastify - Notifications
- React Icons - Icon library

## Future Enhancements

- [ ] Admin panel for product management
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Order tracking system
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced search with filters
- [ ] Social authentication
- [ ] Mobile app with React Native

## License

MIT

## Support

For issues or questions, please create an issue in the repository or contact support@cravella.com

---

**Built with ❤️ for Cravella Bakery & Desserts**
