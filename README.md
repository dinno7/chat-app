# Fullstack Chat app project(monorepo)

## Stack

- **NestJs** as server side
- **VueJs** as client side
- **MongoDB & Redis** as databases
- **Socket.io** as websocket client

## Run in development mode
#### You can run project with Docker easy as possible:

Go to root of project and run bellow command
```bash
docker compose up -d
```

Get log of projects
```bash
docker compose logs -f api # -> for backend
docker compose logs -f client # -> for frontend
```

#### To stop project just run bellow command

```bash
docker compose down
```
Also you can run above command with -v flag to remove related volumes(this is remove all data were save on database)

```bash
docker compose down -v
```