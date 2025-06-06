import { FileType } from './models/file-type';
import { gql } from '@apollo/client';

export const ratelApi = {
  users: {
    getUserInfo: () => '/v1/users?action=user-info',
  },
  assets: {
    getPresignedUrl: (file_type: FileType) =>
      `/v1/assets?action=get-presigned-uris&file-type=${file_type}&total-count=1`,
  },
  teams: {
    createTeam: () => '/v1/teams',
  },
  graphql: {
    getUserByUsername: (username: string) => {
      return {
        query: gql`
          query GetUserByUsername($username: String!) {
            users(where: { username: { _eq: $username } }) {
              id
            }
          }
        `,
        variables: {
          username,
        },
      };
    },

    getTeamByTeamname: (teamname: string) => {
      return {
        query: gql`
          query GetTeamByTeamname($teamname: String!) {
            users(where: { username: { _eq: $teamname } }) {
              id
              html_contents
              email
              created_at
              nickname
              parent_id
              profile_url
              user_type
              username
            }
          }
        `,
        variables: {
          teamname,
        },
      };
    },
  },
};
