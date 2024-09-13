import { Prisma } from '@prisma/client';

// groups
const userGroupData = Prisma.validator<Prisma.GroupDefaultArgs>()({
  include: { Message: true },
});

export type UserGroupProps = Prisma.GroupGetPayload<typeof userGroupData>;

// messages
const messageData = Prisma.validator<Prisma.MessageDefaultArgs>()({});

export type MessageProps = Prisma.MessageGetPayload<typeof messageData>;
