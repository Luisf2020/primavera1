# Seguridad Primavera — gestion de seguridad residencial

![stack: Node.js](https://img.shields.io/badge/stack--Node.js-0d9488?style=flat-square) ![stack: Express](https://img.shields.io/badge/stack--Express-0d9488?style=flat-square) ![stack: SQLite](https://img.shields.io/badge/stack--SQLite-0d9488?style=flat-square) ![stack: JWT](https://img.shields.io/badge/stack--JWT-0d9488?style=flat-square) ![IA: asistido](https://img.shields.io/badge/IA--asistido-6366f1?style=flat-square)

Sistema para la gestion de seguridad residencial: control de accesos, residentes, guardias, visitas, incidentes y pagos, con autenticacion por JWT.

**Tipo:** Aplicacion web con backend · **Complejidad:** Avanzado

## Problema que resuelve

Centralizar la operacion diaria de un conjunto residencial (quien entra, quien sale, que incidencias ocurren y que pagos se registran) en una sola herramienta.

## Solucion implementada

Servidor Node/Express con autenticacion JWT y contrasenas con bcrypt, persistencia en SQLite, panel administrativo y exportacion de datos; la interfaz usa Chart.js y SweetAlert2.

### Funcionalidades principales

- Autenticacion con JWT y hash de contrasenas (bcrypt)
- Gestion de residentes, guardias y empresas vinculadas
- Registro de entradas/salidas y visitas
- Bitacora de incidentes y gestion de pagos/deudas
- Panel administrativo con graficos (Chart.js) y exportacion CSV

## Stack

- Node.js
- Express
- SQLite
- JWT
- JavaScript
- Tailwind CSS

## Estructura

```
server.js       # API y autenticacion
database.js     # acceso a SQLite
public/         # interfaz (HTML/CSS/JS)
.env.example    # variables de entorno
```

## Puesta en marcha

```bash
npm install
cp .env.example .env   # definir claves
npm start
```

## Complejidad del proyecto

**Nivel: Avanzado** — Multiples modulos de dominio, autenticacion, autorizacion por sesion, persistencia relacional, graficos y exportacion de datos.

El nivel describe la complejidad tecnica del proyecto, no el grado de dominio de quien lo escribio.

## Despliegue

Aplicacion con backend y base de datos; requiere hosting con Node (no es estatica).  
El codigo fuente esta disponible en este repositorio.

> Las claves reales no estan en el repositorio: usa `.env` (esta ignorado) a partir de `.env.example`.

## Transparencia sobre IA

Este proyecto se desarrollo con asistencia de inteligencia artificial (generacion de codigo,
revision y documentacion). El codigo fue leido, ejecutado y probado manualmente. No se declaran
clientes, metricas ni resultados que no puedan verificarse.

## Autor

**Luis Felipe Zuniga Leon** — Desarrollador de software asistido por IA

- GitHub: <https://github.com/Luisf2020>
- Correo: developerluis2@gmail.com
- WhatsApp: +504 3237 0056

---

_Proyecto de portafolio. El desarrollo se apoyo en herramientas de IA bajo revision tecnica humana._
