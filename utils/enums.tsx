export enum messageTypes {
  SENT = 1,
  RECEIVED = 2,
}

export enum interTypes {
  PRIVATE = 1,
}

export enum authStates {
  loading = "loading",
  authenticated = "authenticated",
  unauthenticated = "unauthenticated",
}

export enum apiUrls {
  group = "/api/group",
  feed = "/api/feed",
  message = "/api/message",
  socket = "/api/socket",
  login = "/api/login",
  file = "/api/file",
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
