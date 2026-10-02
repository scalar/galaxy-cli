---
name: scalar-galaxy-cli-sdk
description: "CLI SDK for Scalar Galaxy API. Use when writing CLI code that calls Scalar Galaxy API with the @scalar/galaxy-cli package: installing it, constructing and authenticating the client, and calling API operations."
---

# Scalar Galaxy CLI SDK

Generated CLI client for Scalar Galaxy API, published as `@scalar/galaxy-cli`. Use the generated client instead of hand-writing HTTP requests.

## Install

```sh
# npm (requires Node.js)
npm install -g @scalar/galaxy-cli

# Homebrew — standalone binary, no Node.js required
brew install --cask scalar/galaxy-cli-tap/galaxy
# Had the `galaxy` formula installed? Run `brew uninstall --formula galaxy` before the install above.

# Direct download — standalone binary, no Node.js required
curl -fsSL "https://github.com/scalar/galaxy-cli/releases/latest/download/galaxy-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/x64/;s/aarch64/arm64/').tar.gz" | tar xz galaxy
sudo mv galaxy /usr/local/bin/

# Windows — download and extract galaxy-windows-x64.zip, then add it to PATH
# https://github.com/scalar/galaxy-cli/releases/latest/download/galaxy-windows-x64.zip
```

## Client setup and authentication

Provide credentials using the options below. Environment variables are read automatically when the target runtime supports them:

- `--bearer-auth` (env: `BEARER_AUTH`) — JWT Bearer token authentication
- `--basic-auth-username` (env: `BASIC_AUTH_USERNAME`) — Basic HTTP authentication
- `--basic-auth-password` (env: `BASIC_AUTH_PASSWORD`) — Basic HTTP authentication
- `--api-key-header` (env: `API_KEY_HEADER`) — API key request header
- `--api-key-query` (env: `API_KEY_QUERY`) — API key query parameter
- `--api-key-cookie` (env: `API_KEY_COOKIE`) — API key browser cookie
- `--o-auth2` (env: `SCALAR_O_AUTH2`) — OAuth 2.0 authentication
- `--open-id-connect` (env: `SCALAR_OPEN_ID_CONNECT`) — OpenID Connect Authentication

## Calling operations

```sh
galaxy [resource] [command] [flags]

galaxy planets list-all-data --bearer-auth "$BEARER_AUTH" --limit '10' --offset '0'
```

Method names, parameter shapes, and response types are generated from the API description — do not guess them. Look up the exact call signature in [api.md](../../../api.md) before writing a call.

## Error handling

Failed requests print a structured error to standard error and exit with a status that identifies the failure class. The error body carries the API's own `message` plus a stable `code`, the HTTP `status`, the `requestId`, and — where one applies — an actionable `hint`. Usage errors (exit `2`) are reported as a plain message instead, since no request was made. Exit statuses: `0` success, `1` `error`, `2` `usage`, `10` `auth-failed`, `11` `not-found`, `12` `rate-limited`, `13` `client-error`, `14` `server-error`, `15` `connection-error`.

## Working with this SDK programmatically

- Pass `--format toon` for token-efficient structured output: a uniform list collapses into one header plus a row per item, with a definitive `[N]` count. Use `--format json` when the output is fed to a JSON parser.
- Use `--max-items <count>` to bound paginated, streaming, and WebSocket commands before they fill the context, and `--transform <dot.path>` to keep only the field you need.
- Endpoint commands never prompt, so they are safe to run non-interactively. Credentials come from the documented environment variables or their flags. `login` is meant for a human at a terminal, so do not drive it: a flow that reads a credential refuses a non-terminal stdin outright, and a browser or device flow waits for a person to finish signing in elsewhere before it gives up. Set the credential through its environment variable or flag instead.
- Branch on the exit status rather than on stderr text: `0` success, `1` `error`, `2` `usage`, `10` `auth-failed`, `11` `not-found`, `12` `rate-limited`, `13` `client-error`, `14` `server-error`, `15` `connection-error`. A failed request repeats its class on stderr as a stable `code`, with a `hint` when there is a concrete next step; exit `2` is a plain message with no structured body, because the command never ran.
- Run `galaxy --help` or `galaxy <resource> --help` to discover commands and flags, and `man galaxy` for the full reference.

## Requirements

- Node.js 20 or newer — for the npm install only; the standalone binaries bundle their own runtime.

## Reference files

- [README.md](../../../README.md) — full feature tour: client options, retries and timeouts, logging.
- [api.md](../../../api.md) — complete catalogue of every operation with request and response types.
