// GitHub

import { env } from '../lib/variables';

// Determine if we're using GitHub Enterprise Server
const isGitHubEnterprise = env.github_url !== 'https://github.com';

// GitHub Enterprise Server uses /api/v3 for REST API and /api/graphql for GraphQL
// GitHub.com uses api.github.com for both REST and GraphQL
const GITHUB_API_HOST = isGitHubEnterprise ? `${env.github_url}/api/v3` : 'https://api.github.com';

const GITHUB_GRAPHQL_HOST = isGitHubEnterprise ? `${env.github_url}/api` : 'https://api.github.com';

export const GITHUB_GRAPHQL_API_URL = `${GITHUB_GRAPHQL_HOST}/graphql`;

export const GITHUB_MARKDOWN_API_URL = `${GITHUB_API_HOST}/markdown`;

export const GITHUB_REPOS_API_URL = `${GITHUB_API_HOST}/repos`;

export const GITHUB_INSTALLATIONS_URL = `${GITHUB_API_HOST}/app/installations`;

export const GITHUB_REPO_INSTALLATION_URL = (repoWithOwner: string) =>
  `${GITHUB_API_HOST}/repos/${repoWithOwner}/installation`;

export const GITHUB_ACCESS_TOKEN_URL = (id: number) =>
  `${GITHUB_INSTALLATIONS_URL}/${id}/access_tokens`;

export const GITHUB_WEB_URL = env.github_url;

export const GITHUB_OAUTH_AUTHORIZE_URL = `${env.github_url}/login/oauth/authorize`;

export const GITHUB_OAUTH_ACCESS_TOKEN_URL = `${env.github_url}/login/oauth/access_token`;

export const GITHUB_API_URL = GITHUB_API_HOST;
