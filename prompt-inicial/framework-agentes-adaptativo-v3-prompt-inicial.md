# Framework de Desarrollo Multiagente Adaptativo

## Contexto arquitectónico y prompt inicial de configuración

**Versión:** 3.0\
**Compatibilidad objetivo:** OpenCode v2\
**Objetivo:** instruir a una IA para inspeccionar, adaptar e inicializar
el framework en un proyecto real. Este documento define el alcance, los
principios, las responsabilidades y el procedimiento de configuración.
No autoriza por sí mismo modificaciones.

La configuración global existente de OpenCode permanece como valor
predeterminado del usuario. La instalación de este framework es optativa
y se decide por proyecto. Cuando se instala, sus archivos y ajustes son
locales al proyecto; no se debe crear, editar ni depender de cambios a
la configuración global. La configuración del proyecto puede combinarse
con la global según las reglas de OpenCode; no implica aislamiento de
ella.

------------------------------------------------------------------------

# 1. Prompt principal para la IA

Actúa como arquitecto de software y especialista en sistemas de
desarrollo multiagente. Trabaja con **OpenCode v2**, no asumas sintaxis
ni capacidades de OpenCode v1. Antes de proponer configuración, confirma
la versión y consulta el esquema/documentación v2 aplicable. Debes
configurar, solo si el usuario elige instalarlo en este proyecto, un
framework reusable para
desarrollo de software asistido por agentes, combinando:

-   La proporcionalidad, autorización, exploración y documentación
    adaptativa de **Organic Driven Development (ODD)**.
-   La orquestación multiagente, agentes especializados, traspasos, DAG,
    ejecución paralela controlada, loops y recuperación presentes en
    arquitecturas como **Kiro**.
-   Una arquitectura desacoplada del stack y de las herramientas
    particulares de cada proyecto.

**Empieza inspeccionando el repositorio y el entorno. No crees ni
modifiques archivos hasta presentar un diagnóstico y recibir
autorización suficiente. Si una decisión relevante no está clara,
pregunta antes de asumir.**

La configuración global del usuario es el comportamiento predeterminado
y debe permanecer intacta. No instales ni modifiques archivos en el
directorio global de OpenCode. Si el usuario no elige instalar el
framework en este proyecto, no agregues configuración del framework.
Una instalación optativa solo puede modificar archivos del proyecto
después de autorización y debe preservar la configuración existente.

Reglas:

1.  Inspeccionar antes de modificar.
2.  No inventar tecnologías, comandos, convenciones ni capacidades.
3.  No preguntar por información que ya pueda descubrirse en el
    repositorio.
4.  Diferenciar hechos observados, inferencias y decisiones pendientes.
5.  No ejecutar acciones destructivas ni externas sin autorización.
6.  No imponer un stack tecnológico.
7.  No sobrearquitecturar ni crear agentes, documentos o procesos
    innecesarios.
8.  Mantener trazabilidad de objetivos, tareas, cambios, validaciones y
    evidencias.
9.  Una tarea solo se completa con evidencia suficiente, no por la
    afirmación del agente.
10. Separar framework genérico de configuración específica del proyecto.
11. Mantener permisos y límites explícitos: autonomía no significa
    acceso ilimitado.
12. No continuar ante ambigüedades de alto impacto.
13. No administrar Git: ramas, worktrees, commits, push, merge, PR, tags
    y releases quedan fuera del framework.
14. La primera respuesta debe contener diagnóstico, incertidumbres y
    preguntas estrictamente necesarias. No implementar todavía.

# 2. Visión y principios

El framework coordina agentes especializados para desarrollar software
de forma **adaptativa, autónoma, controlada, recuperable, trazable,
eficiente y reusable**.

Principio fundacional:

> Una solicitud genera un objetivo de trabajo. El framework determina
> qué proceso, agentes, tareas, controles y validaciones necesita para
> alcanzar ese objetivo con el menor coste y riesgo razonables.

Principios:

-   El proceso se adapta al trabajo; no se fuerza el trabajo a un flujo
    rígido.
-   La documentación sigue al conocimiento, no al flujo.
-   Las tareas son unidades lógicas de trabajo, no unidades Git.
-   La autonomía está limitada por políticas y permisos.
-   El plan puede evolucionar durante la ejecución.
-   Estado operativo, artefactos temporales, conocimiento persistente e
    historial son conceptos separados.
-   Toda complejidad introducida debe aportar un beneficio verificable.
-   El framework administra el ciclo de trabajo de los agentes, no el
    ciclo de integración o publicación del código.

## 2.1. Idioma de interacción y documentación

El idioma predeterminado del framework es el **español castellano**. La
interacción con el usuario y toda documentación, plan, informe, resumen,
comentario explicativo o contenido generado deben redactarse en español
castellano, salvo que el usuario solicite expresamente otro idioma.
Se mantienen en su forma original los identificadores técnicos, nombres
propios, comandos, rutas, código y cadenas de interfaz que deban coincidir
literalmente con OpenCode o con el proyecto. Una petición de otro idioma
se limita a la respuesta o al artefacto solicitado y no cambia la
preferencia predeterminada.

Este requisito es transversal: debe aparecer en las instrucciones y
habilidades instaladas y aplicarse a las respuestas de los agentes y a los
mensajes dirigidos al usuario del CLI. La documentación de uso y la
especificación del framework también se redactan en español castellano.

# 3. Referencias conceptuales

## 3.1. Principios tomados de ODD

Aplicar como protocolo general:

1.  **Autorizar (Authorize):** determinar si la solicitud autoriza modificaciones.
    Consultas, investigaciones y propuestas son de solo lectura salvo
    autorización.
2.  **Explorar (Explore):** comprender código, requisitos, convenciones y contexto
    antes de actuar.
3.  **Resolver incertidumbres (Resolve uncertainty):** investigar incertidumbres concretas y
    preguntar cuando exista una decisión relevante que no pueda
    inferirse.
4.  **Clasificar (Classify):** clasificar por comprensión, riesgo, impacto y
    recuperabilidad.
5.  **Registrar (Track):** crear seguimiento persistente solo cuando el trabajo lo
    justifique.
6.  **Implementar (Implement):** ejecutar unidades coherentes, con pruebas y controles
    proporcionales.
7.  **Cerrar (Close):** informar resultados, verificaciones, pendientes y
    evidencias.

Los cambios pequeños, entendidos y fácilmente recuperables pueden
resolverse directamente sin plan formal ni documentación persistente. El
trabajo sustancial debe tener un artefacto de trabajo que permita
recuperar intención, criterios, tareas y progreso.

## 3.2. Capacidades inspiradas en Kiro

Estas son capacidades conceptuales del framework, no funcionalidades
nativas que deban atribuirse automáticamente a OpenCode. Para cada una,
indicar si se implementa mediante funciones nativas de OpenCode v2,
instrucciones/prompts, plugins u otras herramientas externas, o si queda
solo como objetivo futuro.

Adoptar cuando aporten valor:

