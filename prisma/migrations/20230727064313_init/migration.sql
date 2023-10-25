-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupUser" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "GroupUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);
