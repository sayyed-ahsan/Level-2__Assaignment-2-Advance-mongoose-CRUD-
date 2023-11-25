# level-2 Assignment-2

## Description
This TypeScript project is a server application developed with Express, MongoDB (using Mongoose), and various middleware for added functionality. Features include user authentication with bcrypt encryption, CORS support, and environment variable management via dotenv.


## Prerequisites
Ensure the following tools and dependencies are installed on your machine:

- *Node.js:* [Download and Install Node.js](https://nodejs.org/)
- *MongoDB:* [Download and Install MongoDB](https://www.mongodb.com/try/download/community)
- *Git:* [Download and Install Git](https://git-scm.com/)

## Let's Start Installation


### 1. *Clone the repository:*

 ```
   git clone: (https://github.com/sayyed-ahsan/Level-2__Assaignment-2-Advance-mongoose-CRUD-
   ``` 




### 2. *Install project dependencies:*
```   
npm install  
```
   
   This command installs the necessary Node.js modules specified in the `package.json` file.





### 3. *Create a `.env` file in the project root and set up your environment variables:

```
   
PORT=5002

DATABASE_URL=mongodb+srv://admin-11:admin-123456@cluster0.axckkgu.mongodb.net/?retryWrites=true&w=majority

BCRYPT_SALT_ROUNDS=12
   
```
Adjust these variables based on your specific configuration needs.




### 4. *Running the Project:*
  
  
```
npm start

or

npm run start

```

### 5. Linting and Formatting
```
- *Run ESLint for linting:*
  bash
  npm run lint
  
  This command checks your TypeScript code for potential issues based on the ESLint rules.

- *Run ESLint with automatic fixes:*
  bash
  npm run lint:fix
  
  This command attempts to automatically fix ESLint issues in your code.

- *Run Prettier for code formatting:*
  bash
  npm run prettier
  
  This command formats your code according to Prettier standards.

- *Run Prettier with automatic fixes:*
  bash
  npm run prettier:fix
  
  This command automatically fixes Prettier formatting issues in your code.
```







# Author

### Md Ahsan

Feel free to modify this README to suit your project's specific details.




