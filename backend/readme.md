### Grocery Store Project
## project Overview
The Grocery Store project is a backend service designed for an e-commerce platform, providing functionality for user authentication, product management, cart operations, order processing, and credit handling. The project is built with Node.js and Express.js, adhering to the MVC architecture.

## Installation and Setup
1. Clone the repository:
`git clone <repo-url>`

2. Install dependencies
`npm install`

3. Create a .env file and configure the environment variable:
`PORT=5000`
`DATABASE_URL=<your-database-url>`
`JWT_SECRET=<your-jwt-secret>`
`GOOGLE_CLIENT_ID=<your-google-client-id>`
`GOOGLE_CLIENT_SECRET=<your-google-client-secret>`
`FACEBOOK_CLIENT_ID=<your-facebook-client-id>`
`FACEBOOK_CLIENT_SECRET=<your-facebook-client-secret>`

4. Start the server
`npm start `

### API Routes

# Authentication Route
# Method        endPoint                    desc
post           /auth/login              handle user login <br>
post           /auth/register           handle user registration <br>
get            /auth/google             handle google authentication <br>
get            /auth/google/callback    handle google callback <br>
get            /auth/facebook           handle facebook authentication <br>
get             /auth/facebook/callback handle facebook callback <br>
get            /auth/logout             handle user logout <br>

# Product Route
# Method        endPoint                    desc
post           /products                add products <br>
get            /products                get all products <br>
get            /products/:id            get product by id <br>
patch          /products/:id            update product by admin <br>
delete         /products/:id            delete product by admin <br>
get            /products/:category      get products by category <br>
get            /products/:price         get products by price <br>
get            /products/:rating        get products by rating <br>
get            /products/:name          get products by name <br>
get            /products/:description   get products by description <br>

