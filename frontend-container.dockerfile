FROM node:22-slim AS builder
WORKDIR /devcourses-store

COPY tsconfig*.json package-lock.json package.json ./
COPY domain/package*.json ./domain/
COPY apps/frontend/package*.json ./apps/frontend/

RUN npm install --prefix ./domain
RUN npm install --prefix ./apps/frontend

COPY domain ./domain 
COPY apps/frontend ./apps/frontend

RUN npm run build --prefix ./apps/frontend


#Etapa final 
FROM node:22-slim AS runner
WORKDIR /devcourses-store

RUN npm install -g serve

COPY --from=builder /devcourses-store/apps/frontend/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173" ]