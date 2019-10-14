//========================================== SETUP SERVER ============================================================\\
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const app = express()
const port = 1994

app.use(bodyParser.json())
app.use(cors())

//========================================= SETUP DATABASE ============================================================\\

const db = mysql.createConnection({
    host  : 'localhost',
    user : 'pradit',
    password : 'password',
    database : 'moviepurwadhika'
})

//======================================= RUNNING SERVER ==============================================================\\

app.listen(port, ()=> console.log(`Api Aktif di Port ${port}`))


//========================================== HOMEPAGE ====================================================================\\

app.get('/', (req,res) => {
    res.status(200).send('<h1> Welcome </h1>')
})
//===================================== MANAGE MOVIE ==============================================================\\

app.get('/movies/:id', (req,res) => {

    var sql = `SELECT * FROM movie WHERE id = ${db.escape(req.params.id)}`

    db.query(sql, (err, result) => {
        if(err) return res.status(500).send({ message : 'Database eror', err})

        res.status(200).send(result)
    })

})

app.get('/movies', (req,res) => {

    var nama = req.query.nama || ''
    var tahun = req.query.tahun || ''
    var description = req.query.description || ''

    var sql = `SELECT * FROM movie where nama LIKE '%${nama}%' and tahun LIKE '%${tahun}%' and description LIKE '%${description}'`

    db.query(sql, (err, result) => {
        if(err) return res.status(500).send({ message : 'Database Eror', err})

        res.status(200).send(result)
    })
})

app.delete('/movies/:id', (req,res) => {

    var sql = `DELETE FROM movie WHERE id = ${db.escape(req.params.id)}`

    db.query(sql, (err, result)=>{
        if(err) return res.status(500).send({message : 'Delete movie failed' , err})

        res.status(200).send({message : 'Delete movie success', result})
    })
})

app.post('/movies', (req,res) => {

    var sql = `INSERT INTO movie SET ? `
    var data = req.body

    
    db.query(sql, data, (err, result)=>{
        if(err) return res.status(500).send({message : 'Add movie failed' , err})

        res.status(200).send({message : 'Add movie success', result})
    })
})

app.put('/movies/:id', (req,res) => {

    var sql = `UPDATE movie SET ? WHERE id = ${db.escape(req.params.id)}`
    var data = req.body

    db.query(sql, data, (err, result)=>{
        if(err) return res.status(500).send({message : 'Edit movie failed' , err})

        res.status(200).send({message : 'Edit movie success', result})
    })
})

//================================================== MANAGE CATEGORIES =============================================================\\


app.get('/category/:id', (req,res) => {

    var sql = `SELECT * FROM categories WHERE id = ${db.escape(req.params.id)}`

    db.query(sql, (err, result) => {
        if(err) return res.status(500).send({ message : 'Database eror', err})

        res.status(200).send(result)
    })

})

app.get('/category', (req,res) => {

    var nama = req.query.nama || ''

    var sql = `SELECT * FROM categories where nama LIKE '%${nama}%'`

    db.query(sql, (err, result) => {
        if(err) return res.status(500).send({ message : 'Database Eror', err})

        res.status(200).send(result)
    })
})

app.delete('/category/:id', (req,res) => {

    var sql = `DELETE FROM categories WHERE id = ${db.escape(req.params.id)}`

    db.query(sql, (err, result)=>{
        if(err) return res.status(500).send({message : 'Delete Category failed' , err})

        res.status(200).send({message : 'Delete Category success', result})
    })
})

app.post('/category', (req,res) => {

    var sql = `INSERT INTO categories SET ? `
    var data = req.body

    
    db.query(sql, data, (err, result)=>{
        if(err) return res.status(500).send({message : 'Add Category failed' , err})

        res.status(200).send({message : 'Add Category success', result})
    })
})

app.put('/category/:id', (req,res) => {

    var sql = `UPDATE categories SET ? WHERE id = ${db.escape(req.params.id)}`
    var data = req.body

    db.query(sql, data, (err, result)=>{
        if(err) return res.status(500).send({message : 'Edit Category failed' , err})

        res.status(200).send({message : 'Edit Category success', result})
    })
})

//======================================= Connect Movies & Categories ========================================================\\

app.get('/conmovcat/:id', (req,res) => {

    var sql = `SELECT  m.nama as nama_movie, c.nama as nama_category
                 from movie m 
                    join con_mov_cat cm
                         on m.id = cm.idmovie
                    join categories c
                         on c.id = cm.idcategory 
                            WHERE cm.id = ${db.escape(req.params.id)}`

    db.query(sql, (err, result) => {
        if(err) return res.status(500).send({ message : 'Database eror', err})

        res.status(200).send(result)
    })

})

app.get('/conmovcat', (req,res) => {

    var movie = req.query.movie || ''
    var category = req.query.category || ''

    var sql = `SELECT  m.nama as nama_movie, c.nama as nama_category
                         from movie m 
                             join con_mov_cat cm
                                  on m.id = cm.idmovie
                             join categories c
                                  on c.id = cm.idcategory WHERE cm.idmovie LIKE '%${movie}%' and cm.idcategory LIKE '%${category}'`

    db.query(sql, (err, result) => {
        if(err) return res.status(500).send({ message : 'Database Eror', err})

        res.status(200).send(result)
    })
})

app.delete('/conmovcat/:id', (req,res) => {

    var sql = `DELETE FROM con_mov_cat WHERE id = ${db.escape(req.params.id)}`

    db.query(sql, (err, result)=>{
        if(err) return res.status(500).send({message : 'Delete Connection List failed' , err})

        res.status(200).send({message : 'Delete Connection List success', result})
    })
})

app.post('/conmovcat', (req,res) => {

    var sql = `INSERT INTO con_mov_cat SET ? `
    var data = req.body

    
    db.query(sql, data, (err, result)=>{
        if(err) return res.status(500).send({message : 'Add Connection List failed' , err})

        res.status(200).send({message : 'Add Connection List success', result})
    })
})