-   Agentes especializados.
-   Sesiones/contextos aislados.
-   Traspasos explícitos mediante artefactos.
-   Grafos de dependencias (DAG).
-   Ejecución secuencial o paralela.
-   Branch/join lógico para tareas independientes.
-   Loops acotados de implementación, revisión y corrección.
-   Checkpoints, pausa, reanudación y recuperación.
-   Validación basada en evidencia.
-   Permisos y límites por agente.

No crear un agente independiente para cada paso por defecto. Utilizar la
topología mínima que resuelva el trabajo.

# 4. Arquitectura conceptual

Las capas siguientes son responsabilidades, no etapas obligatorias de un
pipeline. El orquestador activa solo las capacidades necesarias.

``` text
┌────────────────────────────────────────────────────────────┐
│ 1. PROTOCOLO ODD                                            │
│ Autorizar → Explorar → Resolver incertidumbres → Clasificar│
├────────────────────────────────────────────────────────────┤
│ 2. ORQUESTADOR ADAPTATIVO                                   │
│ Clasificación · rigor · estrategia de ejecución             │
├────────────────────────────────────────────────────────────┤
│ 3. MOTOR DE EJECUCIÓN MULTIAGENTE                           │
│ Gestor de agentes · Planificador · DAG · Estado              │
│ Descubrimiento · Reevaluación · Seguridad · Conocimiento     │
├────────────────────────────────────────────────────────────┤
│ 4. VALIDACIÓN Y CIERRE                                      │
│ Pruebas · calidad · seguridad · evidencia · informe          │
├────────────────────────────────────────────────────────────┤
│ 5. CONOCIMIENTO Y OBSERVABILIDAD                            │
│ Conocimiento persistente · historial · métricas             │
└────────────────────────────────────────────────────────────┘

Entorno externo: IDE · Git · CI/CD · PR · releases · pipelines
```

## 4.1. Protocolo ODD

Interpreta la solicitud, determina autorización, explora contexto,
resuelve incertidumbres y clasifica el trabajo. Es el protocolo general
de entrada, pero no obliga a activar todas las capas posteriores.

## 4.2. Orquestador adaptativo

Decide si basta una respuesta de solo lectura, ejecución directa, plan ligero
o planificación formal multiagente. Selecciona controles y validaciones.
La clasificación inicial es una hipótesis revisable.

## 4.3. Motor de ejecución multiagente

Coordina agentes, unidades de trabajo, dependencias, concurrencia,
estado, descubrimientos, seguridad y recuperación.

## 4.4. Validación y cierre

Comprueba criterios de aceptación mediante pruebas, análisis, revisiones y
controles disponibles. Cierra con un informe verificable.

## 4.5. Conocimiento y observabilidad

Separa conocimiento reusable, datos operativos, artefactos temporales e
historial. No carga automáticamente todo el historial en el contexto.

# 5. Clasificación adaptativa y rigor

Los niveles **Ligero**, **Estándar** y **Reforzado** son una escala de
rigor definida por este framework; no son modos ni comandos nativos de
OpenCode. La urgencia o el tipo de cambio (por ejemplo, una corrección
urgente) se
evalúan por separado y no determinan por sí solos el rigor.

Evaluar inicialmente:

``` yaml
assessment:
  complexity: low | medium | high
  risk: low | medium | high
  uncertainty: low | medium | high
  architecture_impact: low | medium | high
  security_impact: low | medium | high
  scope_impact: low | medium | high
  recoverability: easy | moderate | difficult
  urgency: low | normal | high
  confidence: 0.0-1.0
```

Una baja confianza no implica automáticamente máximo rigor: primero
investigar la incertidumbre concreta.

### Ligero

Para cambios pequeños, comprendidos, acotados y fáciles de recuperar.
Usar exploración focalizada, ejecución directa, validación mínima
suficiente y normalmente sin documentación persistente. También puede
aplicarse a una corrección urgente si su riesgo e impacto son bajos.

### Estándar

Para funcionalidades pequeñas o medianas y cambios relacionados. Usar
plan ligero, tareas si aportan claridad, validaciones funcionales y
técnicas, documentación esencial y revisión proporcional.

### Reforzado

Para cambios complejos, arquitectónicos, de alto impacto, difíciles de
recuperar o con incertidumbre relevante. Usar análisis, requerimientos,
criterios de aceptación, diseño cuando corresponda, dependencias
explícitas, agentes especializados si aportan valor, revisión y
validación reforzadas y persistencia de decisiones cuando sea útil.

El rigor puede cambiar dinámicamente:

``` text
Ligero ↔ Estándar ↔ Reforzado
```

Registrar el motivo de cada reevaluación. Un cambio pequeño puede
escalar al descubrir impacto transversal; un enfoque reforzado puede
simplificarse cuando se demuestra que el cambio es local y de bajo
riesgo. La urgencia afecta la prioridad y el tiempo de respuesta, no
elimina las validaciones necesarias para el riesgo identificado.

# 6. Modelo de trabajo: objetivo, REQ, TASK y DAG

-   **Objetivo:** resultado esperado de una solicitud autorizada. No
    siempre necesita identificador persistente.
-   **REQ:** unidad funcional que agrupa alcance, criterios de
    aceptación, tareas, decisiones y evidencias cuando el trabajo lo
    justifica. No representa una rama ni un PR.
-   **TASK:** unidad ejecutable con objetivo, alcance, restricciones,
    dependencias, criterios de finalización, validaciones, estado y
    evidencias. No implica una rama, commit, agente exclusivo ni archivo
    separado.
-   **DAG:** representa dependencias reales. Debe detectar ciclos,
    identificar tareas listas, bloquear dependientes y permitir
    replanificación ante discoveries.

Una tarea dependiente solo comienza cuando sus predecesoras cumplen las
condiciones necesarias y sus resultados están disponibles.

## 6.1. Concurrencia

Política inicial recomendada por el framework: ejecución secuencial.
Esto es una regla de proceso, no un planificador nativo de OpenCode. Habilitar
paralelismo solo si las tareas son independientes, sus recursos están
aislados y existe una estrategia de consolidación implementada.

Evitar modificaciones simultáneas sobre los mismos archivos o recursos.
El paralelismo no es un objetivo en sí mismo y debe aportar beneficio
real.

``` yaml
execution:
  concurrency:
    default: sequential
    parallel_when:
      - tasks_are_independent
      - resources_are_isolated
      - consolidation_strategy_exists
  retries:
    max_attempts: 3
```

Este YAML es pseudoconfiguración del framework; OpenCode no lo interpreta
por sí solo. Solo usarlo si una herramienta del framework lo consume.

# 7. Agentes y responsabilidades

Roles reutilizables; el orquestador selecciona los necesarios y puede
combinar roles cuando sea razonable.

-   **Enrutador / orquestador:** interpreta solicitud, aplica protocolo y
    coordina.
