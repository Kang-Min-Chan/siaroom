const express = require('express');
const cors = require('cors');
<<<<<<< HEAD

const productRoutes = require('./routes/productRoutes');
=======
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require("./routes/orderRoutes");

>>>>>>> 4124635 (3월20일 1차)

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SIAROOM API');
});

app.use('/api/products', productRoutes);
<<<<<<< HEAD
=======
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/orders", orderRoutes);
>>>>>>> 4124635 (3월20일 1차)

module.exports = app;