import { ReactNode } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database";

export interface StudentProfile {
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  photo: string;
  dob: string;
  country_of_birth: string;
  nationality: string;
  gender: string;
  address: string;
  highest_level: string;
  status: string;
  documents: string;
  ple_file: string;
  uce_file: string;
  uace_file: string;
  a_level_combination: string;
  o_level_points: string;
  a_level_points: string;
  academic_year: string;
  intake: string;
  personal_statement: string;
  permanent_home_address_line_1: string;
  permanent_home_address_line_2: string;
  permanent_home_address_line_3: string;
  permanent_home_address_postcode: string;
  permanent_home_address_country: string;
  alternative_phone_number: string;
  contact_address_line_1: string;
  contact_address_line_2: string;
  contact_address_line_3: string;
  contact_address_postcode: string;
  contact_address_country: string;
  disability_or_special_needs: string;
  parental_higher_education: string;
  ethnicity: string;
  country_of_permanent_residence: string;
  tuition_fees_payer: string;
  decision_influence: string;
  job_title: string;
  employed_from: string;
  employed_to: string;
  working_hours: string;
  employer_name: string;
  employer_address: string;
  employer_contact: string;
  referee_1_full_name: string;
  referee_1_position: string;
  referee_1_organisation: string;
  referee_1_address: string;
  referee_1_postcode: string;
  referee_1_telephone_number: string;
  referee_1_email_address: string;
  referee_1_capacity_known: string;
  referee_1_reference_file: string;
  referee_2_full_name: string;
  referee_2_position: string;
  referee_2_organisation: string;
  referee_2_address: string;
  referee_2_postcode: string;
  referee_2_telephone_number: string;
  referee_2_email_address: string;
  referee_2_capacity_known: string;
  referee_2_reference_file: string;
  progress: number;
}

export interface SidebarLink {
  icon: ReactNode;
  label: string;
  href: string;
}

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Section =
  | "personal"
  | "academic"
  | "contact"
  | "additional"
  | "employment"
  | "referees";

// npx supabase gen types --lang=typescript --project-id jvrukztjlmzrqqkxmnof --schema public > types/database.ts
