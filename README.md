# Flowee

Author: **Marek Mikula**<br/>
Year: **2026**<br/>
Learning diary: [Learning diary.pdf](docs/Learning%20diary.pdf)<br/>
Project showcase video: [video](https://www.youtube.com/watch?v=cAzg_9TeKxs)

This project represents the final project of the course CT70A9140 - Software Development Skills: Full-Stack.

## Installation

1. Create the `.env` file.

```bash
cp .env.example .env
```

Fill in the variables. Most importantly, the **password to DB** and **JWT secret**.

2. Run the containers

```bash
docker compose up -d
```

3. Install dependencies

```bash
docker exec mern-node npm ci
```

4. Start the backend server

```bash
docker exec mern-node npm run backend:dev
```

5. Start the frontend

```bash
docker exec mern-node npm run frontend:dev
```

6. Check the app

Visit [http://localhost:3000](http://localhost:3000) to check out if everything works.
