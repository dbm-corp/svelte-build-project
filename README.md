# Blog page build up by svelte

## Overview
- Website blog show to travel, fashion blog, etc use Sveltejs and vite to code and build

## Project structor

```bash
src
   |-- lib
   |   |-- components (contain page components)
   |   |-- services (contain module call api function)
   |   |-- store (contain page global store variable)
   |   |-- utils (contain common function)
   |   |-- api.ts (axios config)
   |-- routes (Route page follow file structor)
   |   |-- about (page about)
   |   |   |-- +page.svelte (page ui code)
   |   |   |-- +page.ts (page client side render api)
   |   |-- contact (page contact)
   |   |   |-- +page.svelte
   |   |   |-- +page.ts
   |   |-- fashion (page fashion)
   |   |   |-- +page.svelte
   |   |   |-- +page.ts
   |   |-- travel (page travel)
   |   |   |-- +page.svelte
   |   |   |-- +page.ts
   |   |-- +layout.svelte (common layout ui)
   |   |-- +page.svelte (page / ui)
   |   |-- +page.ts
   |-- env.d.ts (config process variable)
static
   |-- fonts (website fonts)
   |-- images (website images)
package.json (Page package usage)
.env (global process variable)
svelte.config.js (svelte config)
vite.config.ts (vite combine config)
```

## Project technology
- Svelte (framework front-end)
- Axios 

## How to use

Run yarn install to install all package use in project

```bash
yarn install
```
Clone project basic_strapi (https://github.com/dbm-corp/basic_strapi) to folder repo, go in to project and run yarn run develop to run project
```
yarn run develop ( in basic_strapi folder)
```

To run project in local

```bash
yarn dev
```

To build project

```bash
yarn build
```
