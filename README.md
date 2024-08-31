Setup Commands after running git clone of this repo

-------------------------------------------

// initialize npm in project
1. npm init

// install all dependencies
2. npm install

// Run this command where db.sql file resides in order to restore postgreSQL DB schema. **NOTE: Should be done after creating your own DB locally with it's respective username
3. (inside of terminal) psql -U <username> <db_name> < db.sql 
