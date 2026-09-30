# Playwright test image. Base is the official Playwright image, which ships the
# matching browsers and OS deps already, so tests run the same locally and in CI.
# Keep the tag in sync with @playwright/test in package.json.
# Docs: https://playwright.dev/docs/docker
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

WORKDIR /app

# Yarn 4 via Corepack (matches packageManager in package.json).
RUN corepack enable

# Install deps first for better layer caching.
COPY package.json yarn.lock* .yarnrc.yml* ./
RUN yarn install --immutable || yarn install

# App sources.
COPY . .

# Fail fast on type errors before running the suite.
RUN yarn typecheck

# Default: run the whole suite. Override at run time, e.g.
#   docker run --rm -e BASE_URL=http://host.docker.internal:3000 <image> yarn test:e2e
CMD ["yarn", "test"]
