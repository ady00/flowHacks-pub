-- CreateTable
CREATE TABLE "notes" (
    "note" VARCHAR,
    "tags" VARCHAR[],
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR NOT NULL,
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "noteDescription" VARCHAR,
    "noteHeading" VARCHAR,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "publicId" VARCHAR,
    "emoji" VARCHAR,
    "inTrash" BOOLEAN DEFAULT false,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stickyNotes" (
    "stickyNote" VARCHAR,
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR NOT NULL,
    "color" VARCHAR NOT NULL DEFAULT E'blue',
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stickyNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whiteboards" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "boardUrl" VARCHAR NOT NULL,
    "createdBy" VARCHAR NOT NULL,
    "tags" VARCHAR[],
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inTrash" BOOLEAN NOT NULL DEFAULT false,
    "boardName" VARCHAR,
    "boardDescription" VARCHAR,

    CONSTRAINT "whiteboards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "todo" VARCHAR,
    "priority" INTEGER DEFAULT 0,
    "todolistId" UUID NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todolists" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "todolistName" VARCHAR NOT NULL,
    "todolistDescription" VARCHAR NOT NULL,
    "createdBy" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inTrash" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todolists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodePlayground" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdBy" VARCHAR,
    "playgroundName" VARCHAR,
    "html" VARCHAR,
    "css" VARCHAR,
    "js" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "publicId" VARCHAR NOT NULL,
    "tags" VARCHAR[],
    "inTrash" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CodePlayground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PomorodoTimer" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR NOT NULL,
    "points" SMALLINT NOT NULL,

    CONSTRAINT "PomorodoTimer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_publicId_key" ON "notes"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "CodePlayground_publicId_key" ON "CodePlayground"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "PomorodoTimer_userId_key" ON "PomorodoTimer"("userId");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_todolistId_fkey" FOREIGN KEY ("todolistId") REFERENCES "todolists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
