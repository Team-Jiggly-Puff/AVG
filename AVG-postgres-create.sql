SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE TABLE public.users (
    "_id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "age" INT,
    "email" VARCHAR(255) NOT NULL,
    "region" VARCHAR(255),
    "privilege" VARCHAR(255) NOT NULL DEFAULT 'user',
    "password" VARCHAR(255),
    CONSTRAINT "unique_email" UNIQUE ("email"), 
    CONSTRAINT "unique_username" UNIQUE ("username")
) WITH (oids = false);

CREATE TABLE public.polls (
    "_id" SERIAL PRIMARY KEY,
    "topic" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "created_by" INTEGER NOT NULL
) WITH (oids = false);

CREATE TABLE public.questions (
    "_id" SERIAL PRIMARY KEY,
    "question" VARCHAR(255) NOT NULL,
    "poll_id" INTEGER NOT NULL,
    "options_type" VARCHAR(255) NOT NULL
    -- CONSTRAINT "questions_fk" FOREIGN KEY ("poll_id") REFERENCES "polls"("_id")
) WITH (oids = false);

CREATE TABLE public.options (
    "_id" SERIAL PRIMARY KEY,
    "option" VARCHAR(255) NOT NULL,
    "question_id" INTEGER NOT NULL,
    "data_type" VARCHAR(255) NOT NULL
    -- CONSTRAINT "options_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("_id")
) WITH (oids = false);

CREATE TABLE public.responses (
    "_id" SERIAL PRIMARY KEY,
    "option_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
    -- CONSTRAINT "responses_fk" FOREIGN KEY ("option_id") REFERENCES "options"("_id"),
    -- CONSTRAINT "responses_fk2" FOREIGN KEY ("user_id") REFERENCES "users"("_id")
) WITH (oids = false);

ALTER TABLE polls ADD CONSTRAINT "polls_fk" FOREIGN KEY ("created_by") REFERENCES "users"("_id");
ALTER TABLE questions ADD CONSTRAINT "questions_fk" FOREIGN KEY ("poll_id") REFERENCES "polls"("_id");
ALTER TABLE options ADD CONSTRAINT "options_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("_id");
ALTER TABLE responses ADD CONSTRAINT "responses_fk" FOREIGN KEY ("option_id") REFERENCES "options"("_id");
ALTER TABLE responses ADD CONSTRAINT "responses_fk2" FOREIGN KEY ("user_id") REFERENCES "users"("_id");

