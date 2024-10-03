# 4u7o

#### Commit rules
- Enormous changes (feat 🎉)
- Changes (chore 📌)
- Fix (fix 🛠/🐞)

#### Run the project
```sh
docker compose build
docker compose up -d
docker exec --user root -it 4u7o-server bun install
docker exec --user root -it 4u7o-server bunx prisma migrate dev
```