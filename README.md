# Scalar Galaxy

This library provides convenient access to the Scalar Galaxy REST API from the command line.

The full API of this library can be found in [api.md](./api.md).

<br />

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](./api.md)
- [Shell Completion](#shell-completion)
- [Manual Pages](#manual-pages)
- [Authentication](#authentication)
- [Errors](#errors)
- [Client Options](#client-options)
- [Retries and Timeouts](#retries-and-timeouts)
- [Helpers](#helpers)
- [Logging](#logging)
- [Requirements](#requirements)

<br />

## Installation

```sh
# Homebrew — standalone binary, no Node.js required
brew tap scalar/galaxy-cl https://github.com/scalar/galaxy-cl
brew install scalargalaxy
```

<br />

## Usage

```sh
scalargalaxy [resource] [command] [flags]

scalargalaxy planets list-all-data --bearer-auth "$BEARER_AUTH" --limit '10' --offset '0'
```

The examples in the following sections assume a `client` configured as shown above.

See the [API reference](./api.md) for every available operation.

<br />

## Shell Completion

`scalargalaxy completion <shell>` prints a completion script for bash, zsh, and fish. Add the matching line to your shell startup file to complete commands, subcommands, and flags with Tab.

```sh
# bash (~/.bashrc)
eval "$(scalargalaxy completion bash)"

# zsh (~/.zshrc)
eval "$(scalargalaxy completion zsh)"

# fish (~/.config/fish/config.fish)
scalargalaxy completion fish | source
```

<br />

## Manual Pages

Installing the package globally also installs man pages. `man scalargalaxy` lists every command, and each command has its own page named after the command with spaces and `:` replaced by `-`.

```sh
man scalargalaxy
man scalargalaxy-<resource>-<command>
```

<br />

## Authentication

Pass credentials to the generated client constructor. Environment variables are read automatically when supported by the target runtime.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--bearer-auth` | `string \| provider` | - | JWT Bearer token authentication Defaults to BEARER_AUTH. |
| `--basic-auth-username` | `string \| provider` | - | Basic HTTP authentication Defaults to BASIC_AUTH_USERNAME. |
| `--basic-auth-password` | `string \| provider` | - | Basic HTTP authentication Defaults to BASIC_AUTH_PASSWORD. |
| `--api-key-header` | `string \| provider` | - | API key request header Defaults to API_KEY_HEADER. |
| `--api-key-query` | `string \| provider` | - | API key query parameter Defaults to API_KEY_QUERY. |
| `--api-key-cookie` | `string \| provider` | - | API key browser cookie Defaults to API_KEY_COOKIE. |
| `--o-auth2` | `string \| provider` | - | OAuth 2.0 authentication Defaults to SCALAR_O_AUTH2. |
| `--open-id-connect` | `string \| provider` | - | OpenID Connect Authentication Defaults to SCALAR_OPEN_ID_CONNECT. |

Declared schemes:

- `bearerAuth` bearer token
- `basicAuth` basic authentication
- `apiKeyHeader` API key in header `X-API-Key`
- `apiKeyQuery` API key in query `api_key`
- `apiKeyCookie` API key in cookie `api_key`
- `oAuth2` OAuth2/OpenID Connect
- `openIdConnect` OAuth2/OpenID Connect

<br />

## Errors

Failed requests print a structured error to standard error and exit with a status that identifies the failure class. The error body carries the API's own `message` plus a stable `code`, the HTTP `status`, the `requestId`, and — where one applies — an actionable `hint`. Usage errors (exit `2`) are reported as a plain message instead, since no request was made. Exit statuses: `0` success, `1` `error`, `2` `usage`, `10` `auth-failed`, `11` `not-found`, `12` `rate-limited`, `13` `client-error`, `14` `server-error`, `15` `connection-error`.

Documented error statuses: `400`, `401`, `403`, `404`, `409`, `422`, `429`.

<br />

## Client Options

Configure the generated client by setting any of these options when you create it.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--base-url` | `<url>` | - | Override the base URL for API requests. |
| `--timeout` | `<ms>` | - | Request timeout in milliseconds. |
| `--max-retries` | `<count>` | - | Number of retries for retryable failures. |
| `--debug` | `flag` | - | Enable SDK debug logging. |

<br />

## Retries and Timeouts

Generated clients support request timeouts and retry temporary failures such as network errors, 408, 409, 429, and 5xx responses. Retry delays honor `Retry-After` headers when present. Tune the retry and timeout client options shown above, or override them per request.

<br />

## Helpers

- `--format <format>` — output format: `auto`, `json`, `jsonl`, `pretty`, `raw`, `toon`, or `yaml`.
- `--format-error <format>` — error output format: `auto`, `json`, `jsonl`, `pretty`, `raw`, `toon`, or `yaml`.
- `--format toon` — token-efficient structured output for AI agents; uniform lists collapse into one header plus a row per item, with a definitive item count.
- `--transform <path>` and `--transform-error <path>` — dot-path transform for data/error output.
- `--raw-output`, `-r` — print transformed string values without JSON quotes.
- `--max-items <count>` — bound iterator, streaming, and WebSocket command output.
- Errors carry a stable `code` and an actionable `hint` beside the API's own message, and each failure class exits with its own status: `1` `error`, `2` `usage`, `10` `auth-failed`, `11` `not-found`, `12` `rate-limited`, `13` `client-error`, `14` `server-error`, `15` `connection-error`.

<br />

## Logging

- Pass `--debug` to any command to enable SDK debug logging on stderr.

<br />

## Requirements

- None — the standalone binaries bundle their own runtime.

Powered by Scalar.
