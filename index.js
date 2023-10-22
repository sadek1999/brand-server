const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors())
app.use(express.json())

// automotive
// vOn5015Hu4mtEgJJ


const uri = "mongodb+srv://automotive:vOn5015Hu4mtEgJJ@cluster0.xtmekud.mongodb.net/?retryWrites=true&w=majority";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const usersCulloction = client.db("userDB").collection("users");
        const productsColloctions = client.db("productsDB").collection("products")


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCulloction.insertOne(user);
            res.send(result)
        })
        app.post('/products', async (req, res) => {
            const user = req.body;
            const result = await productsColloctions.insertOne(user);
            res.send(result)
        })
        app.get("/products", async (req, res) => {
            const result = await productsColloctions.find().toArray();
            res.send(result);
        })

        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productsColloctions.findOne(query)
            res.send(result);
        })

        app.put("/products/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) };
            const option = { upsert: true };
            const updateproduct = req.body
            const product = {
                $set: {
                    name:updateproduct.name,
                    brand:updateproduct.brand,
                    type:updateproduct.type,
                    img:updateproduct.img,
                    about:updateproduct.about,
                    price:updateproduct.price,
                    rating:updateproduct.rating,
                     
                }

            }
            const result=await productsColloctions.updateOne(query, option,product)
            res.send(result);
        })

        app.delete("/products/:id",async(req,res)=>{
            const id =req.params.id;
            const query={_id:new ObjectId(id)};
            const result= await productsColloctions.deleteOne(query);
            res.send(result);
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('aotomovite is runing')
})

app.listen(port, () => {
    console.log(`the site is runing in port ${port}`)
})
