FROM node:18-alpine3.18 AS build

WORKDIR /opt/client

# Install pnpm
RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package*.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Production stage
FROM nginx:1.25-alpine AS production

COPY --from=build /opt/client/dist /usr/share/nginx/html

RUN mkdir -p /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
