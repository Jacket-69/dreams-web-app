# **Guía de Contribución para DREAMS**

## **Estrategia de Ramas**

El estimado que no siga las normas sera linchado publicamente frente a la oficina del Jefe de Carrera.

### **Ramas Principales**

* main: Esta es la rama principal que refleja la última versión estable del producto (lo que se entrega en cada hito). **NO SE SUBE código directamente a esta rama.**  
* desarrollo: Esta es la rama de integración. Todas las nuevas funcionalidades se fusionan aquí primero.
Después de ser aprobadas obvio.

### **Ramas de Trabajo**
Cuando trabajen en algo nuevo (una funcionalidad, un arreglo, etc.), deben crear una nueva rama a partir de desarrollo.  
**Convención para nombrar las ramas:**  
tipo/HU-XX-descripcion-corta
* **tipo**: Describe el propósito de la rama (en inglés, en español quedaba feinho wuajaj).  
  * feature: Para una nueva funcionalidad (ej. una Historia de Usuario).  
  * fix: Para la corrección de un bug.  
  * docs: Para añadir o mejorar la documentación.  
  * refactor: Para refactorizar código sin cambiar su funcionalidad.  
* **HU-XX**: El identificador de la Historia de Usuario en la que estás trabajando (si aplica).  
* **descripcion-corta**: Un resumen muy breve en kebab-case (palabras en minúsculas separadas por guiones).

**Ejemplos:**

* feature/HU-01-login-backend  
* fix/HU-14-error-visualizar-ofertas  
* docs/actualizar-readme-con-instalacion

## **Formato de Commits**

Para mantener un historial de cambios limpio y legible, seguimos la convención estándar de "Conventional Commits". Cada mensaje de commit debe tener la siguiente estructura:  
**tipo(alcance): mensaje**

* **tipo**: Describe la naturaleza del cambio (en english).  
  * feat: (Feature) Una nueva característica para el usuario final.  
  * fix: (Bug Fix) Una corrección de un error.  
  * docs: Cambios exclusivos en la documentación.  
  * style: Cambios que no afectan el significado del código (espacios, formato, etc.).  
  * refactor: Un cambio de código que no arregla un bug ni añade una funcionalidad.  
  * test: Añadir o corregir pruebas.  
  * chore: Cambios en el proceso de build, dependencias o herramientas auxiliares.  
* **(alcance)**: (si quieren xd) La parte del código que estás modificando.  
  * Ejemplos: (api), (db), (auth), (componente-login), (perfil)  
* **mensaje**: Una descripción corta y clara del cambio.  
  * Debe estar en imperativo ("agrega" en vez de "agregado").  
  * Debe empezar con minúscula.  
  * No debe terminar con un punto.

**Ejemplos de buenos commits:**

* feat(api): crear endpoint para registro de usuarios  
* fix(componente-login): validar correctamente el campo de contraseña  
* docs(readme): agregar instrucciones para la base de datos  
* refactor(auth): simplificar logica del controlador de login  
* chore: actualizar dependencias de express