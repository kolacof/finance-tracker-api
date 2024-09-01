# Proyecto Angular y Spring Boot

Este repositorio contiene dos proyectos: una API REST desarrollada con Spring Boot y una aplicación frontend desarrollada con Angular. A continuación se detallare cómo ejecutar ambos proyectos después de clonar el repositorio.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Java 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (para el proyecto Spring Boot)
- [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) (para el proyecto Angular)
- [Maven](https://maven.apache.org/) (para el proyecto Spring Boot)
- [Angular CLI](https://angular.io/cli) (para el proyecto Angular)
- [Mysql](https://dev.mysql.com/downloads/installer/) (para la creacion y conexion con la base de datos)


## Crear la Base de Datos:

Asegúrate de tener el sistema de gestión de bases de datos instalado y ejecutándose (en este proyecto se utilizo MYSQL)

Usa la herramienta de administración de tu base de datos  para crear una base de datos, los scripts se encuentran dentro de la carte "BD" en el archivo "scriptsBD.txt".
Tener en cuenta que es necesario registrar almenos 1 o 2 categorias antes de intentar crear una transaccion (desde la app o bd) ya que sin ello no se tendra una llave foranea correspondiente a la categoria para relacionar, en el archivo de scripts tambien se encuentra un script para registrar categorias de ser necesario.

## Ejecución del Proyecto Spring Boot

#### Configuración del Proyecto

1. Abrir el Proyecto en un IDE:
    - IntelliJ IDEA (recomendado) aunque tambien puede ser netbeans u otro idle de preferencia.

2.  Construir el proyecto con las dependecias que ya estan incluidas en el pom.xml

3.  Configurar debidamente el aplication.properties (RUTA:src/main/resources/application.properties), en este archivo se encuetran las propiedades de configuracion para la conexcion la base de datos, el codigo se encuentra documento en el archivo explicando los posibles cambios necesarios para la conexion con la bd sin embargo aqui dejo un breve ejemplo:.

__spring.datasource.url=jdbc:mysql://localhost:puerto_BD/nombre_de_la_base_de_datos
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña__

4. Compilar y Ejecutar el Proyecto:

    - Desde IntelliJ IDEA:

        + Abre el menú de ejecución y selecciona Run 'Application' , o presiona el botón de ejecutar (play) en la esquina superior derecha.
        + Otra opcion es dar click derecho y Run en el archivo que contiene el metodo **main** (Nombre: _FinanceTracerAplication_)

5. Final

Con esto deberia ejecutarse e iniciarse el proyecto en el puerto 8080, ahora solo queda iniciar el proyecto encargado del frontend para el cual se utiliza angular.

## Ejecución del Proyecto Angular

### Configuracion del proyecto

Para la ejecucion del proyecto de angular abrir el proyecto en un editor de texto es opcional, en este caso se utilizo visual studio code, sin embargo basta con seguir los siguientes pasos.

1. Acceder a la carpeta del proyecto por medio de un terminal como cmd.
2. teniendo en cuenta que ya se encuentre instalado node.js y angular (en caso de que no revisar la instalacion directamente desde la documentacion) ejecutar el comando **ng serve -o** para iniciar el proyecto de angular
3. una vez ejecutado el proyecto este se abra iniciado en el puerto 4200 (ruta: http://localhost:4200)
4. acceder al puerto, desde aqui se podran realizar las distintas funcionalidades de la API REST

**RECOMENDACIONES:**

* En caso de tener otro puerto asignado para el proyecto de angular este debera especificarse en la configruacion de CORS realizada en el backend, ya que de no hacerlo los endpoints se encontraran protegidos y no se podra acceder a los mismos.

* De igual manera verificar que las credenciales de la base de datos estan bien especificadas.


Quedo atento a cualquier duda que pueda presentarse.

