const express = require("express")
const app = express()
const port = 4000
const mongoose = require("mongoose")

app.use(express.json())

app.listen(port, () => {
    console.log("Server is running on port 4000")
})

app.get('/', (req, res) => {
    res.send("Welcome to the app ")
})

mongoose.connect('mongodb://0.0.0.0:27017/CrudCol')   // CrudCol is database name
    .then(() => {
        console.log("Mongodb is connected")
    })
    .catch((error) => {
        console.log(error)
    })

const bodySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const monmodel = mongoose.model("productCol", bodySchema)  // productCol is collection(tabel) name and monmodel is mongoose modelname

app.post('/post', async (req, res) => {
    console.log("Inside Post Function")

    const data = new monmodel({
        name: req.body.name,
        quantity: req.body.quantity
    });

    const val = await data.save();
    res.send(val);
    //  res.send("Posted in mongodb");
})

// Fetch Data


app.get('/fetch/:name', async (req, res) => {
    try {
        const fetchname = req.params.name;
        const info = await monmodel.find({ name: fetchname });
        // res.send(info)
        if (info.length === 0) {
            res.send("Data does not exit")
        }
        else {

            res.send(info)
        }
    }
    catch {
        res.send("Erorrrrr")
    }
})

//   Fetch All Data

app.get('/fetchall', async (req, res) => {
    try {
        const detail = await monmodel.find();
        res.send(detail)

    }
    catch {
        res.send("Errorrrr")

    }
})

// Update an existing data
app.put('/update/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const updateddata = {
            name: req.body.name,
            quantity: req.body.quantity
        }

        const result = await monmodel.findOneAndUpdate({ name: name }, updateddata, { new: true })

        if (!result) {
            res.send("Data does not exist")
        }
        else {
            res.send(result)
        }
    }
    catch {
        res.send("Errorrrr")
    }
})

// To delete Data

app.delete('/delete/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const updateddata = {
            name: req.body.name,
            quantity: req.body.quantity
        }

        const result = await monmodel.findOneAndDelete({ name: name }, updateddata, { new: true })

        if (!result) {
            res.send("Data does not exist")
        }
        else {
            res.send(result)
        }
    }
    catch {
        res.send("Errorrrr")
    }
})





