const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AuthService = require('../auth/auth-service');
const pool = require('./db');
const jwtGenerator = require('../utils/jwtGenerator');
const authRouter = require('../middleware/auth-router');
const AuthService = require('../middleware/auth-service');

//authorizeentication

router.post("/register", validInfo, async (req, res) => {
    const { userName, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE userName = $1", [
        userName
      ]);
  
      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      let newUser = await pool.query(
        "INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING *",
        [userName, email, bcryptPassword]
      );
  
      const jwtToken = jwtGenerator(newUser.rows[0].user_id);
  
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  router.post("/login", validInfo, async (req, res) => {
    const { userName, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE userName = $1", [
        userName
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  module.exports = router;


