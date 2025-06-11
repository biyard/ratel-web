import { logger } from './lib/logger';

export const route = {
  home: () => '/',
  myProfile: () => '/my-profile',
  explore: () => '/explore',
  settings: () => '/settings',
  myPosts: () => '/my-posts',
  drafts: () => '/drafts',
  myNetwork: () => '/my-network',
  messages: () => '/messages',
  notifications: () => '/notifications',
  teamByUsername: (username: string) => `/teams/${username}`,
  spaceById: (spaceId: number) => `/spaces/${spaceId}`,
  // FIXME: correct to `threads/${feedId}`
  threadByFeedId: (feedId: number) => {
    logger.debug('route.threadByFeedId: ', feedId);
    return '/';
  },
};
