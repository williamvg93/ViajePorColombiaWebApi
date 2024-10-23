# ViajePorColombiaWebApi
Web App Viaje por Colombia

## Instalacion

1) Descargar el proyecto del repositorio.
2) Es necesario que se tenga istalado el sdk de .net, lo puede realizar desde esta ruta: https://dotnet.microsoft.com/es-es/download .
3) Para la creacion de migraciones y al actualización en la base de datos se necesita una herramienta llamda dotnet ef, puee instalarla utilizando la consola de comando(cmd), dotnet tool install --global dotnet-ef.
4) Se utiliza una base de datos Mysql, enotnces es necesario tambien su instalación, puede descargarla desde este link: https://dev.mysql.com/downloads/installer/.
5) Para la conexion con la base de datos y demas operaciones, es necesario configurar las credenciales de conexion, en Api/ApiVPC/appsettings.json encontrará una opcion llamada "ConnectionStrings", modificar los valores.
6) Despues de tener las herramientas necesarias instaladas(.net, mysql) abra un terminal en la ruta de la carpeta donde está el proyecto, es la carpeta api, ingrese a la carpeta piVPC, o abriendo el terminal en el proyecto puede anvegar a la carpeta cd /Api/ApiVPC. Realizado esto escribir en el terminal el siguiente comando: dotnet build y despues dotnet restore, esto ayuda a restaurar el proyecto y detectar errores.
7) Ejecutar migraciones, ya existe una migracion creada que está almacenada en al carpeta Persistence/data/migrations, para ejecutar la migracion y que esto nos cree la base de datos en el equipo es necesario escribir el siguiente comando: dotnet ef database update --porject .\Persistence\ --startup-project .\ApiVPC\, recuerde debe tener instalada la herramienta dotnet ef, ver el paso #3.
8) Si todo sale bien, en el terminal le apareceran comando de creacion de tablas, ya con esto tenemos la conexion a la BD y podemos hacer la ejecución del proyecto.
8) Desde esta misma carpeta puede ejecutar la app o el proyecto web api, para abrir una interfaz de usaurio de pruebas y ver los end point creados, utilice el sigueinte comando: dotnet watch run.
9) Se abrira una interfaz y podra interactuar con los endPoints.
