import { logger } from './lib/logger';

export const route = {
  home: () => '/',
  myProfile: () => '/my-profile',
  explore: () => '/explore',
  settings: () => '/settings',
  myPosts: () => '/my-posts',
  drafts: () => '/drafts',
  teams: () => '/teams',
  groups: () => '/groups',

  myNetwork: () => '/my-network',
  messages: () => '/messages',
  notifications: () => '/notifications',
  teamByUsername: (username: string) => `/teams/${username}/home`,
  teamGroups: (username: string) => `/teams/${username}/groups`,
  teamMembers: (username: string) => `/teams/${username}/members`,
  teamSettings: (username: string) => `/teams/${username}/settings`,
  spaceById: (spaceId: number) => `/spaces/${spaceId}`,
  // FIXME: correct to `threads/${feedId}`
  threadByFeedId: (feedId: number) => {
    logger.debug('route.threadByFeedId: ', feedId);
    return '/';
  },
};
