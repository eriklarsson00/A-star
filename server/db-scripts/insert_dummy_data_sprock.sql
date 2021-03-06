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
    ('Majklockan', 'Majklockan är beläget i Flogsta som idag har rikligt med studentbostäder.', NULL, 'https://matsamverkan.s3.amazonaws.com/communityImages/majklockan.jpg', false, NULL),
    ('Kantorn', 'Rikshems välplanerade studentbostäder i Kvarngärdet är belägna på Kantorsgatan, cirka 2 kilometer norr om Uppsala centrum.', NULL, 'https://matsamverkan.s3.amazonaws.com/communityImages/kantorn.jpeg', false, NULL),
    ('Triangeln', 'Triangeln är beläget mellan S:t Johannesgatan och Karlsrogatan vid Rackarberget.', NULL, 'https://matsamverkan.s3.amazonaws.com/communityImages/triangeln.jpeg', false, NULL),
    ('Rackarberget', 'Rackarberget ligger vackert beläget intill Gamla Studentstaden. Härifrån är det nära till centrum och många av universitetets institutioner. På Rackarberget finns både studentrum och lägenheter', NULL, 'https://matsamverkan.s3.amazonaws.com/communityImages/Rackis.jpg', false, NULL),
    ('Ultuna', 'beskv.', NULL, 'https://matsamverkan.s3.amazonaws.com/communityImages/ultuna.jpeg', false, NULL),
    ('Ångström', 'Här kan man plugga, man kan även hänga på takterass', NULL, 'https://matsamverkan.s3.amazonaws.com/communityImages/%C3%A5ngan.jpg', true, 'Demo');


       INSERT INTO Users (firstname, lastname, number, email, adress, location, imgurl, rating, raters, given, taken) VALUES
    ('Anja', 'Pärsson', '0735959908', 'anja.parsson@icloud.com', 'Råbyvägen 53 B, 75429 Uppsala', 'Gränby', 'https://matsamverkan.s3.amazonaws.com/profilePictures/anja.jpeg', 9, 4, 23, 19),
    ('Jesus', 'Kristus', '0737895427', 'jesus.kristus@yahoo.com', 'rackarberget 12', 'Rackarberget', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/Obi_Wan_kenobi.jpeg', DEFAULT, DEFAULT, DEFAULT, DEFAULT),
    ('Anders', 'Bagge', '0761745770', 'ansders.bagge@telia.com', 'luthagsesplanaden 18', 'Luthagen', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/anders_bagge.jpg', DEFAULT, DEFAULT, DEFAULT, DEFAULT),
    ('Eric', 'Saade', '0731234567', 'eric.saade@outlook.com', 'kungsgatan 30', 'city', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/eric_saade.jpg', DEFAULT, DEFAULT, DEFAULT, DEFAULT),
    ('Nils', 'Persson', '0731234568', 'nils.albin.persson@gmail.com', 'Luthagsesplanaden', 'Uppsala', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/nils.jpg', 1000, 205, 27, 45),
    ('Filip', 'Palmqvist', '0731234569', 'fille.palmqvist@icloud.com', 'Råbyvägen 53 B, 75429 Uppsala', 'Gränby', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/filip1.jpg', 1000, 230, 13,7),
    ('Elis', 'Indebetou', '0731234570', 'elis.indebetou@gmail.com', 'kungsgatan 30', 'city', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/elis.jpg', 1000, 245, 20, 19),
    ('Erik', 'Larsson', '0731234571', 'larssonerik00@gmail.com', 'kungsgatan 31', 'city', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/erik.jpg', 1000, 300, 43, 37),
    ('Anna', 'Hellman', '0731234572', 'anna.hellman@gmail.com', 'kungsgatan 32', 'city', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/anna.jpg', 1000, 290, 31, 20),
    ('Filip', 'von Knorring', '0731234573', 'fille.vk@gmail.com', 'kungsgatan 33', 'city', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/filip2.jpg', 1000, 205, 12, 40),
    ('Kajsa', 'Uhrenius', '0731234574', 'kajsa.uhrenius@gmail.com', 'kungsgatan 33', 'city', 'https://matsamverkan.s3.amazonaws.com/dummydata/profilbilder/kajsa.jpg', 1000, 200, 30, 84);


    INSERT INTO Offers (user_id, product_id, product_text, description, quantity, unit, time_of_purchase, time_of_expiration, imgurl, broken_pkg) VALUES
    (1, 1, 'Banan', 'Ska bort i helgen och behöver bli av med mina bananer.', 4, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', true),
    (1, 1, 'Äpple', 'Köpte för många och kommer inte hinna äta alla själv.', 7, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/apple.jpg', false),
    (1, 1, 'Marsipan', 'Använde till bakning men kommer inte behöva resten.', 100, 'g', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/marspian.jpg', true),
    (2, 1, 'Kyckling', 'Blev över från matlagningen.', 200, 'g', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/kyckling.jpg', false),
    (2, 1, 'Biff', 'Kommer hinna gå ut innan jag kan äta det själv.', 500, 'g', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/biff.jpeg', false),
    (2, 1, 'Mjölk', 'Åker hem över påsk så kommer inte hinna dricka den själv', 1, 'l', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/mjolk.jpg', false),
    (2, 1, 'Kvarg', 'Blåbärssmak! Köpte flera under erbjudande men tyckte inte om smaken', 2, 'dl', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/lindahls-kaffe-kvarg.jpg', false),
    (3, 1, 'Matolja', 'Råkade köpa dubbelt, så lägger ut den oöppnade här :)', 1, 'l', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/matolja.jpeg', false),
    (4, 1, 'Citron', 'When life gives you lemons... You put them on MatSam <3', 20, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/citron.png', false),
    (5, 1, 'Redbull', 'Mina barn har lyckats få tag på denna hemska vara. Snälla ta dom fort!!', 5, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/redbull.jpg', false),
    (6, 1, 'Aubergine', 'Trodde jag köpte en jättepaprika... Vill ej ha denna', 1, 'st', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/aubergine.webp', true),
    (7, 1, 'Strösocker', 'Om någon vill ha lite strösocker så har jag över :)', 20, 'kg', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 'https://matsamverkan.s3.amazonaws.com/dummydata/items/socker_ny.jpg', false);

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
    (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (1, 2), (1, 3), (1, 4), (2, 2), 
    (3, 4), (1, 5), (2, 6), (3, 7), (4, 8), (5, 9), (6, 10), (1, 11), (6, 5), (5, 6), 
    (4, 7), (3, 8), (2, 9), (1, 10), (2, 11), (4, 5);

    INSERT INTO CommunityListings (community_id, request_id, offer_id) VALUES
    (1, 1, NULL), (1, 2, NULL), (1, 3, NULL), (1, 8, NULL), (1, 9, NULL), (1, 10, NULL), 
    (1, 11, NULL), (1, 12, NULL), (1, 13, NULL), (1, 14, NULL), (2, 2, NULL), (2, 3, NULL), 
    (2, 4, NULL), (2, 5, NULL), (2, 6, NULL), (2, 7, NULL), (1, NULL, 1), (1, NULL, 2), 
    (1, NULL, 3), (1, NULL, 4), (1, NULL, 5), (1, NULL, 6), (1, NULL, 7), (1, NULL, 8), 
    (1, NULL, 9), (1, NULL, 10), (1, NULL, 11), (1, NULL, 12), (3, NULL, 1), (3, NULL, 2),
    (3, NULL, 3), (3, NULL, 4), (3, NULL, 5);

    INSERT INTO Transactions (offer_id, request_id, status, responder_id, time_of_update, time_of_expiration) VALUES
    (1, NULL, 'accepted', 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    (2, NULL, 'accepted', 3, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    (3, NULL, 'pending', 1, NULL, CURRENT_TIMESTAMP()),
    (4, NULL, 'pending', 1, NULL, CURRENT_TIMESTAMP()),
    (5, NULL, 'completed', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    (6, NULL, 'completed', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    (NULL, 1, 'accepted', 4, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    (NULL, 2, 'accepted', 4, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    (NULL, 3, 'pending', 1, NULL, CURRENT_TIMESTAMP()),
    (NULL, 4, 'pending', 1, NULL, CURRENT_TIMESTAMP()),
    (NULL, 5, 'completed', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
    (NULL, 6, 'completed', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

    SET FOREIGN_KEY_CHECKS=1;  
    
END