-   **Planificador:** descompone objetivos, define criterios y dependencias.
-   **Implementador:** modifica archivos dentro del alcance y permisos.
-   **Revisor:** revisa independientemente los cambios y criterios.
-   **Probador / validador:** ejecuta pruebas y registra resultados.
-   **Responsable de seguridad:** aplica controles durante todo el ciclo.
-   **Agente de descubrimiento:** detecta información nueva, contradicciones y
    riesgos.
-   **Reevaluador:** revisa rigor, plan, dependencias y estrategia.
-   **Actualizador del conocimiento:** decide qué conocimiento persistir y qué
    artefactos actualizar.
-   **Agente de observabilidad:** consolida eventos, métricas y resultados.

### Selección dinámica

Resolver tareas simples directamente; delegar solo lo que requiera
especialización; separar contextos cuando reduzca interferencia; evitar
agentes redundantes, traspasos innecesarios y ciclos ilimitados.

### Contrato de traspaso

Transmitir objetivo, contexto relevante, alcance, restricciones,
entradas, artefactos, estado, resultado esperado, criterios de
aceptación, dependencias, bloqueos, herramientas y permisos. El receptor
no debe depender del historial conversacional completo.

# 8. Estado, checkpoints y recuperación

Separar:

1.  Estado operativo.
2.  Artefactos temporales.
3.  Conocimiento persistente.
4.  Historial de ejecución.

Ejemplo orientativo:

``` yaml
work:
  id: REQ-001
  title: "Implementar autenticación"
  status: in_progress
  assessment:
    level: standard
    complexity: medium
    risk: medium
    uncertainty: low
    confidence: 0.91
  tasks:
    - id: TASK-001
      status: completed
      dependencies: []
      evidence: [unit_tests_passed]
    - id: TASK-002
      status: in_progress
      dependencies: [TASK-001]
  execution:
    current_step: implementation
    active_agents: [backend-implementer]
    checkpoint: checkpoint-002
```

El ejemplo describe un modelo de estado conceptual, no un formato de
persistencia que OpenCode cree o mantenga automáticamente.

Crear checkpoints en límites útiles: inicio/cierre de unidades
relevantes, cambios de plan, hallazgos importantes, traspasos,
validaciones y pausas. No persistir cada interacción trivial.

La recuperación debe reanudar desde un estado consistente, identificar
tareas pendientes/completadas/bloqueadas, recuperar traspasos y evitar
repetir acciones no idempotentes sin comprobar su estado.

# 9. Discoveries y reevaluación

Los discoveries pueden aparecer en cualquier etapa.

-   **Menor:** resolver inline, sin persistencia.
-   **Relevante:** registrar con identificador y actualizar el artefacto
    afectado.
-   **Impactante:** registrar, reevaluar rigor/plan/seguridad y
    solicitar decisión humana si afecta una decisión de alto impacto.

``` text
Detectar → Evaluar impacto
             ├─ Sin impacto relevante → Resolver inline
             └─ Con impacto → Registrar → Reevaluar
                                  ├─ Requiere decisión → Pausar y preguntar
                                  └─ No requiere → Actualizar plan/DAG y continuar
```

# 10. Seguridad transversal

La seguridad acompaña todo el ciclo:

``` text
AUTHORIZE → EXPLORE → PLAN → IMPLEMENT → TEST → VALIDATE → CLOSE
```

Aplicar controles proporcionales al riesgo: dependencias, secretos,
entradas/salidas, autenticación, autorización, errores, análisis
estático, permisos y estándares pertinentes como OWASP.

El Security Guardian puede bloquear operaciones que infrinjan políticas.
Excepciones de alto impacto requieren autorización explícita. No generar
informes separados para cada cambio trivial si no aportan valor.

# 11. Validación y cierre

Usar comandos y herramientas detectados en el proyecto; no asumir
nombres.

Validaciones posibles: - Build/compilación. - Tests unitarios,
integración y funcionales. - Lint, análisis estático y type checking. -
Seguridad. - Revisión de código. - Validaciones del dominio.

Registrar comandos ejecutados, resultados observados, fallos,
advertencias, alcance y pruebas no ejecutadas. Nunca afirmar que una
prueba pasó si no se ejecutó o no se observó su resultado.

El cierre informa objetivo, alcance realizado, cambios principales,
validaciones, revisiones, discoveries, limitaciones, pendientes, riesgos
residuales y siguientes pasos.

# 12. Conocimiento y documentación adaptativa

La documentación sigue al conocimiento, no al flujo de trabajo.

Persistir decisiones arquitectónicas, restricciones, convenciones,
contratos, riesgos, discoveries relevantes y conocimiento necesario para
retomar trabajo.

No persistir información trivial, fácilmente redescubrible, duplicada,
logs completos en contexto normal ni planes temporales obsoletos.

Para trabajo sustancial, preferir un artefacto principal por objetivo
funcional que pueda incluir solicitud, alcance, criterios, diseño,
tareas, dependencias, decisiones, progreso, discoveries, evidencias y
resultado. No crear un archivo por TASK salvo necesidad demostrable.

El Knowledge Updater debe decidir si algo merece persistirse, si ya
existe, cuál es la fuente de verdad y qué artefacto debe actualizarse.
El historial no se incorpora automáticamente al contexto futuro.

# 13. Git y herramientas externas: fuera del alcance

**El framework no administra Git ni el ciclo de
integración/publicación.** Quedan fuera:

-   Crear, renombrar o eliminar ramas.
-   Crear o administrar worktrees.
-   `git add`, `commit`, `push`, `pull`, `merge` o `rebase`.
-   Tags, versionado y releases.
-   Pull requests / merge requests.
-   Resolución de conflictos mediante operaciones Git.
-   Administración de CI/CD, despliegues y pipelines.
-   Imponer GitFlow, trunk-based u otra estrategia.

No existe relación obligatoria entre REQ/TASK y ramas/commits.

Puede inspeccionar Git en modo lectura cuando aporte contexto: rama
actual, estado, diff, historial relevante y archivos modificados. Debe
respetar permisos del entorno.

Los agentes sí pueden modificar archivos del proyecto cuando exista
autorización. Excluir Git no significa que el framework sea de solo lectura.

Git, IDE, CI/CD, PR y releases pertenecen al entorno externo. El
framework entrega cambios y evidencias, pero no administra esas
herramientas.

# 14. Framework reusable e instalación optativa por proyecto

Separar el repositorio fuente reusable de los archivos instalados en
cada proyecto. La configuración global existente de OpenCode sigue
siendo el comportamiento predeterminado. Cada proyecto nuevo puede
elegir instalar o no el framework. No modificar la configuración global
ni instalar componentes globales.

El repositorio fuente puede organizar plantillas, documentación y
herramientas de instalación como resulte útil. Esa estructura fuente no
es, por sí misma, una estructura que OpenCode cargue. La instalación en
un proyecto debe utilizar las ubicaciones y formatos reconocidos por
OpenCode v2, de forma incremental y sin sobrescribir archivos existentes:

``` text
opencode-adaptive-framework/
├── templates/
├── installer/
└── docs/
```

Un proyecto que elija instalarlo puede contener, según las capacidades
que realmente vaya a utilizar:

