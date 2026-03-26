const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const taskRouter=require('./routes/tasks');

const app = express();

const pool = require('./config/db');

app.use(express.json());
app.use(cors({
    origin: 'task-manager-frontend-theta-seven.vercel.app'
}));

app.use('/api/v1/tasks', taskRouter);

app.post('/api/v1/register', async (req, res) => {
    const { username, email, password } = req.body;

    const isuserExists=await pool.query(`SELECT * FROM users WHERE email = $1`, [email]); 

    if (isuserExists.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hasedPassword=await bcrypt.hash(password,10)
    const newUserQuery =await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [username, email, hasedPassword]);

    res.status(201).json('User created successfully');
});


app.post('/api/v1/login', async (req,res)=>{
    try{
    const {email,password}=req.body;
    const user=await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if(user.rows.length===0){
        return res.status(400).json({error:'Email does not exist'});
    }

      
    
        const validPassword=await bcrypt.compare(password,user.rows[0].password);
        if(!validPassword){
            return res.status(400).json({error:'Invalid email or password'});
        }

        const token=jwt.sign({userId:user.rows[0].id, role:user.rows[0].role},process.env.JWT_SECRET,{expiresIn:'12h'});
        res.status(200).json({message:'Login successful', token});
    
}
catch (error){
    res.status(500).json({error:'Internal server error'});
}
});



module.exports = app;
