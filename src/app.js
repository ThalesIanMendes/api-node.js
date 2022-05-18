
//chamando express
const express = require('express')
//guardando servidor dentro de app
const app = express()
// para liberar para produção
const cors = require('cors')


require('dotenv').config()
const PORT = process.env.PORT

const Post = require('./models/Posts')

//formatando servidor no formato json
app.use(express.json())

app.use(cors())

//criando rota get
app.get('/hello_world',(req, res)=>{
    res.send('Testando...')
})

//criando rota post
app.post('/create',(req,res)=>{
    const title = req.body.title
    res.send(`Título: ${title}`)
})

app.post('/create_post', async (req,res)=>{
    
    try{

    const {title, content} = req.body

    const post = await Post.create({  title, content })

    res.send(post)
    }catch(err){
        res.status(400).send(err)
    }
})

app.get('/list_post', async (req,res)=>{
    try{
        const posts = await Post.find()
        res.send({posts})

    }catch(err){
        res.status(400).send(err)
    }
})


app.get('/show_post/:post_id',async(req,res)=>{
    try{
        const postId = req.params.post_id
        const post = await Post.find({_id:postId})

        res.send(post)
    }catch(err){
        res.status(400).send(err)
    }
})


app.patch('/update_post/:post_id', async (req,res)=>{
    try{
        const postId = req.params.post_id

        const {title,content} = req.body

        const post = await Post.findByIdAndUpdate(postId,{title,content},{new: true}) 

        res.send({postId, title, content})

    }catch(err){
        res.status(400).send(err)
    }
})


app.delete('/delete_post/:post_id', async (req,res)=>{
    try{

        const postId = req.params.post_id
        await Post.findByIdAndDelete(postId)
        res.send({msg: 'Deletado com sucesso'})

    }catch(err){
        res.status(400).send(err)
    }
})

// definindo porta e msg em uma arrow function
app.listen(PORT, ()=>{
    console.log('Server running on port : '+ PORT)
})