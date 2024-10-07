export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      appplication_programs: {
        Row: {
          application_id: string | null
          id: string | null
          program_id: string | null
        }
        Insert: {
          application_id?: string | null
          id?: string | null
          program_id?: string | null
        }
        Update: {
          application_id?: string | null
          id?: string | null
          program_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          a_level_combination: string | null
          a_level_points: string | null
          academic_year: string | null
          address: string | null
          alternative_phone_number: string | null
          contact_address_country: string | null
          contact_address_line_1: string | null
          contact_address_line_2: string | null
          contact_address_line_3: string | null
          contact_address_postcode: string | null
          country_of_birth: string | null
          country_of_permanent_residence: string | null
          decision_influence: string | null
          disability_or_special_needs: string | null
          dob: string | null
          documents: string | null
          email: string | null
          employed_from: string | null
          employed_to: string | null
          employer_address: string | null
          employer_contact: string | null
          employer_name: string | null
          ethnicity: string | null
          first_name: string | null
          gender: string | null
          highest_level: string | null
          id: string
          intake: string | null
          job_title: string | null
          last_name: string | null
          mobile: string | null
          nationality: string | null
          o_level_points: string | null
          parental_higher_education: string | null
          permanent_home_address_country: string | null
          permanent_home_address_line_1: string | null
          permanent_home_address_line_2: string | null
          permanent_home_address_line_3: string | null
          permanent_home_address_postcode: string | null
          personal_statement: string | null
          photo: string | null
          ple_file: string | null
          referee_1_address: string | null
          referee_1_capacity_known: string | null
          referee_1_email_address: string | null
          referee_1_full_name: string | null
          referee_1_organisation: string | null
          referee_1_position: string | null
          referee_1_postcode: string | null
          referee_1_reference_file: string | null
          referee_1_telephone_number: string | null
          referee_2_address: string | null
          referee_2_capacity_known: string | null
          referee_2_email_address: string | null
          referee_2_full_name: string | null
          referee_2_organisation: string | null
          referee_2_position: string | null
          referee_2_postcode: string | null
          referee_2_reference_file: string | null
          referee_2_telephone_number: string | null
          status: string | null
          title: string | null
          tuition_fees_payer: string | null
          uace_file: string | null
          uce_file: string | null
          working_hours: string | null
        }
        Insert: {
          a_level_combination?: string | null
          a_level_points?: string | null
          academic_year?: string | null
          address?: string | null
          alternative_phone_number?: string | null
          contact_address_country?: string | null
          contact_address_line_1?: string | null
          contact_address_line_2?: string | null
          contact_address_line_3?: string | null
          contact_address_postcode?: string | null
          country_of_birth?: string | null
          country_of_permanent_residence?: string | null
          decision_influence?: string | null
          disability_or_special_needs?: string | null
          dob?: string | null
          documents?: string | null
          email?: string | null
          employed_from?: string | null
          employed_to?: string | null
          employer_address?: string | null
          employer_contact?: string | null
          employer_name?: string | null
          ethnicity?: string | null
          first_name?: string | null
          gender?: string | null
          highest_level?: string | null
          id: string
          intake?: string | null
          job_title?: string | null
          last_name?: string | null
          mobile?: string | null
          nationality?: string | null
          o_level_points?: string | null
          parental_higher_education?: string | null
          permanent_home_address_country?: string | null
          permanent_home_address_line_1?: string | null
          permanent_home_address_line_2?: string | null
          permanent_home_address_line_3?: string | null
          permanent_home_address_postcode?: string | null
          personal_statement?: string | null
          photo?: string | null
          ple_file?: string | null
          referee_1_address?: string | null
          referee_1_capacity_known?: string | null
          referee_1_email_address?: string | null
          referee_1_full_name?: string | null
          referee_1_organisation?: string | null
          referee_1_position?: string | null
          referee_1_postcode?: string | null
          referee_1_reference_file?: string | null
          referee_1_telephone_number?: string | null
          referee_2_address?: string | null
          referee_2_capacity_known?: string | null
          referee_2_email_address?: string | null
          referee_2_full_name?: string | null
          referee_2_organisation?: string | null
          referee_2_position?: string | null
          referee_2_postcode?: string | null
          referee_2_reference_file?: string | null
          referee_2_telephone_number?: string | null
          status?: string | null
          title?: string | null
          tuition_fees_payer?: string | null
          uace_file?: string | null
          uce_file?: string | null
          working_hours?: string | null
        }
        Update: {
          a_level_combination?: string | null
          a_level_points?: string | null
          academic_year?: string | null
          address?: string | null
          alternative_phone_number?: string | null
          contact_address_country?: string | null
          contact_address_line_1?: string | null
          contact_address_line_2?: string | null
          contact_address_line_3?: string | null
          contact_address_postcode?: string | null
          country_of_birth?: string | null
          country_of_permanent_residence?: string | null
          decision_influence?: string | null
          disability_or_special_needs?: string | null
          dob?: string | null
          documents?: string | null
          email?: string | null
          employed_from?: string | null
          employed_to?: string | null
          employer_address?: string | null
          employer_contact?: string | null
          employer_name?: string | null
          ethnicity?: string | null
          first_name?: string | null
          gender?: string | null
          highest_level?: string | null
          id?: string
          intake?: string | null
          job_title?: string | null
          last_name?: string | null
          mobile?: string | null
          nationality?: string | null
          o_level_points?: string | null
          parental_higher_education?: string | null
          permanent_home_address_country?: string | null
          permanent_home_address_line_1?: string | null
          permanent_home_address_line_2?: string | null
          permanent_home_address_line_3?: string | null
          permanent_home_address_postcode?: string | null
          personal_statement?: string | null
          photo?: string | null
          ple_file?: string | null
          referee_1_address?: string | null
          referee_1_capacity_known?: string | null
          referee_1_email_address?: string | null
          referee_1_full_name?: string | null
          referee_1_organisation?: string | null
          referee_1_position?: string | null
          referee_1_postcode?: string | null
          referee_1_reference_file?: string | null
          referee_1_telephone_number?: string | null
          referee_2_address?: string | null
          referee_2_capacity_known?: string | null
          referee_2_email_address?: string | null
          referee_2_full_name?: string | null
          referee_2_organisation?: string | null
          referee_2_position?: string | null
          referee_2_postcode?: string | null
          referee_2_reference_file?: string | null
          referee_2_telephone_number?: string | null
          status?: string | null
          title?: string | null
          tuition_fees_payer?: string | null
          uace_file?: string | null
          uce_file?: string | null
          working_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          id: string | null
          name: string | null
        }
        Insert: {
          id?: string | null
          name?: string | null
        }
        Update: {
          id?: string | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
