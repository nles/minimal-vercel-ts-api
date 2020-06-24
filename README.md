### Setup

```
yarn
```

### Develop

```
yarn run dev
```

NOTE: due to vercel-cli (previously now-cli) no longer supporting local
development without token after version 17, there's a small hack in place to
use version 16.6.3 for dev. Read more at
https://github.com/vercel/vercel/issues/3767

### Deploy

```
VERCEL_TOKEN=your-vercel-token yarn run deploy
```

### Try

```
curl -XPOST http://0.0.0.0:8081/api/example -H 'Content-Type: application/json' -d '{"age":100}'
```
