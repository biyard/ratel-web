import { FeedStatus } from './models/feeds';
import { FileType } from './models/file-type';
import { gql } from '@apollo/client';

export const ratelApi = {
  users: {
    getUserInfo: () => '/v1/users?action=user-info',
    updateUserInfo: () => '/v1/users?action=signup',
    editProfile: (user_id: number) => `/v1/users/${user_id}`,
    updateEvmAddress: () => '/v1/users',
  },
  assets: {
    getPresignedUrl: (file_type: FileType) =>
      `/v1/assets?action=get-presigned-uris&file-type=${file_type}&total-count=1`,
  },
  teams: {
    createTeam: () => '/v1/teams',
  },
  subscription: {
    subscribe: () => '/v1/subscriptions?action=subscribe',
  },
  promotions: {
    get_promotions: () => '/v1/promotions?param-type=read&action=hot-promotion',
  },
  feeds: {
    comment: () => '/v1/feeds',
    writePost: () => '/v1/feeds',
    createDraft: () => '/v1/feeds',
    updateDraft: (post_id: number) => `/v1/feeds/${post_id}`,
    publishDraft: (post_id: number) => `/v1/feeds/${post_id}`,

    likePost: (post_id: number) => `/v1/feeds/${post_id}`,
    getPostsByUserId: (
      user_id: number,
      page: number,
      size: number,
      status: FeedStatus,
    ) =>
      `/v1/feeds?param-type=query&action=posts-by-user-id&bookmark=${page}&size=${size}&user-id=${user_id}&status=${status}`,
    getFeedsByFeedId: (feed_id: number) => `/v1/feeds/${feed_id}`,
    getPosts: (page: number, size: number) =>
      `/v1/feeds?param-type=query&bookmark=${page}&size=${size}`,
  },
  redeems: {
    useRedeemCode: (redeem_id: number) => `/v1/redeems/${redeem_id}`,
  },
  spaces: {
    getSpaceBySpaceId: (id: number) => `/v1/spaces/${id}`,
    getSpaceRedeemCodes: (space_id: number) =>
      `/v1/spaces/${space_id}/redeem-codes`,
    claimBadge: (space_id: number) => `/v1/spaces/${space_id}/badges`,
  },
  graphql: {
    listNews: (size: number) => {
      return {
        query: gql`
          query ListNews($limit: Int!) {
            news(limit: $limit, order_by: { created_at: desc }) {
              id
              title
              html_content
              created_at
            }
          }
        `,
        variables: {
          limit: size,
        },
      };
    },
    listIndustries: () => {
      return {
        query: gql`
          query ListIndustries {
            industries {
              id
              name
            }
          }
        `,
      };
    },
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
