CREATE TABLE utilisateur (
  pseudo varchar(20) PRIMARY KEY,
  mdp varchar(20),
  avatar varchar(10),
  code varchar(15)
);

INSERT INTO utilisateur (pseudo, mdp, avatar, code) VALUES
('nathan_bo', 'a', 'avtr1', '1_0_0_4_0'),
('theo_ajn', 'a', 'avtr3', '11_0_4_0_0'),

('cac', 'a', 'avtr1', '8_0_3_10_9'),
('cxc', 'a', 'avtr2', '0_0_9_0_0'),
('dxca', 'a', 'avtr4', '7_0_2_0_0'),
('excr', 'a', 'avtr2', '0_0_0_0_0'),
('dytrfdt', 'a', 'avtr3', '11_0_4_3_8'),
('Minedead91', 'Theo', 'avtr4', '0_0_0_0_0'),
('test', 'a', 'avtr3', '7_0_2_0_6'),
('tyo', 'a', 'avtr3', '2_0_5_0_2'),
('ytty', 'a', 'avtr3', '4_0_2_0_0');