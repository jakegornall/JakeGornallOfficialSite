const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const session = require('express-session');
const UserStateManager = require('./backendModules/UserStateManager').UserStateManager

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.use( bodyParser.json() );
  server.use(session({ secret: 'simpleExpressMVC', resave: true, saveUninitialized: true  }));
  const userStateManager = new UserStateManager(server)

  server.get('/', (req, res) => {
	let secureUserObj = userStateManager.makeSecure(req.user);

	app.render(req, res, "/", {
		userState: secureUserObj ? secureUserObj : null
	});
  });

  server.get('/login', (req, res) => {
		return req.user ? res.redirect("/") : app.render(req, res, "/login", { userState: null });
  });
  server.post('/login', (req, res) => { userStateManager.loginHandler(req, res) });
  server.post('/signup', (req, res, next) => { userStateManager.signupHandler(req, res, next) });
  server.post('/logout', (req, res, next) => { userStateManager.logoutHandler(req, res, next) });

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  });
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
