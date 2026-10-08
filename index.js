const express = require("express");
const path = require("path");
const mysql = require("mysql2");
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT
});

db.connect((error) => {
  if (error) {
    console.error("Database connection failed:", error.message);
    return;
  }

  console.log("Database connected");
});

app.get("/hello", (req, res) => {
  res.json("Hello World");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const query = "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, password], (error) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }

    res.status(201).json({ message: "Register Success" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT customer_id FROM customers WHERE email = ? AND password = ?";
  const query2 = `
    UPDATE customers
    SET login_status = 1
    WHERE customer_id = ?;
  `
  db.query(query, [email, password],(error, rows) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (rows.length === 0) {
      return res.status(401).json({ message: "Login Failed" });
    }
    
    db.query(query2, [rows[0].customer_id], (error, rows) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      
      res.json({ message: "Login Success" })
      })
  })
  
});

app.delete("/delete", (req, res) => {
  const { customer_id } = req.body;

  const query = "DELETE FROM customers WHERE customer_id = ?";
  
  db.query(query, [customer_id], (error, result) => {
    if (error) return res.status(500).json({ message: error.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Your aaccount deleted" });
  });
});

app.put("/update:customer_id", (req, res) => {
  const {name, email, password} = req.body;
  const {customer_id } = req.params;
  
  if (!name || email === undefined || password === undefined) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const query = `
    UPDATE customers
    SET name = ?, email = ?, password = ?
    WHERE customer_id = ?
  `;

  db.query(
    query, [name, email, password, customer_id],
    (error, result) => {
      if (error) return res.status(500).json({ message: error.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.status(200).json({ message: "Account updated" });
    }
  );
});

app.get("/api/customer-status-login", (req, res) => {
  db.query(
    `SELECT 
      customer_id,
      name,
      email
      FROM customers
      WHERE login_status = 1
    `, (error, rows) => {
    if (error) return res.status(500).json({ message: error.message });
    res.json(rows[0]);
  }
  );
});

app.get("/api/customer-logout:customer_id", (req, res) => {
  const { customer_id } = req.params;
  const query1 = `
    UPDATE customers
    SET login_status = 0
    WHERE customer_id = ?;
    `

  const query2 = `
    SELECT login_status
    FROM customers
    WHERE customer_id = ?`
  
  db.query(query1, [customer_id], (error, rows) => {
    if (error) return res.status(500).json({ message: error.message });

    db.query(query2, [customer_id], (error, rows) => {
      if (error) return res.status(500).json({ message: error.message });
      res.status(200).json(rows[0]);
    })
  }
  );
});

app.post("/api/contact:customer_id", (req, res) => {
  const { email, phone, subject, message } = req.body;
  const { customer_id } = req.params;
  
  if (!email || !phone || !subject || !message) {
    return res.status(400).json({ message: "email, phone, subject, and message are required" });
  }
  
  const query = `
    INSERT INTO contact_messages (email, phone, subject, message, customer_id)
    VALUES (?, ?, ?, ?, ?);
    `
  
  db.query(query, [email, phone, subject, message, customer_id], (error, rows) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }

    res.status(201).json({ message: "Contact Success" });
    })
  }
  );


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

