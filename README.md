# Social app Project with Express and Sequelize

This is a simple social app built with Express.js and Sequelize ORM. The app provides APIs to manage users, posts, and comments, with features such as validations, relationships, and custom hooks.

## Features
- **User Management**: Create, update, and retrieve users with built-in and custom validations.
- **Post Management**: Create, delete, and retrieve posts with user and comment details.
- **Comment Management**: Create, update, and retrieve comments, with advanced queries.
- **Validation**:
  - Built-in email validation.
  - Custom password length validation.
  - Name length validation using hooks.
- **Soft Deletes**: Paranoid mode enabled for posts to allow soft deletions.
- **Relational Database**: Users, posts, and comments are stored in a relational database with proper associations.
- **RESTful API**: All interactions are handled through API endpoints.

## Technologies Used
- **Node.js & Express.js**: Backend framework for building the app.
- **Sequelize ORM**: Used to interact with the SQL database.
- **SQL**: Relational database (MySQL or PostgreSQL).

## Prerequisites
- Ensure you have **Node.js** and **npm** installed on your machine.
- To install the project dependencies, run `npm install` in the project directory terminal.
- Set up a SQL database (e.g., MySQL or PostgreSQL).
---

"# Social-App" 
