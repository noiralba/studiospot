# StudioSpot

StudioSpot is a booking system for creative studios, built as a group project in React and TypeScript.

The application allows users to view and book different types of creative studios, such as photo, podcast, music, and video studios.

A booking belongs to a specific studio and contains information about the booking time and the booker's email address. The application will prevent overlapping bookings for the same studio.

## Project Purpose

The purpose of the project is to practice and demonstrate TypeScript in a React application, including:

- Data modelling with interfaces and types
- Typed React components and props
- Union types and utility types
- Type narrowing and handling of `undefined`
- Generic TypeScript functions and components
- REST API communication
- Routing with React Router
- TypeScript debugging
- Git, GitHub, pull requests, and code reviews

## Tech Stack

- React
- TypeScript
- Vite
- React Router v8
- json-server
- Oxlint
- Git and GitHub

## Project Structure

The application is based on two related resource types:

### Studio

A studio is a resource that can be booked.

#### Examples include:

- Photo studio
- Podcast studio
- Music studio
- Video studio

### Booking

A Booking represents a reservation of a specific studio.

#### Each booking will contain:

- A reference to a studio
- The booker's email address
- Start and end time
- Booking status

The final TypeScript interfaces will be added after the domain pitch and data model have been approved.

## Double Booking Prevention

Before a new booking is created, the application will check existing bookings for the selected studio.

A booking will not be allowed if its time interval overlaps an existing active booking for the same studio.

The double-booking check is handled in the frontend because the project uses json-server instead of a custom backend.

## Routing

The project uses React Router v8 in Data Mode.

Routes will be defined as route objects with `createBrowserRouter` and rendered with `RouterProvider`.

The application will contain at least three routes, including a dynamic route with a URL parameter, for example:

```text
/
/studios
/studios/:id
```

## Data and API

Project data will be stored in `db.json` and exposed through json-server as a REST API. The application will communicate with the API using:

- GET
- POST
- PATCH
- DELETE

For the VG requirements, API communication will be handled through a reusable generic TypeScript API module.

## Getting Started

#### Prerequisites

Make sure Node.js, npm, and Git are installed.

## Clone the repository

`git clone https://github.com/noiralba/studiospot.git`

#### Move into the project directory:

`cd studiospot`

## Install dependencies:

`npm install`

## Start the React development server

```text
npm run dev
```

Vite will display the local development URL in the terminal.

## Start json-server

### Start the local JSON API:

```text
npm run server

```

### JSON Server runs on:

```text
http://localhost:3000

```

### Available endpoints

- `/studios`
- `/bookings`

---

## Available Scripts

`npm run dev` -Starts the Vite development server

`npm run server` -Starts JSON Server and exposes the local REST API from `db.json`.

`npm run build` -Runs the TypeScript build and creates the production build.

`npm run lint` -Runs Oxlint

`npm run preview` -Previews the production build locally

## Styling

### Styling solution:

To be decided by the group.

Before submission this section will contain the selected solution and a short explanation of why it was chosen.

## Git Workflow

The project uses a feature-branch and pull-request workflow.

New work should not be developed directly on main.

### Example:

git switch -c feature/studio-list

### The workflow is:

1. Create a branch from an updated `main`
2. Make small, focused changes
3. Commit with descriptive commit messages
4. Push the branch to GitHub
5. Open a Pull Request
6. Have at least one other group member review the Pull Request
7. Merge into `main` after review

Each group member is responsible for making traceable contributions and participating in code reviews.

## Group Members

- Jonathan Berhane
- Neha Chatrath
- Sara Kemppi
- Andrea Vega Piñones
- Maria Labrooy

## Project Status

The initial React + TypeScript project setup is complete.

### Installed project dependencies currently include:

- React
- TypeScript
- Vite
- React Router v8
- json-server
- Oxlint

The next development phase begins after the domain pitch and initial data model have been agreed upon

```

```
