# Progress Log — Iteration 2

Duration: Week 3-4 (29 April 2026 - 04 May 2026)
Focus: Full feature implementation, Dockerization, CI/CD pipeline, cloud deployment

## Planned
- Complete all 5 CRUD features
- Write multi-stage Dockerfile
- Create docker-compose.yml
- Set up GitHub Actions CI/CD pipeline
- Deploy to Railway
- Write deployment guide
- Tag v1.0.0

## Completed
- All 5 CRUD features implemented
- Multi-stage Dockerfile written
- docker-compose.yml with health checks
- nginx.conf configured as reverse proxy
- GitHub Actions CI/CD pipeline created (lint, test, build jobs)
- Application deployed to Railway
- Railway PostgreSQL provisioned and initialized
- deployment-guide.md written
- Tagged v1.2.0

## Carried Over
- Input validation (addressed in v1.1.0)
- Rate limiting (addressed in v1.1.0)
- Order history filter (addressed in v1.1.0)

## Notes
- Resolved merge conflicts in package.json when merging feature branches
- Frontend build output must be copied to src/backend/public/ for Express to serve it
