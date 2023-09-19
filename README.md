# Sneakers Online Store

Welcome to the Sneakers Online Store app! This application allows users to explore and shop for sneakers online. The backend of this app is powered by the MockAPI service.

## Technologies Used

- **ReactJS**: The frontend of the application is built using ReactJS, a popular JavaScript library for building user interfaces.

- **React Router**: React Router is used for client-side routing, enabling smooth navigation within the app.

- **Redux Toolkit**: Redux Toolkit simplifies state management by providing a set of tools and best practices. It's used to manage application-wide state, replacing the original useState implementation.

- **Redux Thunk**: Redux Thunk is a middleware that allows asynchronous actions in Redux. It's used for making HTTP requests and handling side effects.

- **Axios**: Axios is used to make HTTP requests to the MockAPI service, facilitating data retrieval and submission.

- **localStorage**: LocalStorage is used to store cart items, ensuring that user selections persist even after refreshing the page.

- **react-intersection-observer**: This library is utilized for reloading items as the user scrolls through the page, providing an efficient way to manage large item lists.

- **Authentication**: Users are required to log in or create an account to make a purchase.

## Features

- **Product Catalog**: Users can browse and search for sneakers in the online catalog.

- **Shopping Cart**: Users can add sneakers to their shopping cart, which is persisted even after page reloads thanks to localStorage.

- **Order Placement**: Users can place orders for selected sneakers.

- **Order History**: Users can view their order history on a separate "Orders" page.

- **Authentication**: User authentication is required to make a purchase.

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install` or `yarn install`.
3. Start the development server with `npm start` or `yarn start`.
4. Open your web browser and navigate to `http://localhost:3000` to access the app.

## Authentication

To access the full functionality of the app, users need to sign up or log in.

## Contributing

Contributions to this project are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.



