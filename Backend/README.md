# Users API

## POST /users/register

Creates a new user account and returns a JSON Web Token.

- Method: POST
- Path: `/users/register`
- Content-Type: `application/json`

### Request body (JSON)

All fields are required.

- `username` (string) — min length: 2
- `email` (string) — must be a valid email address
- `password` (string) — min length: 8

Example request body:

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "strongpassword123"
}
```

### Responses

- 201 Created
  - Description: User created successfully.
  - Body: `{ message: "User registered successfully", token: "<jwt>", user: { ... } }`

- 400 Bad Request
  - Description: Validation failed. Returns an `errors` array describing validation issues.
  - Body example: `{ "errors": [ { "msg": "Invalid email address", "param": "email", ... } ] }`

- 500 Internal Server Error
  - Description: Unexpected server error or DB error.

## POST /users/login

Authenticate a user and return a JSON Web Token on success.

- Method: POST
- Path: `/users/login`
- Content-Type: `application/json`

### Request body (JSON)

All fields are required.

- `email` (string) — must be a valid email address
- `password` (string) — min length: 8

Example request body:

```json
{ "email": "johndoe@example.com", "password": "strongpassword123" }
```

### Responses

- 200 OK
  - Description: Login successful.
  - Body: `{ message: "Login successful", token: "<jwt>", user: { ... } }`

- 400 Bad Request
  - Description: Validation failed. Returns an `errors` array.

- 401 Unauthorized
  - Description: Invalid email or password.
  - Body example: `{ "message": "Invalid email or password" }`

- 500 Internal Server Error
  - Description: Unexpected server or DB error.

### Notes

- Environment variables required: `DATABASE_URL` (MongoDB URI) and `JWT_SECRET` (used to sign the token).
- Passwords are hashed before storage; the endpoint returns a signed JWT token valid for 1 hour.

### Example curl

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"johndoe@example.com","password":"strongpassword123"}'
```

## GET /users/profile

Retrieve the authenticated user's profile.

- Method: GET
- Path: `/users/profile`
- Headers:
  - `Authorization: Bearer <token>`

### Responses

- 200 OK
  - Description: Returns the authenticated user's profile (password is not included).
  - Body example: `{ "_id": "...", "username": "johndoe", "email": "johndoe@example.com", ... }`

- 401 Unauthorized
  - Description: Missing or invalid token.
  - Body example: `{ "message": "Unauthorized" }`

- 500 Internal Server Error
  - Description: Unexpected server or DB error.

### Notes

- This endpoint requires a valid JWT in the `Authorization` header (Bearer token). Tokens are signed using `JWT_SECRET` and are valid for 1 hour.

### Example curl

```bash
curl -H "Authorization: Bearer <jwt>" http://localhost:4000/users/profile
```
