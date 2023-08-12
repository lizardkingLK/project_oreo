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
  home = 0,
  addFriend = 1,
  group = 2,
  feeds = 3,
}

export enum strings {
  someone = "Someone",
}