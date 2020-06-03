const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || '8080'
const app = express();

// Read ENV File
dotenv.config();

// Allow CORS requests
app.use(cors());

// Connect DB
mongoose.connect(process.env.MONGO_CLUSTER_CONNECTION_STRING,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('Database is connected...')
})

// Routes
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:true
}));


// Server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})