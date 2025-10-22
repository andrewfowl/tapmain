export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      downloads: {
        Row: {
          id: number
          created_at: string
          user_id: string
          item_type: string
          item_id: string
          meta: Json | null
        }
        Insert: {
          id?: number
          created_at?: string
          user_id: string
          item_type: string
          item_id: string
          meta?: Json | null
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          item_type?: string
          item_id?: string
          meta?: Json | null
        }
      }
      insights: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          hook: string | null
          content: string | null
          image_url: string | null
          type: string | null
          published: boolean
          downloadUrl: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          hook?: string | null
          content?: string | null
          image_url?: string | null
          type?: string | null
          published?: boolean
          downloadUrl?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          hook?: string | null
          content?: string | null
          image_url?: string | null
          type?: string | null
          published?: boolean
          downloadUrl?: string | null
        }
      }
      news: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          image_url: string | null
          external_url: string | null
          published: boolean
          featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          external_url?: string | null
          published?: boolean
          featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          external_url?: string | null
          published?: boolean
          featured?: boolean
        }
      }
      policies: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          description: string | null
          content: Json | null
          published: boolean
          downloadUrl: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          description?: string | null
          content?: Json | null
          published?: boolean
          downloadUrl?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          description?: string | null
          content?: Json | null
          published?: boolean
          downloadUrl?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          company: string | null
          role: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          company?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          company?: string | null
          role?: string | null
        }
      }
      service_requests: {
        Row: {
          id: string
          created_at: string
          full_name: string | null
          email: string | null
          phone: string | null
          company: string | null
          message: string | null
          solution_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          company?: string | null
          message?: string | null
          solution_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          company?: string | null
          message?: string | null
          solution_id?: string | null
        }
      }
      solutions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          description: string | null
          short_description: string | null
          image_url: string | null
          features: Json | null
          benefits: Json | null
          pricing_info: string | null
          published: boolean
          related_template_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          description?: string | null
          short_description?: string | null
          image_url?: string | null
          features?: Json | null
          benefits?: Json | null
          pricing_info?: string | null
          published?: boolean
          related_template_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          image_url?: string | null
          features?: Json | null
          benefits?: Json | null
          pricing_info?: string | null
          published?: boolean
          related_template_id?: string | null
        }
      }
      technical_inquiries: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string | null
          last_name: string | null
          email: string | null
          phone: string | null
          company: string | null
          position: string | null
          title: string | null
          subject: string | null
          subcategory: string | null
          background: string | null
          inquiry_questions: string | null
          affirmative_evidence: string | null
          contradictive_evidence: string | null
          support_documentation: string | null
          authoritative_references: string | null
          preliminary_conclusions: string | null
          status: string | null
          terms_accepted: boolean | null
          privacy_accepted: boolean | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          company?: string | null
          position?: string | null
          title?: string | null
          subject?: string | null
          subcategory?: string | null
          background?: string | null
          inquiry_questions?: string | null
          affirmative_evidence?: string | null
          contradictive_evidence?: string | null
          support_documentation?: string | null
          authoritative_references?: string | null
          preliminary_conclusions?: string | null
          status?: string | null
          terms_accepted?: boolean | null
          privacy_accepted?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          company?: string | null
          position?: string | null
          title?: string | null
          subject?: string | null
          subcategory?: string | null
          background?: string | null
          inquiry_questions?: string | null
          affirmative_evidence?: string | null
          contradictive_evidence?: string | null
          support_documentation?: string | null
          authoritative_references?: string | null
          preliminary_conclusions?: string | null
          status?: string | null
          terms_accepted?: boolean | null
          privacy_accepted?: boolean | null
        }
      }
      templates: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          description: string | null
          category: string | null
          file_type: string | null
          file_size: number | null
          preview_image_url: string | null
          content: Json | null
          published: boolean
          created_by: string | null
          downloadUrl: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          description?: string | null
          category?: string | null
          file_type?: string | null
          file_size?: number | null
          preview_image_url?: string | null
          content?: Json | null
          published?: boolean
          created_by?: string | null
          downloadUrl?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          description?: string | null
          category?: string | null
          file_type?: string | null
          file_size?: number | null
          preview_image_url?: string | null
          content?: Json | null
          published?: boolean
          created_by?: string | null
          downloadUrl?: string | null
        }
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          created_at: string
          email: string
          source: string | null
          ip_address: string | null
          user_agent: string | null
          confirmed: boolean
          unsubscribed: boolean
          unsubscribed_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          source?: string | null
          ip_address?: string | null
          user_agent?: string | null
          confirmed?: boolean
          unsubscribed?: boolean
          unsubscribed_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          source?: string | null
          ip_address?: string | null
          user_agent?: string | null
          confirmed?: boolean
          unsubscribed?: boolean
          unsubscribed_at?: string | null
        }
      }
      waitlist: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          name: string
          company: string | null
          message: string | null
          status: string
          source: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          email: string
          name: string
          company?: string | null
          message?: string | null
          status?: string
          source?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          name?: string
          company?: string | null
          message?: string | null
          status?: string
          source?: string | null
          metadata?: Json | null
        }
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
  }
}
