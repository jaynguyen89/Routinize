CREATE TABLE "addresses" (
    "id" INTEGER NOT NULL UNIQUE,
    "name" TEXT DEFAULT NULL,
    "building" TEXT DEFAULT NULL,
    "street" TEXT DEFAULT NULL,
    "suburb" TEXT DEFAULT NULL,
    "postcode" TEXT DEFAULT NULL,
    "state" TEXT DEFAULT NULL,
    "country" TEXT DEFAULT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "users" (
    "id" INTEGER NOT NULL UNIQUE,
    "addressId" INTEGER DEFAULT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT DEFAULT NULL,
    "uniqueId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "shortName" TEXT DEFAULT NULL,
    "gender" INTEGER NOT NULL DEFAULT 0,
    "phoneNumber" TEXT DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("addressId") REFERENCES "addresses"("id")
);

CREATE TABLE "settings" (
    "id" INTEGER NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL,
    "theme"	INTEGER NOT NULL DEFAULT 3,
    "isPremium"	INTEGER NOT NULL DEFAULT 0,
    "todoUnlocked"	INTEGER NOT NULL DEFAULT 0,
    "notesUnlocked"	INTEGER NOT NULL DEFAULT 0,
    "collabUnlocked"	INTEGER NOT NULL DEFAULT 0,
    "shouldHideAds"	INTEGER NOT NULL DEFAULT 0,
    "premiumUntil"	TEXT DEFAULT NULL,
    "unlockedUntil"	TEXT DEFAULT NULL,
    "dateTimeFormat"	TEXT NOT NULL DEFAULT 'FRIENDLY_DMY',
    "unitSystem"	INTEGER NOT NULL DEFAULT 0,
    "addressFormat" INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("userId") REFERENCES "users"("id")
);

INSERT INTO "settings" (
    "userId",
    "theme",
    "isPremium",
    "todoUnlocked",
    "notesUnlocked",
    "collabUnlocked",
    "shouldHideAds",
    "premiumUntil",
    "unlockedUntil",
    "dateTimeFormat",
    "unitSystem"
) VALUES (1, 3, 0, 0, 0, 0, 0, NULL, NULL, 'FRIENDLY_DMY', 0);

CREATE TABLE "collaborators" (
	"id"	INTEGER NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL,
    "collabId" INTEGER NOT NULL,
    "invitedOn" TEXT NOT NULL,
    "isAccepted" INTEGER NOT NULL DEFAULT 0,
    "acceptedOn" TEXT DEFAULT NULL,
    "rejectedOn" TEXT DEFAULT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("userId") REFERENCES "users"("id"),
    FOREIGN KEY ("collabId") REFERENCES "users"("id")
);

CREATE TABLE "privacy" (
    "id"	INTEGER NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL,
    "addressPolicy" INTEGER NOT NULL DEFAULT 0,
    "namePolicy" INTEGER NOT NULL DEFAULT 2,
    "phonePolicy" INTEGER NOT NULL DEFAULT 0,
    "usernamePolicy" INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("userId") REFERENCES "users"("id")
);

CREATE TABLE "todos" (
    "id" INTEGER NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL,
    "isPersonal" INTEGER NOT NULL DEFAULT 1,
    "emphasized" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT DEFAULT NULL,
    "description" TEXT DEFAULT NULL,
    "details" TEXT DEFAULT NULL,
    "createdOn" TEXT DEFAULT NULL,
    "dueDate" TEXT DEFAULT NULL,
    "doneDate" TEXT DEFAULT NULL,
    "doneById" INTEGER DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("userId") REFERENCES "users"("id"),
    FOREIGN KEY ("doneById") REFERENCES "users"("id")
);

CREATE TABLE "notes" (
    "id" INTEGER NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL,
    "isPersonal" INTEGER NOT NULL DEFAULT 1,
    "emphasized" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT DEFAULT NULL,
    "createdOn" TEXT DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("userId") REFERENCES "users"("id")
);

CREATE TABLE "noteSegments" (
    "id" INTEGER NOT NULL UNIQUE,
    "noteId" INTEGER NOT NULL,
    "body" TEXT DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("noteId") REFERENCES "notes"("id")
);

CREATE TABLE "attachments" (
    "id" INTEGER NOT NULL UNIQUE,
    "itemId" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL, --References to Todo, Note, Note Segment, Project, Team, Task or Comment
    "type" INTEGER NOT NULL,
    "name" TEXT DEFAULT NULL,
    "url" TEXT NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "relationships" (
    "id" INTEGER NOT NULL UNIQUE,
    "itemId" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL, --References to Todo, Note or Note Segment
    "relateToId" INTEGER NOT NULL,
    "relateType" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "typeName" TEXT NOT NULL DEFAULT 'RELATES TO',
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "ideas" (
    "id" INTEGER NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("userId") REFERENCES "users"("id")
);

CREATE TABLE "projects" (
    "id" INTEGER NOT NULL UNIQUE,
    "coverId" INTEGER NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectCode" TEXT DEFAULT NULL,
    "description" TEXT DEFAULT NULL,
    "createdOn" TEXT DEFAULT NULL,
    "createdById" INTEGER DEFAULT NULL,
    "dueDate" TEXT DEFAULT NULL,
    "finalDate" TEXT DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("coverId") REFERENCES "attachments"("id"),
    FOREIGN KEY ("createdById") REFERENCES "users"("id")
);

CREATE TABLE "teams" (
    "id" INTEGER NOT NULL UNIQUE,
    "projectId" INTEGER DEFAULT NULL,
    "teamCode" TEXT DEFAULT NULL,
    "teamName" TEXT DEFAULT NULL,
    "coverId" INTEGER NOT NULL,
    "createdOn" TEXT DEFAULT NULL,
    "createdById" INTEGER DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("coverId") REFERENCES "attachments"("id"),
    FOREIGN KEY ("createdById") REFERENCES "users"("id"),
    FOREIGN KEY ("projectId") REFERENCES "projects"("id")
);

CREATE TABLE "teamMembers" (
    "id" INTEGER NOT NULL UNIQUE,
    "teamId" INTEGER DEFAULT NULL,
    "memberId" INTEGER DEFAULT NULL,
    "role" INTEGER NOT NULL DEFAULT 2,
    "permission" INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("memberId") REFERENCES "users"("id"),
    FOREIGN KEY ("teamId") REFERENCES "teams"("id")
);

CREATE TABLE "stages" (
    "id" INTEGER NOT NULL UNIQUE,
    "teamId" INTEGER NOT NULL,
    "stageName" TEXT NOT NULL,
    "description" TEXT DEFAULT NULL,
    "createdOn" TEXT DEFAULT NULL,
    "dueDate" TEXT DEFAULT NULL,
    "finalDate" TEXT DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("teamId") REFERENCES "teams"("id")
);

CREATE TABLE "teamTasks" (
    "id" INTEGER NOT NULL UNIQUE,
    "teamId" INTEGER DEFAULT NULL,
    "itemId" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL, --References to Todo, Note or Note Segment
    "assignedOn" TEXT NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("teamId") REFERENCES "teams"("id")
);

CREATE TABLE "stageTasks" (
    "id" INTEGER NOT NULL UNIQUE,
    "stageId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL, --References to Todo, Note or Note Segment
    "assignedOn" TEXT NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("stageId") REFERENCES "stages"("id")
);

CREATE TABLE "taskPermissions" (
    "id" INTEGER NOT NULL UNIQUE,
    "taskId" INTEGER NOT NULL, --References to teamTasks or stageTasks
    "role" INTEGER NOT NULL DEFAULT 2,
    "permission" INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "collabTasks" (
    "id" INTEGER NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL, --References to Todo, Note or Note Segment
    "permission" INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("userId") REFERENCES "users"("id")
);

CREATE TABLE "taskComments" (
    "id" INTEGER NOT NULL UNIQUE,
    "taskId" INTEGER NOT NULL,
    "taskType" TEXT NOT NULL, --References to teamTasks, stageTasks or collabTasks
    "memberId" INTEGER NOT NULL, --References to teamMembers or a collaborator (dependent on taskType)
    "commentId" INTEGER DEFAULT NULL,
    "content" TEXT DEFAULT NULL,
    "commentOn" TEXT NOT NULL,
    "editOn" TEXT DEFAULT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY ("commentId") REFERENCES "taskComments"("id")
);