CREATE TABLE `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `number` text NOT NULL,
  `email` text NOT NULL,
  `address` text NOT NULL,
  `location` text,
  `imgurl` text,
  `rating` int,
  `raters` int,
  `given` int,
  `taken` int
);

CREATE TABLE `Communities` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `location` text,
  `imgurl` text,
  `private` bool,
  `password` text
);

CREATE TABLE `Offers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `product_id` int,
  `product_text` text,
  `description` text,
  `quantity` int,
  `time_of_creation` timestamp,
  `time_of_purchase` timestamp,
  `time_of_expiration` timestamp,
  `imgurl` text,
  `broken_pkg` bool,
  FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
);

CREATE TABLE `Requests` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int,
  `description` text,
  `quantity` int,
  `time_of_creation` timestamp,
  `time_of_expiration` timestamp,
  FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
);

CREATE TABLE `Transactions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `listing_type` text NOT NULL,
  `offer_id` int NOT NULL,
  `request_id` int NOT NULL,
  `status` text NOT NULL,
  `lister_id` int NOT NULL,
  `responder_id` int NOT NULL,
  `time_of_creation` timestamp,
  `time_of_expiration` timestamp,
  FOREIGN KEY (`offer_id`) REFERENCES Offers(`id`),
  FOREIGN KEY (`request_id`) REFERENCES Requests(`id`),
  FOREIGN KEY (`lister_id`) REFERENCES Users(`id`),
  FOREIGN KEY (`responder_id`) REFERENCES Users(`id`)

);

CREATE TABLE `CommunityListings` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `community_id` int NOT NULL,
  `request_id` int NOT NULL,
  `offer_id` int NOT NULL,
  FOREIGN KEY (`request_id`) REFERENCES Requests(`id`),
  FOREIGN KEY (`offer_id`) REFERENCES Offers(`id`),
  FOREIGN KEY (`community_id`) REFERENCES Communities(`id`)
);

CREATE TABLE `CommunityUser` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `community_id` int NOT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY (`community_id`) REFERENCES Communities(`id`),
  FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
);