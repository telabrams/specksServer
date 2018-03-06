module.exports = function(app, database, admin) {

  app.post('/users', (req, res) => {
    const USER_TOKEN = req.headers.user_token
    const { NAME } = req.body;
    admin.auth().verifyIdToken(USER_TOKEN)
      .then(decodedToken => {
        console.log(decodedToken);
        const UID = decodedToken.uid,
              LAST_LOGIN = decodedToken.auth_time;
        database.ref(`users/${UID}`).update({
          name: NAME,
          lastLogin: LAST_LOGIN,
          games: '',
          winGames: '',
          bestSteps: '',
          bestTime: ''
        }, error => {
          if (error) {
            res.status(404).send(`Firebase: ${error}`);
          } else {
            res.json(`You successfully added the name - ${NAME}!`);
          }
        });
      })
      .catch(error => {
        res.status(403).send(`${error}`);
      });
  });

  app.get('/user_name', (req, res) => {
    const USER_TOKEN = req.headers.user_token
    admin.auth().verifyIdToken(USER_TOKEN)
      .then(decodedToken => {
        const UID = decodedToken.uid;
        database.ref(`users/${UID}`)
          .once('value')
            .then(snapshot => {
              console.log(snapshot.val())
              const USERNAME = (snapshot.val() && snapshot.val().name) || 'Anonymous';
              res.json(USERNAME);
            })
            .catch(err => {
              res.send(`Firebase: ${error}`);
            })
      })
      .catch(error => {
        res.status(403).send(`${error}`);
      });
  });

  app.get('/users', (req, res) => {
    console.log('Get request');
  })

};
