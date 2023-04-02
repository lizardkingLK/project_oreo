export enum messageTypes {
  SENT = 1,
  RECEIVED = 2,
}

export enum authStates {
  loading = "loading",
  authenticated = "authenticated",
  unauthenticated = "unauthenticated",
}

export enum apiUrls {
  feed = "/api/feed",
  message = "/api/message",
  socket = "/api/socket",
  login = "/api/login",
}

export enum cardBodyTypes {
  NUMBER = 1,
  STRING = 2,
  ELEMENT = 3,
}