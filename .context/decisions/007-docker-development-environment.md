# ADR-007: Docker Development Environment

**Status:** Accepted
**Date:** 2026-02-03
**Version:** 1.0

## Context

Development environment consistency is important for:
- Avoiding "works on my machine" issues
- Quick onboarding of new contributors
- Reproducible builds
- Independence from local Node.js installation

Options considered:
- Local Node.js only
- Docker Compose for development
- VS Code Dev Containers
- GitHub Codespaces

## Decision

Use **Docker Compose** for the development environment.

**Setup:**
- `.docker/Dockerfile.dev`: Node.js 20 Alpine image
- `docker-compose.yml`: Development service configuration
- `.dockerignore`: Exclude unnecessary files from build context

**Key features:**
- Volume mounts for source code (hot reload support)
- Named volumes for `node_modules` and `.nuxt` (performance)
- Port exposure: 3000 (app), 24678 (Nuxt devtools)
- File watching with polling (CHOKIDAR_USEPOLLING) for Docker compatibility

**Usage:**
```bash
# Start development server
docker compose up

# Install new dependencies
docker compose run --rm app npm install <package>

# Run arbitrary commands
docker compose exec app npm run <command>
```

## Consequences

**Positive:**
- Consistent environment across all developers
- No need to install Node.js locally
- Easy cleanup (docker compose down -v)
- Works across macOS, Linux, Windows
- Isolated from system packages

**Negative:**
- Docker required on development machine
- Slight overhead compared to native Node.js
- Volume mount performance can vary by OS
- Additional complexity for simple edits

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial decision - Docker for development |
