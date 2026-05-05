# \# Changelog

# All notable changes to this project will be documented in this file.

# The format is based on \[Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

# and this project adheres to \[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# 

# \## \[Unreleased]

# 

# \## \[1.2.0] - 2026-05-03

# \### Added

# \- Admin panel with order management and menu CRUD

# 

# \## \[1.1.0] - 2026-05-01

# \### Added

# \- Order history filter feature

# \### Fixed

# \- Cart quantity not updating on duplicate add

# \- Auth token expiry handling

# \- Order status display bug

# \### Security

# \- Added input validation on all API endpoints

# \### Performance

# \- Added index on orders.user\_id for faster queries

# 

# \## \[1.0.0] - 2026-04-28

# \### Added

# \- User authentication system (register, login, logout with JWT)

# \- Menu management CRUD for admin

# \- Order management (place, view, update status, cancel)

# \- Cart management (add, view, update quantity, remove)

# \- Review and rating system

# \- RESTful API backend with PostgreSQL

# \- Docker multi-stage build with Nginx reverse proxy

# \- Docker Compose multi-service setup (app, database, proxy)

# \- GitHub Actions CI/CD pipeline (lint, test, build, deploy)

# \- Cloud deployment on Railway

# \- Environment-based configuration (.env)

# \- Health check endpoint (/api/health)

