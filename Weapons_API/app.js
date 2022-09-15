import express from "express"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const weapons = [
    { id: 0, name: "AK-47", price: 3500 },
    { id: 1, name: "COLT", price: 3000 }
]



//app.use(express.json())

// Get
// Root
app.get("/",(req, res) => {
    res.send({
        message: "Welcome to my REST API for Weapons"
    })
})

// Path variable
app.get("/api/weapons/:id", (req, res) => {
    const id = Number(req.params.id)
    const findById = weapons[id]
    findById ? res.send(weapons[id]) : res.status(404).send({errorMessage: `No weapon with given id ${id} exists`})


})
// Query String --> req.query
app.get("/api/weapons", (req, res) => {
    res.send({
        data: weapons
    })
})

// Post
app.post("/api/weapons", (req, res) => {
    const weapon = req.body

    console.log(weapon)
    weapons.push(weapon)
    res.send(`Created new weapon: ${weapon.name}`)
})

// Update the entire resource (ID should be left untouched as this should be incremental from the database).
// For testing purpose we leave it in

app.put("/api/weapons/:id",(req,res) => {
    const id = Number(req.params.id)
    const weaponToPatch = weapons.find((weapon) => weapon.id === id)
    const {name, price} = req.body

    
    weaponToPatch.name = name ? name : weapons[id].name
    weaponToPatch.price = price ? price : weapons[id].price

    res.send(`Weapon with id ${id} has been updated`)
})


// Patch a single or
app.patch("/api/weapons/:id", (req,res) => {
    const id = Number(req.params.id)
    const {name, price} = req.body

    const weaponToPatch = weapons.find((weapon) => weapon.id === id)

    weaponToPatch.name = name ? name : weapons[id].name
    weaponToPatch.price = price ? price : weapons[id].price


    res.send(`Weapon with id ${id} has been patched`)
})

// Delete
app.delete("/api/weapons/:id", (req, res) => {
    const id = Number(req.params.id)
    const findById = weapons[id]
    console.log(id)
    findById ? res.send(`Deleted weapon ${weapons[id].name}...`) : res.status(404).send({errorMessage: `No weapon with id: ${id}`})
    weapons.splice(id,1)


})

app.listen(8080, () => {
    console.log("Running on port",8080)
})


