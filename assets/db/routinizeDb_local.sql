CREATE TABLE "settings" (
    "theme"	INTEGER NOT NULL DEFAULT 3,
    "isPremium"	INTEGER NOT NULL DEFAULT 0,
    "todoUnlocked"	INTEGER NOT NULL DEFAULT 0,
    "notesUnlocked"	INTEGER NOT NULL DEFAULT 0,
    "collabUnlocked"	INTEGER NOT NULL DEFAULT 0,
    "shouldHideAds"	INTEGER NOT NULL DEFAULT 0,
    "premiumUntil"	TEXT DEFAULT NULL,
    "unlockedUntil"	TEXT DEFAULT NULL,
    "dateTimeFormat"	TEXT NOT NULL DEFAULT 'FRIENDLY_DMY',
    "unitSystem"	INTEGER NOT NULL DEFAULT 0
);

INSERT INTO "settings" (
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
) VALUES (3, 0, 0, 0, 0, 0, NULL, NULL, 'FRIENDLY_DMY', 0);

CREATE TABLE "auth" (
    "email" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "authToken" TEXT NOT NULL,
    "timeStamp" TEXT NOT NULL
);

CREATE TABLE "addresses" (
    "id" INTEGER NOT NULL UNIQUE,
    "addressName" TEXT DEFAULT NULL,
    "building" TEXT DEFAULT NULL,
    "street" TEXT DEFAULT NULL,
    "suburb" TEXT DEFAULT NULL,
    "postcode" TEXT DEFAULT NULL,
    "state" TEXT DEFAULT NULL,
    "country" TEXT DEFAULT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    PRIMARY KEY ("id" AUTOINCREMENT)
);

CREATE TABLE "user" (
    "username" TEXT NOT NULL,
    "avatar" TEXT DEFAULT NULL,
    "uniqueId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "shortName" TEXT DEFAULT NULL,
    "gender" INTEGER NOT NULL DEFAULT 0,
    "phoneNumber" TEXT DEFAULT NULL,
    "addressId" INTEGER DEFAULT NULL,
    FOREIGN KEY ("addressId") REFERENCES "addresses"("id")
);

INSERT INTO "auth" (
    "email", "sessionId", "authToken", "timeStamp"
) VALUES (
             'jay.nguyen@jaydeveloper.com',
             'BAF1B67D5CE84C18E506C4C89259B2694083A9E7DF0BD29E7D15045B14EE6259',
             '9C3FAE9D6520BA41AAFC3D7422D89DC838945DFCAB7C3665E76E000C6292D63A2BE4A9171D4994FA5C847CC3B586EDF81F76CF89DF891AAA9464474870B694A0',
             '1607069809'
         );

INSERT INTO "user" (
    "username", "avatar", "uniqueId", "firstName", "lastName", "shortName", "gender", "phoneNumber"
) VALUES ('jay.nguyen', null, '', 'Jay', 'Nguyen', null, 1, '0422 357 488');

INSERT INTO "addresses" (
    "addressName", "building", "street", "suburb", "postcode", "state", "country", "latitude", "longitude"
) VALUES ('Home', null, '1/15 Haven Close', 'Sunshine West', '3020', 'VIC', 'Australia', '-37.7931211', '144.8049022');

CREATE TABLE "todos" (
     "id" INTEGER NOT NULL UNIQUE,
     "cover" TEXT DEFAULT NULL,
     "emphasized" INTEGER NOT NULL DEFAULT 0,
     "title" TEXT DEFAULT NULL,
     "description" TEXT DEFAULT NULL,
     "details" TEXT DEFAULT NULL,
     "createdOn" TEXT DEFAULT NULL,
     "dueDate" TEXT DEFAULT NULL,
     "doneDate" TEXT DEFAULT NULL,
     PRIMARY KEY ("id" AUTOINCREMENT)
);

CREATE TABLE "notes" (
     "id" INTEGER NOT NULL UNIQUE,
     "emphasized" INTEGER NOT NULL DEFAULT 0,
     "title" TEXT DEFAULT NULL,
     "createdOn" TEXT DEFAULT NULL,
     PRIMARY KEY ("id" AUTOINCREMENT)
);

CREATE TABLE "noteSegments" (
    "id" INTEGER NOT NULL UNIQUE,
    "noteId" INTEGER NOT NULL,
    "body" TEXT DEFAULT NULL,
    PRIMARY KEY ("id" AUTOINCREMENT),
    FOREIGN KEY ("noteId") REFERENCES "notes"("id")
);

CREATE TABLE "attachments" (
    id INTEGER NOT NULL UNIQUE,
    "type" INTEGER NOT NULL,
    "assetId" INTEGER NOT NULL,
    "assetType" TEXT NOT NULL,
    "name" TEXT DEFAULT NULL,
    "url" TEXT DEFAULT NULL,
    PRIMARY KEY ("id" AUTOINCREMENT)
);

CREATE TABLE "places" (
    "id" INTEGER NOT NULL UNIQUE,
    "addressId" INTEGER NOT NULL,
    "assetId" INTEGER NOT NULL,
    "assetType" TEXT NOT NULL,
    PRIMARY KEY ("id" AUTOINCREMENT),
    FOREIGN KEY ("addressId") REFERENCES "addresses"("id")
);