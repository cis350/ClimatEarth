/**
 * Express webserver / controller
 */

// import express
const express = require('express');

// import getRandomTasks

const { getRandomTasks, getTaskById } = require('./utils/tasks');

const { getTopUsers } = require('./utils/leaderboard');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

// create a new express app
const webapp = express();
webapp.use(express.json());

webapp.set('trust proxy', true);

// import authentication functions
const { authenticateUser, verifyUser, blacklistJWT, updateCalculation } = require('./utils/auth');

// enable cors
webapp.use(cors());

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db function
const users = require('../model/users');

const { connect, getDB } = require('../model/dbUtils');

// Call connect() function to establish connection
connect()
  .then(async () => {
    // Connection established, start your server or perform other operations
    webapp.listen(() => {
      console.log(`Server is running on port`);
    });
  })
  .catch((err) => {
    // Handle connection error
    console.error('Error connecting to database:', err);
  });


// root endpoint route
/* webapp.get('/', (_req, resp) => {
  resp.json({ message: 'hello CIS3500 SP24!!!' });
}); */
const path = require('path')
webapp.use(express.static(path.join(__dirname, '../../frontend/build')))
webapp.get('*', (_req, res) => {
  resp.json({ message: 'hello CIS3500 SP24!!!' });
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
})

/**
 * Login endpoint
 * The name is used to log in
 */
webapp.post('/login', async (req, resp) => {
  console.log("in post request in server.js");
  console.log(req.body.username);
  console.log(req.body.password);
  // check that the name was sent in the body
  if (!req.body.username || req.body.username === '') {
    resp.status(400).json({ error: 'empty or missing username' });
    return;
  }
  if (!req.body.password || req.body.password === '') {
    resp.status(400).json({ error: 'empty or missing password' });
    return; 
  } 
  // authenticate the user
  try {
    const token = authenticateUser(req.body.username, req.body.password);
    const verificationResult = await verifyUser(token);
    if (verificationResult === 0) {
      // User verified, login successful
      resp.status(200).json({ apptoken: token });
      console.log(token);
    } else {
      throw new Error('User verification failed');
    }
  } catch (err) {
    console.log('error login', err.message);
    resp.status(401).json({ error: 'hey I am an error' });
  } 
});

/**
 * Logout endpoint
 * use JWT for authentication
 * Ends the session
 */
