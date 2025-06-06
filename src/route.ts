export const route = {
  home: () => '/',
  myProfile: () => '/my-profile',
  explore: () => '/explore',

  myNetwork: () => '/my-network',
  messages: () => '/messages',
  notifications: () => '/notifications',
  teamByUsername: (username: string) => `/teams/${username}`,
};
