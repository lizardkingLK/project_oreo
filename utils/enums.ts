export enum messageWays {
  SENT = 1,
  RECEIVED = 2,
}

export enum messageTypes {
  DEFAULT = 1,
  INTRODUCTION = 2,
}

export enum groupTypes {
  PRIVATE = 1,
  PUBLIC = 2,
}

export enum apiUrls {
  group = '/api/group',
  feed = '/api/feed',
  message = '/api/message',
  socket = '/api/socket',
  login = '/api/login',
  file = '/api/file',
  invitation = '/api/invitation',
  user = '/api/user',
  auth = '/api/auth',
}

export enum cardBodyTypes {
  NUMBER = 1,
  STRING = 2,
  ELEMENT = 3,
}

export enum mediaTypes {
  image = 'image',
}

export enum userSearchMessageTypes {
  found = 'User Found',
  notFound = 'No User Found',
}

export enum tableNames {
  message = 'Message',
}

export enum quickMessages {
  hi = 'Hi!',
}

export enum bucketNames {
  attachments = 'attachments',
}

export enum resourcePaths {
  imageFavicon = '/favicon.png',
}

export enum sections {
  loading = 0,
  introduction = 1,
  home = 2,
  addFriend = 3,
  group = 4,
  feeds = 5,
}

export enum actions {
  create = 1,
  beforeEdit = 2,
  edit = 3,
}

export enum strings {
  someone = 'Someone',
  local = 'local',
  referenceId = 'referenceId',
  groupId = 'groupId',
}

export enum elementType {
  button = 'button',
  div = 'div',
}

export enum messagingType {
  local = 'local',
  cloud = 'cloud',
}

export enum restContext {
  updateRead = 1,
  updateMessage = 2,
  getUsersMerged = 3,
  createMessage = 4,
}

export enum eventTypes {
  insert = 'INSERT',
  update = 'UPDATE',
  delete = 'DELETE',
}
