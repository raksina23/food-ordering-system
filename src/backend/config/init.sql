CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          VARCHAR(20) DEFAULT 'customer',
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(150) NOT NULL,
  description  TEXT,
  price        NUMERIC(8,2) NOT NULL,
  category     VARCHAR(100),
  image_url    TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id          SERIAL PRIMARY KEY,
  user_id     INT REFERENCES users(id),
  status      VARCHAR(30) DEFAULT 'pending',
  total_price NUMERIC(10,2),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id           SERIAL PRIMARY KEY,
  order_id     INT REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INT REFERENCES menu_items(id),
  quantity     INT NOT NULL,
  unit_price   NUMERIC(8,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
  id           SERIAL PRIMARY KEY,
  user_id      INT REFERENCES users(id) ON DELETE CASCADE,
  menu_item_id INT REFERENCES menu_items(id),
  quantity     INT DEFAULT 1,
  added_at     TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id           SERIAL PRIMARY KEY,
  user_id      INT REFERENCES users(id) ON DELETE CASCADE,
  menu_item_id INT REFERENCES menu_items(id) ON DELETE CASCADE,
  rating       INT CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  created_at   TIMESTAMP DEFAULT NOW()
);
