# Docker Deployment for Giscus

This directory contains Docker configuration files for deploying giscus in a containerized environment.

## Quick Start

### Prerequisites

- Docker (20.10 or later)
- Docker Compose (optional, but recommended)

### Using Docker Compose (Recommended)

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your configuration:
   - Set your GitHub App credentials
   - Set `NEXT_PUBLIC_GITHUB_URL` for GitHub Enterprise Server (optional)
   - Configure other required variables

3. Start the service:
   ```bash
   docker-compose up -d
   ```

4. Access giscus at http://localhost:3000

5. View logs:
   ```bash
   docker-compose logs -f
   ```

6. Stop the service:
   ```bash
   docker-compose down
   ```

### Using Docker CLI

1. Build the image:
   ```bash
   docker build -t giscus .
   ```

2. Run the container:
   ```bash
   docker run -d \
     --name giscus \
     -p 3000:3000 \
     --env-file .env.local \
     --restart unless-stopped \
     giscus
   ```

## Configuration

### Environment Variables

All environment variables should be defined in `.env.local`. See `.env.example` for available options.

Key variables for self-hosting:
- `GITHUB_APP_ID` - Your GitHub App ID
- `GITHUB_CLIENT_ID` - Your GitHub OAuth App client ID
- `GITHUB_CLIENT_SECRET` - Your GitHub OAuth App client secret
- `GITHUB_PRIVATE_KEY` - Your GitHub App private key
- `ENCRYPTION_PASSWORD` - Random string for encrypting tokens
- `NEXT_PUBLIC_GISCUS_APP_HOST` - Your deployment URL
- `NEXT_PUBLIC_GITHUB_URL` - GitHub Enterprise Server URL (optional, defaults to https://github.com)

### GitHub Enterprise Server

For GitHub Enterprise Server deployments, set:
```bash
NEXT_PUBLIC_GITHUB_URL=https://github.company.com
```

## Production Deployment

### Custom Port

To run on a different port, modify the port mapping:

```bash
docker run -d \
  --name giscus \
  -p 8080:3000 \
  --env-file .env.local \
  giscus
```

Or in `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"
```

### Behind a Reverse Proxy

When running behind a reverse proxy (nginx, Apache, Traefik, etc.), ensure:
1. The proxy passes the correct headers (`X-Forwarded-Proto`, `X-Forwarded-Host`)
2. WebSocket connections are properly proxied if needed
3. Your `NEXT_PUBLIC_GISCUS_APP_HOST` matches your public URL

Example nginx configuration:
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Air-gapped Deployment

For environments without internet access:

1. Build on a connected machine:
   ```bash
   docker build -t giscus:offline .
   ```

2. Save the image:
   ```bash
   docker save giscus:offline > giscus-offline.tar
   ```

3. Transfer to offline environment and load:
   ```bash
   docker load < giscus-offline.tar
   ```

4. Run with your configuration:
   ```bash
   docker run -d \
     --name giscus \
     -p 3000:3000 \
     --env-file .env.local \
     giscus:offline
   ```

## Troubleshooting

### View container logs
```bash
docker logs giscus
# or with docker-compose
docker-compose logs
```

### Access container shell
```bash
docker exec -it giscus sh
```

### Check container status
```bash
docker ps -a | grep giscus
```

### Rebuild after changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Security Notes

- The Dockerfile runs the application as a non-root user (nextjs:nodejs)
- Always use strong, random values for `ENCRYPTION_PASSWORD`
- Keep your `.env.local` file secure and never commit it to version control
- Regularly update the base image for security patches:
  ```bash
  docker-compose pull
  docker-compose up -d
  ```

## More Information

For detailed self-hosting instructions, see [SELF-HOSTING.md](SELF-HOSTING.md)