webapp.post('/logout', async (req, resp) => {
  // verify the session
  console.log('logout');
  try {
    const authorizationHeader = req.headers.authorization;
    console.log("auth header: " + authorizationHeader);
    const authResp = await verifyUser(authorizationHeader); // Pass token to verifyUser function
    // if (authResp === 1) { // expired session
    //   console.log("expired");
    //   resp.status(403).json({ message: 'Session expired already' });
    //   return;
    // }
    // if (authResp === 2 || authResp === 3) { // invalid user or jwt
    //   console.log("invalid user or jwt");
    //   resp.status(401).json({ message: 'Invalid user or session' });
    //   return;
    // }
    // session valid blacklist the JWT
    // blacklistJWT(req.headers.authorization);
    return resp.status(200).json({ message: 'Session terminated' });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation GET /users
 */
webapp.get('/users', async (_req, resp) => {
  try {
    // get the data from the DB
    const allUsers = await users.getAllUsers();
    // send response
    resp.status(200).json({ data: allUsers });
  } catch (err) {
    // send the error code
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation GET /user/:id
 */
webapp.get('/user/:id', async (req, res) => {
  console.log('READ a user');
  try {
    // get the data from the db
    const result = await users.getUser(req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'unknown user' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

/**
 * route implementation POST /signup
 * Register a new user
 */
webapp.post('/signup', async (req, resp) => {
  //Parse the body
  if (!req.body.username || !req.body.password || !req.body.name) {
    resp.status(400).json({ message: 'Missing username, password, or email in the body' });
    return;
  }

  try {

    // Create the new user object
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      completedTasks: [],
      score: 0,
    };

    console.log("Before adding user");

    // Add the user to the database
    const result = await users.addUser(newUser);

    // Generate token for the new user
    const token = authenticateUser(req.body.username);
    
    console.log("Result: ", newUser);
    console.log("Token: ", token);
    // Return response with token
    resp.status(201).json({ data: { id: result, token: token } });
    
  } catch (err) {
    resp.status(400).json({ message: 'There was an error - signup' });
  }
});


/**
 * route implementation DELETE /user/:id
 */
webapp.delete('/user/:id', async (req, res) => {
  try {
    const result = await users.deleteUser(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'user not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

/**
 * route implementation PUT /user/:id
 */
webapp.put('/user/:id', async (req, res) => {
  console.log('UPDATE a user');
  // parse the body of the request
  console.log(req.body);
  if (!req.body.password) {
    res.status(400).json({ message: 'missing major' });
    return;
  }
  try {
    const result = await users.updateUser(req.params.id, req.body.password);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

/**
 * route implementation POST /addName
 * add tasks a name for user (done in signup but just if need to change)
 */
webapp.post('/addName', async (req, resp) => {
  try {
    // parse the body
    const db = await getDB();
    const { username, name1 } = req.body;
    // Find the user by username
    const user = await db.collection('users').findOne({ username });

    if (!user) {
        return resp.status(404).json({ message: 'User not found' });
    }

    // Update user document to add completedTasks field
    const result = await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { name: name1 } }
    );
    if (result.modifiedCount === 1) {
      return resp.status(200).json({ message: 'Name added successfully' });
    } else {
      return resp.status(500).json({ message: 'Failed to add name' });
    }
  } catch (error) {
    console.error('Error adding name:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * route implementation GET /api/tasks
 * API route to get three random tasks
 */
webapp.get('/api/tasks', (req, res) => {
  try {
      const selectedTasks = getRandomTasks();
      console.log("Selected Tasks:", selectedTasks); // Logging for debugging
      res.json(selectedTasks);
  } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).send("An error occurred while fetching tasks");
  }
});

/**
 * route implementation GET /api/tasks/:id
 * API route to get a specific task by its id
 */
webapp.get('/api/tasks/:id', (req, res) => {
  try {
      const taskId = parseInt(req.params.id);
      const task = getTaskById(taskId);

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }

      res.json(task);
  } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).send("An error occurred while fetching task");
  }
});

/**
 * route implementation POST /setTasks
 * set the tasks user has completed
 */
webapp.post('/setTasks', async (req, resp) => {
  try {
    // parse the body
    const db = await getDB();
    const { username, tasks } = req.body;

    if (!tasks) {
      return resp.status(400).json({ message: 'Tasks cannot be null' });
    }

    // Find the user by username
    const user = await db.collection('users').findOne({ username });

    if (!user) {
        return resp.status(404).json({ message: 'User not found' });
    }

    // Update user document to add completedTasks field
    const result = await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { completedTasks: tasks },
        $set: { score: user.completedTasks.length } }
    );
    if (result.modifiedCount === 1) {
      return resp.status(200).json({ message: 'Completed tasks set successfully' });
    } else {
      return resp.status(500).json({ message: 'Failed to set completed tasks' });
    }
  } catch (error) {
    console.error('Error setting completed tasks:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * route implementation POST /removeTasks
 * remove tasks from completed
 */
webapp.post('/removeTask', async (req, resp) => {
  try {
    // parse the body
    const db = await getDB();
    const { username, task } = req.body;
    // Find the user by username
    const user = await db.collection('users').findOne({ username });

    if (!task) {
      return resp.status(400).json({ message: 'Task cannot be null' });
    }

    if (!user) {
        return resp.status(404).json({ message: 'User not found' });
    }

    // Find the index of the most recent occurrence of the task ID
    const indexToRemove = user.completedTasks.lastIndexOf(task);

    // If the task ID exists in the array, remove it
    if (indexToRemove !== -1) {
      user.completedTasks.splice(indexToRemove, 1);
    } else {
      return resp.status(400).json({ message: 'Task not found' });
    }

    // Update user document to remove the task
    const result = await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { completedTasks: user.completedTasks },
      $inc: { score: -1 } }
    );


    if (result.modifiedCount === 1) {
      return resp.status(200).json({ message: 'Task removed successfully', tasks : user.completedTasks,
        score : user.score - 1
       });
    } else {
      return resp.status(500).json({ message: 'Failed to remove task' });
    }
  } catch (error) {
    console.error('Error removing completed tasks:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * route implementation POST /addTasks
 * add tasks user has completed
 */
webapp.post('/addTask', async (req, resp) => {
  try {
    // Parse the body
    const db = await getDB();
    const { username, task } = req.body;

    if (!task) {
      return resp.status(400).json({ message: 'Task cannot be null' });
    }
    
    // Find the user by username
    const user = await db.collection('users').findOne({ username });

    if (!user) {
        return resp.status(404).json({ message: 'User not found' });
    }

    // Add the task to the completedTasks array
    const updatedTasks = [...user.completedTasks, task];

    // Update user document to add the task
    const result = await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { completedTasks: updatedTasks },
        $inc: { score: 1 } }
    );

    if (result.modifiedCount === 1) {
      return resp.status(200).json({ message: 'Task added successfully', score : user.score + 1 });
    } else {
      return resp.status(500).json({ message: 'Failed to add task' });
    }
  } catch (error) {
    console.error('Error adding task:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * route implementation GET /getCompletedTasks
 * get tasks ids of tasks the user has completed
 */
webapp.get('/getCompletedTasks/:username', async (req, resp) => {
  try {
    const db = await getDB();
    const { username } = req.params;

    // Find the user by username
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return resp.status(404).json({ message: 'User not found' });
    }

    // Retrieve completed tasks from the user document
    const completedTasks = user.completedTasks;

    return resp.status(200).json({ completedTasks });
  } catch (error) {
    console.error('Error getting completed tasks:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * route implementation GET /getScore/:username
 * get score of user for leader board
 */
webapp.get('/getScore/:username', async (req, resp) => {
  try {
    const db = await getDB();
    const { username } = req.params;
    
    // Find the user by username
    const user = await db.collection('users').findOne({ username });

    if (!user) {
        return resp.status(404).json({ message: 'User not found' });
    }

    // Get the score (length of the completedTasks array)
    let score = 0;
    if (user.completedTasks) {
      score = user.completedTasks.length
    } 
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { score: score } }
    );

    return resp.status(200).json({ score: score });
  } catch (error) {
    console.error('Error getting score:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

// API route for the leaderboard
webapp.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await getTopUsers();
    res.json(leaderboardData);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).send("An error occurred while fetching leaderboard");
  
  }});

/**
 * Carbon calculator endpoint
 * The name is used to add footprint to user
 */
webapp.post('/carbon', async (req, resp) => {
  // parse
  try {
    const db = await getDB();
    const { username, footprint } = req.body;
    // Find the user by username
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return resp.status(404).json({ message: 'User not found' });
  }
  // Update user document to add footprint field
  const result = await db.collection('users').updateOne(
    { _id: user._id },
    { $set: { footprint: footprint } }
  );
  if (result.modifiedCount === 1) {
    return resp.status(200).json(user);
  }
} catch (error) {
  console.error('Error adding footprint:', error);
  return resp.status(500).json({ message: 'Internal server error' });
}
});

webapp.get('/getFootprint/:username', async (req, resp) => {
  try {
    const db = await getDB();
    const { username } = req.params;
    // Find the user by username
    const user = await db.collection('users').findOne({ username });
    if (!user) {
        return resp.status(404).json({ message: 'User not found' });
    }
    // Get the footprint
    const footprint = user.footprint; 
    console.log("footprint: " + footprint); 
    return resp.status(200).json({ footprint : footprint });
  } catch (error) {
    console.error('Error getting footprint:', error);
    return resp.status(500).json({ message: 'Internal server error' });
  }
});

// export the webapp
module.exports = webapp;
