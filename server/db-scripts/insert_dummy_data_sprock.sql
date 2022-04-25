CREATE PROCEDURE p_insert_dummy_data()
BEGIN

    SET FOREIGN_KEY_CHECKS=0;  
    
    TRUNCATE TABLE Communities;
    TRUNCATE TABLE CommunityListings;
    TRUNCATE TABLE CommunityUser;
    TRUNCATE TABLE Offers;
    TRUNCATE TABLE Requests;
    TRUNCATE TABLE Transactions;
    TRUNCATE TABLE Users;

    INSERT INTO Communities (name, description, location, imgurl, private, password) VALUES
    ('Majklockan', 'dummy text', 'POINT(59.85365, 17.60159)', NULL, false, NULL),
    ('Kantorn', 'dummy text', NULL, NULL, false, NULL),
    ('Triangeln', 'dummy text', 'POINT(59.85484, 17.61693)', NULL, true, 'demo');

    INSERT INTO Users (firstname, lastname, number, email, adress, location, imgurl, rating, raters, given, taken) VALUES
    ('Anja', 'Persson', '0735959908', 'anja.persson@icloud.com', 'Råbyvägen 53 B, 75429 Uppsala', 'Gränby', NULL, DEFAULT, DEFAULT, DEFAULT, DEFAULT),
    ('Jesus', 'Kristus', '0737895427', 'jesus.kristus@yahoo.com', 'rackarberget 12', 'Rackarberget', NULL, DEFAULT, DEFAULT, DEFAULT, DEFAULT),
    ('Anders', 'Bagge', '0761745770', 'ansders.bagge@telia.com', 'luthagsesplanaden 18', 'Luthagen', NULL, DEFAULT, DEFAULT, DEFAULT, DEFAULT),
    ('Eric', 'Saade', '0731234567', 'eric.saade@outlook.com', 'kungsgatan 30', 'city', NULL, DEFAULT, DEFAULT, DEFAULT, DEFAULT),
    ('Nils', 'Persson', '0731234567', 'nils.albin.persson@gmail.com', 'Luthagsesplanaden', 'Uppsala', NULL, 1000, 205, 27, 45),
    ('Filip', 'Palmqvist', '0731234567', 'fille.palmqvist@icloud.com', 'Råbyvägen 53 B, 75429 Uppsala', 'Gränby', NULL, 1000, 230, 13,7),
    ('Elis', 'Indebetou', '0731234567', 'elis.indebetou@gmail.com', 'kungsgatan 30', 'city', NULL, 1000, 245, 20, 19),
    ('Erik', 'Larsson', '0731234567', 'larssonerik00@gmail.com', 'kungsgatan 30', 'city', NULL, 1000, 300, 43, 37),
    ('Anna', 'Hellman', '0731234567', 'anna.hellman@gmail.com', 'kungsgatan 30', 'city', NULL, 1000, 290, 31, 20),
    ('Filip', 'von Knorring', '0731234567', 'fille.vk@gmail.com', 'kungsgatan 30', 'city', NULL, 1000, 205, 12, 40),
    ('Kajsa', 'Uhrenius', '0731234567', 'kajsa.uhrenius@gmail.com', 'kungsgatan 30', 'city', NULL, 1000, 200, 30, 84);


    INSERT INTO Offers (user_id, product_id, product_text, description, quantity, unit, time_of_purchase, time_of_expiration, imgurl, broken_pkg) VALUES
    (1, 1, 'Banan', 'Ska bort i helgen och behöver bli av med mina bananer.', 4, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, true),
    (1, 1, 'Äpple', 'Köpte för många och kommer inte hinna äta alla själv.', 7, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
    (1, 1, 'Marsipan', 'Använde till bakning men kommer inte behöva resten.', 100, 'g', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, true),
    (2, 1, 'Kyckling', 'Blev över från matlagningen.', 200, 'g', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
    (2, 1, 'Biff', 'Kommer hinna gå ut innan jag kan äta det själv.', 500, 'g', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
    (2, 1, 'Mjölk', 'Åker hem över påsk så kommer inte hinna dricka den själv', 1, 'l', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
    (2, 1, 'Kvarg', 'Blåbärssmak! Köpte flera under erbjudande men tyckte inte om smaken', 2, 'dl', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
    (3, 1, 'Matolja', 'Råkade köpa dubbelt, så lägger ut den oöppnade här :)', 1, 'l', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
    (4, 1, 'Citron', 'When life gives you lemons... You put them on MatSam <3', 20, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
    (5, 1, 'Redbull', 'Mina barn har lyckats få tag på denna hemska vara. Snälla ta dom fort!!', 5, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false),
    (6, 1, 'Aubergine', 'Trodde jag köpte en jättepaprika... Vill ej ha denna', 1, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, true),
    (7, 1, 'Strösocker', 'Om någon vill ha lite strösocker så har jag över :)', 20, 'kg', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), NULL, false);

    INSERT INTO Requests (user_id, product_text, description, quantity, unit, time_of_expiration) VALUES
    (1, 'Majs', 'Ska laga tacos och insåg att jag saknade majsen', 1, 'st', CURRENT_TIMESTAMP()),
    (1, 'Korv', 'Tänkte dra och grilla så söker korv om någon har över!', 10, 'st', CURRENT_TIMESTAMP()),
    (1, 'Grädde', 'Behöver 2dl till matlagningen!', 2, 'dl', CURRENT_TIMESTAMP()),
    (1, 'Majsstärkelse', 'Skulle behöva typ 1dl till en sås jag tänkte göra', 1, 'dl', CURRENT_TIMESTAMP()),
    (4, 'Ägg', 'Söker 3 ägg!', 3, 'st', CURRENT_TIMESTAMP()),
    (5, 'Bakpulver', 'Har någon lite bakpulver över som de kan dela?', 20, 'g', CURRENT_TIMESTAMP()),
    (6, 'Fyllig sås', 'Nån god sås söker jag, man kan aldrig få för mycket sås.', 200, 'ml', CURRENT_TIMESTAMP()),
    (7, 'Palsternacka', 'Alla säger att palsternacka är äckligt men jag tycker det är mmmm', 5, 'st', CURRENT_TIMESTAMP()),
    (8, 'Dadlar', 'Har ni testat dadlar med bacon?? Det är sjukt gott!', 30, 'st', CURRENT_TIMESTAMP()),
    (9, 'Hummer', 'Hunden åt den vi hade, gästerna kommer om en timma!', 1, 'st', CURRENT_TIMESTAMP()),
    (10, 'Köttbullar', 'Jag har mackaronerna och ketchupen, saknar bara köttbullarna.', 15, 'st', CURRENT_TIMESTAMP()),
    (11, 'Flingor', 'En dag som börjar utan flingor blir sällan bra. Hjälp!', 700, 'g', CURRENT_TIMESTAMP()),
    (11, 'Mozzarella', 'Pizza utan mozzarella borde vara olagligt.', 200, 'g', CURRENT_TIMESTAMP()),
    (11, 'Morötter', 'Morot med dip är underskattat som snacks på fredagskvällen!', 200, 'g', CURRENT_TIMESTAMP());

    INSERT INTO CommunityUser (community_id, user_id) VALUES
    (1, 1), (2, 1), (1, 2), (1, 3), (1, 4), (2, 2), (3, 1), (3, 4);

    INSERT INTO CommunityListings (community_id, request_id, offer_id) VALUES
    (1, 1, NULL), (1, 2, NULL), (1, 3, NULL), (1, 8, NULL), (1, 9, NULL), (1, 10, NULL), 
    (1, 11, NULL), (1, 12, NULL), (1, 13, NULL), (1, 14, NULL), (2, 2, NULL), (2, 3, NULL), 
    (2, 4, NULL), (2, 5, NULL), (2, 6, NULL), (2, 7, NULL), (1, NULL, 1), (1, NULL, 2), 
    (1, NULL, 3), (1, NULL, 4), (1, NULL, 5), (1, NULL, 6), (1, NULL, 7), (1, NULL, 8), 
    (1, NULL, 9), (1, NULL, 10), (1, NULL, 11), (1, NULL, 12), (3, NULL, 1), (3, NULL, 2),
    (3, NULL, 3), (3, NULL, 4), (3, NULL, 5);

    INSERT INTO Transactions (offer_id, request_id, status, responder_id, time_of_expiration) VALUES
    (1, NULL, 'accepted', 2, CURRENT_TIMESTAMP()),
    (2, NULL, 'accepted', 3, CURRENT_TIMESTAMP()),
    (3, NULL, 'pending', 1, CURRENT_TIMESTAMP()),
    (4, NULL, 'pending', 1, CURRENT_TIMESTAMP()),
    (5, NULL, 'completed', 1, CURRENT_TIMESTAMP()),
    (6, NULL, 'completed', 1, CURRENT_TIMESTAMP()),
    (NULL, 1, 'accepted', 1, CURRENT_TIMESTAMP()),
    (NULL, 2, 'accepted', 1, CURRENT_TIMESTAMP()),
    (NULL, 3, 'pending', 1, CURRENT_TIMESTAMP()),
    (NULL, 4, 'pending', 1, CURRENT_TIMESTAMP()),
    (NULL, 5, 'completed', 1, CURRENT_TIMESTAMP()),
    (NULL, 6, 'completed', 1, CURRENT_TIMESTAMP());

    SET FOREIGN_KEY_CHECKS=1;  
    
END

