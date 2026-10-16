# Todo List Application

React (Vite) + Material UI + Axios frontend, Node.js + Express backend ve PostgreSQL veritabanı ile geliştirilmiş basit bir Todo List uygulaması.

## Gereksinimler

- Node.js (18 veya üzeri)
- PostgreSQL

## Kurulum

### 1. Veritabanını oluştur

```bash
createdb -U postgres todo_db
psql -U postgres -d todo_db -f server/db.sql
```

> macOS'ta PostgreSQL resmi yükleyicisiyle kurulduysa komutlar `/Library/PostgreSQL/<sürüm>/bin/` altındadır.

Tabloyu `public` dışında bir şemada tutmak istersen şemayı oluşturup `.env` içinde `DB_SCHEMA` değerini o şemanın adı yap:

```bash
psql -U postgres -d todo_db -c "CREATE SCHEMA todo_db"
PGOPTIONS="-c search_path=todo_db" psql -U postgres -d todo_db -f server/db.sql
```

### 2. Backend

```bash
cd server
cp .env.example .env   # ardından .env içindeki DB bilgilerini düzenle
npm install
npm run dev
```

Sunucu `http://localhost:5001` adresinde çalışır.

### 3. Frontend

Yeni bir terminalde:

```bash
cd client
npm install
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılır.

## API Endpointleri

| HTTP Metodu | Endpoint | Açıklama |
|---|---|---|
| GET | /api/todos | Bütün görevleri getir |
| POST | /api/todos | Yeni görev oluştur |
| PUT | /api/todos/:id | Görev başlığını güncelle |
| PATCH | /api/todos/:id/toggle | Tamamlanma durumunu değiştir |
| DELETE | /api/todos/:id | Görevi sil |

Örnek POST isteği:

```json
{ "title": "React çalış" }
```

## Proje Yapısı

```text
client/   React arayüzü (components, services)
server/   Express API (config, controllers, routes)
```
