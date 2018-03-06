const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      admin = require('firebase-admin'),
      serviceAccount = require('./firebaseAdminSdk/SpecksApp-35facfc8388c.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://specksapp.firebaseio.com'
      });
const database = admin.database(),
      app = express(),
      port = process.env.PORT || 3000;

const router = express.Router();
app.use(bodyParser.json());
app.use(cors());

require('./api/routes/')(app, database, admin);

app.listen(port, () => {
  console.log('Now is listening port 3000')
});
