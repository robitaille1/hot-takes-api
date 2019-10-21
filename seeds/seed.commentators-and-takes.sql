BEGIN;

INSERT INTO commentators
    (name, network, twitter, instagram, about)
VALUES
  ('Bill Simmons', 'The Ringer', 'https://twitter.com/BillSimmons', 'https://www.instagram.com/sptguy33/', 'William John Simmons III, is an American former sports writer and current sports analyst, author, and podcaster. Simmons first gained attention with his website as "The Boston Sports Guy" and was recruited by ESPN in 2001, where he eventually operated the website Grantland and worked until 2015.'),
  ('Dave Portnoy', 'Barstool Sports', 'https://twitter.com/stoolpresidente', 'https://www.instagram.com/stoolpresidente/', 'David Portnoy is an American internet celebrity, blogger, and founder of the satirical sports and pop culture blog Barstool Sports.'),
  ('Stephen A. Smith', 'ESPN', 'https://twitter.com/stephenasmith', 'https://www.instagram.com/stephenasmith/', 'Stephen Anthony Smith is an American sports television personality, sports radio host, sports journalist, and actor. Smith is a commentator on ESPN First Take, where he appears with Max Kellerman and Molly Qerim. He also makes frequent appearances as an NBA analyst on SportsCenter');

INSERT INTO takes (take, commentatorId, commentator, correct, sport) VALUES
  ('The Celtics will beat the Cavs by 50 points', '1', 'Bill Simmons', 'FALSE', 'NBA'),
  ('The Chiefs will beat the Texans.', '1', 'Bill Simmons', 'FALSE', 'NFL'),
  ('The Patriots will beat the Giants', '2', 'Dave Portnoy', 'TRUE', 'NFL'),
  ('Kyrie Irving will leave the Celtics', '1', 'Bill Simmons', 'TRUE', 'NBA'),
  ('The Raptors will beat the Warriors in the Finals', '1', 'Bill Simmons', 'TRUE', 'NBA'),
  ('Patrick Mahomes will win the MVP for the 2018 season', '3', 'Stephen A. Smith', 'TRUE', 'NFL');

COMMIT;