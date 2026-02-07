# Travel Khiva

## Talablar

- Node.js >= 18
- Yarn
- PM2 (`npm install -g pm2`)

## O'rnatish

### 1. Dependencies o'rnatish

```bash
cd client && yarn install
cd ../cms && yarn install
```

### 2. Environment sozlash

**Client** (`client/.env`):

```env
NEXT_PUBLIC_STRAPI_URL=https://api.travelkhiva.uz
NEXT_PUBLIC_BASE_URL=https://travelkhiva.uz
```

**CMS** (`cms/.env`):

`cms/.env.example` dan nusxa olib, secret qiymatlarni o'zgartiring:

```bash
cp cms/.env.example cms/.env
```

### 3. Build

```bash
cd client && yarn build
cd ../cms && yarn build
```

## PM2 bilan ishga tushirish

### Ikkalasini ishga tushirish

```bash
pm2 start yarn --name "client" --cwd ./client -- start
pm2 start yarn --name "cms" --cwd ./cms -- start
```

### Server reboot da avtomatik ishga tushish

```bash
pm2 save
pm2 startup
```

### Foydali buyruqlar

```bash
pm2 status          # Holatni ko'rish
pm2 logs            # Loglarni ko'rish
pm2 logs client     # Faqat client loglari
pm2 logs cms        # Faqat cms loglari
pm2 restart all     # Hammasini qayta ishga tushirish
pm2 restart client  # Faqat clientni qayta ishga tushirish
pm2 restart cms     # Faqat cms ni qayta ishga tushirish
pm2 stop all        # Hammasini to'xtatish
pm2 delete all      # Hammasini o'chirish
```

## Portlar

| Servis | Port |
|--------|------|
| Client (Next.js) | 3000 |
| CMS (Strapi) | 1337 |
