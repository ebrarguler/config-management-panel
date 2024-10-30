# Vue 3 + Vite

# Config Manager Frontend

This project is a configuration management panel built using Vue 3. It allows users to manage application configurations after authentication. Users can sign in to view, add, edit, and delete configuration parameters.

## Features

- **Authentication**: Users need to sign in to access the configurations.
- **View Configurations**: Display a list of configuration parameters including their keys, values, descriptions, and update dates.
- **Add Configurations**: Users can add new configuration parameters by providing a key, value, and description.
- **Edit Configurations**: Existing parameters can be edited (value or description).
- **Delete Configurations**: Configuration parameters can be deleted easily.
- **Responsive Design**: Supports both desktop and mobile views.

## Installation

To run this application locally, follow these steps:

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the application**
   ```sh
   npm run dev
   ```
   This will start the development server. The application should be accessible at `http://localhost:3000` (or the port Vue assigns).

## Project Structure

The project structure is as follows:

```
frontend/               
├── node_modules/           
├── public/                 
│   └── vite.svg            
├── src/                    
│   ├── assets/             
│   │   └── icon.png        
│   ├── views/              
│   │   ├── HomePage.vue    
│   │   └── SignIn.vue      
│   ├── App.vue             
│   ├── main.js            
│   ├── router.js           
│   └── style.css           
├── .gitignore              
├── index.html              
├── package-lock.json       
├── package.json            
├── README.md               
└── vite.config.js          
```

## Usage

1. **Sign In**: Navigate to `/signin` and use valid credentials to sign in.
   - The default sign-in page includes fields for email and password.
   - On successful sign-in, a token is stored in `localStorage` for authentication.

2. **Configurations Page**: After logging in, users are redirected to the homepage where configurations are displayed.
   - **View**: All configuration parameters are displayed in a table format (desktop) or card view (mobile).
   - **Add**: Use the inputs at the bottom of the page to add a new configuration (key, value, description).
   - **Edit**: Click "Edit" on a parameter to modify its value or description, then click "Submit" to save changes.
   - **Delete**: Click "Delete" on a parameter to remove it from the list.

## Code Overview

### `router.js`

The application uses Vue Router for navigation. The router defines two main routes:

- `/signin`: The sign-in page for authentication.
- `/`: The homepage displaying configurations (requires authentication).

Before each route change, the router checks for an authentication token in `localStorage` to ensure the user is signed in.

### `HomePage.vue`

The main view for managing configurations. It has:
- A **table view** for desktop users and a **card view** for mobile users.
- Functionalities to **add, edit, and delete** configurations.
- **Logout button** to remove the auth token and redirect to the sign-in page.

### `SignIn.vue`

The sign-in page allows users to log in to the application.
- If authentication is successful, an `authToken` is saved in `localStorage` and the user is redirected to the homepage.

## Styling

The styles are scoped and follow a dark theme.
- The primary colors are defined in the `style.css`.
- The application uses CSS for both desktop and mobile views, ensuring a responsive design that works well on various devices.

## API Interaction

- **Base URL**: `http://localhost:3003/api/`
- **Endpoints**:
  - **GET `/config`**: Fetch all configurations.
  - **POST `/config`**: Add a new configuration.
  - **PUT `/config/:id`**: Update a configuration.
  - **DELETE `/config/:id`**: Delete a configuration.

## Project Setup

This project was built with the following:

- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **Vue Router**: For routing between different views.
- **Axios**: For making HTTP requests to the backend API.

## Future Improvements

- **Enhanced Authentication**: Implement user roles or different levels of access.
- **Error Handling**: Improve error handling for all API interactions to give users more feedback.
- **Advanced Filtering and Search**: Add filtering and search capabilities to easily find specific configuration parameters.