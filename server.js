// mongodb+srv://gaurav123:<password>@cluster0.wmzwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
