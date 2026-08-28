# Scalar Galaxy CLI API

Complete reference of every operation, grouped by resource. See [the README](./README.md) for usage and configuration.

## Contents

- [`Planets`](#planets)
  - [Get all planets](#get-all-planets)
  - [Create a planet](#create-a-planet)
  - [Get a planet](#get-a-planet)
  - [Update a planet](#update-a-planet)
  - [Delete a planet](#delete-a-planet)
  - [Upload an image to a planet](#upload-an-image-to-a-planet)
- [`CelestialBodies`](#celestialbodies)
  - [Create a celestial body](#create-a-celestial-body)
- [`Authentication`](#authentication)
  - [Create a user](#create-a-user)
  - [Get a token](#get-a-token)
  - [Get authenticated user](#get-authenticated-user)

## `Planets`

Everything about planets

### Get all planets

It's easy to say you know them all, but do you really? Retrieve all the planets and check whether you missed one.

```sh
galaxy planets list-all-data --bearer-auth "$BEARER_AUTH" --limit '10' --offset '0'
```

### Create a planet

Time to play god and create a new planet. What do you think? Ah, don't think too much. What could go wrong anyway?

```sh
galaxy planets create --bearer-auth "$BEARER_AUTH" --name 'Mars'
```

### Get a planet

You'll better learn a little bit more about the planets. It might come in handy once space travel is available for everyone.

```sh
galaxy planets retrieve '1' --bearer-auth "$BEARER_AUTH"
```

### Update a planet

Sometimes you make mistakes, that's fine. No worries, you can update all planets.

```sh
galaxy planets update '1' --bearer-auth "$BEARER_AUTH" --name 'Mars'
```

### Delete a planet

This endpoint was used to delete planets. Unfortunately, that caused a lot of trouble for planets with life. So, this endpoint is now deprecated and should not be used anymore.

```sh
galaxy planets delete '1' --bearer-auth "$BEARER_AUTH"
```

### Upload an image to a planet

Got a crazy good photo of a planet? Share it with the world!

```sh
galaxy planets delte-image '1' --bearer-auth "$BEARER_AUTH"
```

## `CelestialBodies`

Celestial bodies are the planets and satellites in the Scalar Galaxy.

### Create a celestial body

Stars, moons, comets, the occasional rogue asteroid — if it glows or drifts through the void, you can add it here.

```sh
galaxy celestial-bodies create --bearer-auth "$BEARER_AUTH"
```

## `Authentication`

Some endpoints are public, but some require authentication. We provide all the required endpoints to create an account and authorize yourself.

### Create a user

Time to create a user account, eh?

```sh
galaxy authentication create-user --bearer-auth "$BEARER_AUTH" --name 'Marc' --email 'marc@scalar.com' --password 'i-love-scalar'
```

### Get a token

Yeah, this is the boring security stuff. Just get your super secret token and move on.

```sh
galaxy authentication create-token --bearer-auth "$BEARER_AUTH" --email 'marc@scalar.com' --password 'i-love-scalar'
```

### Get authenticated user

Find yourself they say. That's what you can do here.

```sh
galaxy authentication list-me --bearer-auth "$BEARER_AUTH"
```
