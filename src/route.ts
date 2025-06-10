export const route = {
  home: () => '/',
  myProfile: () => '/my-profile',
  explore: () => '/explore',
  settings: () => '/settings',
  myPosts: () => '/my-posts',

  myNetwork: () => '/my-network',
  messages: () => '/messages',
  notifications: () => '/notifications',
  teamByUsername: (username: string) => `/teams/${username}`,
  spaceById: (spaceId: number) => `/spaces/${spaceId}`,
};
