const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const repo = path.resolve(root, "..", "..");
const diagramsDir = path.join(root, "diagramas");
fs.mkdirSync(diagramsDir, { recursive: true });

const PENDING_TEAM = "[PENDIENTE DE INFORMACIÓN DEL EQUIPO]";
const NOT_FOUND = "[NO SE ENCONTRÓ EVIDENCIA EN EL REPOSITORIO]";
const PENDING_VALIDATION = "[PENDIENTE DE VALIDACIÓN DEL DOCENTE O CLIENTE]";
const auditDate = "29 de julio de 2026, 00:27 (UTC-4)";
const branch = "feature/diseno-responsive";
const commit = "1546004b5a4ab217ab2b64481e8bc96766f702d3";

const figures = [
  ["Figura 1", "Diagrama de contexto del sistema", "diagramas/figura-01-contexto.svg"],
  ["Figura 2", "Diagrama general de casos de uso", "diagramas/figura-02-casos-uso-general.svg"],
  ["Figura 3", "Diagrama de clases", "diagramas/figura-03-diagrama-clases.svg"],
  ["Figura 4", "Diagrama de objetos", "diagramas/figura-04-diagrama-objetos.svg"],
  ["Figura 5", "Modelo conceptual de base de datos", "diagramas/figura-05-modelo-conceptual.svg"],
  ["Figura 6", "Modelo lógico de base de datos", "diagramas/figura-06-modelo-logico.svg"],
  ["Figura 7", "Modelo físico de base de datos", "diagramas/figura-07-modelo-fisico.svg"],
  ["Figura 8", "Cronograma reconstruido a partir de Git", "diagramas/figura-08-gantt.svg"],
  ["Figura 9", "Pantalla de inicio", ""],
  ["Figura 10", "Inicio de sesión", ""],
  ["Figura 11", "Panel administrativo", ""],
  ["Figura 12", "Gestión de categorías", ""],
  ["Figura 13", "Gestión de platos", ""],
  ["Figura 14", "Gestión de bebidas", ""],
  ["Figura 15", "Gestión de combos", ""],
  ["Figura 16", "Gestión de mesas", ""],
  ["Figura 17", "Caja y registro de pedido", ""],
  ["Figura 18", "Panel de cocina", ""],
  ["Figura 19", "Panel del mesero", ""],
  ["Figura 20", "Menú cliente", ""],
];

const modules = {
  AUT: { actor: "Operador", screen: "#/login/:rol", table: "usuario, rol", cu: "CU-001", base: "/api/auth", evidence: "backend/src/modules/auth; restaurante-desktop/src/pages/Login/Login.jsx" },
  ADM: { actor: "Administrador", screen: "#/admin", table: "No aplica", cu: "CU-001", base: "Rutas HashRouter", evidence: "restaurante-desktop/src/routes/AppRouter.jsx; restaurante-desktop/src/layouts/AdminLayout.jsx" },
  CAT: { actor: "Administrador", screen: "#/admin/categorias", table: "categoria", cu: "CU-002", base: "/api/menu/categorias", evidence: "backend/src/modules/menu/categorias; restaurante-desktop/src/pages/Admin/Categorias.jsx" },
  PLA: { actor: "Administrador", screen: "#/admin/platos", table: "plato, categoria", cu: "CU-003", base: "/api/menu/platos", evidence: "backend/src/modules/menu/platos; restaurante-desktop/src/pages/Admin/Platos.jsx" },
  BEB: { actor: "Administrador", screen: "#/admin/bebidas", table: "bebida", cu: "CU-004", base: "/api/bebidas", evidence: "backend/src/modules/menu/bebidas; restaurante-desktop/src/pages/Admin/Bebidas.jsx" },
  COM: { actor: "Administrador/Cajero", screen: "#/admin/combos; #/caja/combos", table: "combo, detallecombo", cu: "CU-005", base: "/api/menu/combos", evidence: "backend/src/modules/menu/combos; restaurante-desktop/src/pages/Admin/Combos.jsx; restaurante-desktop/src/pages/Caja/Combos.jsx" },
  MES: { actor: "Administrador", screen: "#/admin/mesas", table: "mesa", cu: "CU-006", base: "/api/mesas", evidence: "backend/src/modules/mesa; restaurante-desktop/src/pages/Admin/Mesas.jsx" },
  MEN: { actor: "Cajero", screen: "#/caja/menu", table: "menu_dia, detallemenu", cu: "CU-007", base: "/api/menu", evidence: "backend/src/modules/menu/menu-dia; backend/src/modules/menu/detalle-menu; restaurante-desktop/src/pages/Caja/MenuDia.jsx" },
  PED: { actor: "Cajero", screen: "#/caja/pedido", table: "pedido, detallepedido", cu: "CU-008", base: "/api/pedidos", evidence: "backend/src/modules/pedido; restaurante-desktop/src/pages/Caja/Pedido.jsx" },
  CAJ: { actor: "Cajero", screen: "#/caja; #/caja/pedido", table: "pedido, venta", cu: "CU-008", base: "Composición frontend", evidence: "restaurante-desktop/src/pages/Caja/Dashboard.jsx; restaurante-desktop/src/pages/Caja/Pedido.jsx" },
  VEN: { actor: "Cajero", screen: "#/caja/pedido", table: "venta, pedido, metodopago", cu: "CU-009", base: "/api/ventas", evidence: "backend/src/modules/venta; restaurante-desktop/src/api/venta.api.js; restaurante-desktop/src/pages/Caja/Pedido.jsx" },
  COC: { actor: "Cocinero", screen: "#/cocina", table: "detallepedido, estadopedido", cu: "CU-010", base: "/api/pedidos/cocina", evidence: "backend/src/modules/pedido; restaurante-desktop/src/pages/Cocina/Cocina.jsx" },
  MSR: { actor: "Mesero", screen: "#/mesero", table: "detallepedido, estadopedido", cu: "CU-011", base: "/api/pedidos/cocina/listos", evidence: "restaurante-desktop/src/pages/Mesero/Mesero.jsx; restaurante-desktop/src/api/mesero.api.js" },
  REP: { actor: "Administrador", screen: "#/admin/reportes", table: "vw_ventas_diarias y otras vistas", cu: "CU-012", base: "/api/reportes", evidence: "backend/src/modules/reporte; restaurante-desktop/src/pages/Admin/Reportes.jsx" },
  CLI: { actor: "Cliente", screen: "/", table: "plato, bebida, combo", cu: "CU-013", base: "Flask /", evidence: "menu-cliente/app.py; menu-cliente/templates/index.html" },
  IA: { actor: "Cliente", screen: "/ (chat)", table: "No aplica", cu: "CU-014", base: "POST /preguntar", evidence: "menu-cliente/app.py; menu-cliente/services/gemini.py" },
  ESC: { actor: "Operador", screen: "Aplicación de escritorio", table: "No aplica", cu: "CU-001", base: "Electron/HashRouter", evidence: "restaurante-desktop/electron/main.cjs; restaurante-desktop/src/routes/AppRouter.jsx; restaurante-desktop/src/context/AuthContext.jsx" },
};

const rf = [];
function add(code, name, description, state, endpoint, input, output, validation, extra = {}) {
  const prefix = code.split("-")[1];
  const mod = modules[prefix];
  rf.push({
    id: code, name, description, state, endpoint, input, output, validation,
    actor: extra.actor || mod.actor,
    process: extra.process || name,
    pre: extra.pre || "El servicio correspondiente está disponible y existen los datos de referencia requeridos.",
    post: extra.post || "La respuesta refleja el resultado de la operación solicitada.",
    alternate: extra.alternate || "La API propaga el error al manejador central; la interfaz muestra alerta, mensaje o estado vacío según la pantalla.",
    acceptance: extra.acceptance || `Al ejecutar ${name.toLowerCase()}, el resultado se refleja sin alterar el contrato documentado.`,
    evidence: extra.evidence || mod.evidence,
    screen: extra.screen || mod.screen,
    table: extra.table || mod.table,
    cu: extra.cu || mod.cu,
  });
}

add("RF-AUT-001", "Iniciar sesión", "El sistema deberá autenticar un usuario mediante nombre de usuario y contraseña y devolver un JWT junto con su identidad y rol.", "IMPLEMENTADO", "POST /api/auth/login", "username, password", "token, usuario{id,codigo,username,rol}", "Verifica existencia del usuario y compara la contraseña con bcrypt.", { acceptance: "Con credenciales válidas se obtiene token y usuario; con credenciales inválidas se responde con error sin exponer el hash." });
add("RF-AUT-002", "Consultar perfil autenticado", "El sistema deberá validar un token Bearer antes de devolver el perfil contenido en el JWT.", "IMPLEMENTADO", "GET /api/auth/profile", "Authorization: Bearer <token>", "Payload JWT decodificado", "Requiere cabecera y firma JWT válidas.");
add("RF-AUT-003", "Listar cuentas", "El sistema deberá devolver el inventario de cuentas y roles disponible en el servidor.", "SOLO BACKEND", "GET /api/auth/accounts", "Sin cuerpo", "Lista de cuentas sin contraseña", "No tiene middleware de autenticación; constituye un riesgo de exposición.", { screen: "No existe pantalla asociada", cu: "Sin caso de uso operativo independiente" });
add("RF-ADM-001", "Seleccionar área", "El sistema deberá permitir seleccionar Administrador, Cajera, Cocinera o Mesero y navegar al login con el rol como parámetro.", "IMPLEMENTADO", "HashRouter /login/:rol", "Selección de tarjeta de rol", "Pantalla de login identificada por rol", "Usa valores literales existentes y botones semánticos.");
add("RF-ADM-002", "Navegar por administración", "El sistema deberá ofrecer al administrador acceso a categorías, platos, bebidas, combos, mesas y reportes.", "IMPLEMENTADO", "Rutas #/admin/*", "Selección de navegación", "Pantalla administrativa solicitada", "Las rutas existen; no hay guard de autorización en el router.");

for (const [p, singular, plural] of [["CAT","categoría","categorías"],["PLA","plato","platos"],["BEB","bebida","bebidas"],["MES","mesa","mesas"]]) {
  const base = modules[p].base;
  const id = {CAT:"CAT",PLA:"PLA",BEB:"BEB",MES:"MES"}[p];
  add(`RF-${id}-001`, `Listar ${plural}`, `El sistema deberá consultar y presentar las ${plural} activas registradas.`, "IMPLEMENTADO", `GET ${base}`, "Sin cuerpo", `Colección de ${plural}`, "La interfaz contempla carga, error y ausencia de datos.");
  add(`RF-${id}-002`, `Consultar ${singular}`, `El sistema deberá consultar una ${singular} por su identificador.`, "SOLO BACKEND", `GET ${base}/:id`, "Identificador de ruta", `Detalle de ${singular}`, "El servicio devuelve no encontrado cuando no existe.", { screen: "Sin uso directo verificado en la interfaz" });
  add(`RF-${id}-003`, `Crear ${singular}`, `El sistema deberá registrar una ${singular} con los campos definidos por su contrato.`, "IMPLEMENTADO", `POST ${base}`, `Datos de ${singular}`, `${singular} creada`, p === "CAT" ? "Nombre obligatorio." : p === "MES" ? "Número y capacidad; la base exige capacidad mayor que cero y número único." : "La base exige precio no negativo; el servicio comprueba campos principales.");
  add(`RF-${id}-004`, `Actualizar ${singular}`, `El sistema deberá actualizar una ${singular} existente sin cambiar su identificador.`, "IMPLEMENTADO", `PUT ${base}/:id`, `Identificador y datos de ${singular}`, `${singular} actualizada`, "Comprueba existencia antes de actualizar; constraints de base preservan integridad.");
  add(`RF-${id}-005`, `Eliminar ${singular}`, `El sistema deberá desactivar o retirar una ${singular} existente mediante su identificador.`, "IMPLEMENTADO", `DELETE ${base}/:id`, "Identificador", "Confirmación de eliminación", "Comprueba existencia; los repositorios aplican eliminación lógica cuando corresponde.");
}