``` text
proyecto/
├── opencode.jsonc                 # Solo ajustes locales necesarios
├── AGENTS.md                      # Instrucciones del proyecto, si se acuerda integrarlas aquí
└── .opencode/
    ├── agents/                    # Agentes Markdown v2
    ├── skills/<id>/SKILL.md       # Habilidades v2
    ├── commands/                  # Comandos Markdown v2
    └── framework/                 # Instrucciones/datos referenciados explícitamente
```

Usar solo los componentes necesarios. `opencode.jsonc` debe usar el
esquema oficial v2 e incluir referencias locales solo cuando sean
necesarias. Si ya existe configuración, integrar los cambios sin
reemplazarla ni borrar entradas. No sobrescribir `AGENTS.md`: revisar su
contenido y proponer una integración segura. Una opción es mantener las
instrucciones comunes del framework en
`.opencode/framework/AGENTS.md` y agregarlas a `instructions` en la
configuración del proyecto:

``` jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [".opencode/framework/AGENTS.md"]
}
```

Fusionar esta entrada con cualquier configuración existente, no
reemplazar el archivo completo. Los agentes deben usar los campos de v2
(por ejemplo, `agents`, `mode` y `permissions`); no copiar sintaxis
obsoleta de v1.

OpenCode combina la configuración aplicable del proyecto con la global:
los ajustes locales pueden prevalecer sobre valores coincidentes, pero
los ajustes globales no conflictivos siguen aplicando. Explicar esta
herencia; no prometer aislamiento. Si se necesita un perfil de proyecto
propio del framework, mantenerlo en un archivo local únicamente cuando
una herramienta implementada lo lea. Un YAML conceptual no configura
OpenCode por sí solo.

La instalación, actualización y desinstalación deben ser optativas,
explícitas, repetibles sin duplicaciones y limitadas al proyecto.
Preservar cambios del usuario; antes de reemplazar archivos existentes,
mostrar diferencias y solicitar autorización. No asumir todavía un
mecanismo concreto de distribución (copia, paquete o repositorio
compartido): proponerlo según el contexto.

# 15. Métricas y observabilidad

Medir, cuando los datos estén disponibles:

**Eficiencia:** tiempo total, tiempo por rigor/tarea, esperas, traspasos,
reintentos, tokens y coste estimado.

**Calidad:** tests ejecutados/superados, cobertura disponible, defectos,
rework rate, fallos posteriores y regresiones.

**Autonomía:** tareas completadas sin intervención, intervenciones
humanas, errores de coordinación, recuperaciones, conflictos de recursos
y ciclos de revisión.

**Seguridad:** hallazgos, correcciones, pendientes, operaciones
bloqueadas y excepciones autorizadas.

**Coste:** tokens por solicitud/tarea/agente, tiempo, agentes activados
y coste por objetivo.

No instrumentar métricas que no puedan recopilarse fiablemente.
Diferenciar mediciones de estimaciones.

# 16. Políticas iniciales

El siguiente YAML expresa políticas conceptuales del framework; no es
un archivo de configuración de OpenCode. Traducir solo los controles
necesarios a mecanismos v2 comprobados, como reglas `permissions`, o
indicar claramente si un control sigue siendo una instrucción no
reforzada por herramientas.

``` yaml
policy:
  authorization:
    require_explicit_authorization_for_mutations: true
    read_only_requests_never_modify_files: true
  planning:
    avoid_formal_plan_for_small_changes: true
    create_work_artifact_for_substantial_work: true
    tasks_only_when_they_add_value: true
  execution:
    default_concurrency: sequential
    parallelism_requires_resource_isolation: true
    require_bounded_retry_loops: true
  validation:
    use_project_native_commands: true
    require_evidence_for_completion: true
    disclose_unexecuted_checks: true
  security:
    apply_controls_continuously: true
    require_approval_for_high_impact_exceptions: true
  knowledge:
    persist_only_reusable_knowledge: true
    avoid_duplicate_documentation: true
    keep_execution_history_out_of_default_context: true
  git:
    management: external
    allow_read_only_inspection: true
    perform_write_operations: false
```

# 17. Procedimiento de configuración inicial

La IA debe seguir estas fases y no saltar directamente a generar
archivos.

## Fase A --- Descubrimiento

Inspeccionar estructura, instrucciones, stack, versiones, arquitectura,
versión instalada de OpenCode, configuración del proyecto, comandos de
build/test/lint/typecheck, convenciones, agentes/habilidades existentes,
permisos, documentación y mecanismos de persistencia. No leer ni
modificar el contenido de la configuración global salvo que sea
imprescindible y el usuario lo autorice; no modificarla en ningún caso
como parte de la instalación. Explicar que sus valores no conflictivos
pueden seguir aplicando. Confirmar qué capacidades existen en OpenCode
v2 y cuáles requerirían implementación adicional.

No duplicar ni reemplazar configuraciones existentes sin comprenderlas.

## Fase B --- Diagnóstico

Presentar: - Resumen del proyecto detectado. - Tecnologías y
herramientas confirmadas. - Configuraciones reutilizables. - Capacidades
faltantes. - Conflictos o duplicaciones. - Decisiones pendientes. -
Propuesta mínima.

Diferenciar hechos de inferencias.

## Fase C --- Preguntas

Preguntar solo lo que no pueda resolverse inspeccionando el entorno.
Según el caso, puede incluir permisos, paralelismo, agentes/modelos
disponibles, persistencia, límites de coste/tiempo y aprobaciones.

No formular automáticamente todas las preguntas de ejemplo.

## Fase D --- Propuesta

Presentar arquitectura adaptada, componentes reutilizados, archivos a
crear/modificar, permisos, riesgos y criterios de verificación.
Solicitar autorización antes de ejecutar cambios.

## Fase E --- Inicialización

Solo si el usuario autoriza expresamente la instalación en este proyecto,
crear o integrar los archivos locales mínimos compatibles con OpenCode
v2. Preservar archivos existentes y no tocar la configuración global.
No afirmar que estado/recuperación, DAG, planificador, seguridad u
observabilidad están implementados si solo se describen en instrucciones.
No implementar paralelismo si no se utilizará en la primera versión.
Si el usuario no elige instalar, dejar el proyecto sin cambios del
framework.

## Fase F --- Verificación

Comprobar sintaxis de configuración y frontmatter v2, referencias,
permisos, habilidades y comandos; diferenciar funciones realmente probadas de
capacidades solo documentadas. Comprobar que la configuración global no
fue modificada, que no hay duplicaciones ni sobrescrituras accidentales
y que no se introdujeron operaciones Git de escritura. Realizar una
prueba controlada de bajo riesgo si está autorizada.

## Fase G --- Entrega

Informar archivos creados/modificados, componentes configurados,
decisiones, pruebas y resultados, capacidades pendientes, limitaciones y
forma de uso. No declarar implementada una capacidad que solo esté
documentada.

# 18. Roadmap para implementación en ejecuciones separadas

