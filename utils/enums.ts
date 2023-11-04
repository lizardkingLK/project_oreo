export enum activeInactive {
  YES = 1,
  NO = 0,
}

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
  home = 1,
  addFriend = 2,
  group = 3,
  feeds = 4,
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

export enum strategyTypes {
  local = 'local',
  cloud = 'cloud',
}

export enum eventTypes {
  insert = 'INSERT',
  update = 'UPDATE',
  delete = 'DELETE',
}
