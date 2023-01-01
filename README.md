# Tailor Challenge

## API

---

La carpeta api es una versión previa a la de la api final. Esta es una api hecha con arquitectura hexagonal y typegoose. La cual tuve que dejar de lado debido a errores imprevistos que me surgieron. Valore las distintas posibilidades que tenía y debido al limitado tiempo decidí que iba a ser más inteligente realizar la api desde cero de nuevo, en este caso planteando una arquitectura más sencilla (Y más adecuada para lo que se pide en la prueba). Esta opción ha sido más factible debido a que pase un buen tiempo debuggeando los errores y me di cuenta de que me iba a costar más intentar solucionarlos que realizar esta api de nuevo. Aun de esta manera he querido dejar esta api, ya que las limitaciones debido a los errores que tiene son pocas y contiene una gran parte de todo el tiempo que he dedicado a realizar esta prueba técnica.

Repositorio: [https://github.com/alexxtomas/apiV2-deployed](https://github.com/alexxtomas/apiV2-deployed)

Link: [https://apiv2-deployed-production.up.railway.app/api/restaurants](https://apiv2-deployed-production.up.railway.app/api/restaurants)

## DB Seeding

---

La carpeta dbSeedingV2 es un un mini script el cual he utilizado para llenar de información mi base de datos.

## App

---

Es mi segunda aplicación usando Next y mi primera utilizando Styled Components. No suelo usar CSS-IN-JS y cuando lo he usado ha sido con Emotion, debido a que me gusta revisar las peer dependencies de las librerías que uso y Styled Components tiene peer dependencies de Emotion. He aprendido mucho de Styled Components, pero también no estoy orgulloso de la estructura de mi carpeta styles. Creo que hay varios componentes que podrían ser layouts y los componentes deberían ser lo más desacoplados posible para ser más reutilizables.

Repositorio: [https://github.com/alexxtomas/appV2-deployed](https://github.com/alexxtomas/appV2-deployed)

Link: [https://app-v2-deployed.vercel.app/](https://app-v2-deployed.vercel.app/)

## ¿Si hubiese tenido más tiempo que hubiese hecho?

---

- Realizar testing
- Refactorización en la api a una arquitectura más sólida y escalable.
- Buscar partes del código que puedan ser refactorizadas a un código más limpio
- Añadir verificaciones más exhaustivas en el backend.
- Componetizar de manera que los componentes estén lo mas aislados posibles, haciendo que se tenga que repetir menos código y la aplicación sea mas escalable.
- Plantearía una solución para evitar que los restaurantes fueran todos un contexto y poder renderizar las páginas ya sea en tiempo de build e hidratando la información cada cierto tiempo o haciendo estas paginas totalmente dinámicas. Creo que en esta aplicación no hay un problema de prop drilling y no es estrictamente utilizar un estado global para los restaurantes.
- Mejorar los estilos, añadiendo mas tonalidades de color que provocases un contraste agradable para la vista.

## Como iniciar la aplicación

---

1. Clona el repositorio de la api [https://github.com/alexxtomas/apiV2-deployed](https://github.com/alexxtomas/apiV2-deployed)
2. Clona el repositorio de la app [https://github.com/alexxtomas/appV2-deployed](https://github.com/alexxtomas/appV2-deployed)
3. Instala las dependencias en ambos proyectos.
4. En la api crea un archivo .env con las variables de entornos necesarias basándote en el archivo .env.dev.
5. Corre la api en modo desarrollo con el comando npm run dev
6. En la app dirígete a src/services/api y cambia la variable baseURL por http://localhost:TUPUERTO/api
7. Corre la aplicación en modo desarrollo con el comando npm run dev
