# Weather Forecast (React + Node + SQLite)

Full‑stack weather application built with React (client) and Node.js + Express (server). The server proxies meteo.lt API requests and stores selected city actions into a SQLite database.

---

## Overview

The client communicates only with the backend API. The backend is responsible for:

- Fetching weather data from meteo.lt
- Returning normalized responses to the client
- Persisting user actions (city selections) into SQLite

---

## Features

### Client

- City search and selection
- Current weather card
- 5‑day forecast view
- Most viewed cities (localStorage based)

### Server

- Proxy endpoints for places and forecasts
- SQLite logging for city selections
- IP and user‑agent tracking

---

## Architecture

Client (React) → Express API → meteo.lt

Client (React) → Express API → SQLite database

Data ownership:

- SQLite — server‑side logging storage
- localStorage — UI convenience only

---

## Requirements

- Node.js LTS
- npm

---

## Installation

### Server

```bash
cd server
npm install
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

Server runs on:

```
http://localhost:5500
```

Client runs on:

```
http://localhost:5173
```

---

## API Endpoints

```
GET    /api/places
GET    /api/places/:placeCode/forecasts/long-term
POST   /api/log/city-selected
```

---

## Database (SQLite)

Database file:

```
/server/data/app.sqlite
```

Table:

```
city_selections
```

Stored fields:

- place_code
- place_name
- ip
- user_agent
- created_at

---

## Tech Stack

Client:

- React
- TypeScript
- SCSS
- Atomic Design structure

Server:

- Node.js
- Express
- better-sqlite3

---

## Project Structure

```
Weather_forecast/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── pages/
│   │   │   └── UI/
│   │   ├── storage/
│   │   ├── styles/
│   │   ├── tests/
│   │   └── utils/
│   ├── App.tsx
│   └── index.css
│
├── server/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── data/
│   ├── helper.js
│   └── index.js
│
└── README.md
```

---

## License

Educational / portfolio project.