add("RF-COM-001", "Listar combos", "El sistema deberá listar los combos con su información disponible.", "IMPLEMENTADO", "GET /api/menu/combos", "Sin cuerpo", "Colección de combos", "Consulta combos activos y sus datos agregados.");
add("RF-COM-002", "Consultar detalle de combo", "El sistema deberá devolver un combo y los platos que lo componen.", "SOLO BACKEND", "GET /api/menu/combos/:id", "Identificador de combo", "Cabecera y detalle del combo", "Valida la existencia del combo.", { screen: "No se verificó una vista de detalle dedicada" });
add("RF-COM-003", "Crear combo", "El sistema deberá crear un combo con nombre, precio y al menos un plato con cantidad.", "IMPLEMENTADO", "POST /api/menu/combos", "nombre, descripción, precio, platos[]", "Combo y detalles persistidos", "Nombre y precio requeridos; arreglo de platos no vacío; transacción con rollback.");

add("RF-MEN-001", "Listar menús", "El sistema deberá listar los menús del día registrados.", "SOLO BACKEND", "GET /api/menu", "Sin cuerpo", "Colección de menús", "Consulta de lectura.", { screen: "La interfaz consulta únicamente el menú activo" });
add("RF-MEN-002", "Consultar menú activo", "El sistema deberá consultar el menú del día que se encuentre activo.", "IMPLEMENTADO", "GET /api/menu/activo", "Sin cuerpo", "Menú activo o ausencia", "Filtra por estado activo.");
add("RF-MEN-003", "Crear menú del día", "El sistema deberá crear un menú para una fecha cuando no exista otro menú activo.", "IMPLEMENTADO", "POST /api/menu", "fecha", "Menú creado", "Fecha obligatoria; impide más de un menú activo.");
add("RF-MEN-004", "Agregar platos al menú", "El sistema deberá asociar platos y stock al menú del día mediante una operación transaccional.", "IMPLEMENTADO", "POST /api/menu/detalle", "idmenu, platos[{idplato,stock}]", "Detalles de menú creados", "Menú existente, arreglo no vacío, platos existentes y rollback ante fallo.");
add("RF-MEN-005", "Cerrar menú", "El sistema deberá cerrar el menú activo seleccionado.", "IMPLEMENTADO", "PATCH /api/menu/:id/cerrar", "Identificador de menú", "Menú con estado cerrado", "Comprueba existencia del menú.");
add("RF-MEN-006", "Actualizar stock de detalle", "El sistema deberá actualizar el stock de un detalle del menú.", "SOLO BACKEND", "PUT /api/menu/detalle/:id/stock", "Identificador y stock", "Detalle actualizado", "La base impide stock negativo.", { screen: "Sin control de edición de stock verificado" });
add("RF-MEN-007", "Desactivar detalle de menú", "El sistema deberá desactivar un plato asociado al menú.", "SOLO BACKEND", "PATCH /api/menu/detalle/:id/desactivar", "Identificador de detalle", "Confirmación", "El repositorio aplica desactivación lógica.", { screen: "Sin acción frontend verificada" });

add("RF-PED-001", "Registrar pedido", "El sistema deberá registrar un pedido con platos, bebidas o combos, calcular el total con precios vigentes y persistir sus detalles.", "IMPLEMENTADO", "POST /api/pedidos", "tipoPedido, idMesa, idUsuario, platos[], bebidas[], combos[]", "Pedido y detalles creados", "Valida existencia y actividad de productos; subtotal = precio × cantidad; total = suma. Usa estado 1 hardcodeado y transacción.", { acceptance: "Un pedido válido crea cabecera y detalles; un producto inexistente revierte la transacción." });
add("RF-PED-002", "Listar pedidos", "El sistema deberá listar los pedidos registrados con información operativa.", "SOLO BACKEND", "GET /api/pedidos", "Sin cuerpo", "Colección de pedidos", "Consulta de lectura.", { screen: "No existe listado general integrado" });
add("RF-PED-003", "Consultar pedido", "El sistema deberá consultar un pedido y sus detalles por identificador.", "SOLO BACKEND", "GET /api/pedidos/:id", "Identificador", "Pedido con detalles", "Consulta parametrizada.", { screen: "No existe pantalla de detalle integrada" });
add("RF-PED-004", "Emitir novedad de pedido", "El sistema deberá emitir al servidor de tiempo real la creación de un pedido para las salas cocina y cajero.", "PARCIALMENTE IMPLEMENTADO", "Socket.IO: nuevo-pedido, pedido-creado", "Pedido creado", "Eventos a salas", "El servidor emite, pero el frontend React no incluye cliente Socket.IO ni listeners.");
add("RF-CAJ-001", "Construir pedido", "El sistema deberá permitir al cajero agregar productos del menú y bebidas, cambiar cantidades, seleccionar tipo de pedido, mesa, pago y descuento.", "IMPLEMENTADO", "Composición en #/caja/pedido", "Selecciones del operador", "Detalle y total visibles", "Exige al menos un producto y mesa para tipo RESTAURANTE.");
add("RF-CAJ-002", "Coordinar pedido y venta", "El sistema deberá registrar primero el pedido y luego la venta asociada, informando si la segunda operación falla.", "PARCIALMENTE IMPLEMENTADO", "POST /api/pedidos seguido de POST /api/ventas", "Pedido, método de pago y descuento", "Confirmación total o advertencia de venta fallida", "Las dos solicitudes no comparten transacción; puede quedar pedido sin venta.");
add("RF-VEN-001", "Registrar venta", "El sistema deberá registrar una venta para un pedido existente calculando subtotal, descuento y total.", "IMPLEMENTADO", "POST /api/ventas", "idPedido, idMetodoPago, descuento", "Venta creada", "subtotal = total del pedido; total = subtotal − descuento; transacción SQL.");
add("RF-VEN-002", "Emitir venta realizada", "El sistema deberá emitir la venta registrada a las salas admin y cajero.", "PARCIALMENTE IMPLEMENTADO", "Socket.IO: venta-realizada", "Venta creada", "Evento en tiempo real", "El servidor emite, pero no se verificaron consumidores React.");
add("RF-COC-001", "Consultar pendientes de cocina", "El sistema deberá mostrar a cocina los detalles de pedido pendientes.", "IMPLEMENTADO", "GET /api/pedidos/cocina/pendientes", "Sin cuerpo", "Detalles pendientes", "La consulta filtra estados operativos definidos en datos.");
add("RF-COC-002", "Iniciar preparación", "El sistema deberá permitir a cocina actualizar un detalle al estado de preparación seleccionado.", "IMPLEMENTADO", "PUT /api/pedidos/detalle/:id/estado", "idDetalle, idEstado", "Detalle actualizado", "La interfaz envía el identificador de estado; el backend no valida una transición formal.");
add("RF-COC-003", "Marcar plato listo", "El sistema deberá permitir a cocina marcar un detalle como listo y emitir una notificación al mesero.", "PARCIALMENTE IMPLEMENTADO", "PUT /api/pedidos/detalle/:id/estado; evento plato-listo", "idDetalle, idEstado=3", "Detalle listo y evento", "El estado 3 está hardcodeado; no existe consumidor Socket.IO verificado.");
add("RF-MSR-001", "Consultar platos listos", "El sistema deberá presentar al mesero los detalles listos para entrega.", "IMPLEMENTADO", "GET /api/pedidos/cocina/listos", "Sin cuerpo", "Detalles listos", "Consulta filtrada por estado.");
add("RF-MSR-002", "Entregar pedido", "El sistema deberá permitir al mesero cambiar un detalle listo al estado entregado.", "IMPLEMENTADO", "PUT /api/pedidos/detalle/:id/estado", "idDetalle, idEstado=4", "Detalle actualizado", "El identificador 4 está hardcodeado y no se valida transición.");
add("RF-REP-001", "Consultar reportes", "El sistema deberá consultar ventas diarias, ventas semanales, ganancia semanal, platos más vendidos y compras semanales.", "SOLO BACKEND", "GET /api/reportes/{reporte}", "Sin cuerpo", "Datos de una vista PostgreSQL", "Cinco servicios consultan cinco vistas; la pantalla React declara no disponer de filtros ni datos.");
add("RF-REP-002", "Exportar reportes", "El sistema deberá exportar a Excel cada reporte disponible con columnas definidas.", "SOLO BACKEND", "GET /api/reportes/{reporte}/excel", "Sin cuerpo", "Archivo XLSX", "ExcelJS configura hoja, columnas y descarga; no hay acción frontend.");
add("RF-CLI-001", "Consultar menú público", "El sistema deberá mostrar al cliente platos, bebidas y combos obtenidos de la API del restaurante.", "IMPLEMENTADO", "GET Flask /; consume API Railway", "Solicitud web", "HTML con tarjetas de menú", "Ante error remoto usa listas vacías; consulta catálogos activos, no el menú del día.");
add("RF-CLI-002", "Tolerar ausencia del catálogo", "El sistema deberá renderizar la página pública aun cuando una consulta de catálogo falle.", "IMPLEMENTADO", "GET Flask /", "Respuestas o excepciones HTTP", "Página con secciones disponibles", "Captura excepciones de forma amplia; no define timeout.");
add("RF-IA-001", "Responder consulta con Gemini", "El sistema deberá enviar a Gemini una pregunta del cliente contextualizada con platos, bebidas y combos y devolver la respuesta como JSON.", "PARCIALMENTE IMPLEMENTADO", "POST Flask /preguntar; API Gemini", "JSON {pregunta}", "JSON {respuesta}", "Existe integración real y clave por entorno; faltan manejo de errores, sanitización y límites.");
add("RF-ESC-001", "Ejecutar en Electron", "El sistema deberá cargar la compilación Vite en una ventana Electron con aislamiento de contexto, sandbox y navegación controlada.", "IMPLEMENTADO", "restaurante-desktop/electron/main.cjs", "Inicio de aplicación", "Ventana 1366×768, mínimo 1024×720", "nodeIntegration=false, contextIsolation=true, webSecurity=true y preload vacío.");
add("RF-ESC-002", "Persistir sesión local", "El sistema deberá conservar usuario y token en localStorage y eliminarlos al cerrar sesión.", "IMPLEMENTADO", "AuthContext", "usuario, token", "Sesión restaurable en el cliente", "Serializa usuario y token; cerrar sesión ejecuta localStorage.clear().");

const rnfs = [
  ["RNF-SEG-001","Seguridad","El sistema deberá usar hash bcrypt para contraseñas, JWT firmado para perfil y endurecimiento Helmet/Electron.","PARCIALMENTE IMPLEMENTADO","backend/src/utils/password.js; backend/src/utils/jwt.js; backend/src/app.js; restaurante-desktop/electron/main.cjs","La mayoría de endpoints de negocio y /auth/accounts no aplican authenticate ni autorización por rol."],
  ["RNF-REN-001","Rendimiento","El sistema deberá administrar conexiones PostgreSQL mediante pool y consultas parametrizadas.","IMPLEMENTADO","backend/src/database/connection.js; repositorios backend","Pool máximo 20, espera de conexión 5 s e inactividad 30 s; [PENDIENTE DE VALIDACIÓN: métrica cuantitativa esperada]"],
  ["RNF-USA-001","Usabilidad","El sistema deberá presentar controles táctiles, estados vacíos, mensajes y navegación consistente en la interfaz operativa.","PARCIALMENTE IMPLEMENTADO","restaurante-desktop/src/components; restaurante-desktop/src/styles","Las pantallas operativas rediseñadas cumplen en gran parte; Reportes, Ventas y Stock son vacías."],
  ["RNF-ACC-001","Accesibilidad","El sistema deberá proporcionar etiquetas, foco visible, semántica de botones y cierre accesible de modales.","PARCIALMENTE IMPLEMENTADO","restaurante-desktop/src/components/Input.jsx; Modal.jsx; Button.jsx; estilos globales","Hay base accesible y reduced-motion; no se ejecutó auditoría con lector de pantalla. [PENDIENTE DE VALIDACIÓN: métrica cuantitativa esperada]"],
  ["RNF-FIA-001","Fiabilidad","El sistema deberá preservar atomicidad en operaciones compuestas de base de datos.","PARCIALMENTE IMPLEMENTADO","combo.repository.js; pedido.repository.js; venta.repository.js; detalleMenu.repository.js","Las transacciones internas existen; pedido y venta se registran en dos llamadas no atómicas."],
  ["RNF-ESC-001","Escalabilidad y disponibilidad","El sistema deberá permitir despliegue remoto de API y PostgreSQL sin fijar disponibilidad no medida.","PARCIALMENTE IMPLEMENTADO","backend/src/config/env.js; backend/src/database/connection.js","El pool y variables facilitan despliegue; [PENDIENTE DE VALIDACIÓN: métrica cuantitativa esperada]"],
  ["RNF-MAN-001","Mantenibilidad","El sistema deberá separar rutas, controladores, servicios y repositorios y reutilizar componentes visuales.","IMPLEMENTADO","backend/src/modules; restaurante-desktop/src/components","Arquitectura modular verificable; no hay suite automatizada ni documentación API formal."],
  ["RNF-POR-001","Portabilidad","El sistema deberá compilar con Vite y ejecutarse en web y Electron, manteniendo preparación Capacitor.","PARCIALMENTE IMPLEMENTADO","vite.config.js; electron/main.cjs; capacitor.config.json","Electron está configurado; Capacitor solo tiene configuración base y no se verificaron proyectos nativos."],
  ["RNF-COM-001","Compatibilidad y conectividad","El sistema deberá intercambiar JSON por HTTP/HTTPS y usar rutas compatibles con HashRouter.","IMPLEMENTADO","restaurante-desktop/src/api/axios.js; AppRouter.jsx; menu-cliente/app.py","La API Railway está hardcodeada; CORS HTTP y Socket.IO aceptan cualquier origen."],
  ["RNF-DAT-001","Integridad de datos","El sistema deberá aplicar PK, FK, unicidad, checks e índices del esquema PostgreSQL.","IMPLEMENTADO","database/restaurante.sql","22 PK, relaciones FK, checks, unicidad y 14 índices explícitos; no se encontraron triggers ni funciones."],
];

