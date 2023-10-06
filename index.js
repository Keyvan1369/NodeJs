import express from 'express';
import ordersRouter from './Routers/orders.js';
import 'dotenv/config'; 
import pg from 'pg';

    

  process.env.DB_PASSWORD
  
  const app = express();
  const { Pool } = pg;
  
  app.use(express.json());
  app.use('/api/orders', ordersRouter);
  
  const pool = new Pool();
 
  app.get('/api/users', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Define a route.... get one user by ID
  app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
      if (rows.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
 
  
  const port = process.env.PORT || 8080;
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  