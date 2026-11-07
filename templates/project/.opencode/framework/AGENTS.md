# Framework adaptativo: instrucciones del proyecto

Estas instrucciones solo se instalan en proyectos que aceptan expresamente
incorporar el framework. Complementan las directrices del proyecto y no
sustituyen su `AGENTS.md`.

## Idioma

- Comunícate con el usuario y redacta toda documentación, planes, informes,
  resúmenes, mensajes de seguimiento y contenido generado en **español
  castellano**, salvo que el usuario solicite expresamente otro idioma.
- Mantén en su forma original los identificadores técnicos, nombres propios,
  comandos, rutas, código y términos de una interfaz que deban coincidir
  literalmente con la herramienta o el proyecto.
- Si el usuario pide expresamente otro idioma para una respuesta o artefacto,
  aplica esa preferencia únicamente al alcance solicitado.

## Protocolo de trabajo

- Inspecciona los archivos e instrucciones pertinentes del proyecto antes de
  proponer cambios o realizarlos.
- Trata las consultas, el análisis y las revisiones como tareas de solo lectura,
  salvo que el usuario autorice modificaciones. Una petición directa de
  implementación autoriza el alcance pedido; no lo amplíes sin preguntar.
- Distingue los hechos observados, las suposiciones y las decisiones pendientes.
  Pregunta antes de continuar si una decisión sin resolver afecta de forma
  significativa al alcance, los datos, la seguridad o la arquitectura.
- Ajusta el esfuerzo al riesgo, la incertidumbre, el impacto y la posibilidad de
  recuperación. Usa los niveles de rigor Ligero, Estándar y Reforzado; la
  urgencia o llamar «arreglo urgente» a una tarea no reduce por sí sola el rigor.
- No crees planes formales ni seguimiento persistente para tareas triviales. Para
  trabajos sustanciales, usa el mecanismo de seguimiento existente o un
  documento de trabajo breve aprobado.
- Delimita cada tarea de implementación. Comprueba sus criterios de aceptación,
  registra evidencias reales y detente en el límite solicitado.

## Convenciones y cambios del proyecto

- Sigue la tecnología, arquitectura, convenciones y comandos nativos que hayas
  identificado en el proyecto; no inventes comandos ni tecnologías.
- Haz cambios acotados y conserva el trabajo ajeno. No sobrescribas ni elimines
  archivos existentes sin entender quién los mantiene y obtener autorización
  cuando sea necesaria.
- Actualiza la documentación directamente relacionada cuando cambie el
  comportamiento o el uso.
- No afirmes que una capacidad o validación existe si no se ha implementado o
  ejecutado y observado su resultado. Indica expresamente las comprobaciones
  fallidas, no disponibles o no ejecutadas.
- Considera no implementadas las capacidades conceptuales (como la
  planificación DAG, los puntos de control duraderos, la recuperación o las
  métricas) mientras no exista y se verifique un mecanismo concreto.

## Permisos y operaciones externas

- Respeta los permisos efectivos de OpenCode y las políticas del proyecto. Estas
  instrucciones orientan el comportamiento, pero no constituyen por sí mismas
  un límite técnico de permisos.
- Las operaciones de ciclo de vida de Git quedan fuera de este framework: no
  crees ni cambies ramas o árboles de trabajo, no prepares cambios, no confirmes,
  publiques, integres, reescribas, etiquetes ni publiques versiones. Se permite
  inspeccionar Git en modo de solo lectura cuando resulte útil.
- No cambies la configuración global de OpenCode. La instalación del framework
  es optativa y local al proyecto; la configuración del proyecto puede
  combinarse con la configuración global del usuario.
- No realices operaciones destructivas ni externas que queden fuera del alcance
  autorizado por el usuario.

## Cierre

Resume en español el objetivo, los cambios, las validaciones y sus resultados
observados, las limitaciones y el trabajo pendiente. En tareas por fases,
actualiza el registro aprobado y no inicies una tarea dependiente hasta que se
supere su puerta de verificación.
