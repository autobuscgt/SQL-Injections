const express = require('express')
const port = process.env.PORT || 7000
const sequelize = require('./db')
const models = require('./models')
const {User,Employers} = require('./models')


const app = express()
app.use(express.json())

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
      const user = await sequelize.query(`SELECT * FROM users WHERE id = ${id}`);
      res.json(user[0]);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
  app.get('/employees/:id', async (req, res) => {
    const id = req.params.id
    try {
      const employee = await sequelize.query(`SELECT * FROM employees WHERE id = ${id}`);
      res.json(employee[0]);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
/* Исправленный код с экранированием
app.get('/users/:id', async (req, res) => {
    const id = req.params.id; 
    try {
      const user = await sequelize.query('SELECT * FROM users WHERE id = :id', {
        replacements: { id: id }, // Используем параметризованные запросы
        type: sequelize.QueryTypes.SELECT
      });
      res.json(user);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
  app.get('/employees/:id', async (req, res) => {
    const id = req.params.id; 
    try {
      const employee = await sequelize.query('SELECT * FROM employees WHERE id = :id', {
        replacements: { id: id }, 
        type: sequelize.QueryTypes.SELECT
      });
      res.json(employee);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  */


app.get('/user', async(req,res)=>{
    const user = await User.findAll()
    res.send(user)
})
app.post('/user', async(req,res)=>{
    const {name,family_name,password} = req.body
    const user = await User.create({name,family_name,password})
    res.status(201).json(user)
})
app.get('/employee', async(req,res)=>{
    const employee = await Employers.findAll()
    res.send(employee)
})
app.post('/employee', async(req,res)=>{
    const {name,family_name,password} = req.body
    const employee = await Employers.create({name,family_name,password})
    res.status(201).json(employee)
})
app.delete('/user/:id', async(req,res)=>{
    const {id} = req.params
    await User.destroy({where:{
        id
    }})
    res.send(201).json(`User was destroyed`)
})
app.delete('/employee/:id', async(req,res)=>{
    const {id} = req.params
    await Employers.destroy({where:{
        id
    }})
    res.send(201).json(`Employers was destroyed`)
})

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()