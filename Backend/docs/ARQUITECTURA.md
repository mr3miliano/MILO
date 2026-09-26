# Arquitectura de MILO Backend

## Objetivo
Este proyecto sigue una estructura modular para separar responsabilidades por dominio.

## Estructura
- app/main.py: aplicación FastAPI principal.
- app/core: configuración, seguridad y base de datos.
- app/modules: módulos funcionales del sistema.
- app/shared: dependencias y utilidades compartidas.
- api/index.py: punto de entrada para Vercel.

## Módulos actuales
- auth
- business
- dev
- messaging
- agent

## Próximos pasos
- agregar modelos SQLAlchemy por dominio
- crear servicios y repositorios específicos
- conectar base de datos real
- implementar autenticación JWT completa
