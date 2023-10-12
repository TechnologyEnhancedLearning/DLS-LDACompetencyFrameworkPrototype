CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Frameworks

CREATE TABLE frameworks (
    id serial PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    slug VARCHAR (50) UNIQUE NOT NULL,
    owner_id integer NOT NULL,
    status VARCHAR(50) DEFAULT 'Draft',
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

CREATE TABLE competency_groups (
    id serial PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    description TEXT
);

CREATE TABLE competencies (
    id serial PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    description TEXT,
    competency_group_id integer,
    ordering integer NOT NULL,
    CONSTRAINT competencies_competency_group_id_fkey FOREIGN KEY (competency_group_id)
        REFERENCES competency_groups (id) MATCH SIMPLE
        ON DELETE RESTRICT,
    UNIQUE (competency_group_id, ordering)
);

CREATE TABLE frameworks_structure (
    id serial PRIMARY KEY,
    competency_group_id integer,
    competency_id integer,
    framework_id integer NOT NULL,
    ordering integer NOT NULL,
  CONSTRAINT frameworks_structure_competency_group_id_fkey FOREIGN KEY (competency_group_id)
      REFERENCES competency_groups (id) MATCH SIMPLE
      ON DELETE RESTRICT,
  CONSTRAINT frameworks_structure_competency_id_fkey FOREIGN KEY (competency_id)
      REFERENCES competencies (id) MATCH SIMPLE
      ON DELETE RESTRICT,
  CONSTRAINT frameworks_structure_framework_id_fkey FOREIGN KEY (framework_id)
      REFERENCES frameworks (id) MATCH SIMPLE
      ON DELETE CASCADE,
    UNIQUE (framework_id, ordering),
  CONSTRAINT competency_group_xor_competency CHECK (
        num_nonnulls(competency_id, competency_group_id) = 1
  )
);

CREATE TABLE competency_criteria (
    id serial PRIMARY KEY,
    description text NOT NULL,
    ordering integer NOT NULL,
    competency_id integer NOT NULL,
    type VARCHAR(50),
    CONSTRAINT criteria_competency_id_fkey FOREIGN KEY (competency_id)
        REFERENCES competencies (id) MATCH SIMPLE
        ON DELETE CASCADE,
    UNIQUE (competency_id, ordering, type)
);

-- Jobs

CREATE TABLE national_job_profiles (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    job_statement TEXT,
    category VARCHAR(255)
);

CREATE TABLE national_job_profile_factors (
    id integer PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE national_job_profile_requirements (
    id serial PRIMARY KEY,
    national_job_profile_id integer NOT NULL,
    factor_id integer NOT NULL,
    description TEXT,
    je_level VARCHAR(50),
    je_level_number integer,
    score integer,
    constraint national_job_requirements_profile_id_fkey FOREIGN KEY (national_job_profile_id)
        REFERENCES national_job_profiles (id) MATCH SIMPLE
        ON DELETE RESTRICT,
    constraint national_job_profile_requirements_factor_id_fkey FOREIGN KEY (factor_id)
        REFERENCES national_job_profile_factors (id) MATCH SIMPLE
        ON DELETE RESTRICT
);

CREATE TABLE job_roles (
    id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    description TEXT,
    national_job_profile_id integer,
    public BOOLEAN DEFAULT FALSE,
    owner_id integer NOT NULL,
    constraint national_job_profile_id_fkey FOREIGN KEY (national_job_profile_id)
        REFERENCES national_job_profiles (id) MATCH SIMPLE
        ON DELETE RESTRICT,
    constraint job_roles_owner_id_fkey FOREIGN KEY (owner_id)
        REFERENCES users (id) MATCH SIMPLE
        ON DELETE RESTRICT
);

CREATE TABLE job_role_requirements (
    id serial PRIMARY KEY,
    job_role_id integer NOT NULL,
    competency_id integer NOT NULL,
    constraint role_requirements_job_role_id_fkey FOREIGN KEY (job_role_id)
        REFERENCES job_roles (id) MATCH SIMPLE
        ON DELETE CASCADE,
    constraint role_requirements_competency_id_fkey FOREIGN KEY (competency_id)
        REFERENCES competencies (id) MATCH SIMPLE
        ON DELETE RESTRICT,
    UNIQUE (job_role_id, competency_id)
);

-- Training Needs Analysis

CREATE TABLE assessments (
    id serial PRIMARY KEY,
    job_role_id integer NOT NULL,
    user_id integer NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    constraint assessments_job_role_id_fkey FOREIGN KEY (job_role_id)
        REFERENCES job_roles (id) MATCH SIMPLE
        ON DELETE RESTRICT,
    constraint assessments_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON DELETE CASCADE
);

CREATE TABLE assessment_components (
    id serial PRIMARY KEY,
    assessment_id integer NOT NULL,
    competency_id integer NOT NULL,
    score integer, -- between 0 and 100 (or more),
    result VARCHAR(50),
    result_explanation TEXT,
    constraint assessment_components_assessment_id_fkey FOREIGN KEY (assessment_id)
        REFERENCES assessments (id) MATCH SIMPLE
        ON DELETE CASCADE,
    constraint assessment_components_competency_id_fkey FOREIGN KEY (competency_id)
        REFERENCES competencies (id) MATCH SIMPLE
        ON DELETE CASCADE
);

CREATE TABLE self_appraisal_questions (
    id serial PRIMARY KEY,
    assessment_id integer NOT NULL,
    competency_id integer NOT NULL,
    confidence INTEGER,
    relevance INTEGER,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    constraint self_appraisal_questions_assessment_id_fkey FOREIGN KEY (assessment_id)
        REFERENCES assessments (id) MATCH SIMPLE
        ON DELETE CASCADE,
    constraint self_appraisal_questions_competency_id_fkey FOREIGN KEY (competency_id)
        REFERENCES competencies (id) MATCH SIMPLE
        ON DELETE CASCADE
);

CREATE TABLE assessment_evidence (
    id serial PRIMARY KEY,
    assessment_id integer NOT NULL,
    competency_ids VARCHAR(50),
    body TEXT,
    user_id integer NOT NULL,
    constraint assessment_evidence_assessment_id_fkey FOREIGN KEY (assessment_id)
        REFERENCES assessments (id) MATCH SIMPLE,
    constraint assessment_evidence_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
);

-- Sharing

CREATE TABLE shares (
    id serial PRIMARY KEY,
    job_role_id integer NOT NULL,
    recipient_id integer NOT NULL,
    constraint shares_job_role_id_fkey FOREIGN KEY (job_role_id)
        REFERENCES job_roles (id) MATCH SIMPLE,
    constraint shares_recipient_id_fkey FOREIGN KEY (recipient_id)
        REFERENCES users (id) MATCH SIMPLE
);