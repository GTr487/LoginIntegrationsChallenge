# LoginIntegrationsChallenge

## Instalación


El proyecto cuenta con 2 carpetas principales, `/front` para el front-end y `/back` para el back-end, ambos deben ser levantados para el correcto funcionamiento de la aplicación.
#### Front-end

1. Ejecutar `npm install` en la carpeta `/front`
2. Al instalarse las dependencias necesarias solo hay que ejecutarlo con `npm start`

#### Back-end

1. Ejecutar `npm run setup` en la carpeta `/back`, esto creará el archivo de la base de datos, junto con un usuario de pruebas (email: admin@admin.com, pass: admin), esto solo se debe hacer una vez en caso de no existir el archivo de la base de datos dentro de `/back/database`.
1. Ejecutar `npm install` en la carpeta `/back`
2. Es necesario completar las variables de entorno con los client_id y client_secret de gmail y de github, esto se puede realizar de varias maneras, la que recomiendo es agregarlas al archivo `/back/.env`:
```txt
...
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
```
4. Al instalarse las dependencias necesarias solo hay que ejecutarlo con `npm start`