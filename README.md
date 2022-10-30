# payment_gateway

education payment gateway using midtrans

# API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /profile`
- `PATCH /subscription`

&nbsp;

## 1. POST /register

Request:

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_

```json
{
  "id": 1,
  "isSubscribed": false
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email cannot be empty"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "password cannot be empty"
}
```

&nbsp;

## 2. POST /login

Request:

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "isSubscribed": false,
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid email/password"
}
```

&nbsp;

## 3. GET /profile

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "isSubscribed": false
}
```

&nbsp;

## 4. PATCH /subscription

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "user with id 1 now is a subscriber"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You already a subscriber"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "authentication failed"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