El desarrollo del framework se realiza en varias ejecuciones, no en una
sola implementación extensa. Este roadmap es una secuencia inicial: la
Fase 0 lo confirma o ajusta según el repositorio, las capacidades reales
de OpenCode v2 y el alcance autorizado. No obliga a implementar todas
las fases ni las extensiones opcionales.

## 18.1. Fases sugeridas

### Fase 0 --- Descubrimiento y plan de trabajo

Seguir las Fases A-D de la sección 17. Inspeccionar primero; después
presentar diagnóstico, propuesta de MVP, decisiones pendientes y
criterios de aceptación. Crear tareas pequeñas, verificables y con
dependencias reales usando el sistema de seguimiento existente. Si no
hay uno, proponer un único artefacto de roadmap antes de crearlo.
Todavía no implementar.

**Cierre:** el usuario entiende y autoriza el alcance inicial, las
decisiones imprescindibles están resueltas o explícitamente aplazadas y
existe una lista de tareas priorizada.

### Fase 1 --- Especificación del MVP y diseño de distribución

Definir qué incluirá la primera versión y qué quedará fuera. Resolver
cómo se distribuyen los archivos fuente y cómo un proyecto opta por
instalarlos. Definir comportamiento seguro para instalación repetida,
archivos existentes, actualización y desinstalación; aclarar qué
ajustes de OpenCode v2 se fusionan y qué artefactos pertenecen al
framework. No construir todavía capacidades que solo estén en discusión.

**Cierre:** propuesta de estructura fuente y local, flujo de instalación
y política de preservación aprobados por el usuario.

### Fase 2 --- Núcleo de instrucciones y configuración v2

Crear la guía base y únicamente la configuración local necesaria para
OpenCode v2. Definir cómo se expresa el rigor Ligero/Estándar/Reforzado,
la autorización, el uso de evidencia y los límites de Git. Aplicar los
permisos v2 que correspondan y distinguir las instrucciones de los
controles técnicos efectivos.

**Cierre:** archivos válidos según el esquema v2 y sin cambios a la
configuración global.

### Fase 3 --- Agentes y habilidades esenciales

Implementar solo los agentes y habilidades que el MVP necesite, con
responsabilidades no redundantes, formatos v2 y permisos acotados.
Empezar con una topología mínima; no crear agentes para cada rol
conceptual. Validar descubrimiento y carga en OpenCode v2.

**Cierre:** cada componente tiene propósito, instrucciones y permisos
verificados; las capacidades no implementadas están identificadas.

### Fase 4 --- Instalación optativa en un proyecto

Implementar y probar el mecanismo de instalación acordado. Debe ser
explícito, limitado al proyecto, no alterar configuración global,
preservar archivos existentes y permitir cancelar ante conflictos.
Probar tanto en un proyecto sin configuración como en uno con
configuración preexistente.

**Cierre:** instalación reproducible y segura en ambos casos, con
evidencia y sin archivos inesperados.

### Fase 5 --- Actualización y desinstalación

Implementar estas operaciones solo si forman parte del alcance
aprobado. Identificar con precisión los archivos gestionados por el
framework, preservar modificaciones del usuario, mostrar conflictos y
evitar eliminar contenido ajeno.

**Cierre:** pruebas de actualización, desinstalación y preservación
aprobadas; si se aplazan, documentar el límite de soporte.

### Fase 6 --- Integraciones opcionales

Agregar una integración —por ejemplo, una habilidad o un agente revisor para
Sonar— solo si fue solicitada o aprobada y el proyecto aporta las reglas
y resultados necesarios. Tratar Sonar como fuente de verdad; no copiar
reglas variables ni afirmar análisis no ejecutados. Cada integración
opcional se implementa en una ejecución/tarea independiente.

**Cierre:** integración probada con datos disponibles o marcada con
claridad como no configurada/no ejecutada.

### Fase 7 --- Verificación integral y documentación de uso

Validar instalación, configuración, permisos, agentes, habilidades,
actualización/desinstalación si existen y el caso de no instalación.
Documentar cómo elegir la instalación para otro proyecto, limitaciones,
requisitos y comandos comprobados. No afirmar que DAG, planificador,
checkpoints, recuperación u observabilidad existen si solo se describen.

**Cierre:** criterios de aceptación aplicables comprobados, resultados
registrados y pendientes visibles.

## 18.2. Contrato de cada ejecución

Para avanzar, iniciar una nueva ejecución con un único identificador de
tarea/fase y solicitar que se trabaje solo en su alcance. Cada ejecución
debe:

1. Leer el roadmap y el estado/tareas actuales; confirmar dependencias.
2. Inspeccionar el contexto necesario sin repetir descubrimiento ya
   documentado, salvo que haya cambiado.
3. Implementar únicamente la tarea autorizada; no iniciar la siguiente
   fase ni ampliar alcance por iniciativa propia.
4. Ejecutar las verificaciones específicas de esa tarea y registrar
   evidencia, cambios, fallos y pendientes.
5. Actualizar el estado del artefacto de seguimiento autorizado.
6. Detenerse al cerrar la tarea y presentar qué tarea queda lista para
   una ejecución posterior. Si hay una decisión bloqueante, pausar y
   preguntar.

Plantilla para lanzar cada ejecución:

``` text
Continúa la implementación incremental del framework descrito en
framework-agentes-adaptativo-v3-prompt-inicial.md.

Ejecuta únicamente la tarea <ID y nombre> del roadmap/seguimiento
vigente. Revisa sus dependencias, alcance, criterios de aceptación y
estado antes de actuar. No empieces otras tareas ni fases.

Respeta OpenCode v2, la instalación optativa por proyecto, la
configuración global intacta y la preservación de archivos existentes.
Si el alcance o una decisión necesaria no está autorizado, detente y
pregunta. Al terminar, ejecuta las verificaciones de esta tarea,
registra evidencia y pendientes, actualiza el seguimiento autorizado y
resume la siguiente tarea desbloqueada sin ejecutarla.
```

No crear tareas independientes para trabajo trivial. Replanificar solo
cuando un hallazgo cambie alcance, dependencias, riesgo o criterios de
aceptación; explicar el cambio antes de continuar si es de alto impacto.

## 18.3. Puerta de verificación entre fases

Cada fase tiene una puerta de avance obligatoria. Que una fase haya sido
intentada o que sus archivos existan no significa que esté completa.
Antes de comenzar la siguiente fase, registrar y verificar:

-   **Estado:** `pendiente`, `en progreso`, `aprobada` o `bloqueada`.
-   **Criterios de cierre:** cada criterio de la fase está marcado como
    cumplido o pendiente.
-   **Pruebas/validaciones:** comandos o comprobaciones aplicables,
    resultado observado y alcance. Si no aplica una prueba automatizada,
    explicar cómo se verificó el entregable.
-   **Evidencia:** archivos revisados, resultados de pruebas u otra
    evidencia reproducible; no basta con la afirmación de que se terminó.
-   **Pendientes y riesgos:** fallos, limitaciones, decisiones y
    elementos aplazados claramente registrados.