const useCases = [
  ["CU-001","Iniciar sesión","Operador","Acceder al área asociada al rol","RF-AUT-001, RF-ADM-001, RF-ESC-002"],
  ["CU-002","Gestionar categorías","Administrador","Mantener categorías del menú","RF-CAT-001 a RF-CAT-005"],
  ["CU-003","Gestionar platos","Administrador","Mantener platos y su categoría","RF-PLA-001 a RF-PLA-005"],
  ["CU-004","Gestionar bebidas","Administrador","Mantener bebidas y existencias","RF-BEB-001 a RF-BEB-005"],
  ["CU-005","Gestionar combos","Administrador/Cajero","Consultar y construir combos","RF-COM-001 a RF-COM-003"],
  ["CU-006","Gestionar mesas","Administrador","Mantener número, capacidad y disponibilidad","RF-MES-001 a RF-MES-005"],
  ["CU-007","Crear menú del día","Cajero","Abrir, poblar y cerrar el menú vigente","RF-MEN-001 a RF-MEN-007"],
  ["CU-008","Registrar pedido","Cajero","Capturar productos y crear pedido","RF-PED-001 a RF-PED-004, RF-CAJ-001"],
  ["CU-009","Registrar venta","Cajero","Asociar cobro a pedido","RF-CAJ-002, RF-VEN-001, RF-VEN-002"],
  ["CU-010","Actualizar pedido en cocina","Cocinero","Preparar y marcar platos listos","RF-COC-001 a RF-COC-003"],
  ["CU-011","Entregar pedido","Mesero","Consultar listos y registrar entrega","RF-MSR-001, RF-MSR-002"],
  ["CU-012","Consultar reportes","Administrador","Consultar y exportar indicadores","RF-REP-001, RF-REP-002"],
  ["CU-013","Consultar menú cliente","Cliente","Ver oferta pública","RF-CLI-001, RF-CLI-002"],
  ["CU-014","Usar Gemini","Cliente","Consultar el menú mediante asistente","RF-IA-001"],
];

const endpoints = [];
function ep(method, route, fn, input, output, actor, evidence, auth = "No") {
  endpoints.push([method, route, fn, input, output, auth, actor, evidence]);
}
ep("GET","/api/health/health","Comprobar salud","—","Estado del servicio","Servicio técnico","backend/src/routes/health.routes.js");
ep("GET","/api/auth/accounts","Listar cuentas","—","Lista sin password","Administrador","auth.routes.js/auth.repository.js");
ep("POST","/api/auth/login","Autenticar","username, password","token, usuario","Operador","auth.controller.js/auth.service.js");
ep("GET","/api/auth/profile","Consultar perfil","Bearer JWT","Payload JWT","Operador","auth.routes.js/auth.middleware.js","Sí");
for (const [rootPath, label, actor, ev] of [
  ["/api/menu/categorias","categoría","Administrador","modules/menu/categorias"],
  ["/api/menu/platos","plato","Administrador","modules/menu/platos"],
  ["/api/bebidas","bebida","Administrador","modules/menu/bebidas"],
  ["/api/mesas","mesa","Administrador","modules/mesa"],
]) {
  ep("GET",rootPath,`Listar ${label}`,"—","Colección",actor,ev);
  ep("GET",`${rootPath}/:id`,`Consultar ${label}`,"id","Registro",actor,ev);
  ep("POST",rootPath,`Crear ${label}`,"JSON de entidad","Registro creado",actor,ev);
  ep("PUT",`${rootPath}/:id`,`Actualizar ${label}`,"id y JSON","Registro actualizado",actor,ev);
  ep("DELETE",`${rootPath}/:id`,`Eliminar ${label}`,"id","Confirmación",actor,ev);
}
ep("GET","/api/menu/combos","Listar combos","—","Colección","Administrador/Cajero","modules/menu/combos");
ep("GET","/api/menu/combos/:id","Detalle de combo","id","Combo y platos","Administrador/Cajero","modules/menu/combos");
ep("POST","/api/menu/combos","Crear combo","nombre, precio, platos[]","Combo creado","Administrador/Cajero","modules/menu/combos");
ep("GET","/api/menu","Listar menús","—","Colección","Cajero","modules/menu/menu-dia");
ep("GET","/api/menu/activo","Menú activo","—","Menú o ausencia","Cajero","modules/menu/menu-dia");
ep("GET","/api/menu/:id","Consultar menú","id","Menú","Cajero","modules/menu/menu-dia");
ep("POST","/api/menu","Crear menú","fecha","Menú creado","Cajero","modules/menu/menu-dia");
ep("PATCH","/api/menu/:id/cerrar","Cerrar menú","id","Menú cerrado","Cajero","modules/menu/menu-dia");
ep("POST","/api/menu/detalle","Agregar platos","idmenu, platos[]","Detalles","Cajero","modules/menu/detalle-menu");
ep("GET","/api/menu/detalle/:idmenu","Listar detalle","idmenu","Detalles","Cajero","modules/menu/detalle-menu");
ep("PUT","/api/menu/detalle/:id/stock","Actualizar stock","id, stock","Detalle","Cajero","modules/menu/detalle-menu");
ep("PATCH","/api/menu/detalle/:id/desactivar","Desactivar detalle","id","Confirmación","Cajero","modules/menu/detalle-menu");
ep("GET","/api/pedidos","Listar pedidos","—","Colección","Operador","modules/pedido");
ep("GET","/api/pedidos/cocina/pendientes","Pendientes cocina","—","Detalles","Cocinero","modules/pedido");
ep("GET","/api/pedidos/cocina/listos","Listos","—","Detalles","Mesero","modules/pedido");
ep("GET","/api/pedidos/:id","Detalle pedido","id","Pedido","Operador","modules/pedido");
ep("POST","/api/pedidos","Crear pedido","tipo, usuario, ítems","Pedido creado","Cajero","modules/pedido");
ep("PUT","/api/pedidos/detalle/:id/estado","Cambiar estado","id, idEstado","Detalle","Cocinero/Mesero","modules/pedido");
ep("POST","/api/ventas","Registrar venta","pedido, método, descuento","Venta","Cajero","modules/venta");
for (const report of ["ventas-diarias","ventas-semanales","ganancia-semanal","platos-mas-vendidos","compras-semanales"]) {
  ep("GET",`/api/reportes/${report}`,`Consultar ${report}`,"—","JSON de vista","Administrador","modules/reporte");
  ep("GET",`/api/reportes/${report}/excel`,`Exportar ${report}`,"—","XLSX","Administrador","modules/reporte");
}

