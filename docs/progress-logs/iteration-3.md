# Progress Log — Iteration 3

Duration: Week 5-6 (05 May 2026 - 11 May 2026)
Focus: Maintenance release, bug fixes, new feature, monitoring, post-mortem

## Planned
- Fix at least 3 bugs
- Add order history filter feature
- Add rate limiting (security)
- Add database index (performance)
- Write 8 change request documents
- Set up UptimeRobot monitoring
- Update CHANGELOG.md
- Tag v1.1.0

## Completed
- CR-001: Fixed cart quantity not updating on duplicate add
- CR-002: Fixed auth token expiry not handled on frontend
- CR-003: Fixed order status color for preparing status
- CR-004: Added order history filter by status
- CR-005: Added admin panel with order and menu management
- CR-006: Added rate limiting to API endpoints
- CR-007: Added database index on orders.user_id
- CR-008: Added input validation to all controllers
- 8 change request documents written
- UptimeRobot monitoring set up (100% uptime)
- CHANGELOG.md updated
- architecture.md completed
- Tagged v1.1.0

## Carried Over
- None — all planned items completed

## Notes
- UptimeRobot shows 100% uptime since monitoring started
- Railway free tier sufficient with no resource limit issues
