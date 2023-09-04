export enum messageTypes {
  SENT = 1,
  RECEIVED = 2,
}

export enum interTypes {
  PRIVATE = 1,
}

export enum groupTypes {
  PRIVATE = 1,
  PUBLIC = 2,
}

export enum apiUrls {
  group = "/api/group",
  feed = "/api/feed",
  message = "/api/message",
  socket = "/api/socket",
  login = "/api/login",
  file = "/api/file",
  invitation = "/api/invitation",
  user = "/api/user",
  common = "/api/common",
}

export enum cardBodyTypes {
  NUMBER = 1,
  STRING = 2,
  ELEMENT = 3,
}

export enum mediaTypes {
  image = "image",
}

export enum userSearchMessageTypes {
  found = "User Found",
  notFound = "No User Found",
}

export enum tableNames {
  message = "Message",
}

export enum quickMessages {
  hi = "Hi!",
}

export enum bucketNames {
  attachments = "attachments",
}

export enum resourcePaths {
  imageFavicon = "/favicon.png",
}

export enum sections {
  loading = 0,
  introduction = 1,
  home = 2,
  addFriend = 3,
  group = 4,
  feeds = 5,
}

export enum strings {
  someone = "Someone",
}
