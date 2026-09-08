# StudioSpot

StudioSpot is a booking system for creative studios, built as a group project in React and TypeScript.

The application allows users to view and book different types of creative studios, such as photo, podcast, music, and video studios.

A booking belongs to a specific studio and contains information about the booking time and the booker's email address. The application prevents overlapping bookings for the same studio.

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

A booking represents a reservation of a specific studio.

#### Each booking contains:

- A reference to a studio
- The booker's email address
- Start and end time
- Booking status

## Double Booking Prevention

Before a new booking is created, the application checks existing bookings for the selected studio.

A booking is not allowed if its time interval overlaps an existing active booking for the same studio.

The double-booking check is handled in the frontend because the project uses json-server instead of a custom backend.

## Routing

The project uses React Router v8 in Data Mode.

Routes are defined as route objects with `createBrowserRouter` and rendered with `RouterProvider`.

The application contains multiple routes, including a dynamic route with a URL parameter:

```text
/
/studios
/studios/:id
```

### Dynamic Routes

Page files are automatically converted into URL paths by the routing setup.

Dynamic route parameters use a $ prefix in the page filename. For example:

`src/pages/studios/$id.tsx`

is converted to:

`/studios/:id`

This allows individual studios to be accessed through URLs such as `/studios/1` or `/studios/2`.

The studio detail page reads the `id` parameter from the URL using `useParams`, fetches the selected studio through `/api/studios/:id`, and renders the existing `StudioDetail` component.

## Data and API

Project data is stored in `db.json` and exposed through json-server as a REST API. The application communicates with the API using:

- GET
- POST
- PATCH

API communication is handled through a reusable generic TypeScript API module.

### DELETE

DELETE is not used in the application. When a booking is cancelled, the booking is kept in the database and its status is changed to `"cancelled"` using PATCH instead of deleting it.

This allows cancelled bookings to remain available in the system while ensuring that they are not treated as active bookings in the double-booking validation.

This solution was approved by the teacher, since there was no natural use case for DELETE in the current application.

### Development Proxy

Vite uses a development proxy for API requests.

Frontend requests use the `/api` prefix:

- `/api/studios`
- `/api/bookings`

#### Example request:

```ts
fetch("/api/studios");
```

During development, Vite forwards these requests to JSON Server running on port `3000`.

#### For example:

`/api/studios` -> `http://localhost:3000/studios`

`/api/bookings` -> `http://localhost:3000/bookings`

## Getting Started

#### Prerequisites

Node.js, npm, and Git are required.

## Clone the repository

`git clone https://github.com/noiralba/studiospot.git`

#### Move into the project directory:

```text
cd studiospot
```

## Install dependencies:

```text
npm install
```

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

`npm run dev` - Starts the Vite development server

`npm run server` - Starts JSON Server and exposes the local REST API from `db.json`.

`npm run build` - Runs the TypeScript build and creates the production build.

`npm run lint` - Runs Oxlint

`npm run preview` - Previews the production build locally

## Styling

### Styling solution:

The application is styled using SCSS, including SCSS modules for component-specific styling.

## Group Members

- Jonathan Berhane
- Neha Chatrath
- Sara Kemppi
- Andrea Vega Piñones
- Maria Labrooy
