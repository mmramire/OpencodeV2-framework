# Framework adaptativo para OpenCode

Framework opcional y local al proyecto para OpenCode v2. La configuración
global de OpenCode no se modifica. Cada proyecto se instala explícitamente
indicando su ruta.

## Idioma

Las instrucciones instaladas establecen el español castellano como idioma
predeterminado para la interacción con el usuario y para la documentación,
los planes, los informes y el contenido generado. Se conservan sin traducir
los identificadores técnicos, comandos, rutas, código y nombres propios que
deban coincidir literalmente con OpenCode o con el proyecto. El usuario puede
pedir expresamente otro idioma para una respuesta o artefacto concreto.

## Requisitos

- Node.js 20 o posterior.
- OpenCode v2 para usar y verificar los archivos generados.

El proyecto destino no necesita Node.js ni dependencias propias del framework;
Node.js se requiere únicamente para ejecutar el CLI desde este repositorio.

## Preparar el CLI

Desde la carpeta del repositorio del framework, instala sus dependencias con
el comando común a las tres terminales:

```text
npm ci
```

Mantén este repositorio disponible cuando necesites instalar o actualizar el
framework en otros proyectos. Define la variable `framework` con la ruta
absoluta de la carpeta del repositorio, usando el formato correspondiente a
la terminal:

**CMD**

```bat
set "framework=%CD%"
```

**PowerShell**

```powershell
$framework = (Get-Location).Path
```

**Git Bash / MSYS2**

```bash
framework="$(pwd -W)"
```

En CMD, estas variables duran mientras la ventana siga abierta. En PowerShell
y Git Bash/MSYS2, duran mientras siga abierta la sesión de terminal.

## Instalar en un proyecto

Primero genera una previsualización, que no escribe archivos:

**CMD**

```bat
set "target=C:\ruta\al\proyecto"
node "%framework%\bin\framework.js" install --target "%target%"
```

**PowerShell**

```powershell
$target = "C:\ruta\al\proyecto"
node "$framework\bin\framework.js" install --target "$target"
```

**Git Bash / MSYS2**

```bash
target="C:/ruta/al/proyecto"
node "$framework/bin/framework.js" install --target "$target"
```

Revisa el destino y las operaciones mostradas. Para aplicarlas explícitamente:

**CMD**

```bat
node "%framework%\bin\framework.js" install --target "%target%" --apply
```

**PowerShell**

```powershell
node "$framework\bin\framework.js" install --target "$target" --apply
```

**Git Bash / MSYS2**

```bash
node "$framework/bin/framework.js" install --target "$target" --apply
```

Reemplaza `C:\ruta\al\proyecto` (o su equivalente con `/` en Git Bash/MSYS2)
por la ruta real del proyecto destino. La instalación crea los archivos del
framework bajo la carpeta `.opencode` del destino.
Si el proyecto ya tiene `.opencode\opencode.jsonc`, el instalador agrega sus
entradas conservando comentarios, claves y valores existentes. Ante una
colisión o configuración inválida, se detiene sin aplicar cambios. El CLI no
crea ni modifica `AGENTS.md` en la raíz del proyecto.

## Verificar la instalación

Los archivos instalados son:

- `.opencode/framework/AGENTS.md`: instrucciones del framework.
- `.opencode/agents/adaptive-framework/reviewer.md`: agente revisor.
- `.opencode/skills/adaptive-framework-workflow/SKILL.md`: habilidad de flujo de trabajo.
- `.opencode/opencode.jsonc`: configuración local fusionada.
- `.opencode/framework/manifest.json`: propiedad e integridad de archivos.

Para comprobar que OpenCode descubre el agente del proyecto:

**CMD**

```bat
cd /d "%target%"
opencode debug agents --standalone
```

**PowerShell**

```powershell
Push-Location $target
try {
    opencode debug agents --standalone
} finally {
    Pop-Location
}
```

**Git Bash / MSYS2**

```bash
(
  cd "$(cygpath -u "$target")"
  opencode debug agents --standalone
)
```

La salida debe incluir `adaptive-framework/reviewer`. La habilidad queda disponible
bajo `.opencode/skills/` para carga bajo demanda. La configuración del proyecto
se combina con las configuraciones globales o de sistema; este instalador no
altera esas configuraciones ni garantiza aislamiento frente a ellas.

Para comprobar en la conversación que OpenCode está aplicando las instrucciones
del framework, abre el proyecto destino en OpenCode y copia y pega este mensaje:

```text
Antes de hacer cambios, resume las instrucciones de idioma y las principales
restricciones que debes seguir en este proyecto. Indica también de qué archivo
del proyecto proceden esas instrucciones.
```

La respuesta debe indicar el español castellano como idioma predeterminado,
resumir restricciones del framework (por ejemplo, inspeccionar el proyecto
antes de cambiarlo y no realizar operaciones destructivas fuera del alcance
autorizado) y señalar `.opencode/framework/AGENTS.md`. Si acabas de instalar el
framework con OpenCode abierto, reinicia la sesión desde la carpeta del proyecto
y repite la prueba. Esta comprobación es una verificación práctica, no garantiza
que las instrucciones globales o de sistema no se combinen con las del proyecto.

## Actualizar o desinstalar

Ambas operaciones también muestran primero una previsualización:

**CMD**

```bat
node "%framework%\bin\framework.js" update --target "%target%"
node "%framework%\bin\framework.js" update --target "%target%" --apply

node "%framework%\bin\framework.js" uninstall --target "%target%"
node "%framework%\bin\framework.js" uninstall --target "%target%" --apply
```

**PowerShell**

```powershell
node "$framework\bin\framework.js" update --target "$target"
node "$framework\bin\framework.js" update --target "$target" --apply

node "$framework\bin\framework.js" uninstall --target "$target"
node "$framework\bin\framework.js" uninstall --target "$target" --apply
```

**Git Bash / MSYS2**

```bash
node "$framework/bin/framework.js" update --target "$target"
node "$framework/bin/framework.js" update --target "$target" --apply

node "$framework/bin/framework.js" uninstall --target "$target"
node "$framework/bin/framework.js" uninstall --target "$target" --apply
```

Una actualización se detiene si un archivo gestionado fue modificado desde la
última instalación. La desinstalación elimina solo archivos intactos; preserva
los modificados y conserva un manifiesto si quedan residuos que requieren
atención. No hay opción de sobrescritura forzada.

## Pruebas del framework

Desde la raíz de este repositorio, ejecuta en cualquiera de las tres
terminales:

```text
npm test
```

La suite automatizada cubre instalación, configuración JSONC preexistente,
actualización, desinstalación, conflictos, rutas con enlaces simbólicos,
reversión de cambios y el modo de previsualización del CLI.
