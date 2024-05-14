/**
 * This module will start the express server
 */

// import the express app
const webapp = require('./controller/server');

const port = process.env.PORT || 5050;
// start the web server
webapp.listen(port, () =>{
    console.log('Server running on port', port);
})

const allowedHosts = ['https://climatearth-app-f6f0a136cce9.herokuapp.com/', 'localhost'];
app.enable('trust proxy');
app.use((req, res, next) => {
  const host = req.header('host');
  if (allowedHosts.includes(host)) {
    return next();
  }
  const newHost = allowedHosts.find(h => host.endsWith(h));
  if (newHost) {
    req.header('host', newHost);
  }
  res.status(400).send('Invalid Host header');
});