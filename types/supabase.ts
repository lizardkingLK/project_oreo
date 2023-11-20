export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Group: {
        Row: {
          createdAt: string
          displayUrl: string
          groupId: string
          id: number
          members: string[] | null
          name: string
          ownerId: string
          status: number
          type: number
        }
        Insert: {
          createdAt: string
          displayUrl: string
          groupId: string
          id?: number
          members?: string[] | null
          name: string
          ownerId: string
          status?: number
          type?: number
        }
        Update: {
          createdAt?: string
          displayUrl?: string
          groupId?: string
          id?: number
          members?: string[] | null
          name?: string
          ownerId?: string
          status?: number
          type?: number
        }
        Relationships: []
      }
      Message: {
        Row: {
          content: string | null
          createdAt: string
          createdFor: string[] | null
          groupId: string
          groupImageUrl: string | null
          groupName: string | null
          groupType: number
          id: number
          messageType: number
          readBy: Json[] | null
          referenceId: string
          status: number
          timestamp: string | null
          userId: string
        }
        Insert: {
          content?: string | null
          createdAt?: string
          createdFor?: string[] | null
          groupId: string
          groupImageUrl?: string | null
          groupName?: string | null
          groupType?: number
          id?: number
          messageType?: number
          readBy?: Json[] | null
          referenceId: string
          status?: number
          timestamp?: string | null
          userId: string
        }
        Update: {
          content?: string | null
          createdAt?: string
          createdFor?: string[] | null
          groupId?: string
          groupImageUrl?: string | null
          groupName?: string | null
          groupType?: number
          id?: number
          messageType?: number
          readBy?: Json[] | null
          referenceId?: string
          status?: number
          timestamp?: string | null
          userId?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_group_messages: {
        Args: {
          gid: string
        }
        Returns: {
          referenceid: string
        }[]
      }
      get_groups: {
        Args: {
          userid: string
        }
        Returns: {
          groupid: string
        }[]
      }
      get_messages: {
        Args: {
          userid: string
        }
        Returns: {
          id: number
          createdAt: string
          content: string
          status: number
          groupId: string
          messageType: number
          readBy: string[]
          messageId: string
          ownerId: string
        }[]
      }
      getgroupsbyuserid: {
        Args: {
          userid: string
        }
        Returns: {
          id: number
          name: string
          status: number
          userid: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}