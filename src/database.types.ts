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
      changing_places: {
        Row: {
          address_1: string
          address_2: string
          category: string | null
          city: string | null
          country: string | null
          county: string | null
          created_at: string
          email: string | null
          equipment_standard: string | null
          features: Json | null
          formatted_address: string | null
          id: number
          lat: number | null
          lng: number | null
          name: string
          place_id: string | null
          postcode: string | null
          state: string | null
          tel: string | null
          url: string | null
        }
        Insert: {
          address_1?: string
          address_2?: string
          category?: string | null
          city?: string | null
          country?: string | null
          county?: string | null
          created_at?: string
          email?: string | null
          equipment_standard?: string | null
          features?: Json | null
          formatted_address?: string | null
          id?: number
          lat?: number | null
          lng?: number | null
          name?: string
          place_id?: string | null
          postcode?: string | null
          state?: string | null
          tel?: string | null
          url?: string | null
        }
        Update: {
          address_1?: string
          address_2?: string
          category?: string | null
          city?: string | null
          country?: string | null
          county?: string | null
          created_at?: string
          email?: string | null
          equipment_standard?: string | null
          features?: Json | null
          formatted_address?: string | null
          id?: number
          lat?: number | null
          lng?: number | null
          name?: string
          place_id?: string | null
          postcode?: string | null
          state?: string | null
          tel?: string | null
          url?: string | null
        }
        Relationships: []
      }
      toilets: {
        Row: {
          address_1: string
          address_2: string | null
          category: string | null
          city: string
          country: string
          county: string | null
          created_at: string
          distance: number | null
          email: string | null
          equipment_standard: string | null
          features: string[] | null
          formatted_address: string
          id: number
          lat: string
          lng: string
          name: string
          opening_hours: string | null
          place_id: string
          postcode: string
          state: string | null
          tel: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          address_1: string
          address_2?: string | null
          category?: string | null
          city: string
          country: string
          county?: string | null
          created_at?: string
          distance?: number | null
          email?: string | null
          equipment_standard?: string | null
          features?: string[] | null
          formatted_address: string
          id?: never
          lat: string
          lng: string
          name: string
          opening_hours?: string | null
          place_id: string
          postcode: string
          state?: string | null
          tel?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          address_1?: string
          address_2?: string | null
          category?: string | null
          city?: string
          country?: string
          county?: string | null
          created_at?: string
          distance?: number | null
          email?: string | null
          equipment_standard?: string | null
          features?: string[] | null
          formatted_address?: string
          id?: never
          lat?: string
          lng?: string
          name?: string
          opening_hours?: string | null
          place_id?: string
          postcode?: string
          state?: string | null
          tel?: string | null
          updated_at?: string
          url?: string | null
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
