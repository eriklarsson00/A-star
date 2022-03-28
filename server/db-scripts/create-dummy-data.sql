INSERT INTO Communities (name, description, location, imgurl, private, password) VALUES
('Majklockan', 'dummy text', 'POINT(59.85365, 17.60159)', NULL, false, NULL),
('Kantorn', 'dummy text', 'POINT(59.87378, 17.64386)', NULL, false, NULL),
('Triangeln', 'dummy text', 'POINT(59.85484, 17.61693)', NULL, false, NULL);

INSERT INTO Users (firstname, lastname, number, email, adress, location, imgurl) VALUES
('Anja', 'Persson', '0735959908', 'anja.persson@icloud.com', 'Råbyvägen 53 B, 75429 Uppsala', 'Gränby', NULL),
('Jesus', 'Kristus', '0737895427', 'jesus.kristus@yahoo.com', 'rackarberget 12', 'Rackarberget', NULL),
('Anders', 'Bagge', '0761745770', 'ansders.bagge@telia.com', 'luthagsesplanaden 18', 'Luthagen', NULL),
('Eric', 'Saade', '0731234567', 'eric.saade@outlook.com', 'kungsgatan 30', 'city', NULL);

INSERT INTO Offers (user_id, product_id, product_text, description, quantity, time_of_creation, time_of_purchase,
                    time_of_expiration, imgurl, broken_pkg) VALUES
(1, 1, 'Banan', 'god', 5, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, true),
(1, 1, 'Äpple', 'typ god', 7, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
(1, 1, 'Marsipan', 'äcklig', 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, true),
(2, 1, 'Kyckling', 'hade för mycket', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
(2, 1, 'Biff', NULL, 500, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
(2, 1, 'Tofu', 'spicy', 700, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
(2, 1, 'Rotfruktsgratäng', 'mums', 900, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false);

INSERT INTO Requests (user_id, product_id, description, quantity, time_of_creation, time_of_expiration) VALUES
(3, 1, 'Vill ha majs', 150, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(3, 1, 'Vill ha korv', 10, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(3, 1, 'Söker jordnötter', 200, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4, 1, 'Har nån grädde?', 240, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4, 1, 'Ääälskar annannanas', 70, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4, 1, 'bröd.', 500, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4, 1, 'nån god sås söker jag', 200, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO CommunityUser (community_id, user_id) VALUES
(1, 1), (2, 1), (1, 2), (1, 3), (1, 4), (2, 2), (3, 1), (3, 4);

INSERT INTO CommunityListings (community_id, request_id, offer_id) VALUES
(1, 1, NULL), (1, 2, NULL), (1, 3, NULL), (2, 2, NULL), (2, 3, NULL), (2, 4, NULL),
(2, 5, NULL), (2, 6, NULL), (2, 7, NULL), (1, NULL, 1), (1, NULL, 2), (1, NULL, 3),
(1, NULL, 4), (1, NULL, 5), (1, NULL, 6), (1, NULL, 7), (3, NULL, 1), (3, NULL, 2),
(3, NULL, 3), (3, NULL, 4), (3, NULL, 5);

INSERT INTO Transactions (offer_id, request_id, status, responder_id, time_of_creation, time_of_expiration) VALUES
(1, NULL, 'accepted', 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(2, NULL, 'accepted', 3, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(5, NULL, 'accepted', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(NULL, 1, 'accepted', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(NULL, 2, 'accepted', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(NULL, 3, 'accepted', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());