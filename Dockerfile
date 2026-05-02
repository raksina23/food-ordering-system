# ── Stage 1: Build Frontend ──────────────────
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY src/frontend/package*.json ./
RUN npm install
COPY src/frontend ./
RUN npm run build


# ── Stage 2: Production ──────────────────────
FROM node:18-alpine AS production

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy backend
COPY src/backend/package*.json ./
RUN npm install --only=production
COPY src/backend ./

# Copy built frontend into backend public folder
COPY --from=frontend-builder /app/frontend/dist ./public

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

USER appuser
EXPOSE 5000

CMD ["node", "server.js"]