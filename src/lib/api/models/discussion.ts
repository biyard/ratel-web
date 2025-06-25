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

export interface DiscussionCreateRequest {
  started_at: number;
  ended_at: number;
  name: string;
  description: string;
}

export interface DiscussionParticipant {
  id: number;
  created_at: number;
  updated_at: number;

  discussion_id: number;
  user_id: number;
  participant_id: string;
}

export interface StartMeetingRequest {
  start_meeting: object;
}

export function startMeetingRequest(): StartMeetingRequest {
  return {
    start_meeting: {},
  };
}

export interface ParticipantMeetingRequest {
  participant_meeting: object;
}

export function participantMeetingRequest(): ParticipantMeetingRequest {
  return {
    participant_meeting: {},
  };
}

export interface ExitMeetingRequest {
  exit_meeting: object;
}

export function exitMeetingRequest(): ExitMeetingRequest {
  return {
    exit_meeting: {},
  };
}

export interface StartRecordingRequest {
  start_recording: object;
}

export function startRecordingRequest(): StartRecordingRequest {
  return {
    start_recording: {},
  };
}

export interface EndRecordingRequest {
  end_recording: object;
}

export function endRecordingRequest(): EndRecordingRequest {
  return {
    end_recording: {},
  };
}
