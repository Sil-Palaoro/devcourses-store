FROM node:22-slim AS builder

WORKDIR /devcourses-store

COPY tsconfig*.json package-lock.json package.json ./
COPY domain/package*.json ./domain/
COPY apps/backend/package*.json ./apps/backend/

RUN npm install --prefix ./domain
RUN npm install --prefix ./apps/backend

COPY domain ./domain 
COPY apps/backend ./apps/backend
COPY apps/backend/prisma ./apps/backend/prisma

RUN npm run build --prefix ./domain
RUN npm run prisma:generate --prefix ./apps/backend
RUN npm run build --prefix ./apps/backend 


# Etapa final

FROM node:22-slim AS runner
WORKDIR /devcourses-store

COPY --from=builder /devcourses-store/domain ./domain
COPY --from=builder /devcourses-store/apps/backend ./apps/backend

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "./apps/backend/dist/server.js"]