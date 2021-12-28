const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url:"https://avatars.githubusercontent.com/u/82738106?s=400&u=068a0139c72a1bb67389804a6d48cdcf2eb2c3ec&v=4",
        name: "Moabe Luis",
        role: "Aluno - Rocketseat",
        description: 'Programador junior e aluno da <a href="https://www.rocketseat.com.br/" target="_blank">Rocketseat</a>',
        links: [

            {name:"Github", url: "https://github.com/"},
            {name:"Twitter", url: "https://twitter.com/"},
            {name:"Linkedin", url: "https://br.linkedin.com/"}

        ]
    }

    return res.render("about", { about })
})

server.get("/Aulas.njk", function(req, res) {

    return res.render("Aulas", {items: videos})
})

server.get("/Video.njk", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })

})

server.listen(5000, function(){
    console.log("server is running")
})