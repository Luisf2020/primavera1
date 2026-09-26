# Seguridad Primavera

Aplicación web para la gestión de seguridad residencial, control de accesos y administración básica de residentes, guardias, visitas y pagos.

## Funcionalidades principales

- Inicio de sesión con autenticación basada en JWT.
- Gestión de residentes y guardias.
- Registro de entradas y salidas.
- Bitácora de incidentes.
- Historial de visitas.
- Gestión de empresas vinculadas.
- Registro de pagos y deudas.
- Panel administrativo.
- Exportación de información en CSV desde la interfaz.
- Visualización de datos con gráficos.

## Tecnologías

- Node.js
- Express
- SQLite
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- JSON Web Tokens
- bcrypt
- Chart.js
- SweetAlert2

## Arquitectura

```text
seguridad-primavera/
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── database.js
├── server.js
├── package.json
├── .env.example
└── .gitignore
```

## Instalación local

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` tomando como referencia `.env.example`.
4. Define un `JWT_SECRET` aleatorio y robusto de al menos 32 caracteres.
5. Si necesitas crear las primeras cuentas administrativas, utiliza temporalmente las variables `BOOTSTRAP_*` del archivo de ejemplo.
6. Inicia la aplicación:

```bash
npm start
```

La aplicación se ejecuta por defecto en `http://localhost:4000`.

## Seguridad

Este repositorio no debe contener archivos `.env`, bases de datos locales ni credenciales reales. Las contraseñas se almacenan mediante hash con bcrypt y los secretos deben configurarse exclusivamente mediante variables de entorno.

Para un despliegue de producción se recomienda, además, restringir CORS, aplicar rate limiting al inicio de sesión, utilizar HTTPS, gestionar secretos mediante el proveedor cloud y utilizar una base de datos administrada en lugar de una base SQLite local.

## Estado del proyecto

Proyecto demostrativo y en evolución. Antes de utilizarlo en un entorno real deben realizarse pruebas de seguridad, validaciones adicionales y configuración específica de infraestructura.

## Autor

**Luis Felipe Zuniga León**  
Software Development · Cloud · Cybersecurity · AI
