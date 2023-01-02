CREATE DATABASE dev_database;

CREATE DATABASE test_database;

CREATE USER dev_user WITH login password 'admin';

GRANT ALL PRIVILEGES ON DATABASE dev_database TO dev_user;

GRANT USAGE,CREATE ON SCHEMA public TO dev_user;

ALTER DEFAULT PRIVILEGES
FOR USER dev_user
IN SCHEMA public
GRANT ALL ON TABLES TO dev_user;

CREATE USER test_user WITH login password 'admin';

GRANT ALL PRIVILEGES ON DATABASE test_database TO test_user;

GRANT USAGE,CREATE ON SCHEMA public TO test_user;

ALTER DEFAULT PRIVILEGES
FOR USER test_user
IN SCHEMA public
GRANT ALL ON TABLES TO test_user;
