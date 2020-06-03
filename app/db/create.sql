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
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT working_group_framework_id_fkey FOREIGN KEY (framework_id)
      REFERENCES frameworks (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE competencies (
    id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    description TEXT
);

CREATE TABLE competencies_frameworks (
    competency_id integer NOT NULL,
    framework_id integer NOT NULL,
    PRIMARY KEY (competency_id, framework_id),
    ordering integer NOT NULL,
  CONSTRAINT competencies_frameworks_competency_id_fkey FOREIGN KEY (competency_id)
      REFERENCES competencies (id) MATCH SIMPLE
      ON DELETE RESTRICT,
  CONSTRAINT competencies_frameworks_framework_id_fkey FOREIGN KEY (framework_id)
      REFERENCES frameworks (id) MATCH SIMPLE
      ON DELETE CASCADE,
    UNIQUE (framework_id, ordering)
);
