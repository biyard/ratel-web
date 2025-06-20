export interface Discussion {
  id: number;
  created_at: number;
  updated_at: number;

  space_id: number;
  creator_id: number;

  started_at: number;
  ended_at: number;

  name: string;
  description: string;

  meeting_id?: string;
  pipeline_id: string;

  participants: DiscussionParticipant[];
}

export interface DiscussionParticipant {
  id: number;
  created_at: number;
  updated_at: number;

  discussion_id: number;
  user_id: number;
  participant_id: string;
}
