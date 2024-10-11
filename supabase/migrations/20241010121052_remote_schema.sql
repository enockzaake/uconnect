

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


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."education_level" AS ENUM (
    'bachelors',
    'masters',
    'phd'
);


ALTER TYPE "public"."education_level" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."chosen_programs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "program_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL
);


ALTER TABLE "public"."chosen_programs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text",
    "description" "text",
    "image" "text",
    "start_date" "date",
    "venue" "text",
    "status" "text" DEFAULT 'active'::"text" NOT NULL
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "title" character varying(5),
    "first_name" character varying(50),
    "last_name" character varying(50),
    "email" character varying(50),
    "mobile" character varying(20),
    "photo" character varying(255),
    "dob" "date",
    "country_of_birth" character varying(100),
    "nationality" character varying(100),
    "gender" character varying(10),
    "address" "text",
    "highest_level" character varying(20),
    "status" "text",
    "documents" character varying(255),
    "ple_file" character varying(255),
    "uce_file" character varying(255),
    "uace_file" character varying(255),
    "a_level_combination" character varying(255),
    "o_level_points" character varying(255),
    "a_level_points" character varying(255),
    "academic_year" "text",
    "intake" "text",
    "personal_statement" "text",
    "permanent_home_address_line_1" character varying(100),
    "permanent_home_address_line_2" character varying(100),
    "permanent_home_address_line_3" character varying(100),
    "permanent_home_address_postcode" character varying(20),
    "permanent_home_address_country" character varying(100),
    "alternative_phone_number" character varying(20),
    "contact_address_line_1" character varying(20),
    "contact_address_line_2" character varying(20),
    "contact_address_line_3" character varying(20),
    "contact_address_postcode" character varying(20),
    "contact_address_country" character varying(100),
    "disability_or_special_needs" "text",
    "parental_higher_education" character varying(3),
    "ethnicity" character varying(255),
    "country_of_permanent_residence" character varying(100),
    "tuition_fees_payer" character varying(255),
    "decision_influence" "text",
    "job_title" character varying(100),
    "employed_from" "date",
    "employed_to" "date",
    "working_hours" character varying(20),
    "employer_name" character varying(255),
    "employer_address" character varying(255),
    "employer_contact" character varying(255),
    "referee_1_full_name" character varying(255),
    "referee_1_position" character varying(255),
    "referee_1_organisation" character varying(255),
    "referee_1_address" character varying(255),
    "referee_1_postcode" character varying(20),
    "referee_1_telephone_number" character varying(20),
    "referee_1_email_address" character varying(255),
    "referee_1_capacity_known" character varying(255),
    "referee_1_reference_file" "text",
    "referee_2_full_name" character varying(255),
    "referee_2_position" character varying(255),
    "referee_2_organisation" character varying(255),
    "referee_2_address" character varying(255),
    "referee_2_postcode" character varying(20),
    "referee_2_telephone_number" character varying(20),
    "referee_2_email_address" character varying(255),
    "referee_2_capacity_known" character varying(255),
    "referee_2_reference_file" "text"
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."programs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text",
    "level" "public"."education_level" DEFAULT 'bachelors'::"public"."education_level" NOT NULL,
    "institution" "text",
    "duration" "text",
    "created_at" "date",
    "updated_at" "date",
    "fulltime" boolean DEFAULT true,
    "description" "text",
    "image" "text" DEFAULT ''::"text"
);


ALTER TABLE "public"."programs" OWNER TO "postgres";


ALTER TABLE ONLY "public"."chosen_programs"
    ADD CONSTRAINT "chosen_programs_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."chosen_programs"
    ADD CONSTRAINT "chosen_programs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."programs"
    ADD CONSTRAINT "programs_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."programs"
    ADD CONSTRAINT "programs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."chosen_programs"
    ADD CONSTRAINT "unique_program_user" UNIQUE ("program_id", "user_id");



ALTER TABLE ONLY "public"."chosen_programs"
    ADD CONSTRAINT "chosen_programs_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."chosen_programs"
    ADD CONSTRAINT "chosen_programs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."chosen_programs"
    ADD CONSTRAINT "chosen_programs_user_id_fkey1" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































GRANT ALL ON TABLE "public"."chosen_programs" TO "anon";
GRANT ALL ON TABLE "public"."chosen_programs" TO "authenticated";
GRANT ALL ON TABLE "public"."chosen_programs" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."programs" TO "anon";
GRANT ALL ON TABLE "public"."programs" TO "authenticated";
GRANT ALL ON TABLE "public"."programs" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
