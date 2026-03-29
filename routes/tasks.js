const express=require('express');


const pool=require('../config/db');
const authenticateToken=require('../middleware/auth');  


const router=express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;
    try {
        const newTask = await pool.query(
            `INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`,[title, description, userId]
        );
        res.status(201).json(newTask.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/',authenticateToken,async (req,res)=>{
    try {
        if (req.user.role==='admin'){
            const allTasks=await pool.query('SELECT * FROM tasks');
            return res.status(200).json(allTasks.rows) 
        }
        const tasks=await pool.query(
            'SELECT * FROM tasks WHERE user_id=$1 ORDER BY id DESC',
            [req.user.userId]
        );
        return res.status(200).json(tasks.rows)
    }
    catch (err){
        console.log(err)
        res.status(500).json({error:'Internal server error'});
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const task = await pool.query(
      'SELECT * FROM tasks WHERE id=$1',
      [id]
    );

    if (task.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

   
    if (!title || !description) {
      return res.status(400).json({
        error: 'Title and Description are required'
      });
    }

    
    if (
      req.user.role !== 'admin' &&
      req.user.userId !== task.rows[0].user_id
    ) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    
    await pool.query(
      'UPDATE tasks SET title=$1, description=$2 WHERE id=$3',
      [title, description, id]
    );

    return res.status(200).json({
      message: 'Updated Successfully'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});


router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await pool.query(
      'SELECT * FROM tasks WHERE id=$1',
      [id]
    );

    if (task.rows.length === 0) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    if (
      req.user.role !== 'admin' &&
      req.user.userId !== task.rows[0].user_id
    ) {
      return res.status(403).json({
        error: 'Access denied'
      });
    }

    await pool.query(
      'DELETE FROM tasks WHERE id=$1',
      [id]
    );

    return res.status(200).json({
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;
