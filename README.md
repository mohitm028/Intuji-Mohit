# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# E-Commerce Application named Intuji Test Mohit

This web application is an e-commerce website, where user can buy different products. User can use different filters like, price range, search by categories and search by title. Also user can add item on cart. And view the cart list or the item they have included on the cart.

## Technologies Used

- [React.js] - Firstly, react is one of the most popular library, it has huge amount of users and easy to maintain. Also it is scalable in long run and fast. Also quite familiar with react, didn't use typescript because of the possible type error that may occur and have a limited amount of time.
- [Redux Toolkits] - Redux is easy to maintain and have a centralized data management system which can be accessed from anywhere. It also can be easy to debug using redux
- [Tailwind] - With growing popularity it is one of the most used styling, and easy to use.

Also used react luicide for icons

## Features Completed

- [Y] Product listing with search and filters
- [Y] Product detail page
- [Y] Shopping cart with add/remove/update
- [Didn't understand] Cart persistence
- [Y] User profiles

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open browser to `http://localhost:3000`

## Time Spent

Approximately 4.5 hours

## Known Issues

The main issues as a developer is on how the whole work is done in single commit, due to the limited time period, tried to finish as fast as possible, due to which commit are not done on regular interval or feature wise.

- The checkout button doesn't have any working function
- UI flows through the search bar
- Modal can be open to confirm the deletion, instead of alert button
- RELOAD always sent the user to page number 1
- Tried to add as much as possible error handling

## Assumptions Made

- No real authentication required
- Tax rate fixed at 10%
- Using mock data for cart operations

# Intuji-Mohit
