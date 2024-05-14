/**
 * This module will start the express server
 */

// import the express app
const webapp = require('./controller/server.js');

const path = require('path')
// Serve static files from the React frontend app
webapp.use(express.static(path.join(__dirname, '../../frontend/build')))

// Anything that doesn't match the above, send back index.html
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
})

const port = process.env.PORT || 5050;
// start the web server
webapp.listen(port, () =>{
    console.log('Server running on port', port);
})