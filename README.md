## Pixelio
Web Builder  WeB Builder(Test)
Developer Rafael Aguirre

## Install Dependencies
```bash
npm i
yarn i
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Inicializar prisma

```bash
npx prisma studio
```

## Inicializar inngest

```bash
npx inngest-cli@latest dev
```

## Login E2b

```bash
e2b auth login
```
## Configurar api_key sanbox 
```
set E2B_API_KEY= api_key
```
## crear template 
```
e2b sandbox list
```
## SandBox Log
Log
```
e2b sandbox logs
```
## Ejecutar Template

Ten en cuenta en tener docker instalado y desactivar el servidor , inngest y prisma
```bash
e2b template build --name nombre --cmd "/compile_page.sh"
```
## Inicializar docker 


```bash
e2b template publish -t id_team
```

## Links SandBox dashboard

https://e2b.dev/sign-in

## DataBase

https://console.neon.tech/


<img width="1919" height="1089" alt="image" src="https://github.com/user-attachments/assets/15e66558-4feb-4fea-b5a0-fe39af2897f7" />
