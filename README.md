# Tailor Challenge

Explicación

---

Como se puede observar hay un archivo llamado dbSeeding, este es el mini script que he estado utilizando para inicializar mi base de datos.

Después también hay dos archivos api, esto es debido a que me toco volver a empezar debido a errores que me fueron imposibles de debuggear. En la primera version estaba utilizando una arquitectura hexagonal la cuál me facilitaba el trabajo ya que tenida todo muy bien estructurado.

Por falta de tiempo tube que empezar de nuevo la API pero con una arquitectura mas normal simplemente separando las rutas de los controladores.

Debido a este contratiempo en el frontend he tenido que ir volando y no me arriesgue a utilizar Typescript. Si hubiese tenido mas tiempo, hubiese estructurado mejor los componentes, haciéndolos lo mas desacoplados posibles y componetizando mucho mas.

Como correr el proyecto

---

1. Clonar el repositorio
2. Entra en la carpeta apiV2, instala dependencias y añade un archivo .env con tus variables de entorno basándote en el archivo .env.dev
3. Ver los scripts del package.json, para correr el servidor en modo desarrollo ejecutar npm run dev
4. Asegúrate de poner en las variables de entorno el puerto 3001 ya que si no se tendrán que cambiar las rutas de los fetching de datos en el front.
5. Una vez el server este en el aire junto a la base de datos entra en la carpeta appV2 (Si también me toco empezar de nuevo el front), instala dependencias e inicialó en modo desarrollo con npm run dev.
