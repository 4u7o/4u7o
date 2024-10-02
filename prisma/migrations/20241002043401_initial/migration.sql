-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "djRole" TEXT[],
    "allowDjOnlyFlag" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
