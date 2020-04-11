const express = require('express');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

// const builder = new xml2js.Builder({
//   trim: true
// });


app.listen(port, () => {
// console.log(`server started on port ${port}`);
});