-   **Autorización:** el usuario aprueba continuar cuando la fase
    requiera una decisión o autorización; la aprobación técnica no
    sustituye el consentimiento requerido.

Formato mínimo de registro por fase:

``` text
Fase: <número y nombre>
Estado: <pendiente | en progreso | aprobada | bloqueada>
Criterios: <cumplidos / total; detalle de pendientes>
Validaciones: <qué se comprobó y resultado observado>
Evidencia: <rutas o referencias>
Pendientes/riesgos: <lista o ninguno>
Decisión: <continuar | corregir | esperar autorización>
```

Solo se puede iniciar la fase siguiente cuando la fase actual esté
`aprobada`: todos sus criterios de cierre están cumplidos, las
validaciones aplicables tienen resultado satisfactorio y no quedan
bloqueos. Si una validación falla, el estado es `bloqueada` hasta
corregir y volver a verificar. No marcar como aprobadas pruebas que no
se ejecutaron; identificarlas como no ejecutadas y justificarlo. Si el
alcance aprobado aplaza un criterio, registrar la excepción y obtener
autorización antes de cerrar la fase.

## 18.4. Backlog inicial aprobado

Este backlog parte del descubrimiento del workspace realizado el
2026-11-06: contiene únicamente esta especificación, sin código fuente,
configuración de OpenCode ni un gestor de tareas de proyecto. El usuario
confirmó que el repositorio fuente del framework debe iniciarse en este
workspace y aprobó el MVP de la sección 18.1. La configuración global
de OpenCode queda fuera del alcance.

**Registro de puerta:** Fase 0 `aprobada`. Criterios cumplidos: workspace
inspeccionado; destino confirmado; MVP y backlog inicial aprobados por el
usuario. Validación: inspección de solo lectura de archivos, configuración
y manifiestos del workspace. Resultado: solo se encontró este documento;
no hay código ni configuración de proyecto que reutilizar.

| ID | Tarea | Estado | Depende de | Criterio principal de cierre |
|---|---|---|---|---|
| FW-01 | Comparar y proponer el modelo de distribución e instalación optativa | completada | — | Alternativas comparadas; runtime y distribución elegidos; límites de alcance definidos; decisiones detalladas de conflictos/ciclo de vida asignadas a FW-03; decisión del usuario registrada. |
| FW-02 | Definir estructura fuente, archivos locales v2 y límites de propiedad | completada | FW-01 | Estructura aprobada; archivos generados identificables y sin colisión o sobrescritura silenciosa. |
| FW-03 | Especificar instalación repetible, actualización y desinstalación seguras | completada | FW-01, FW-02 | Reglas de preservación, conflictos, cancelación y eliminación aprobadas. |
| FW-04 | Crear las instrucciones y configuración mínima de OpenCode v2 | completada | FW-02 | Plantillas revisadas contra el esquema v2 y criterios de autorización/evidencia/Git. |
| FW-05 | Añadir una habilidad general y un agente revisor de solo lectura | completada | FW-04 | Formatos, descubrimiento y permisos verificados en OpenCode v2. |
| FW-06 | Implementar el instalador optativo y su ciclo de vida aprobado | completada | FW-03, FW-04, FW-05 | Instalación, actualización y desinstalación probadas sin tocar configuración global ni archivos ajenos. |
| FW-07 | Ejecutar verificación integral y documentar el uso | completada | FW-06 | Pruebas registradas; guía probada en proyecto vacío y con configuración preexistente. |

La integración Sonar queda como extensión opcional fuera del MVP; no
bloquea su cierre. Cada tarea se ejecuta por separado, actualiza este
backlog con estado y evidencia y respeta la puerta de verificación de
la sección 18.3. No iniciar una tarea pendiente hasta que sus
dependencias estén aprobadas.

**Cierre FW-01:** se eligió un CLI Node.js pequeño, sin dependencias
instaladas en los proyectos destino. El usuario acepta que el runtime
Node.js sea requisito para ejecutar el instalador. La distribución
mantiene las plantillas y el CLI en el repositorio fuente y requiere una
invocación explícita que apunte al proyecto elegido; el alcance no
incluye cambios globales. La política detallada para conflictos,
actualización y desinstalación se especificará en FW-03. No se
modificó código ni se requirieron pruebas automatizadas en esta tarea de
diseño. Evidencia: decisión explícita del usuario en la conversación.
FW-02 fue la siguiente tarea desbloqueada y se completó después.

**Diseño FW-02 aprobado:** organizar el
repositorio fuente con `bin/` para el ejecutable, `src/installer/` para
la lógica, `templates/project/.opencode/` para las plantillas v2,
`test/fixtures/` para proyectos de prueba y `docs/` para guía y
especificación. No instalar archivos del CLI ni dependencias en los
proyectos destino.

La instalación generaría solo estos artefactos, todos identificables
como propiedad del framework:

``` text
<proyecto>/
└── .opencode/
    ├── opencode.jsonc                       # Añade instructions al archivo local
    ├── framework/
    │   ├── AGENTS.md                        # Instrucciones base referenciadas
    │   └── manifest.json                    # Inventario/metadatos de archivos gestionados
    ├── agents/adaptive-framework/reviewer.md # Agente subagent de solo lectura
    └── skills/adaptive-framework-workflow/
        └── SKILL.md                         # Habilidad general del framework
```

La configuración local agrega `".opencode/framework/AGENTS.md"` a
`instructions`; no crea ni sobrescribe `AGENTS.md` en la raíz y no
cambia el agente primario. El agente usa un ID namespaced para evitar
colisiones; la habilidad usa un ID único. Si ya existe
`.opencode/opencode.jsonc`, se debe preservar y fusionar `instructions`
sin descartar comentarios, claves o entradas existentes. Si una ruta de
destino ya existe con contenido ajeno, la instalación no la reemplaza:
informa el conflicto y pide una decisión. El manifiesto registra las
rutas propiedad del framework para soportar el ciclo de vida; las
reglas exactas de actualización y desinstalación se especificarán en
FW-03.

**Cierre FW-02:** el usuario aprobó la estructura y los límites de
propiedad descritos arriba. Revisión: ubicaciones y formatos
contrastados con la documentación oficial de OpenCode v2 para
configuración, agentes, habilidades e instrucciones. Resultado: estructura
fuente separada de los destinos del instalador; configuración generada
en scope local `.opencode`; instrucciones enlazadas mediante
`instructions`; sin edición del `AGENTS.md` raíz ni del agente primario;
colisiones deben detenerse y solicitar decisión. No se crearon archivos
de implementación en esta tarea de diseño y no aplican pruebas
automatizadas. Evidencia: aprobación explícita del usuario en la
conversación y documentación v2 consultada. Siguiente tarea desbloqueada:
FW-03, especificar reglas detalladas de instalación repetible,
actualización y desinstalación; iniciada en esta ejecución.

**Política FW-03 aprobada:** aplicar las siguientes reglas de
ciclo de vida:

