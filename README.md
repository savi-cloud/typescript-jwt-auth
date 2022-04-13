yarn add express yup config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid

yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/yup @types/pino @types/mongoose @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node typescript -D


# env file
```
HTTP_PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DEFAULT_DB=
DB_PORT=
ACCESS_TOKEN_EXPIRE=
REFRESH_TOKEN_EXPIRE=
```

## Important!!! Make sure you generate new keys
# Generate new keys: https://travistidwell.com/jsencrypt/demo/
ACCESS_TOKEN_PUBLIC_KEY=
ACCESS_TOKEN_PRIVATE_KEY=
REFRESH_TOKEN_PRIVATE_KEY=
REFRESH_TOKEN_PUBLIC_KEY=


Routes

/api/user/create-user
/api/user/me

/api/session/login
/api/session/refresh


Curl requests

Create user
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"firstName":"Noah", "lastName":"Peterson", "password":"p@ssW0rd83", "passwordConfirmation":"p@ssW0rd83", "email":"gmail@noah.com"}' \
    http://localhost:8000/api/user/create-user

Login
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"email":"gmail@noah.com", "password":"p@ssW0rd83"}' \
    http://localhost:8000/api/session/login

Refresh access token
    curl --header "x-refresh: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoyLCJpYXQiOjE2NDk4NjMxNjMsImV4cCI6MTY1MjQ1NTE2M30.GngtuD8aOLDy2BaQALZ0BFiklxv9mwBqXaOADOClfqhkvliKSkWuAt3kc6A8t1pN6_JLZMRwkdw8OiY0TbU9Jm88622Y1EdDZp8ftNnpVMgfJrp3z-apJGSe2TysqYf_hPRLOKjOVamri7Rm9Hv0aIAL8eXI4papp_3aRbAVd00" \
    --request POST \
    http://localhost:8000/api/session/refresh

User details
    curl --header "Authorization":"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJmaXJzdE5hbWUiOiJOb2FoIiwibGFzdE5hbWUiOiJQZXRlcnNvbiIsInBhc3N3b3JkIjoiJGFyZ29uMmkkdj0xOSRtPTQwOTYsdD0zLHA9MSRJS2NKazBlV3hDblNhL3pWV014K1lRJDVhYXZvSFg1V3BCR2hUeFFZT2l1cjJ1MFRacGwzVFpOL29OL041VGhtSkEiLCJlbWFpbCI6ImdtYWlsQG5vYWguY29tIiwiaWF0IjoxNjQ5ODYzMjA3LCJleHAiOjE2NDk4NjM1MDd9.D0V5znLw-uljJyiOULnzAQIwzayELgYYXzZAkpIhjpLnfAPP3bvTBg5EJ_klVIOvaCSzK5Gg72ER928LEAO4CxMt9Bx2QpwUV8XM64CS2fk-V41hZv8q2ZEZn3bPDi-XYOs7xyGk86rhLKvHOvcTn6t9dHqzF8Tx7iMeEATSMe8" \
    --request GET \
    http://localhost:8000/api/user/my-details