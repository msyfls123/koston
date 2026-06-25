# 技术架构
- payload 目录为 PayloadCMS 程序，负责 /admin 路由
- website 目录为 Astro 程序，通过 workspace:* 引用 payload 实现 Local API
- store 为 MongoDB 数据目录
- payload/upload 目录为 payload 

# 开发
- 安装 pnpm
- `pnpm i`
- 参考 payload 和 website 下 `.env.example` 文件新增 `.env` 文件，注意 MongoDB url
- `pnpm run dev`

# 部署
- 确保目标机器上有 Docker 且 docker compose 不低于 3.3
- 将 git 目录打包成 zip `git archive --format=zip --output={filename}.zip HEAD`
- 将 zip 文件 scp 到目标机器上 `scp {filename}.zip root@ebichu.cc:/opt/koston`
- 登录目标机器，将 zip 解压到当前目录 `unzip -o {filename}.zip -d .`
- 参考根目录下 `.env.example` 文件新增 `.env` 文件
- 用 docker compose 重新构建
  ```
  docker compose build payload
  docker compose build website
  ```
- 通过 `docker compose up -d` 启动（你可能需要修改 docker-compose.yml 来增减 nginx image）
- `docker compose down -v` 将删除命名卷

# 参考资料
- Mongodb 加密：https://oneuptime.com/blog/post/2026-01-16-docker-mongodb-auth-volumes/view#connecting-to-mongodb