- La instalación es siempre explícita para un directorio de proyecto
  elegido por el usuario. Antes de escribir, validar la ruta destino,
  mostrar el plan de archivos y detenerse si alguna ruta sale del
  proyecto o cruza un enlace simbólico inesperado.
- Ejecutar primero una prevalidación completa. Si encuentra conflicto,
  configuración inválida o manifiesto ausente/dañado en una instalación
  previa, no hacer cambios parciales: informar el problema y detenerse.
- Crear archivos solo si no existen. El manifiesto enumera cada archivo
  gestionado, versión del framework y hash del contenido instalado;
  para la configuración compartida, registra también la entrada
  `instructions` que agregó el framework. Escribir el manifiesto al final
  de una instalación validada.
- Repetir la misma instalación sin cambios debe ser idempotente. Nunca
  sobrescribir un archivo no registrado como propio del framework.
- En una actualización, reemplazar un archivo gestionado solo si su
  contenido actual coincide con el hash que el manifiesto registró como
  última versión instalada. Si el usuario lo modificó, preservar el
  archivo y detenerse con un conflicto explícito; no ofrecer un
  sobrescrito forzado silencioso.
- En desinstalación, borrar solo los archivos gestionados que sigan
  coincidiendo con sus hashes registrados. Preservar archivos
  modificados y la configuración ajena. Quitar únicamente la entrada
  `instructions` propiedad del framework; si la configuración compartida
  cambió y no se puede retirar la entrada de manera segura, preservarla
  y reportar el residuo.
- En cada operación, preparar y validar todos los cambios antes de
  escribir; ante error durante la escritura, restaurar copias de
  seguridad de los archivos afectados e informar claramente cualquier
  fallo de reversión. No ejecutar shell, Git ni escribir en configuración
  global.

El usuario eligió incorporar un parser JSONC como dependencia interna
del propio framework para fusionar/retirar `instructions` preservando
comentarios y claves. No se instalarán dependencias en los proyectos
destino.

**Cierre FW-03:** el usuario aprobó la política de ciclo de vida y
eligió usar un parser JSONC como dependencia interna del CLI, para
fusionar y retirar la entrada `instructions` sin perder comentarios ni
claves. No se instalarán dependencias en los proyectos destino. El CLI
debe prevalidar, mostrar el plan y detenerse ante conflictos;
preservar archivos modificados; actualizar/eliminar solo archivos cuya
propiedad e integridad coincidan con el manifiesto; y reportar cualquier
residuo o fallo de reversión. No se creó código en esta tarea de diseño y
no aplican pruebas automatizadas. Evidencia: aprobación explícita del
usuario en la conversación y política registrada arriba. Siguiente tarea
desbloqueada: FW-04, crear instrucciones y configuración mínima de
OpenCode v2; no iniciada en esta ejecución.

**Implementación FW-04:** plantillas de instrucciones y configuración
local creadas en `templates/project/.opencode/`. La configuración
referencia `.opencode/framework/AGENTS.md` mediante `instructions` y
define permisos de proyecto con sintaxis V2: shell pregunta por defecto,
las órdenes Git se deniegan salvo una lista de inspecciones de solo
lectura. Incluye una nota de que las reglas efectivas también dependen
de configuración global/sistema. Las instrucciones cubren autorización,
rigor, convenciones del proyecto, evidencia, límites de Git y la
diferencia entre principios y capacidades realmente implementadas.
El entorno disponible reportó `opencode v2.2.5`.

Validaciones: Node.js parseó la configuración tras retirar su único
comentario JSONC; se comprobó la presencia del esquema, la referencia
local, la forma de reglas `action/resource/effect`, el orden de
denegación Git/excepciones de lectura y la existencia del archivo
referenciado. Se contrastaron los campos con el esquema y la
documentación oficiales V2. Resultado: correcto. No se ejecutó OpenCode
para probar la carga efectiva en una sesión; queda como limitación para
FW-07. Evidencia: archivos de plantilla y resultado de validación local;
documentación v2 consultada.

**Puerta FW-04:** `aprobada`. La protección de permisos de proyecto no
es una barrera absoluta si reglas globales/sistema de mayor prioridad la
alteran. Siguiente tarea desbloqueada: FW-05, crear la habilidad general y el
agente revisor de solo lectura; completada en la siguiente ejecución.

**Implementación FW-05:** agregada la habilidad general
`adaptive-framework-workflow` y el agente `adaptive-framework/reviewer`
en las rutas aprobadas de `.opencode/`. La habilidad cubre la adaptación del
rigor, autorización, planificación proporcional, ejecución acotada,
validación con evidencia y traspaso. El revisor es `mode: subagent` y
aplica denegación general con excepciones explícitas solo para `read`,
`glob` y `grep`; edición, shell y lanzamiento de otros agentes quedan
denegados.

Validaciones: se comprobó el frontmatter, el nombre/descripción de la
habilidad, el modo y reglas del agente. `opencode debug agents`, ejecutado
desde el proyecto de plantillas con OpenCode v2.2.5, descubrió
`adaptive-framework/reviewer` y mostró sus permisos efectivos con las
reglas denegatorias del agente después de las reglas globales/proyecto.
La habilidad usa la ruta de proyecto `.opencode/skills/<id>/SKILL.md` y
frontmatter documentados para v2. No se inició una generación de modelo
ni una sesión interactiva para probar su carga bajo demanda; se reserva
esa comprobación para FW-07. Resultado: comprobaciones estáticas y
descubrimiento del agente satisfactorios; carga interactiva de la habilidad
pendiente.

**Puerta FW-05:** `aprobada` para los criterios de plantilla y descubrimiento
configurable. La validación interactiva de la habilidad queda pendiente en
FW-07, no bloquea esta tarea de plantillas. Evidencia: archivos
generados, validación Node.js y salida de `opencode debug agents`.
Siguiente tarea desbloqueada: FW-06, implementar el CLI e instalación
optativa; no iniciada en esta ejecución.

**Implementación FW-06:** creado un CLI Node.js con comandos `install`,
`update` y `uninstall`, destino explícito obligatorio y previsualización
por defecto; `--apply` es necesario para escribir. El instalador fusiona
JSONC preservando configuración y comentarios, registra hashes en un
manifiesto, valida rutas y enlaces simbólicos, detiene conflictos y
modificaciones de archivos gestionados, y revierte escrituras previas si
una escritura posterior falla. No instala dependencias en el proyecto
destino ni accede a la configuración global. La lógica está en
`src/installer.js`, la interfaz en `bin/framework.js` y las pruebas en
`test/installer.test.js`.

**Validación FW-06:** `npm test` finalizó correctamente: 12 pruebas
aprobadas, 0 fallidas. La suite cubre instalación inicial e idempotente,
fusión y preservación de JSONC, colisiones, actualización y detección de
modificaciones, desinstalación con residuos preservados, prevalidación
de enlaces simbólicos, reversión tras un fallo de escritura, integridad
del manifiesto y CLI en modo previsualización/aplicación. Las operaciones se
probaron sobre proyectos temporales; no se instaló el framework en este
workspace. La comprobación interactiva de OpenCode y la guía de uso
quedan para FW-07.

