const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const routes_posts = require("./routes/routes_posts");
const routes_usuarios = require("./routes/routes_usuarios");

const PORT =  8081;
const sequelize = require("./sequelize");
sequelize.sync()
app.use(cors());
app.use(bodyParser.json());
app.use('/posts',routes_posts);
app.use('/usuarios',routes_usuarios);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


