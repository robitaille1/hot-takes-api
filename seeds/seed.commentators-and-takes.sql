BEGIN;

INSERT INTO commentators
    (name, network, twitter, instagram, about)
VALUES
  ('Bill Simmons', 'The Ringer', 'https://twitter.com/BillSimmons', 'https://www.instagram.com/sptguy33/', 'William John Simmons III, is an American former sports writer and current sports analyst, author, and podcaster. Simmons first gained attention with his website as "The Boston Sports Guy" and was recruited by ESPN in 2001, where he eventually operated the website Grantland and worked until 2015.'),
  ('Dave Portnoy', 'Barstool Sports', 'https://twitter.com/stoolpresidente', 'https://www.instagram.com/stoolpresidente/', 'David Portnoy is an American internet celebrity, blogger, and founder of the satirical sports and pop culture blog Barstool Sports.'),
  ('Stephen A. Smith', 'ESPN', 'https://twitter.com/stephenasmith', 'https://www.instagram.com/stephenasmith/', 'Stephen Anthony Smith is an American sports television personality, sports radio host, sports journalist, and actor. Smith is a commentator on ESPN First Take, where he appears with Max Kellerman and Molly Qerim. He also makes frequent appearances as an NBA analyst on SportsCenter'),
  ('Max Kellerman', 'ESPN', 'https://twitter.com/maxkellerman', 'https://www.instagram.com/max_kellerman/', 'Max Kellerman is an American sports television personality and boxing commentator. He is currently a co-host of ESPN talk show First Take alongside Stephen A. Smith and Molly Qerim and a co-host of the sports radio talk show Max & Marcellus, with Marcellus Wiley, on ESPNLA. '),
  ('Shannon Sharpe', 'Fox Sports', 'https://twitter.com/ShannonSharpe', 'https://www.instagram.com/shannonsharpe84/', 'Shannon Sharpe is a former American football tight end who played for the Denver Broncos and Baltimore Ravens of the National Football League, as well as a former analyst for CBS Sports on its NFL telecasts. He is a TV presenter who co-hosts Skip and Shannon: Undisputed with Skip Bayless.'),
  ('Skip Bayless', 'Fox Sports', 'https://twitter.com/realskipbayless', 'https://www.instagram.com/skipbayless/', 'Skip Bayless is an American sports columnist, author, and television personality. He is well known for his work as a commentator on the ESPN2 show, First Take, with Stephen A. Smith, a show which he left in June 2016'),
  ('Jalen Rose', 'ESPN', 'https://twitter.com/jalenrose', 'https://www.instagram.com/jalenvseverybody/', 'Jalen Anthony Rose is an American former professional basketball player, current sports analyst for ESPN, and cofounder of the Jalen Rose Leadership Academy. '),
  ('Dan Le Batard', 'ESPN', 'https://twitter.com/LeBatardShow', 'https://www.instagram.com/lebatardshow/', 'Daniel Thomas Le Batard is an American newspaper sportswriter, radio host, and television reporter based in Miami, Florida. He is best known for his work with ESPN, and for his hometown paper, the Miami Herald, for which he wrote from 1990 to 2016.'),
  ('Ryen Russillo', 'The Ringer', 'https://twitter.com/ryenarussillo', 'https://www.instagram.com/ryenrussillo/', 'Ryen Russillo is an American sports journalist and American sports host who for many years hosted a popular radio show on ESPN. From 2009–2017, Russillo had been a host or co-host of the afternoon show on ESPN Radio'),
  ('Mina Kimes', 'ESPN', 'https://twitter.com/minakimes', 'https://www.instagram.com/mina_kimes/', 'Mina Kimes is a Los Angeles-based American investigative journalist who specializes in business and sports reporting. A multiple award-winner, she has written for Fortune magazine, Bloomberg News, and ESPN.');


INSERT INTO takes (take, commentatorId, commentator, correct, sport) VALUES
  ('The Celtics will beat the Cavs by 50 points', '1', 'Bill Simmons', 'FALSE', 'NBA'),
  ('The Chiefs will beat the Texans.', '1', 'Bill Simmons', 'FALSE', 'NFL'),
  ('The Patriots will beat the Giants', '2', 'Dave Portnoy', 'TRUE', 'NFL'),
  ('Kyrie Irving will leave the Celtics', '1', 'Bill Simmons', 'TRUE', 'NBA'),
  ('The Raptors will beat the Warriors in the Finals', '1', 'Bill Simmons', 'TRUE', 'NBA'),
  ('Patrick Mahomes will win the MVP for the 2018 season', '3', 'Stephen A. Smith', 'TRUE', 'NFL'),
  ('Patriots quarterback Tom Brady was going to “fall off a cliff” and “be a bum in short order', '4', 'Max Kellerman', 'FALSE', 'NFL'),
  ('Lebron will win more titles than Jordan', '5', 'Shannon Sharpe', 'FALSE', 'NBA'),
  ('Drew Brees will play all 16 games this season', '10', 'Mina Kimes', 'FALSE', 'NFL'),
  ('Kemba Walker will join the Celtics from Charlotte', '7', 'Jalen Rose', 'TRUE', 'NBA'),
  ('Maurizo Sarri will be sacked by Chelsea', '9', 'Ryen Russillo', 'TRUE', 'EPL'),
  ('Kyrie Irivin will stay with the Celtics', '12', 'Dan Le Batard', 'FALSE', 'NBA'),
  ('Lebron James will win the 2018 MVP', '6', 'Skip Bayless', 'FALSE', 'NBA'),
  ('Kevin Durant will leave Golden State', '6', 'Skip Bayless', 'TRUE', 'NBA'),
  ('Kawhi Leonard wil go to the LA Clippers', '10', 'Mina Kimes', 'TRUE', 'NBA'),
  ('Frank Lampard will become Chelsea manager', '9', 'Ryen Russillo', 'TRUE', 'EPL');



COMMIT;