**Puerta FW-06:** `aprobada`. Criterios cumplidos: ciclo de vida con
previsualización y confirmación explícita; configuración local JSONC
preservada; propiedad de archivos verificada por hashes; conflictos,
enlaces simbólicos y reversión cubiertos por pruebas; sin cambios globales ni
instalación real en el workspace. Evidencia: suite `npm test` (12/12).
Siguiente tarea desbloqueada: FW-07, verificación integral y documentación
de uso.

**Implementación FW-07:** se añadió `README.md` con requisitos, preparación
del CLI, instalación optativa, verificación con OpenCode, actualización,
desinstalación y pruebas. Los ejemplos usan PowerShell y requieren revisar
la previsualización antes de confirmar con `--apply`.

**Validación FW-07:** `npm test` pasó con 12 pruebas aprobadas y 0 fallidas.
Además, se ejecutó el flujo documentado de instalación, actualización y
desinstalación (previsualización y aplicación) en dos proyectos temporales:
uno vacío y otro con `opencode.jsonc` preexistente. En ambos OpenCode
v2.2.5 (`opencode debug agents --standalone`) descubrió
`adaptive-framework/reviewer`. En el caso preconfigurado se conservaron
comentarios, modelo e instrucciones ajenas durante la instalación y
desinstalación. Los proyectos temporales se limpiaron; no se instaló el
framework en este workspace ni se modificó configuración global.

**Puerta FW-07:** `aprobada` según los criterios registrados: pruebas
automatizadas y guía verificadas en ambos tipos de proyecto. Limitación
residual: no se inició una generación interactiva para comprobar la carga
bajo demanda de la habilidad; se validó su ubicación instalada, pero no su
activación en una conversación de modelo. Evidencia: `README.md`, suite
`npm test` (12/12) y prueba de integración local con OpenCode v2.2.5.
Todas las tareas del MVP quedan completadas.

**Requisito transversal incorporado tras el MVP:** durante la revisión
posterior a FW-07 se detectó una omisión importante: no se había
especificado el idioma de la interacción ni de la documentación generada.
El diseño y las plantillas iniciales estaban en inglés, por lo que el
framework no garantizaba una experiencia en español castellano. Se
incorpora ahora como requisito predeterminado y criterio transversal de
aceptación: interacción y documentación en español castellano; se
mantienen los identificadores, comandos, rutas, código y nombres propios
que deban conservar su forma literal. La preferencia puede cambiar si el
usuario solicita expresamente otro idioma para un alcance concreto.
Evidencia de aplicación: política en esta especificación, instrucciones y
habilidad actualizada, agente revisor traducido, mensajes del CLI y errores
del instalador en español, README actualizado y pruebas del texto de
salida. Verificación complementaria: `npm test` pasó con 14 pruebas
aprobadas y 0 fallidas; OpenCode v2 descubrió el agente revisor y mostró
su descripción en castellano en un proyecto temporal. El CLI se comprobó
con `--help` y con una previsualización, sin escribir en este workspace.
Esta omisión se considera corregida; no altera la decisión de no modificar
la configuración global.

# 19. Criterios de aceptación

La configuración es aceptable cuando:

1.  ODD se aplica a las solicitudes.
2.  Las solicitudes de solo lectura no modifican archivos.
3.  El rigor se clasifica y puede reevaluarse.
4.  Los cambios pequeños no generan burocracia innecesaria.
5.  El trabajo sustancial puede planificarse y trazarse.
6.  Tareas y dependencias se representan correctamente.
7.  Si se implementa un planificador, respeta dependencias y límites de
    concurrencia; no se declara implementado si solo está descrito.
8.  Los traspasos contienen contexto suficiente.
9.  Si se implementa persistencia/recuperación, permite reanudar desde
    un estado consistente; no se declara implementada si solo está
    descrita.
10. Las validaciones aportan evidencia.
11. Seguridad y permisos se aplican transversalmente mediante controles
    implementados; las instrucciones por sí solas no se presentan como
    enforcement técnico.
12. El conocimiento se actualiza selectivamente.
13. La observabilidad no contamina el contexto operativo.
14. No se administran ramas, worktrees, commits, push, merge, PR, tags
    ni releases.
15. La configuración específica está separada del núcleo reusable.
16. La instalación del framework es opcional por proyecto; sin
    instalación, se conserva el comportamiento global predeterminado.
17. La instalación, si se elige, solo modifica archivos locales
    autorizados, preserva los existentes y no modifica la configuración
    global.
18. Los archivos generados siguen formatos y ubicaciones soportados por
    OpenCode v2 y se validan contra su esquema vigente.
19. La interacción con el usuario y la documentación generada se redactan
    en español castellano por defecto, con excepción de identificadores,
    comandos, rutas, código y nombres propios que deban conservar su forma
    literal; se respeta una petición explícita de otro idioma para un
    alcance concreto.

# 20. Fuera de alcance explícito

No implementar en el núcleo: GitFlow, ramas por REQ/TASK, worktrees
administrados, Commit Manager, push/merge/rebase, PR/MR, versionado,
releases, CI/CD, despliegues, agentes para operaciones triviales,
documentación obligatoria por etapa, paralelismo por defecto ni
aprobación humana para cada acción de bajo riesgo.

Estas capacidades pertenecen a herramientas externas o extensiones
futuras y solo podrán incorporarse mediante una decisión explícita de
alcance.

# 21. Decisiones abiertas

No asumir sin inspección o consulta cuando sea relevante:

-   Runtime y mecanismo definitivo de ejecución.
-   Formato y ubicación del estado.
-   Persistencia de conocimiento.
-   Distribución, actualización y desinstalación del framework por
    proyecto.
-   Aislamiento para paralelismo futuro.
-   Modelos disponibles y selección.
-   Límites de tokens, coste, tiempo y reintentos.
-   Aprobaciones por tipo de operación.
-   Formato de artefactos de trabajo.
-   Instalación, actualización y diagnóstico.
-   Compatibilidad entre versiones del framework y perfiles.

Distinguir lo imprescindible para la primera versión del framework de
lo que puede aplazarse. La versión del framework y la versión mayor de
OpenCode son versiones distintas; no usar "V1" sin indicar a cuál se
refiere. La compatibilidad objetivo de este documento es OpenCode v2.

# 22. Instrucción final

Comienza por la **Fase A --- Descubrimiento**. No generes inmediatamente
toda la arquitectura ni todos los archivos. Inspecciona el entorno real,
determina qué existe, qué puede reutilizarse y qué falta. Presenta un
diagnóstico y una propuesta incremental.

**Si algo no está claro, pregunta antes de asumir. No modifiques
archivos hasta obtener autorización suficiente.**

El objetivo no es construir la mayor cantidad posible de agentes o
automatizaciones, sino el sistema más simple que permita desarrollar
software con autonomía controlada, calidad verificable, trazabilidad y
recuperación.
