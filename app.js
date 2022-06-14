// require packages used in the project
const express = require('express')
const app = express()
const port = 5000

// setting template engine
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')//相對路徑會去路徑找文件
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    res.render('index',{restaurants : restaurantList.results})
})

app.get(`/restaurants/:id`, (req, res) => {  
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.id)
  res.render('show',{restaurant})
})

app.get(`/search`, (req, res) => {  
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(item => {
    return (item.name.includes(keyword)||item.name_en.includes(keyword))
  })
  res.render('index',{restaurants})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})