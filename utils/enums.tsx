export enum messageTypes {
  SENT = 1,
  RECEIVED = 2,
}

export enum interTypes {
  PRIVATE = 1,
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

export enum dbCollections {
  users = "users",
  messages = "messages",
}

export enum mediaTypes {
  image = "image",
}
