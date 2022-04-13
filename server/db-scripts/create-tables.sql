CREATE SCHEMA matsam;
USE matsam;

CREATE TABLE IF NOT EXISTS Communities
(
    id          INT AUTO_INCREMENT
        PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT         NULL,
    location    TEXT         NOT NULL,
    imgurl      TEXT         NULL,
    private     TINYINT(1)   NOT NULL,
    password    TEXT         NULL,
    CONSTRAINT Communities_name_uindex
        UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS Users
(
    id        INT AUTO_INCREMENT
        PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname  TEXT NOT NULL,
    number    TEXT NOT NULL,
    email     TEXT NOT NULL,
    adress    TEXT NOT NULL,
    location  TEXT NOT NULL,
    imgurl    TEXT NULL,
    rating    INT  NOT NULL DEFAULT 0,
    raters    INT  NOT NULL DEFAULT 0,
    given     INT  NOT NULL DEFAULT 0,
    taken     INT  NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS CommunityUser
(
    id           INT AUTO_INCREMENT
        PRIMARY KEY,
    community_id INT NOT NULL,
    user_id      INT NOT NULL,
    CONSTRAINT communityuser_ibfk_1
        FOREIGN KEY (community_id) REFERENCES Communities (id)
        ON DELETE CASCADE,
    CONSTRAINT communityuser_ibfk_2
        FOREIGN KEY (user_id) REFERENCES Users (id)
        ON DELETE CASCADE
);

CREATE INDEX community_id
    ON CommunityUser (community_id);

CREATE INDEX user_id
    ON CommunityUser (user_id);

CREATE TABLE IF NOT EXISTS Offers
(
    id                 INT AUTO_INCREMENT
        PRIMARY KEY,
    user_id            INT        NOT NULL,
    product_id         INT        NOT NULL,
    product_text       TEXT       NULL,
    description        TEXT       NULL,
    quantity           INT        NOT NULL,
    time_of_creation   TIMESTAMP  NOT NULL,
    time_of_purchase   TIMESTAMP  NOT NULL,
    time_of_expiration TIMESTAMP  NOT NULL,
    imgurl             TEXT       NULL,
    broken_pkg         TINYINT(1) NOT NULL,
    CONSTRAINT offers_ibfk_1
        FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE INDEX user_id
    ON Offers (user_id);

CREATE TABLE IF NOT EXISTS Requests
(
    id                 INT AUTO_INCREMENT
        PRIMARY KEY,
    user_id            INT       NOT NULL,
    product_text       TEXT      NOT NULL,
    description        TEXT      NULL,
    quantity           INT       NOT NULL,
    time_of_creation   TIMESTAMP NOT NULL,
    time_of_expiration TIMESTAMP NULL,
    CONSTRAINT requests_ibfk_1
        FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE TABLE IF NOT EXISTS CommunityListings
(
    id           INT AUTO_INCREMENT
        PRIMARY KEY,
    community_id INT NOT NULL,
    request_id   INT NULL,
    offer_id     INT NULL,
    CONSTRAINT communitylistings_ibfk_1
        FOREIGN KEY (request_id) REFERENCES Requests (id)
        ON DELETE CASCADE,
    CONSTRAINT communitylistings_ibfk_2
        FOREIGN KEY (offer_id) REFERENCES Offers (id)
        ON DELETE CASCADE,
    CONSTRAINT communitylistings_ibfk_3
        FOREIGN KEY (community_id) REFERENCES Communities (id)
        ON DELETE CASCADE
);

CREATE INDEX community_id
    ON CommunityListings (community_id);

CREATE INDEX offer_id
    ON CommunityListings (offer_id);

CREATE INDEX request_id
    ON CommunityListings (request_id);

CREATE INDEX user_id
    ON Requests (user_id);

CREATE TABLE IF NOT EXISTS Transactions
(
    id                 INT AUTO_INCREMENT
        PRIMARY KEY,
    offer_id           INT       NULL,
    request_id         INT       NULL,
    status             TEXT      NOT NULL,
    responder_id       INT       NOT NULL,
    time_of_creation   TIMESTAMP NOT NULL,
    time_of_expiration TIMESTAMP NOT NULL,
    CONSTRAINT transactions_ibfk_1
        FOREIGN KEY (offer_id) REFERENCES Offers (id)
        ON DELETE CASCADE,
    CONSTRAINT transactions_ibfk_2
        FOREIGN KEY (request_id) REFERENCES Requests (id)
        ON DELETE CASCADE,
    CONSTRAINT transactions_ibfk_3
        FOREIGN KEY (responder_id) REFERENCES Users (id)
    CONSTRAINT transactions_offer_id_uindex
        UNIQUE (offer_id)
    CONSTRAINT transactions_request_id_uindex
        UNIQUE (request_id)
);

CREATE INDEX offer_id
    ON Transactions (offer_id);

CREATE INDEX request_id
    ON Transactions (request_id);

CREATE INDEX responder_id
    ON Transactions (responder_id);
