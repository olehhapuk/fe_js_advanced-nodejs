DROP TABLE IF EXISTS "Post";
DROP TABLE IF EXISTS "User";

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  is_online BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "Post" (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  owner_id INT,
  CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES "User"(id) ON DELETE
  SET NULL
);

INSERT INTO "User" (username, password)
VALUES ('user1', 'password1'),
  ('user2', 'great_password'),
  ('user3', '12345');

INSERT INTO "Post" (owner_id, body)
VALUES (1, 'Hello SQL');

DELETE FROM "User"
WHERE id = 1;

SELECT "Post".id,
  "Post".body,
  "Post".owner_id,
  "User".username,
  "User".is_online
FROM "Post"
  LEFT JOIN "User" ON "Post".owner_id = "User".id;