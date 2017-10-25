# node-calendar-api
REST Calendar API built with Node.js, Express.js, and a MongoDB datastore.

## User Routes
POST /api/users --> Register User
POST /api/users/signin --> Sign in user
PUT /api/users/:user_id --> Update user
DELETE /api/users/:user_id --> Remove User

## Event Routes
POST /api/users/:users_id/events --> Create Event for user
GET /api/users/:user_id/events --> List all events for user
GET /api/users/:user_id/events/:event_id --> List specific event
PUT /api/users/:user_id/events/:event_id --> Update event
DELETE /api/users/:user_id/events/:event_id --> Remove event

## Task Routes
POST /api/users/:user_id/tasks --> Create task for user
GET /api/users/:user_id/tasks --> List all tasks for user
PUT /api/users/:user_id/tasks/:task_id --> Update task
DELTE /api/users/:user_id/tasks/:task_id --> Remove task

## Pending Events Routes
POST /api/users/:user_id/events/share--> Share event with another user
GET /api/users/:user_id/pending/events --> List all pending events for user
PUT /api/users/:user_id/pending/events --> Accept pending events

## Pending Friends Routes
POST /api/users/:user_id/friends --> Ask to be friends with other user
GET /api/users/:user_id/pending/friends --> List all pending friend requests
PUT /api/users/:user_id/friends --> Accept pending friend request
