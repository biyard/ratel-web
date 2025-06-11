export interface CreateGroupRequest {
  create: {
    name: string;
    description: string;
    image_url: string;
    users: number[];
    permissions: GroupPermission[];
  };
}

export function createGroupRequest(
  name: string,
  description: string,
  image_url: string,
  users: number[],
  permissions: GroupPermission[],
): CreateGroupRequest {
  return {
    create: {
      name,
      description,
      image_url,
      users,
      permissions,
    },
  };
}

export enum GroupPermission {
  ReadPosts = 0,
  WritePosts = 1,
  DeletePosts = 2,
  WritePendingPosts = 3,

  ReadReplies = 4,
  WriteReplies = 5,
  DeleteReplies = 6,

  ReadProfile = 7,
  UpdateProfile = 8,

  InviteMember = 9,
  UpdateGroup = 10,
  DeleteGroup = 11,

  ManageSpace = 20,

  ManagePromotions = 62,
  ManageNews = 63,
}