const screens = [
  ["Inicio","#/","Operador","Seleccionar área","Selección de rol","Abrir login","Navegación","Sí","IMPLEMENTADO"],
  ["Login","#/login/:rol","Operador","Autenticarse","username, password","Ingresar/regresar","Sesión o error","Sí","IMPLEMENTADO"],
  ["Dashboard admin","#/admin","Administrador","Identificar sesión y navegar","—","Cerrar sesión/navegar","Usuario y estado sin métricas","Sí","PARCIALMENTE IMPLEMENTADO"],
  ["Categorías","#/admin/categorias","Administrador","CRUD de categorías","nombre, descripción","crear/editar/eliminar/buscar","Listado y alertas","Sí","IMPLEMENTADO"],
  ["Platos","#/admin/platos","Administrador","CRUD de platos","datos y categoría","crear/editar/eliminar/filtrar","Listado","Sí","IMPLEMENTADO"],
  ["Bebidas","#/admin/bebidas","Administrador","CRUD de bebidas","tipo, nombre, precio, stock","crear/editar/eliminar/filtrar","Listado","Sí","IMPLEMENTADO"],
  ["Combos admin","#/admin/combos","Administrador","Crear/listar combos","datos y platos","crear/buscar","Listado","Sí","PARCIALMENTE IMPLEMENTADO"],
  ["Mesas","#/admin/mesas","Administrador","CRUD de mesas","número, capacidad, disponibilidad","crear/editar/eliminar","Listado","Sí","IMPLEMENTADO"],
  ["Reportes","#/admin/reportes","Administrador","Reportar","—","—","Estado vacío explícito","Sí","SOLO INTERFAZ"],
  ["Caja","#/caja","Cajero","Navegar a operación","—","Abrir menú/pedido/combos","Accesos","Sí","IMPLEMENTADO"],
  ["Menú del día","#/caja/menu","Cajero","Abrir y cerrar menú","fecha, platos, stock","crear/agregar/cerrar","Menú activo","Sí","IMPLEMENTADO"],
  ["Pedido","#/caja/pedido","Cajero","Pedido y venta","productos, mesa, pago, descuento","agregar/quitar/registrar","Totales y alertas","Sí","IMPLEMENTADO"],
  ["Combos caja","#/caja/combos","Cajero","Crear combo","datos y platos","agregar/quitar/guardar","Confirmación","Sí","IMPLEMENTADO"],
  ["Cocina","#/cocina","Cocinero","Gestionar preparación","idDetalle, estado","preparar/listo","Pedidos pendientes","Sí","IMPLEMENTADO"],
  ["Mesero","#/mesero","Mesero","Entregar platos listos","idDetalle","entregar","Lista de listos","Sí","IMPLEMENTADO"],
  ["Ventas admin","Sin ruta","Administrador","Ventas","—","—","Estado vacío","Sí","SOLO INTERFAZ"],
  ["Stock cocina","Sin ruta","Cocinero","Stock","—","—","Estado vacío","Sí","SOLO INTERFAZ"],
  ["Menú cliente","Flask /","Cliente","Consultar catálogo/chat","pregunta","ver/preguntar","Menú y respuesta IA","No verificado a 360 px","PARCIALMENTE IMPLEMENTADO"],
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function simpleSvg(title, columns, footer = "Fuente: elaboración propia a partir del repositorio auditado.") {
  const width = 1120;
  const height = 620;
  const colWidth = 980 / columns.length;
  let body = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<rect width="1120" height="620" fill="#ffffff"/>
<style>text{font-family:Arial,sans-serif;fill:#17202a}.title{font-size:25px;font-weight:700}.head{font-size:17px;font-weight:700}.item{font-size:14px}.foot{font-size:12px;fill:#667085}.box{fill:#f8fafc;stroke:#667085;stroke-width:1.4}.accent{fill:#fff5eb;stroke:#c47a32;stroke-width:1.8}.line{stroke:#667085;stroke-width:1.4;marker-end:url(#arrow)}</style>
<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#667085"/></marker></defs>
<text x="560" y="42" text-anchor="middle" class="title">${escapeXml(title)}</text>`;
  columns.forEach((column, index) => {
    const x = 70 + index * colWidth;
    body += `<rect x="${x}" y="82" rx="5" width="${colWidth - 25}" height="455" class="${index % 2 ? "accent" : "box"}"/>
<text x="${x + (colWidth - 25) / 2}" y="116" text-anchor="middle" class="head">${escapeXml(column.title)}</text>`;
    column.items.forEach((item, itemIndex) => {
      const y = 154 + itemIndex * 39;
      body += `<text x="${x + 18}" y="${y}" class="item">• ${escapeXml(item)}</text>`;
    });
    if (index < columns.length - 1) {
      const x1 = x + colWidth - 25;
      const x2 = x + colWidth;
      body += `<line x1="${x1}" y1="310" x2="${x2}" y2="310" class="line"/>`;
    }
  });
  body += `<text x="560" y="590" text-anchor="middle" class="foot">${escapeXml(footer)}</text></svg>`;
  return body;
}

const diagramSpecs = [
  {
    stem: "figura-01-contexto",
    title: "Contexto del sistema Restaurante ERP",
    columns: [
      { title: "Actores", items: ["Administrador", "Cajero", "Cocinero", "Mesero", "Cliente"] },
      { title: "Aplicaciones", items: ["React + Vite", "Electron", "Preparación Capacitor", "Flask menú cliente"] },
      { title: "Servicios", items: ["API Express", "Socket.IO", "PostgreSQL", "Railway", "Gemini"] },
    ],
    mmd: `flowchart LR
  A[Administrador] --> R[React / Electron]
  C[Cajero] --> R
  K[Cocinero] --> R
  M[Mesero] --> R
  CL[Cliente] --> F[Flask menu-cliente]
  R -->|JSON HTTPS| API[API Express]
  F -->|JSON HTTPS| API
  F -->|Prompt| G[Gemini]
  API -->|SQL SSL| DB[(PostgreSQL)]
  API -->|Eventos| S[Socket.IO]
  R -. preparación .-> CAP[Capacitor]`,
  },
  {
    stem: "figura-02-casos-uso-general",
    title: "Casos de uso verificados",
    columns: [
      { title: "Administración", items: ["Autenticarse", "Gestionar catálogos", "Gestionar mesas", "Consultar reportes*"] },
      { title: "Operación", items: ["Crear menú", "Registrar pedido", "Registrar venta", "Preparar y entregar"] },
      { title: "Cliente", items: ["Consultar menú", "Preguntar a Gemini"] },
    ],
    mmd: `flowchart LR
  ADM[Administrador] --> CU1((Iniciar sesión))
  ADM --> CU2((Gestionar catálogos y mesas))
  ADM --> CU12((Consultar reportes - solo backend))
  CAJ[Cajero] --> CU7((Crear menú))
  CAJ --> CU8((Registrar pedido y venta))
  COC[Cocinero] --> CU10((Actualizar preparación))
  MES[Mesero] --> CU11((Entregar pedido))
  CLI[Cliente] --> CU13((Consultar menú))
  CLI --> CU14((Usar Gemini))`,
  },
  {
    stem: "figura-03-diagrama-clases",
    title: "Clases y capas relevantes",
    columns: [
      { title: "Controladores", items: ["AuthController", "MenuController", "PedidoController", "VentaController", "ReporteController"] },
      { title: "Servicios", items: ["AuthService", "CatálogoService", "PedidoService", "VentaService", "ReporteService"] },
      { title: "Repositorios/entidades", items: ["Usuario y Rol", "Menú y productos", "Pedido y detalle", "Venta", "Vistas de reporte"] },
    ],
    mmd: `classDiagram
  class Controller
  class Service
  class Repository
  class Usuario
  class Pedido
  class DetallePedido
  class Venta
  Controller --> Service
  Service --> Repository
  Usuario "1" --> "*" Pedido
  Pedido "1" *-- "*" DetallePedido
  Pedido "1" --> "0..1" Venta`,
  },
  {
    stem: "figura-04-diagrama-objetos",
    title: "Instancia no sensible de pedido",
    columns: [
      { title: "usuarioEjemplo", items: ["id: <referencial>", "rol: Cajero", "sin datos personales"] },
      { title: "pedidoEjemplo", items: ["tipo: RESTAURANTE", "mesa: referencial", "estado: inicial"] },
      { title: "objetos asociados", items: ["detallePlato", "detalleBebida", "venta y método", "estado de preparación"] },
    ],
    mmd: `classDiagram
  class usuarioEjemplo { rol = Cajero }
  class mesaEjemplo { numero = referencial }
  class pedidoEjemplo { tipo = RESTAURANTE }
  class detalleEjemplo { cantidad = 1 }
  class estadoEjemplo { nombre = referencial }
  class ventaEjemplo { descuento = 0 }
  usuarioEjemplo --> pedidoEjemplo
  mesaEjemplo --> pedidoEjemplo
  pedidoEjemplo --> detalleEjemplo
  detalleEjemplo --> estadoEjemplo
  pedidoEjemplo --> ventaEjemplo`,
  },
  {
    stem: "figura-05-modelo-conceptual",
    title: "Modelo conceptual",
    columns: [
      { title: "Personas y operación", items: ["Rol - Usuario", "Mesa - Pedido", "Pedido - Venta", "Método de pago"] },
      { title: "Oferta", items: ["Categoría - Plato", "Menú - Detalle", "Combo - Detalle", "Bebida"] },
      { title: "Abastecimiento", items: ["Producto", "Compra - Detalle", "Tipo de compra", "Gasto extra"] },
    ],
    mmd: `flowchart LR
  Rol --- Usuario
  Usuario --- Pedido
  Mesa --- Pedido
  Pedido --- DetallePedido
  Pedido --- Venta
  Categoria --- Plato
  Menu --- DetalleMenu
  Plato --- DetalleMenu
  Combo --- DetalleCombo
  Plato --- DetalleCombo
  Compra --- DetalleCompra
  Producto --- DetalleCompra`,
  },
  {
    stem: "figura-06-modelo-logico",
    title: "Modelo lógico relacional",
    columns: [
      { title: "Identidad", items: ["rol PK idrol", "usuario PK idusuario / FK idrol", "mesa PK idmesa", "estadopedido PK idestado"] },
      { title: "Menú", items: ["categoria -> plato", "menu_dia -> detallemenu", "combo -> detallecombo", "bebida"] },
      { title: "Transacciones", items: ["pedido -> detallepedido", "pedido -> venta", "compra -> detallecompra", "modificacionpedido"] },
    ],
    mmd: `erDiagram
  ROL ||--o{ USUARIO : asigna
  USUARIO ||--o{ PEDIDO : registra
  MESA o|--o{ PEDIDO : recibe
  PEDIDO ||--|{ DETALLEPEDIDO : contiene
  PEDIDO ||--o| VENTA : origina
  CATEGORIA ||--o{ PLATO : clasifica
  MENU_DIA ||--o{ DETALLEMENU : contiene
  PLATO ||--o{ DETALLEMENU : integra
  COMBO ||--|{ DETALLECOMBO : contiene
  PLATO ||--o{ DETALLECOMBO : integra`,
  },
  {
    stem: "figura-07-modelo-fisico",
    title: "Modelo físico PostgreSQL 17.5",
    columns: [
      { title: "Motor y conexión", items: ["PostgreSQL 17.5", "pg Pool", "SSL según host", "Variables de entorno"] },
      { title: "Integridad", items: ["22 tablas", "PK y FK", "Checks y únicos", "UUID con pgcrypto"] },
      { title: "Optimización", items: ["14 índices explícitos", "5 vistas", "Sin triggers", "Sin funciones de usuario"] },
    ],
    mmd: `flowchart LR
  APP[Express + pg] -->|Pool / SSL condicional| PG[(PostgreSQL 17.5)]
  PG --> T[22 tablas]
  PG --> I[14 índices explícitos]
  PG --> V[5 vistas]
  PG --> C[PK, FK, UNIQUE, CHECK]
  PG --> X[pgcrypto / UUID]`,
  },
  {
    stem: "figura-08-gantt",
    title: "Cronograma técnico reconstruido",
    columns: [
      { title: "25 julio 2026", items: ["Backend inicial", "Backup PostgreSQL", "Ajustes SSL"] },
      { title: "26 julio 2026", items: ["Consultas combos", "Incorporación frontend", "Integración de fuentes"] },
      { title: "27 julio 2026", items: ["UI responsive", "Caja, cocina, mesero", "Electron y SSL"] },
      { title: "28 julio 2026", items: ["Categorías y catálogos", "Menú cliente + Gemini", "Integración de rama"] },
    ],
    mmd: `gantt
  title Reconstrucción basada en commits verificables
  dateFormat YYYY-MM-DD
  section Evidencia Git
  Backend y base de datos :milestone, 2026-07-25, 0d
  Frontend inicial y combos :milestone, 2026-07-26, 0d
  Responsive, operación y Electron :milestone, 2026-07-27, 0d
  Catálogos, cliente y Gemini :milestone, 2026-07-28, 0d`,
  },
];

for (const spec of diagramSpecs) {
  fs.writeFileSync(path.join(diagramsDir, `${spec.stem}.mmd`), spec.mmd + "\n", "utf8");
  fs.writeFileSync(path.join(diagramsDir, `${spec.stem}.svg`), simpleSvg(spec.title, spec.columns), "utf8");
}

function parseDatabase() {
  const sql = fs.readFileSync(path.join(repo, "database", "restaurante.sql"), "utf8");
  const constraints = [...sql.matchAll(/ALTER TABLE ONLY public\.([\w]+)\s+ADD CONSTRAINT ([\w]+) ([\s\S]*?);/g)]
    .map((m) => ({ table: m[1], name: m[2], body: m[3].replace(/\s+/g, " ").trim() }));
  const typePattern = "(?:character varying\\(\\d+\\)|timestamp without time zone|timestamp with time zone|numeric\\(\\d+,\\d+\\)|bigint|integer|boolean|uuid|text|date)";
  const tables = [];
  for (const match of sql.matchAll(/CREATE TABLE public\.([\w]+) \(\s*([\s\S]*?)\n\);/g)) {
    const body = match[2];
    const parts = [];
    let current = "";
    let depth = 0;
    for (const char of body) {
      if (char === "(") depth++;
      if (char === ")") depth--;
      if (char === "," && depth === 0) {
        parts.push(current.trim());
        current = "";
      } else current += char;
    }
    if (current.trim()) parts.push(current.trim());
    const columns = parts.filter((part) => !part.startsWith("CONSTRAINT ")).map((part) => {
      const parsed = part.match(new RegExp(`^([\\w]+)\\s+(${typePattern})([\\s\\S]*)$`));
      if (!parsed) throw new Error(`No se pudo analizar columna: ${part}`);
      const extras = parsed[3].replace(/\s+/g, " ").trim();
      const defaultMatch = extras.match(/DEFAULT (.*?)(?: NOT NULL|$)/);
      const type = parsed[2];
      return {
        name: parsed[1],
        type,
        length: (type.match(/\(([^)]+)\)/) || [,"—"])[1],
        nullable: extras.includes("NOT NULL") ? "No" : "Sí",
        defaultValue: defaultMatch ? defaultMatch[1] : "—",
      };
    });
    const tableConstraints = constraints.filter((item) => item.table === match[1]);
    for (const column of columns) {
      column.pk = tableConstraints.some((item) => item.body.startsWith("PRIMARY KEY") && item.body.includes(`(${column.name})`)) ? "Sí" : "No";
      const fk = tableConstraints.find((item) => item.body.startsWith("FOREIGN KEY") && item.body.includes(`(${column.name})`));
      column.fk = fk ? (fk.body.match(/REFERENCES public\.([\w]+)\(([\w]+)\)/) || []).slice(1).join(".") : "—";
    }
    tables.push({ name: match[1], columns, constraints: parts.filter((part) => part.startsWith("CONSTRAINT ")) });
  }
  const indexes = [...sql.matchAll(/CREATE (?:UNIQUE )?INDEX ([\w]+) ON public\.([\w]+)[\s\S]*?;/g)].map((m) => [m[1], m[2]]);
  const views = [...sql.matchAll(/CREATE VIEW public\.([\w]+) AS/g)].map((m) => m[1]);
  return { tables, indexes, views, sql };
}

const database = parseDatabase();
const fieldDescriptions = {
  id: "Identificador interno.",
  codigo: "Código técnico de identificación.",
  nombre: "Nombre de negocio del registro.",
  descripcion: "Descripción opcional del registro.",
  precio: "Importe monetario unitario.",
  total: "Importe total calculado o registrado.",
  subtotal: "Importe previo a descuentos.",
  descuento: "Importe de descuento aplicado.",
  cantidad: "Cantidad de unidades.",
  activo: "Indicador de vigencia lógica.",
  fecha: "Fecha de la operación.",
  stock: "Cantidad disponible para el menú.",
  password: "Credencial almacenada como hash; sus valores no se reproducen.",
};
function describeField(name) {
  if (name === "password") return fieldDescriptions.password;
  if (name.startsWith("id")) return "Identificador interno o referencia relacional.";
  if (name.startsWith("codigo")) return fieldDescriptions.codigo;
  if (name.startsWith("fecha")) return "Fecha u hora de control del registro.";
  if (name.startsWith("stock")) return "Cantidad de existencias controlada.";
  return fieldDescriptions[name] || `Dato ${name.replaceAll("_", " ")} del registro.`;
}

let tableCounter = 0;
const tableTitles = [];
function mdTable(title, headers, rows) {
  tableCounter++;
  tableTitles.push([`Tabla ${tableCounter}`, title]);
  const clean = (value) => String(value ?? "—").replaceAll("\n", "<br>").replaceAll("|", "\\|");
  return `**Tabla ${tableCounter}. ${title}**\n\n| ${headers.map(clean).join(" | ")} |\n| ${headers.map(() => "---").join(" | ")} |\n${rows.map((row) => `| ${row.map(clean).join(" | ")} |`).join("\n")}\n\n`;
}

function requirementTable(item) {
  return mdTable(`${item.id}: ${item.name}`, ["Campo", "Contenido"], [
    ["ID", item.id], ["Nombre", item.name], ["Descripción", item.description],
    ["Actor", item.actor], ["Entrada", item.input], ["Proceso", item.process],
    ["Salida", item.output], ["Precondiciones", item.pre], ["Postcondiciones", item.post],
    ["Flujo alterno", item.alternate], ["Validaciones", item.validation],
    ["Estado", item.state], ["Evidencia", `${item.evidence}; ${item.endpoint}`],
    ["Criterio de aceptación", item.acceptance],
  ]);
}

function caseTable(item) {
  const [code, name, actor, objective, requirements] = item;
  const related = rf.filter((r) => r.cu === code);
  const evidence = [...new Set(related.map((r) => r.evidence))].join("; ");
  const state = related.some((r) => ["SOLO BACKEND","PARCIALMENTE IMPLEMENTADO"].includes(r.state)) ? "Flujo con limitaciones según requisitos asociados." : "Flujo integrado verificable.";
  return mdTable(`${code}: ${name}`, ["Campo", "Contenido"], [
    ["Código", code], ["Nombre", name], ["Actor principal", actor], ["Objetivo", objective],
    ["Precondiciones", "Servicios disponibles y datos de referencia existentes; para operación interna se espera sesión iniciada, aunque la protección de rutas es incompleta."],
    ["Disparador", `El actor selecciona la acción ${name.toLowerCase()}.`],
    ["Flujo básico", `1. El actor abre la interfaz. 2. Ingresa o selecciona datos. 3. La aplicación valida lo disponible. 4. Se invoca el servicio. 5. Se presenta el resultado.`],
    ["Flujos alternos", "Datos vacíos, registro inexistente, respuesta remota fallida o validación de negocio rechazada."],
    ["Excepciones", state],
    ["Postcondiciones", "El estado persistente cambia únicamente cuando la operación de servidor concluye; en consultas se presenta la información recibida."],
    ["Requisitos asociados", requirements], ["Evidencia", evidence || NOT_FOUND],
  ]);
}

const out = [];
const write = (text = "") => out.push(text);
const heading = (level, text) => write(`${"#".repeat(level)} ${text}\n`);
const paragraph = (text) => write(`${text}\n`);
const bulletList = (items) => write(items.map((item) => `- ${item}`).join("\n") + "\n");

heading(1, "INFORME DEL PROYECTO DE DESARROLLO DE SOFTWARE");
write(`<div class="cover">
<p><strong>Institución:</strong> ${PENDING_TEAM}</p>
<p><strong>Carrera:</strong> ${PENDING_TEAM}</p>
<p><strong>Asignatura:</strong> ${PENDING_TEAM}</p>
<h1>Informe del Proyecto de Desarrollo de Software</h1>
<h2>Restaurante ERP</h2>
<p><strong>Integrantes:</strong> ${PENDING_TEAM}</p>
<p><strong>Docente:</strong> ${PENDING_TEAM}</p>
<p><strong>Ciudad y país:</strong> ${PENDING_TEAM}</p>
<p><strong>Gestión:</strong> 2026</p>
</div>\n`);

heading(2, "Revisión histórica");
write(mdTable("Revisión histórica del documento", ["Versión","Fecha","Autor","Descripción del cambio"], [
  ["1.0","29/07/2026","Equipo de desarrollo, pendiente de validación","Elaboración inicial del informe técnico."],
]));

heading(2, "Control de la auditoría");
write(mdTable("Identificación de la línea base auditada", ["Elemento","Valor"], [
  ["Rama",branch],["Commit",commit],["Fecha y hora de auditoría",auditDate],
  ["Estado inicial del árbol","Limpio; antes de generar este informe, git status --short no mostró cambios."],
  ["Estado posterior esperado","Únicamente docs/informe-final/ como contenido nuevo no rastreado."],
  ["Método","Lectura de código, configuración, SQL, interfaces, historial Git y dos documentos PDF de referencia."],
]));
paragraph("El análisis fue estático y local. No se usaron credenciales, no se consultó la base remota, no se invocó Gemini, no se escribieron datos externos y no se realizaron pruebas de aceptación con usuarios. La condición operativa de Railway, PostgreSQL/Supabase y Gemini queda pendiente de validación con un entorno autorizado.");

heading(2, "Tabla de contenidos");
write(`[[TOC]]

- FASE I: FUNDAMENTOS Y ALCANCE
  - 1. Introducción y Objetivos
  - 2. Toma de Requerimientos
- FASE II: ESPECIFICACIÓN FUNCIONAL
  - 3. Requerimientos del Software
  - 4. Modelado de Negocio y Casos de Uso
- FASE III: DISEÑO DE LA SOLUCIÓN
  - 5. Modelado de Objetos y Clases
  - 6. Diseño de Base de Datos
- FASE IV: GESTIÓN ÁGIL DEL PROYECTO
  - 7. Estructura de Roles y Equipo
  - 8. Artefactos de Scrum
  - 9. Ceremonias y Seguimiento
- FASE V: PLANIFICACIÓN Y CONTROL
  - 10. Planificación Temporal
  - 11. Gestión de Riesgos y Contingencias
- FASE VI: ANEXOS Y CIERRE
  - 12. Anexos
`);

heading(2, "Lista de figuras");
write(figures.map(([number, title]) => `- ${number}. ${title}`).join("\n") + "\n");
heading(2, "Lista de tablas");
write("[[LISTA_TABLAS]]\n");

heading(1, "FASE I: FUNDAMENTOS Y ALCANCE");
heading(2, "1. Introducción y Objetivos");
heading(3, "1.1. Propósito del Documento");
paragraph("El propósito de este informe es consolidar la especificación, el diseño, la trazabilidad y la evidencia técnica del sistema Restaurante ERP. Está dirigido al docente, al equipo de desarrollo, a evaluadores, mantenedores y usuarios responsables. Su uso esperado es apoyar revisión académica, validación funcional, mantenimiento y planificación de mejoras.");
paragraph("La especificación se reconstruyó a partir del repositorio en la línea base indicada. El contenido sigue el formato de especificación de requerimientos aportado y el índice detallado del proyecto, integrando propósito, alcance, perspectiva, actores, restricciones, requisitos, interfaces y modelos sin atribuir al equipo actividades no documentadas.");

heading(3, "1.2. Alcance del Proyecto");
paragraph("El nombre verificable del producto de escritorio es **Restaurante ERP**, presente en `restaurante-desktop/package.json` y en la interfaz. El sistema atiende la administración de catálogos de restaurante y el flujo operativo de menú del día, pedido, venta, preparación y entrega. La solución incluye una API Express, una base PostgreSQL, una interfaz React adaptable con empaquetado Electron, preparación Capacitor y un menú público Flask con integración Gemini.");
write(mdTable("Alcance funcional", ["Área","Incluido","No incluido","Evidencia"], [
  ["Autenticación","Login bcrypt/JWT, perfil y sesión local","Recuperación de contraseña, MFA y autorización integral por rol","backend/src/modules/auth; AuthContext.jsx"],
  ["Administración","Categorías, platos, bebidas, combos y mesas","Compras, productos, usuarios y configuración, aunque existen tablas","AppRouter.jsx; páginas Admin; restaurante.sql"],
  ["Operación","Menú del día, pedido, venta, cocina y entrega","Facturación fiscal, devolución y cierre de caja","páginas Caja/Cocina/Mesero; módulos backend"],
  ["Reportes","Cinco consultas y cinco exportaciones XLSX en backend","Visualización integrada en React","backend/src/modules/reporte; Admin/Reportes.jsx"],
  ["Cliente","Catálogo público y consulta Gemini","Pedido en línea y pago del cliente","menu-cliente/app.py"],
  ["Plataformas","Web Vite y Electron configurado","Proyecto nativo Android/iOS y firma de instalador","electron/main.cjs; capacitor.config.json"],
]));

heading(4, "Perspectiva del producto e interfaces");
paragraph("La interfaz React usa `HashRouter`, lo que evita dependencia de reescrituras del servidor y es compatible con el archivo local de Electron. Axios consume por HTTPS una URL Railway hardcodeada. La API Express intercambia JSON, usa CORS, Helmet y Morgan y accede a PostgreSQL con `pg`. El pool activa SSL cuando el host no es `localhost`, con `rejectUnauthorized: false`. El repositorio no contiene SDK de Supabase ni una URL de Supabase; su utilización solo aparece referida por mensajes de commit y por compatibilidad PostgreSQL, por lo que su instancia efectiva queda **PENDIENTE DE VALIDACIÓN**.");
paragraph("Electron carga Vite en desarrollo y `dist/index.html` empaquetado, con `contextIsolation`, sandbox y navegación externa controlada. Capacitor contiene `appId`, nombre y `webDir`, pero no se encontraron proyectos nativos. Flask consume los catálogos de Railway y Gemini mediante `google.genai`. Socket.IO emite eventos de pedido y venta, pero la aplicación React no instala ni consume `socket.io-client`.");
write(`![Figura 1. Diagrama de contexto del sistema](diagramas/figura-01-contexto.svg)

*Figura 1. Diagrama de contexto del sistema. Fuente: elaboración propia con evidencia del repositorio.*
`);

heading(4, "Restricciones, supuestos y dependencias");
bulletList([
  "Requiere conectividad para API Railway, base remota y Gemini; el frontend no implementa modo sin conexión.",
  "La API base está fija en dos fuentes y no se parametriza por entorno.",
  "La instancia y credenciales de PostgreSQL se reciben por variables de entorno; no se reproducen valores.",
  "Gemini requiere `API_KEY`; la disponibilidad y cuota no fueron verificadas.",
  "La operación presupone IDs de estados 1, 3 y 4 y método de pago inicial 1 en la interfaz; su significado depende de datos de referencia.",
  "No se verificó despliegue Android/iOS ni firma del instalador Windows.",
  "Las rutas frontend no tienen guard de sesión/rol y casi todos los endpoints de negocio carecen de middleware de autenticación.",
]);

heading(3, "1.3. Product Goal");
paragraph("Centralizar en Restaurante ERP la administración del menú y las mesas, y coordinar el registro de pedidos y ventas con la preparación en cocina y la entrega por mesero, mediante interfaces adaptables para los roles operativos verificados y un menú público conectado al catálogo real. La meta se limita al valor operativo demostrable; no presupone objetivos comerciales, métricas de ventas ni aceptación del cliente.");

heading(2, "2. Toma de Requerimientos");
heading(3, "2.1. Técnicas Utilizadas");
paragraph("No se encontró documentación formal de entrevistas o encuestas. Para la elaboración del presente informe se realizó una reconstrucción de requisitos mediante ingeniería inversa del código, análisis de la base de datos, revisión de interfaces y análisis del historial Git.");
paragraph("Sí existe evidencia de prototipado y evolución iterativa en los componentes y commits de interfaz entre el 27 y el 28 de julio de 2026. Esto demuestra iteración técnica, pero no permite afirmar que se aplicaron reuniones, observación presencial, encuestas o historias de usuario originales. Las actas y fuentes primarias de levantamiento quedan en el registro de pendientes.");

heading(3, "2.2. Descripción de los Actores del Sistema");
write(mdTable("Actores y clases de usuario", ["Actor","Tipo","Responsabilidad","Funciones","Dispositivo","Evidencia"], [
  ["Administrador","Humano","Mantener catálogos y mesas; consultar reportes cuando exista interfaz","CRUD de categorías, platos, bebidas y mesas; crear combos","Escritorio/tablet","Home.jsx; AdminLayout.jsx; páginas Admin"],
  ["Cajero/Cajera","Humano","Configurar menú, registrar pedido y venta","Menú del día, pedido, venta y combos","Escritorio/táctil","Home.jsx usa Cajera; backend/roles requiere validación"],
  ["Cocinero/Cocinera","Humano","Gestionar preparación","Consultar pendientes y cambiar estados","Pantalla de cocina","Home.jsx usa Cocinera; Cocina.jsx"],
  ["Mesero","Humano","Entregar productos listos","Consultar listos y marcar entrega","Móvil/tablet","Mesero.jsx"],
  ["Cliente","Humano","Consultar oferta pública","Ver catálogos y preguntar al asistente","Navegador","menu-cliente"],
  ["Servicio Gemini","Sistema externo","Generar respuesta a partir del prompt","generate_content","HTTPS externo","services/gemini.py"],
]));
paragraph(`La experiencia, nivel técnico, frecuencia de uso y necesidades específicas de cada actor no están documentadas formalmente: ${PENDING_TEAM}. Por diseño, las interfaces internas priorizan operación repetida, ratón, teclado y controles táctiles; el mesero tiene composición móvil. Los valores de roles muestran variantes Cajera/Cajero y Cocinera/Cocinero que no se corrigieron y deben validarse contra los datos reales.`);

heading(3, "2.3. Glosario de Términos del Negocio");
write(mdTable("Glosario y acrónimos", ["Término/Acrónimo","Definición"], [
  ["ERP","Sistema integrado para procesos y datos operativos del restaurante."],["POS","Punto de venta; flujo de captura de pedido y cobro."],
  ["API","Interfaz HTTP del backend Express bajo `/api`."],["JWT","Token firmado usado para representar la sesión y perfil."],
  ["CRUD","Crear, consultar, actualizar y eliminar registros."],["SRS","Especificación de requisitos de software."],
  ["Categoría","Clasificación de platos."],["Plato","Producto preparado asociado a categoría y precio."],
  ["Bebida","Producto líquido con tipo, precio y existencias."],["Combo","Agrupación de platos con cantidad y precio propio."],
  ["Mesa","Ubicación numerada con capacidad y disponibilidad."],["Menú del día","Conjunto fechado y activo de platos con stock."],
  ["Pedido","Cabecera de consumo con tipo, usuario, mesa, estado y total."],["Detalle","Línea individual asociada a menú, combo, compra o pedido."],
  ["Venta","Cobro asociado a pedido y método de pago."],["Cocina","Área que cambia detalles desde pendiente hasta listo."],
  ["Mesero","Rol que registra la entrega de detalles listos."],["Supabase","Servicio PostgreSQL citado en commits; instancia efectiva no verificable en archivos."],
  ["Railway","Plataforma del host hardcodeado de la API."],["Electron","Contenedor de escritorio Windows configurado."],
  ["Capacitor","Contenedor móvil con configuración base, sin proyecto nativo verificado."],["Gemini","Servicio de IA consumido por `google.genai`."],
]));
heading(4, "Referencias documentales");
bulletList([
  "Formato de especificación de requerimientos de software (PDF aportado, 7 páginas).",
  "Índice detallado para proyecto de desarrollo de software (PDF aportado, 3 páginas).",
  `Repositorio local auditado en rama \`${branch}\`, commit \`${commit}\`.`,
  "`database/restaurante.sql`, dump PostgreSQL 17.5.",
  "Manifiestos `backend/package.json`, `restaurante-desktop/package.json` y `menu-cliente/requirements.txt`.",
]);

heading(1, "FASE II: ESPECIFICACIÓN FUNCIONAL");
heading(2, "3. Requerimientos del Software");
heading(3, "3.1. Requerimientos Funcionales");
paragraph(`Se identificaron **${rf.length} requisitos funcionales**. Cada requisito es atómico, comienza con la fórmula obligatoria y se clasifica conforme a integración observable. “Implementado” no implica validación en producción.`);
for (const requirement of rf) {
  heading(4, `${requirement.id}. ${requirement.name}`);
  write(requirementTable(requirement));
}

heading(4, "Inventario de interfaces externas");
write(mdTable("Interfaces externas", ["Elemento","Propósito","Origen","Destino","Formato","Protocolo","Evidencia"], [
  ["API Restaurante","Operaciones de negocio","React/Flask","Express Railway","JSON/XLSX","HTTPS","axios.js; menu-cliente/app.py"],
  ["PostgreSQL","Persistencia","Express","Servidor PostgreSQL","SQL","TCP + SSL condicional","connection.js"],
  ["JWT","Identidad de sesión","Express","React/cliente autorizado","Token firmado","Authorization Bearer","jwt.js; auth.middleware.js"],
  ["Socket.IO","Notificaciones","Express","Salas admin/cajero/cocina/mesero","Eventos","WebSocket/long polling","socket.js; pedido.service.js; venta.service.js"],
  ["Gemini","Respuesta asistida","Flask","Google Gemini","Prompt/texto","SDK sobre HTTPS","services/gemini.py"],
  ["Electron","Contenedor escritorio","Proceso principal","Renderer React","HTML/JS","IPC no implementado","electron/main.cjs; preload.cjs"],
  ["Capacitor","Preparación móvil","Configuración","Web dist","Activos Vite","Contenedor no verificado","capacitor.config.json"],
]));

heading(4, "Inventario de endpoints");
write(mdTable("Endpoints HTTP de la API", ["Método","Ruta","Función","Entrada","Salida","Autenticación","Actor","Evidencia"], endpoints));
paragraph("Todos los endpoints anteriores, excepto `GET /api/auth/profile`, están montados sin `authenticate` ni autorización de rol. La columna Autenticación describe el middleware verificable, no la intención funcional.");

heading(4, "Inventario de interfaces de usuario");
write(mdTable("Interfaces de usuario", ["Pantalla","Ruta","Actor","Objetivo","Entradas","Acciones","Salidas","Responsive","Estado"], screens));

heading(3, "3.2. Requerimientos No Funcionales");
paragraph(`Se documentan **${rnfs.length} requisitos no funcionales** verificables. Las metas no medidas se mantienen expresamente pendientes.`);
for (const item of rnfs) {
  heading(4, `${item[0]}. ${item[1]}`);
  write(mdTable(`${item[0]}: ${item[1]}`, ["Campo","Contenido"], [
    ["ID",item[0]],["Descripción",item[2]],["Estado",item[3]],["Evidencia",item[4]],
    ["Criterio verificable/limitación",item[5]],["Métrica",item[5].includes("[PENDIENTE") ? "[PENDIENTE DE VALIDACIÓN: métrica cuantitativa esperada]" : "Cumplimiento estático verificable en la evidencia citada."],
  ]));
}

heading(2, "4. Modelado de Negocio y Casos de Uso");
heading(3, "4.1. Diagrama General de Casos de Uso");
write(`![Figura 2. Diagrama general de casos de uso](diagramas/figura-02-casos-uso-general.svg)

*Figura 2. Diagrama general de casos de uso. El asterisco de reportes indica backend sin interfaz funcional. Fuente: elaboración propia.*
`);
heading(3, "4.2. Especificaciones de Casos de Uso");
for (const item of useCases) {
  heading(4, `${item[0]}. ${item[1]}`);
  write(caseTable(item));
}
heading(3, "4.3. Matriz de Trazabilidad");
write(mdTable("Matriz de trazabilidad funcional", ["Requisito","Caso de uso","Endpoint","Pantalla","Tabla","Estado","Evidencia"], rf.map((item) => [
  item.id,item.cu,item.endpoint,item.screen,item.table,item.state,item.evidence,
])));

heading(1, "FASE III: DISEÑO DE LA SOLUCIÓN");
heading(2, "5. Modelado de Objetos y Clases");
heading(3, "5.1. Diagrama de Clases");
paragraph("El backend aplica una organización Ruta → Controlador → Servicio → Repositorio. Los controladores traducen HTTP, los servicios aplican reglas y orquestación, y los repositorios ejecutan SQL parametrizado. El modelo no representa componentes React como clases.");
write(`![Figura 3. Diagrama de clases](diagramas/figura-03-diagrama-clases.svg)

*Figura 3. Diagrama de clases y capas relevantes. Fuente: elaboración propia.*
`);
heading(3, "5.2. Diagrama de Objetos");
paragraph("La instancia es deliberadamente referencial: muestra el enlace de un cajero, una mesa, un pedido, detalles, estado y venta sin copiar registros ni datos personales del dump.");
write(`![Figura 4. Diagrama de objetos](diagramas/figura-04-diagrama-objetos.svg)

*Figura 4. Diagrama de objetos no sensibles. Fuente: elaboración propia.*
`);

heading(2, "6. Diseño de Base de Datos");
paragraph("El archivo `database/restaurante.sql` es un dump de PostgreSQL 17.5. Define 22 tablas, cinco vistas, 14 índices explícitos, la extensión `pgcrypto`, secuencias y restricciones. No se encontraron sentencias `CREATE FUNCTION` ni `CREATE TRIGGER`. Los repositorios consumen una parte del modelo: autenticación, catálogos, mesas, menús, pedidos, ventas y reportes. Compras, productos, gastos, modificaciones y configuración no tienen módulo HTTP asociado en la línea base.");
heading(3, "6.1. Diagrama del Modelo Conceptual");
write(`![Figura 5. Modelo conceptual](diagramas/figura-05-modelo-conceptual.svg)

*Figura 5. Modelo conceptual de las áreas de identidad, oferta, operación y abastecimiento. Fuente: elaboración propia.*
`);
heading(3, "6.2. Diagrama del Modelo Lógico");
write(`![Figura 6. Modelo lógico](diagramas/figura-06-modelo-logico.svg)

*Figura 6. Modelo lógico relacional resumido. El diccionario de datos contiene las 22 tablas. Fuente: elaboración propia.*
`);
write(mdTable("Relaciones principales", ["Origen","Relación","Destino","Regla relevante"], [
  ["rol","1:N","usuario","ON UPDATE CASCADE; ON DELETE RESTRICT"],
  ["usuario","1:N","pedido/compra/gasto/modificación","RESTRICT en eliminación"],
  ["categoria","1:N","plato","RESTRICT"],
  ["menu_dia","1:N","detallemenu","CASCADE en detalle"],
  ["combo","1:N","detallecombo","CASCADE en detalle"],
  ["pedido","1:N","detallepedido","CASCADE en detalle"],
  ["pedido","1:0..1 de negocio","venta","FK y restricción; no se observó UNIQUE sobre idpedido"],
  ["compra","1:N","detallecompra","CASCADE en detalle"],
]));
heading(3, "6.3. Diagrama del Modelo Físico");
write(`![Figura 7. Modelo físico](diagramas/figura-07-modelo-fisico.svg)

*Figura 7. Modelo físico PostgreSQL. Fuente: elaboración propia.*
`);
write(mdTable("Inventario físico", ["Elemento","Cantidad/Configuración","Evidencia"], [
  ["Tablas",String(database.tables.length),"CREATE TABLE en restaurante.sql"],
  ["Vistas",`${database.views.length}: ${database.views.join(", ")}`,"CREATE VIEW en restaurante.sql"],
  ["Índices explícitos",`${database.indexes.length}: ${database.indexes.map((item) => item[0]).join(", ")}`,"CREATE INDEX en restaurante.sql"],
  ["Funciones de usuario","0 encontradas","Búsqueda CREATE FUNCTION"],
  ["Triggers","0 encontrados","Búsqueda CREATE TRIGGER"],
  ["Motor","PostgreSQL 17.5","Cabecera del dump"],
  ["SSL","Activo cuando DB_HOST no es localhost; rejectUnauthorized=false","backend/src/database/connection.js"],
  ["Pool","max 20; idle 30000 ms; connection 5000 ms","backend/src/database/connection.js"],
]));

heading(1, "FASE IV: GESTIÓN ÁGIL DEL PROYECTO");
heading(2, "7. Estructura de Roles y Equipo");
heading(3, "7.1. Roles en la Planificación Sprint");
paragraph("El historial Git identifica contribuidores técnicos, pero no demuestra asignaciones Scrum. Por ello no se atribuyen Product Owner, Scrum Master ni equipo formal.");
write(mdTable("Roles Scrum", ["Rol Scrum","Persona","Responsabilidad","Estado"], [
  ["Product Owner",PENDING_TEAM,"Ordenar valor y validar backlog",PENDING_TEAM],
  ["Scrum Master",PENDING_TEAM,"Facilitar Scrum y remover impedimentos",PENDING_TEAM],
  ["Developers",PENDING_TEAM,"Construir y verificar el incremento",PENDING_TEAM],
]));
paragraph("Contribuidores observados en commits: VipGang999, Oriana Aldana y halybv55. Este dato indica autoría de commits, no rol organizacional.");

heading(3, "7.2. Matriz RACI");
paragraph("Propuesta pendiente de validación por el equipo.");
write(mdTable("Matriz RACI editable", ["Entregable","Responsable","Aprobador","Consultado","Informado"], [
  ["Especificación de requisitos",PENDING_TEAM,PENDING_TEAM,PENDING_TEAM,PENDING_TEAM],
  ["Backend y API",PENDING_TEAM,PENDING_TEAM,PENDING_TEAM,PENDING_TEAM],
  ["Base de datos",PENDING_TEAM,PENDING_TEAM,PENDING_TEAM,PENDING_TEAM],
  ["Frontend y experiencia",PENDING_TEAM,PENDING_TEAM,PENDING_TEAM,PENDING_TEAM],
  ["Cliente Flask/Gemini",PENDING_TEAM,PENDING_TEAM,PENDING_TEAM,PENDING_TEAM],
  ["Pruebas y aceptación",PENDING_TEAM,PENDING_TEAM,PENDING_TEAM,PENDING_TEAM],
]));

heading(2, "8. Artefactos de Scrum");
heading(3, "8.1. Product Backlog");
paragraph("Backlog reconstruido mediante ingeniería inversa; no sustituye un Product Backlog aprobado.");
write(mdTable("Product Backlog reconstruido", ["ID","Historia de usuario","Prioridad","Estado","Evidencia"], [
  ["PB-001","Como operador, quiero autenticarme por área para acceder a mi trabajo.","Alta","Implementado con brechas de autorización","auth; Home/Login"],
  ["PB-002","Como administrador, quiero mantener categorías, platos y bebidas para organizar la oferta.","Alta","Implementado","módulos y páginas Admin"],
  ["PB-003","Como administrador, quiero mantener mesas para representar capacidad y disponibilidad.","Alta","Implementado","mesa; Admin/Mesas.jsx"],
  ["PB-004","Como cajero, quiero abrir el menú del día para ofrecer productos vigentes.","Alta","Implementado","menu-dia; Caja/MenuDia.jsx"],
  ["PB-005","Como cajero, quiero registrar pedido y venta para cobrar el consumo.","Alta","Parcial por falta de transacción distribuida","Pedido.jsx; módulos pedido/venta"],
  ["PB-006","Como cocinero, quiero cambiar estados de detalles para coordinar preparación.","Alta","Implementado con IDs hardcodeados","Cocina.jsx"],
  ["PB-007","Como mesero, quiero consultar platos listos y entregarlos.","Alta","Implementado con ID hardcodeado","Mesero.jsx"],
  ["PB-008","Como administrador, quiero consultar y exportar reportes para revisar la operación.","Media","Solo backend","módulo reporte; Reportes.jsx"],
  ["PB-009","Como cliente, quiero ver el catálogo para conocer la oferta.","Media","Implementado con limitaciones","menu-cliente"],
  ["PB-010","Como cliente, quiero preguntar por el menú para recibir orientación.","Media","Parcialmente implementado","app.py; gemini.py"],
  ["PB-011","Como responsable técnico, quiero autorización por rol para proteger datos y operaciones.","Alta","Propuesto","Brecha observada en routes"],
  ["PB-012","Como equipo, quiero pruebas automatizadas para detectar regresiones.","Alta","No encontrado",NOT_FOUND],
]));

heading(3, "8.2. Product Goal");
paragraph("Consolidar una operación trazable desde la administración de la oferta hasta la venta, preparación y entrega, con interfaces adecuadas a cada rol y una consulta pública conectada a datos reales. Su validación formal con cliente y docente permanece pendiente.");

heading(3, "8.3. Sprint Backlog");
write(mdTable("Sprint Backlog reconstruido", ["Periodo verificable","Tareas inferidas de commits","Evidencia verificable","Naturaleza"], [
  ["25/07/2026","Backend, dump PostgreSQL y SSL","e998b44, f904b3f, 0fb6ea1","Reconstrucción técnica"],
  ["26/07/2026","Consultas de combos e incorporación del frontend","22e2c8c, 21e604c, 2dc3a1d","Reconstrucción técnica"],
  ["27/07/2026","Sistema responsive, administración, caja, cocina, mesero, SSL y Electron","e4e0fda a 238aa75","Reconstrucción técnica"],
  ["28/07/2026","Categorías, catálogos, menú cliente y Gemini; integración de ramas","d3326aa, 331ae0f, cf71fc4, 1546004","Reconstrucción técnica"],
]));

heading(3, "8.4. Sprint Goal");
paragraph("Reconstrucción basada en evidencia del repositorio.");
write(mdTable("Metas reconstruidas", ["Agrupación","Meta técnica reconstruida","Base","Validación formal"], [
  ["Backend y datos","Disponer de API modular y esquema relacional para la operación.","Commits del 25/07","No encontrada"],
  ["Frontend operativo","Proveer interfaces responsive para administración, caja, cocina y mesero.","Commits 26–27/07","No encontrada"],
  ["Contenedores e integración","Preparar Electron y conexión remota PostgreSQL.","Commits 27/07","No encontrada"],
  ["Catálogo público","Agregar menú cliente y asistencia Gemini.","Commit 331ae0f","No encontrada"],
]));

heading(2, "9. Ceremonias y Seguimiento");
for (const [number, name, purpose] of [
  ["9.1","Sprint Planning","Definir meta, alcance y tareas del sprint."],
  ["9.2","Daily Scrum","Inspeccionar avance diario e impedimentos."],
  ["9.3","Sprint Review","Inspeccionar el incremento con interesados."],
  ["9.4","Sprint Retrospective","Acordar mejoras del proceso del equipo."],
]) {
  heading(3, `${number}. ${name}`);
  paragraph(purpose);
  paragraph("[PENDIENTE: adjuntar evidencia real de la ceremonia]");
  write(mdTable(`Formato editable de ${name}`, ["Campo","Contenido"], [
    ["Fecha y participantes",PENDING_TEAM],["Objetivo/agenda",PENDING_TEAM],
    ["Evidencia o decisiones",PENDING_TEAM],["Acciones y responsables",PENDING_TEAM],
  ]));
}
paragraph("Lecciones técnicas observables, sin presentarlas como retrospectiva realizada: la autorización debe aplicarse de extremo a extremo; las operaciones pedido/venta requieren una estrategia transaccional; los eventos Socket.IO necesitan consumidores; y los IDs de catálogo no deberían representar reglas implícitas.");

heading(1, "FASE V: PLANIFICACIÓN Y CONTROL");
heading(2, "10. Planificación Temporal");
heading(3, "10.1. Diagrama de Gantt");
paragraph("El historial verificable abarca del 25 al 28 de julio de 2026. La agrupación siguiente reconstruye hitos por fecha de commit; no demuestra sprints formales, duración de tareas ni dedicación.");
write(`![Figura 8. Diagrama de Gantt](diagramas/figura-08-gantt.svg)

*Figura 8. Cronograma técnico reconstruido a partir de fechas de commits. Fuente: historial Git.*
`);
paragraph(`Cronograma formal, fecha de inicio del proyecto y fechas de reuniones: ${PENDING_TEAM}.`);

heading(2, "11. Gestión de Riesgos y Contingencias");
heading(3, "11.1. Matriz de Contingencia");
paragraph("Probabilidad e impacto constituyen una evaluación técnica propuesta, no una evaluación formal aprobada. El responsable de cada riesgo queda pendiente.");
const riskRows = [
  ["R-01","Dependencia de Internet/Railway","Disponibilidad","Alta","Alta","Parametrizar host y monitorear","Reintentos y mensaje operativo","Procedimiento temporal documentado"],
  ["R-02","Dependencia PostgreSQL/Supabase y SSL sin verificación de certificado","Datos/seguridad","Media","Alta","Usar CA válida y pruebas de conexión","Restaurar conexión segura","Cambiar proveedor desde respaldo"],
  ["R-03","Endpoints de negocio sin autenticación/autorización","Seguridad","Alta","Crítico","Aplicar authenticate y RBAC","Restringir acceso de red","Deshabilitar operaciones sensibles"],
  ["R-04","CORS HTTP y Socket.IO con origen amplio","Seguridad","Alta","Alta","Lista de orígenes permitidos","Configurar proxy restrictivo","Suspender Socket.IO público"],
  ["R-05","Roles Cajera/Cajero y Cocinera/Cocinero inconsistentes","Funcional","Alta","Alta","Catálogo único y pruebas","Mapa temporal validado","Corrección coordinada de datos/código"],
  ["R-06","Estados 1, 3 y 4 hardcodeados","Integridad","Alta","Alta","Resolver por catálogo/constantes","Validar seeds vigentes","Bloquear transición inválida"],
  ["R-07","Método de pago 1 y usuario enviado por cliente","Integridad/seguridad","Alta","Crítico","Derivar usuario del JWT y listar métodos","Validación de servidor","Revisión manual y bloqueo"],
  ["R-08","Socket.IO sin consumidores frontend","Funcional","Alta","Media","Agregar cliente y reconexión","Polling controlado","Actualización manual"],
  ["R-09","Pedido y venta en llamadas no atómicas","Datos","Media","Alta","Endpoint transaccional idempotente","Reconciliar pedidos sin venta","Anular pedido bajo control"],
  ["R-10","API hardcodeada","Mantenibilidad","Alta","Media","Variables de entorno Vite/Flask","Build por entorno","Proxy configurable"],
  ["R-11","Ausencia de pruebas integrales","Calidad","Alta","Alta","Suite API/UI y CI","Checklist manual","Congelar despliegue"],
  ["R-12","Electron sin firma verificada","Distribución","Media","Alta","Certificado y pipeline de firma","Distribución controlada","Uso web temporal"],
  ["R-13","Cambios concurrentes y merges","Configuración","Media","Media","PR y protección de rama","Resolver con revisión par","Revertir mediante commit aprobado"],
  ["R-14","Repositorio remoto público","Seguridad","Media","Alta","Auditar secretos e historial","Rotar credenciales","Privatizar y reemitir"],
  ["R-15","Exposición de secretos","Seguridad","Media","Crítico","Secret scanning y variables","Rotación inmediata","Revocar servicios"],
  ["R-16","Dependencia Gemini","Externo","Media","Media","Timeout, cuota y fallback","Respuesta sin IA","Deshabilitar chat"],
  ["R-17","XSS en chat por innerHTML","Seguridad","Alta","Alta","Usar textContent/sanitización","Deshabilitar render dinámico","Retirar chat temporalmente"],
  ["R-18","Pérdida de datos","Datos","Media","Crítico","Backups y restauraciones probadas","Restaurar último respaldo","Reconstrucción controlada"],
  ["R-19","Descuentos pueden producir total negativo en servicio","Integridad","Media","Alta","Validar descuento ≤ subtotal","Rechazar venta","Corrección y conciliación"],
  ["R-20","Falta de documentación y aceptación","Gestión","Alta","Media","Mantener SRS y actas","Registrar pendientes","Revisión docente/equipo"],
];
write(mdTable("Matriz de contingencia", ["ID","Riesgo","Categoría","Probabilidad","Impacto","Prevención","Plan A","Plan B","Responsable"], riskRows.map((row) => [...row,PENDING_TEAM])));

heading(1, "FASE VI: ANEXOS Y CIERRE");
heading(2, "12. Anexos");
heading(3, "12.1. Diccionario de Datos");
paragraph("El diccionario se deriva de las definiciones DDL. No reproduce filas, contraseñas, hashes, secretos ni datos personales. “Longitud” muestra precisión/escala o longitud declarada; el guion indica que el tipo no define longitud.");
for (const table of database.tables) {
  heading(4, `Tabla ${table.name}`);
  write(mdTable(`Diccionario de datos: ${table.name}`, ["Campo","Tipo","Longitud","PK","FK","Nulo","Predeterminado","Descripción"], table.columns.map((column) => [
    column.name,column.type,column.length,column.pk,column.fk,column.nullable,column.defaultValue,describeField(column.name),
  ])));
  if (table.constraints.length) {
    paragraph(`Restricciones CHECK declaradas: ${table.constraints.map((item) => `\`${item.replace(/\s+/g, " ")}\``).join("; ")}.`);
  }
}

heading(3, "12.2. Mockups o Prototipos de Interfaces");
paragraph("Los siguientes cuadros son espacios reservados reales para evidencia visual. La captura debe representar datos de prueba autorizados y no incluir secretos.");
const mockups = [
  [9,"Pantalla de inicio","#/","1366 × 768","Identidad del sistema y cuatro perfiles."],
  [10,"Inicio de sesión","#/login/Administrador","1366 × 768","Rol, usuario, contraseña, error y regreso."],
  [11,"Panel administrativo","#/admin","1366 × 768","Sesión y navegación administrativa."],
  [12,"Gestión de categorías","#/admin/categorias","1366 × 768","Búsqueda, tabla, formulario y acciones."],
  [13,"Gestión de platos","#/admin/platos","1366 × 768","Filtros, tabla y modal de plato."],
  [14,"Gestión de bebidas","#/admin/bebidas","1366 × 768","Filtros, existencias y acciones."],
  [15,"Gestión de combos","#/admin/combos","1366 × 768","Listado y constructor de combo."],
  [16,"Gestión de mesas","#/admin/mesas","1366 × 768","Mesas, capacidad y disponibilidad."],
  [17,"Caja y registro de pedido","#/caja/pedido","1366 × 768","Catálogo, detalle, mesa, pago y total."],
  [18,"Panel de cocina","#/cocina","1366 × 768","Pendientes y acciones de preparación."],
  [19,"Panel del mesero","#/mesero","390 × 844","Pedidos listos y entrega táctil."],
  [20,"Menú cliente","Flask /","1366 × 768 y 390 × 844","Platos, bebidas, combos y chat."],
];
for (const [number,name,route,resolution,content] of mockups) {
  write(`<div class="mockup">
<strong>FIGURA ${number}. ${name}</strong>
<p><strong>Ruta:</strong> ${route} | <strong>Resolución recomendada:</strong> ${resolution}</p>
<p><strong>Contenido esperado:</strong> ${content}</p>
<div class="mockup-box">ESPACIO RESERVADO PARA CAPTURA VALIDADA</div>
</div>

*Figura ${number}. ${name}. Captura pendiente de incorporación.*
`);
}

heading(3, "12.3. Acta de Aceptación del Cliente");
paragraph("La siguiente es únicamente una plantilla editable; no constituye aceptación.");
write(mdTable("Plantilla de acta de aceptación", ["Campo","Contenido"], [
  ["Proyecto","Restaurante ERP"],["Versión","1.0"],["Entregables","PDF, DOCX, Markdown, diagramas y anexos técnicos"],
  ["Criterios evaluados",PENDING_VALIDATION],["Observaciones",PENDING_VALIDATION],
  ["Resultado","□ Aceptado  □ Rechazado"],["Nombre del cliente",PENDING_TEAM],
  ["Firma",PENDING_TEAM],["Fecha",PENDING_TEAM],
]));
paragraph("[PENDIENTE DE FIRMA Y VALIDACIÓN DEL CLIENTE]");

const tableList = tableTitles.map(([number,title]) => `- ${number}. ${title}`).join("\n");
let markdown = out.join("\n").replace("[[LISTA_TABLAS]]", tableList);

const pending = `# Pendientes de información

Este archivo consolida los datos que no se encontraron o no pueden validarse mediante el repositorio. No deben completarse por inferencia.

## Identificación académica

- Institución: ${PENDING_TEAM}
- Carrera: ${PENDING_TEAM}
- Asignatura: ${PENDING_TEAM}
- Docente: ${PENDING_TEAM}
- Integrantes: ${PENDING_TEAM}
- Ciudad y país: ${PENDING_TEAM}

## Requisitos y actores

- Confirmar valores oficiales de los roles Cajera/Cajero y Cocinera/Cocinero.
- Confirmar experiencia, nivel técnico, frecuencia de uso y necesidades de cada actor.
- Aportar entrevistas, encuestas, observaciones, reuniones, actas o aprobaciones reales.
- Validar procesos excluidos y prioridades con docente o cliente.
- Proporcionar credenciales de prueba por un canal seguro, sin registrarlas en este repositorio.

## Scrum y planificación

- Product Owner: ${PENDING_TEAM}
- Scrum Master: ${PENDING_TEAM}
- Developers y responsabilidades: ${PENDING_TEAM}
- Evidencias de Sprint Planning, Daily Scrum, Sprint Review y Sprint Retrospective.
- Cronograma formal, sprints, estimaciones y fechas del proyecto.
- Matriz RACI aprobada.

## Validación técnica

- Confirmar proveedor e instancia PostgreSQL/Supabase y su política SSL.
- Confirmar catálogo e IDs oficiales de estados de pedido y métodos de pago.
- Validar Railway, Gemini, Socket.IO, recuperación ante fallos y conectividad autorizada.
- Definir métricas cuantitativas de rendimiento, accesibilidad, disponibilidad y escalabilidad.
- Ejecutar pruebas unitarias, integración, seguridad, responsive, Electron y Capacitor.
- Confirmar política CORS, autorización por rol, backup y restauración.
- Confirmar privacidad del repositorio remoto y auditoría de secretos.

## Evidencia visual y aceptación

- Incorporar y validar capturas de las Figuras 9 a 20.
- Adjuntar acta real de aceptación o rechazo.
- Nombre y firma del cliente: ${PENDING_TEAM}
- Fecha de aceptación: ${PENDING_TEAM}
- Validación final del docente o cliente: ${PENDING_VALIDATION}
`;
fs.writeFileSync(path.join(root, "Pendientes_de_informacion.md"), pending, "utf8");

function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function inlineMd(text) {
  let value = escapeXml(text);
  value = value.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
  value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return value;
}
function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  const headingRows = lines
    .map((line) => line.match(/^(#{1,4})\s+(.+)$/))
    .filter(Boolean)
    .filter((match) => !match[2].startsWith("INFORME DEL"))
    .map((match) => ({ level: match[1].length, text: match[2], id: slugify(match[2]) }));
  const toc = `<nav class="toc">${headingRows.filter((h) => h.level <= 3).map((h) => `<div class="toc-l${h.level}"><a href="#${h.id}">${inlineMd(h.text)}</a></div>`).join("")}</nav>`;
  let html = "";
  let i = 0;
  let inList = false;
  const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };
  while (i < lines.length) {
    const line = lines[i];
    if (line === "[[TOC]]") {
      closeList();
      html += `<span class="toc-marker">TOC_BEGIN</span>${toc}<span class="toc-marker">TOC_END</span>`;
      i++;
      continue;
    }
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      html += `<h${level} id="${slugify(text)}">${inlineMd(text)}</h${level}>`;
      i++;
      continue;
    }
    if (line.startsWith("| ") && i + 1 < lines.length && /^\|(?:\s*:?-+:?\s*\|)+$/.test(lines[i + 1])) {
      closeList();
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i].slice(1, -1).split(/(?<!\\)\|/).map((cell) => cell.trim().replaceAll("\\|", "|")));
        i++;
      }
      const header = rows.shift();
      rows.shift();
      html += `<table><thead><tr>${header.map((cell) => `<th>${inlineMd(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineMd(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      continue;
    }
    if (/^\s*-\s+/.test(line)) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inlineMd(line.replace(/^\s*-\s+/, ""))}</li>`;
      i++;
      continue;
    }
    closeList();
    if (!line.trim()) { i++; continue; }
    if (line.trim().startsWith("<") && !line.trim().startsWith("<!--")) {
      html += line;
      i++;
      continue;
    }
    if (/^!\[/.test(line)) {
      html += `<figure>${inlineMd(line)}</figure>`;
      i++;
      continue;
    }
    html += `<p>${inlineMd(line)}</p>`;
    i++;
  }
  closeList();
  return html;
}

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Informe Final - Restaurante ERP</title>
<style>
  @page { size: Letter portrait; margin: 2.54cm; }
  * { box-sizing: border-box; }
  html, body { background: #fff; color: #000; }
  body { margin: 0; font-family: "Times New Roman", Times, serif; font-size: 12pt; line-height: 1.5; text-align: justify; }
  body::before { content: "RESTAURANTE ERP — INFORME FINAL"; position: fixed; top: -1.65cm; left: 0; right: 0; text-align: center; font-size: 9pt; color: #444; border-bottom: 0.5pt solid #888; }
  body::after { content: "Página " counter(page); position: fixed; bottom: -1.7cm; left: 0; right: 0; text-align: center; font-size: 9pt; color: #444; border-top: 0.5pt solid #888; }
  h1 { font-size: 16pt; font-weight: bold; text-align: left; page-break-before: always; margin: 18pt 0 12pt; }
  body > h1:first-child { page-break-before: auto; text-align: center; }
  h2 { font-size: 14pt; font-weight: bold; text-align: left; margin: 16pt 0 8pt; page-break-after: avoid; }
  h3, h4 { font-size: 12pt; font-weight: bold; text-align: left; margin: 12pt 0 6pt; page-break-after: avoid; }
  p { margin: 0 0 6pt; orphans: 3; widows: 3; }
  body > p { text-indent: 1.25cm; }
  ul { margin: 0 0 6pt 22pt; padding: 0; text-align: left; }
  li { margin: 0 0 3pt; }
  code { font-family: Consolas, monospace; font-size: 9.5pt; overflow-wrap: anywhere; }
  table { width: 100%; border-collapse: collapse; margin: 4pt 0 12pt; font-size: 9.5pt; line-height: 1.2; page-break-inside: auto; }
  thead { display: table-header-group; }
  tr { page-break-inside: avoid; }
  th, td { border: 0.6pt solid #666; padding: 4pt; vertical-align: top; text-align: left; overflow-wrap: anywhere; }
  th { background: #e8e8e8; font-weight: bold; }
  p:has(+ table) { text-indent: 0; font-weight: bold; page-break-after: avoid; }
  figure { margin: 10pt auto 4pt; page-break-inside: avoid; text-align: center; }
  figure img, p > img { display: block; max-width: 100%; max-height: 17cm; margin: 8pt auto; }
  .cover { min-height: 22cm; display: flex; flex-direction: column; justify-content: center; text-align: center; page-break-after: always; }
  .cover h1 { page-break-before: auto; text-align: center; font-size: 16pt; margin-top: 2cm; }
  .cover h2 { text-align: center; font-size: 16pt; margin-bottom: 2cm; }
  .cover p { text-indent: 0; text-align: center; }
  .toc { text-align: left; page-break-after: always; }
  .toc-marker { color: #fff; font-size: 1pt; line-height: 1pt; }
  .toc div { border-bottom: 0.5pt dotted #aaa; margin: 2pt 0; }
  .toc a { color: #000; text-decoration: none; }
  .toc-l2 { margin-left: 12pt !important; }
  .toc-l3 { margin-left: 26pt !important; font-size: 10.5pt; }
  .mockup { page-break-inside: avoid; margin: 12pt 0 18pt; text-align: left; }
  .mockup p { text-indent: 0; }
  .mockup-box { width: 15cm; height: 9cm; max-width: 100%; margin: 8pt auto; border: 1.5pt dashed #555; display: flex; align-items: center; justify-content: center; text-align: center; color: #555; font-weight: bold; }
  @media print { a { color: #000; } }
</style>
</head>
<body>${mdToHtml(markdown)}</body>
</html>`;
fs.writeFileSync(path.join(root, "anexos", "Informe_Final_Proyecto_Restaurante_imprimible.html"), html, "utf8");
fs.writeFileSync(
  path.join(root, "Informe_Final_Proyecto_Restaurante.md"),
  markdown.replace("[[TOC]]\n\n", ""),
  "utf8",
);

console.log(JSON.stringify({
  requirements: rf.length,
  nonFunctional: rnfs.length,
  useCases: useCases.length,
  tables: database.tables.length,
  endpoints: endpoints.length,
  reportTables: tableCounter,
  figures: figures.length,
}, null, 2));
