-- 1. Buat tables
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon_url TEXT DEFAULT '',
  icon_width INTEGER DEFAULT 120,
  icon_height INTEGER DEFAULT 120,
  range_label TEXT DEFAULT '',
  user_id_label TEXT DEFAULT 'User ID',
  user_id_placeholder TEXT DEFAULT '12345678',
  server_id_label TEXT DEFAULT 'Server ID',
  server_id_placeholder TEXT DEFAULT '1000',
  server_id_required BOOLEAN DEFAULT false,
  hide_server_id BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  nominal_label TEXT NOT NULL,
  price INTEGER NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. RLS policies
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow all for authenticated" ON settings FOR ALL USING (true) WITH CHECK (true);

-- 3. Insert games
INSERT INTO games (slug, name, range_label, user_id_label, user_id_placeholder, server_id_label, server_id_placeholder, server_id_required, hide_server_id, sort_order)
VALUES 
('mobile-legends', 'Mobile Legends', '5 – 706 Diamond', 'User ID', '12345678', 'Zone ID', '1234', true, false, 1),
('free-fire', 'Free Fire', '5 – 1000 Diamond', 'User ID', '12345678', '', '', false, true, 2),
('pubg-mobile', 'PUBG Mobile', '60 – 8100 UC', 'User ID', '12345678', '', '', false, true, 3),
('call-of-duty-mobile', 'Call of Duty: Mobile', '53 – 10800 CP', 'User ID', '12345678', '', '', false, true, 4),
('magic-chess-go-go', 'Magic Chess: Go Go', '16 – 512 Diamond', 'User ID', '12345678', 'Zone ID', '1234', true, false, 5)
ON CONFLICT (slug) DO NOTHING;

-- 4. Insert pricing Mobile Legends
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '5 Diamond', 1500, 1 FROM games WHERE slug='mobile-legends';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '12 Diamond', 3400, 2 FROM games WHERE slug='mobile-legends';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '28 Diamond', 7900, 3 FROM games WHERE slug='mobile-legends';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '59 Diamond', 16500, 4 FROM games WHERE slug='mobile-legends';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '86 Diamond', 23500, 5 FROM games WHERE slug='mobile-legends';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '172 Diamond', 46500, 6 FROM games WHERE slug='mobile-legends';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '257 Diamond', 69000, 7 FROM games WHERE slug='mobile-legends';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '344 Diamond', 92000, 8 FROM games WHERE slug='mobile-legends';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '706 Diamond', 185000, 9 FROM games WHERE slug='mobile-legends';

-- 5. Insert pricing Free Fire
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '5 Diamond', 1500, 1 FROM games WHERE slug='free-fire';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '12 Diamond', 2900, 2 FROM games WHERE slug='free-fire';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '50 Diamond', 8500, 3 FROM games WHERE slug='free-fire';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '70 Diamond', 11500, 4 FROM games WHERE slug='free-fire';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '100 Diamond', 16000, 5 FROM games WHERE slug='free-fire';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '140 Diamond', 22000, 6 FROM games WHERE slug='free-fire';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '355 Diamond', 52000, 7 FROM games WHERE slug='free-fire';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '720 Diamond', 103000, 8 FROM games WHERE slug='free-fire';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '1000 Diamond', 142000, 9 FROM games WHERE slug='free-fire';

-- 6. Insert pricing PUBG Mobile
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '60 UC', 15000, 1 FROM games WHERE slug='pubg-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '120 UC', 29000, 2 FROM games WHERE slug='pubg-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '180 UC', 43000, 3 FROM games WHERE slug='pubg-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '325 UC', 72000, 4 FROM games WHERE slug='pubg-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '660 UC', 143000, 5 FROM games WHERE slug='pubg-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '985 UC', 212000, 6 FROM games WHERE slug='pubg-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '1800 UC', 385000, 7 FROM games WHERE slug='pubg-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '3850 UC', 770000, 8 FROM games WHERE slug='pubg-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '8100 UC', 1540000, 9 FROM games WHERE slug='pubg-mobile';

-- 7. Insert pricing COD Mobile
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '53 CP', 11000, 1 FROM games WHERE slug='call-of-duty-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '106 CP', 21000, 2 FROM games WHERE slug='call-of-duty-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '212 CP', 41000, 3 FROM games WHERE slug='call-of-duty-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '424 CP', 80000, 4 FROM games WHERE slug='call-of-duty-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '880 CP', 160000, 5 FROM games WHERE slug='call-of-duty-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '1320 CP', 238000, 6 FROM games WHERE slug='call-of-duty-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '2400 CP', 425000, 7 FROM games WHERE slug='call-of-duty-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '5000 CP', 850000, 8 FROM games WHERE slug='call-of-duty-mobile';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '10800 CP', 1700000, 9 FROM games WHERE slug='call-of-duty-mobile';

-- 8. Insert pricing Magic Chess
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '16 Diamond', 4500, 1 FROM games WHERE slug='magic-chess-go-go';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '32 Diamond', 8500, 2 FROM games WHERE slug='magic-chess-go-go';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '64 Diamond', 16500, 3 FROM games WHERE slug='magic-chess-go-go';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '128 Diamond', 32500, 4 FROM games WHERE slug='magic-chess-go-go';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '256 Diamond', 64000, 5 FROM games WHERE slug='magic-chess-go-go';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, '512 Diamond', 127000, 6 FROM games WHERE slug='magic-chess-go-go';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, 'Weekly Pass', 29000, 7 FROM games WHERE slug='magic-chess-go-go';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, 'Season Pass', 89000, 8 FROM games WHERE slug='magic-chess-go-go';
INSERT INTO pricing (game_id, nominal_label, price, sort_order) SELECT id, 'Premium Pass', 159000, 9 FROM games WHERE slug='magic-chess-go-go';
