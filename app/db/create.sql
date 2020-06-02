CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE frameworks (
    id serial PRIMARY KEY,
    title VARCHAR (50) NOT NULL,
    slug VARCHAR (50) UNIQUE NOT NULL,
    owner_id integer NOT NULL,
    CONSTRAINT frameworks_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE working_groups_links (
    user_id integer NOT NULL,
    framework_id integer NOT NULL,
    PRIMARY KEY (user_id, framework_id),
  CONSTRAINT working_group_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT working_group_framework_id_fkey FOREIGN KEY (framework_id)
      REFERENCES frameworks (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
