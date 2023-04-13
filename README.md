# tracker-be
This is the Backend application for the Tasker application. 
The application itself is a TODO list maker, so this part handles the boards and their task lists.

## Languages
The application is based on the following languages:
- **Fastify**: for the server
- **Prisma**: for the ORM
- **Zod**: for the validations
- **Postgresql**: as the DB 

## Services
The application handles basically two types of entities:
- **Task**: a single task belonging to a Board
- **Board**: a container of multiple tasks with some additional data
