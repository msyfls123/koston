FROM node:24-alpine AS base
WORKDIR /app

# By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.

RUN npm config set registry https://registry.npmmirror.com
RUN npm i pnpm@11 -g

FROM base AS build-deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY payload/package.json payload/pnpm-lock.yaml* payload/
COPY website/package.json website/
RUN \
  pnpm approve-builds --all && \
  pnpm i --filter astro-website

FROM base AS build
COPY . .
COPY --from=build-deps /app/node_modules ./node_modules
COPY --from=build-deps /app/website/node_modules ./website/node_modules
RUN pnpm deploy --filter=astro-website ./deploy-website
RUN cd deploy-website && pnpm run build

FROM base AS runtime
COPY --from=build /app/deploy-website .

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]