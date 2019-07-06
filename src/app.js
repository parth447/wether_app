const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
const port = process.env.port || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wether',
        name: 'Parth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Parth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Parth'
    })
})

app.get('/wether', (req, res) => {
    if (!req.query.address) {
        return res.send({error:'You must provide an address'})
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
        if (error) {
            return res.send({error:error})
        }

        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error:error})
            }
            res.send({
                forecast: forecastdata,
                location,
                providedaddress: req.query.address        
            })
        })
    })
})

app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Parth',
        errorMessage: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is up on part'+port )
}) 