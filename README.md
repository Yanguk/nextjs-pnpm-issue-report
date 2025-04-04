1. first

```bash
pnpm install
```

2. set logging

```bash
echo "console.log('💥 lucide-react 479');" >> node_modules/.pnpm/lucide-react@0.479.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/camera.js

echo "console.log('🌈 lucide-react 400');" >> node_modules/.pnpm/lucide-react@0.400.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/camera.js
```

3. build next-app-two

```pnpm
pnpm --filter next-two build
```

3. stdout console is weird

next-two use lucide-react 479 version,

but!!

you can see `console.log('🌈 lucide-react 400!!');`

i want to use lucide-react 479 version
