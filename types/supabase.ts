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
          createdBy: string
          displayUrl: string | null
          groupId: string
          id: number
          name: string | null
          status: number
          type: number
        }
        Insert: {
          createdAt: string
          createdBy: string
          displayUrl?: string | null
          groupId: string
          id?: number
          name?: string | null
          status?: number
          type?: number
        }
        Update: {
          createdAt?: string
          createdBy?: string
          displayUrl?: string | null
          groupId?: string
          id?: number
          name?: string | null
          status?: number
          type?: number
        }
        Relationships: []
      }
      GroupMember: {
        Row: {
          createdAt: string
          groupId: string
          id: number
          memberId: string
          status: number
        }
        Insert: {
          createdAt: string
          groupId: string
          id?: number
          memberId: string
          status?: number
        }
        Update: {
          createdAt?: string
          groupId?: string
          id?: number
          memberId?: string
          status?: number
        }
        Relationships: [
          {
            foreignKeyName: "GroupMember_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "Group"
            referencedColumns: ["groupId"]
          }
        ]
      }
      Message: {
        Row: {
          content: string
          createdAt: string
          createdBy: string
          groupId: string
          id: number
          messageId: string
          readers: string[] | null
          status: number
          type: number
        }
        Insert: {
          content: string
          createdAt: string
          createdBy: string
          groupId: string
          id?: number
          messageId: string
          readers?: string[] | null
          status?: number
          type?: number
        }
        Update: {
          content?: string
          createdAt?: string
          createdBy?: string
          groupId?: string
          id?: number
          messageId?: string
          readers?: string[] | null
          status?: number
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "Message_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "Group"
            referencedColumns: ["groupId"]
          }
        ]
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
