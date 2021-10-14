const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')


app.use('/', express.static(path.join(__dirname, 'web/build')))



app.get('/api/v1/profile', (req, res) => {
    res.send('here is your profile')
})
app.post('/api/v1/profile', (req, res) => {
    res.send('profile created')
})
app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})