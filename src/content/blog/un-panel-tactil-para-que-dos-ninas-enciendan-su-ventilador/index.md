El cuarto de mis hijas tiene un ventilador de pared. Lo convertí en inteligente metiéndole unos relés y conectándolo a Home Assistant, y funcionó perfecto: desde el teléfono podía encenderlo, apagarlo y cambiarle la velocidad.

El problema apareció después, y no era técnico. **Ellas tienen cinco y seis años, y no tienen teléfono.**

Al automatizar el ventilador le había quitado los botones. Para mí era una mejora; para las dos personas que de verdad usan ese ventilador todos los días, era un aparato que había dejado de obedecerles. Cada vez que tenían calor, tenían que ir a buscar a un adulto.

Eso es un fallo de diseño, no una anécdota. Y es más común de lo que parece: se automatiza un aparato pensando en quien lo configura, no en quien lo usa.

Este es el registro de cómo se lo devolví: un panel táctil de 480 × 480 en la pared, con ESPHome y LVGL, que además acabó controlando media casa. Incluyo los tropiezos, que como siempre fueron la mitad del trabajo.

> [!abstract] En resumen
> - **El problema:** automatizar el ventilador del cuarto lo dejó sin botones, y sus usuarias tienen 5 y 6 años
> - **La alternativa descartada:** interruptores Zigbee de cuatro botones, uno por velocidad
> - **La solución:** un panel táctil de 480 × 480 con `ESP32-S3`, 16 MB de flash y 8 MB de PSRAM
> - **El software:** ESPHome con LVGL — diez páginas, sin escribir una línea de C++ para la interfaz
> - **El resultado:** ventilador, luces, colores, reloj, temperatura y su propia música, a un toque. Y les encantó
> - **Lo que más costó:** una variable de entorno heredada que impedía compilar, y un `light.turn_off` de más

---

## 🤔 Por qué una pantalla y no un interruptor

Lo primero que busqué fueron **interruptores Zigbee de cuatro botones**, uno por velocidad. Es la solución obvia, es barata y no requiere programar nada.

La descarté por cómo funciona la cabeza de un niño de cinco años.

Un interruptor de cuatro botones idénticos exige recordar **qué hace cada uno**. No hay nada en el aparato que lo diga: el botón de arriba a la izquierda es la velocidad baja porque alguien lo decidió y hay que memorizarlo. Para un adulto es trivial; para alguien que todavía está aprendiendo a leer, es un examen cada vez.

Una pantalla no exige memoria: **muestra**. Un icono de ventilador girando, la velocidad marcada en verde, el botón que ocupa media pantalla. La información está ahí, visible, y no hay que recordar nada.

Hubo un segundo motivo, más práctico: el ventilador tiene tres velocidades, oscilación y temporizador. Con cuatro botones te quedas corto enseguida. Con una pantalla, añadir una función es editar un archivo.

> [!tip] La regla que saqué de esto
> **Si el usuario no puede leer el manual, el aparato tiene que ser el manual.**

---

## 🔍 Lo que hay dentro

Estos paneles se venden montados y son una ganga por lo que traen. El mío lleva:

| Componente | Qué es |
|---|---|
| `ESP32-S3` | El cerebro: doble núcleo a 240 MHz, WiFi y Bluetooth |
| 16 MB de flash | Espacio para el firmware. LVGL ocupa lo suyo |
| **8 MB de PSRAM octal** | La clave de todo. Sin esto no hay gráficos |
| `ST7701S` | El controlador del display, por RGB paralelo |
| `GT911` | El táctil capacitivo, por I2C |
| `CH340` | El conversor USB-serie para programarlo por cable |

La PSRAM merece un párrafo. Una pantalla de 480 × 480 en color de 16 bits necesita **450 KB por cada búfer** de imagen. El ESP32-S3 tiene 320 KB de RAM interna en total: no cabe ni uno. Por eso estos paneles llevan PSRAM externa, y por eso un módulo sin ella no sirve para esto por muy potente que sea.

### Los pines, que aquí son muchos

El display no va por SPI como las pantallitas pequeñas: va por **RGB paralelo**, que significa un pin por cada bit de color. Dieciséis líneas de datos más las de sincronismo.

```yaml
display:
  - platform: st7701s
    dimensions:
      width: 480
      height: 480
    de_pin: 18
    hsync_pin: 16
    vsync_pin: 17
    pclk_pin: 21
    pclk_frequency: 12MHz
    data_pins:
      red:   [11, 12, 13, 14, 0]
      green: [8, 20, 3, 46, 9, 10]
      blue:  [4, 5, 6, 7, 15]
```

Seis bits para el verde y cinco para rojo y azul: es el formato **RGB565**, el estándar en estos controladores. El ojo humano distingue más matices de verde, así que se le da el bit extra.

Además del bus paralelo hace falta **SPI**, pero solo para la secuencia de encendido: el `ST7701S` necesita recibir unos comandos de configuración al arrancar, y después ya solo escucha el bus de datos.

> [!info] Un detalle que confunde al principio
> `update_interval: never` en el display no es un error. Con LVGL, quien decide cuándo repintar es la biblioteca gráfica, no ESPHome. Si pones un intervalo, estarás repintando la pantalla entera sin motivo.

---

## ⚡ Verificar la placa antes de escribir una línea

Esta lección la aprendí a base de perder tiempo en otro proyecto: **declarar una placa que no es la que tienes se paga caro**. En un Wemos D1 Mini llegué a tener configurado el modelo *Lite*, que tiene 1 MB de flash en vez de 4. El firmware compilaba, cargaba, y luego fallaba de formas incomprensibles.

Se comprueba en un segundo, con la placa conectada por USB:

```
esptool --port COM10 flash-id
```

Y responde con la verdad:

```
Chip type:          ESP32-S3 (QFN56) (revision v0.2)
Features:           Wi-Fi, BT 5 (LE), Dual Core, 240MHz, Embedded PSRAM 8MB
Detected flash size: 16MB
```

Ahí está todo: 16 MB de flash y 8 MB de PSRAM embebida. Eso corresponde a la variante **N16R8**, y confirma que la declaración es correcta:

```yaml
esp32:
  board: esp32-s3-devkitc-1
  variant: esp32s3
  flash_size: 16MB

psram:
  mode: octal
  speed: 80MHz
```

> [!warning] Octal contra quad
> El `mode: octal` de la PSRAM no es decorativo. Los ESP32-S3 con 8 MB usan interfaz octal; los de 2 MB, quad. **Si te equivocas, el chip no arranca** — ni siquiera llega a encender el display. Y en la salida de `esptool` aparece un `Flash type set in eFuse: quad` que se refiere a la **flash**, no a la PSRAM: son dos buses distintos y es fácil confundirse.

---

## ⚙️ Por qué ESP-IDF y no Arduino

ESPHome puede compilar con Arduino o con ESP-IDF. Para esto, **ESP-IDF no es opcional**: el soporte de PSRAM octal y de displays RGB paralelo vive ahí.

```yaml
framework:
  type: esp-idf
  sdkconfig_options:
    COMPILER_OPTIMIZATION_SIZE: y
    CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: "y"
    CONFIG_ESP32S3_DATA_CACHE_64KB: "y"
    CONFIG_ESP32S3_DATA_CACHE_LINE_64B: "y"
    CONFIG_SPIRAM_FETCH_INSTRUCTIONS: y
    CONFIG_SPIRAM_RODATA: y
```

Las dos últimas líneas son las que más se notan: mueven instrucciones y datos de solo lectura a la PSRAM, liberando la RAM interna para lo que de verdad la necesita. Las de caché aceleran los accesos a esa memoria externa, que es bastante más lenta que la interna.

---

## 🎨 Diez páginas sin escribir C++

La interfaz son **diez páginas** declaradas en YAML. LVGL es una biblioteca de C, pero ESPHome la envuelve entera: se describen los widgets y él genera el código.

| Página | Para qué |
|---|---|
| Portada | Un botón enorme para la luz principal. Lo que se ve el 90% del tiempo |
| Menú | Rejilla de iconos hacia el resto |
| Ventilador | Cuatro velocidades |
| Luces | Pasillo, baño, sala de juegos |
| Lámpara | Brillo con deslizador |
| Colores | Nueve círculos de colores |
| Reloj | Hora, día y fecha en grande |
| Temperatura | La lectura del sensor del cuarto |
| Música | Qué suena, play/pausa, volumen y parar |
| Canciones | Una lista que se rellena sola desde una carpeta |

La portada es deliberadamente simple: **un botón de 470 × 424 píxeles**. Casi la pantalla entera para una sola función.

Eso no es pereza de diseño. Un niño de cinco años no apunta con precisión: da un manotazo en la dirección aproximada de lo que quiere. Un botón que ocupa el 90% de la superficie perdona cualquier manotazo. Uno de 60 × 60 píxeles, no.

### La capa que está siempre encima

LVGL tiene un concepto muy útil llamado `top_layer`: widgets que flotan sobre todas las páginas.

```yaml
top_layer:
  widgets:
    - label:
        id: lbl_hastatus
        text: "\U000F05A9"    # icono de WiFi
        hidden: true
        align: top_right
    - label:
        id: display_time
        text: "00:00 am"
        align: top_right
```

Ahí viven la hora y el icono de conexión. El icono aparece y desaparece solo, enganchado a los eventos de la API:

```yaml
api:
  on_client_connected:
    - if:
        condition:
          lambda: 'return (0 == client_info.find("Home Assistant "));'
        then:
          - lvgl.widget.show: lbl_hastatus
```

De un vistazo sabes si el panel está hablando con Home Assistant o se quedó solo.

---

## 🏠 Cómo se entera de lo que pasa en la casa

Un panel que solo manda órdenes miente. Si enciendes la luz del pasillo desde el teléfono, el botón de la pantalla tiene que enterarse.

ESPHome lo resuelve con sensores que **leen** el estado de Home Assistant:

```yaml
binary_sensor:
  - platform: homeassistant
    id: pasillo_luz
    entity_id: light.luz_pasillo
    trigger_on_initial_state: true
    on_state:
      then:
        - if:
            condition:
              lambda: return id(pasillo_luz).state;
            then:
              - lvgl.widget.update:
                  id: luz_pasillo_boton
                  text_color: 0x00FF00
            else:
              - lvgl.widget.update:
                  id: luz_pasillo_boton
                  text_color: 0xFF0000
```

Verde encendida, rojo apagada. El `trigger_on_initial_state` es importante: sin él, el botón no sabe de qué color pintarse hasta que alguien toque algo.

Y en el otro sentido, para mandar órdenes:

```yaml
on_click:
  - homeassistant.action:
      action: light.toggle
      data:
        entity_id: light.luz_pasillo
```

> [!tip] `action`, no `service`
> Si sigues tutoriales de hace un par de años verás `homeassistant.service:` con una clave `service:` dentro. Sigue funcionando, pero está **deprecado**: ahora es `homeassistant.action:` con `action:`. Home Assistant renombró los "servicios" a "acciones" y ESPHome fue detrás.

---

## 🎵 Una lista que se actualiza sola

Las niñas querían elegir su música, no solo encenderla. Y ahí apareció el problema de fondo de cualquier panel empotrado: **el firmware es estático y el contenido no**.

Poner diez botones con diez títulos escritos en el YAML habría funcionado el primer día. Al añadir una canción, tocaría recompilar y recargar la pantalla. Eso no es una solución: es una tarea recurrente disfrazada de solución.

### Lo que no funcionó

La música la gestiona **Music Assistant**, así que lo lógico era pedirle a él la lista. Sus acciones disponibles son seis, y ninguna sirve:

- `get_queue` devuelve **solo la canción actual**, no la cola entera
- `get_library` devuelve la biblioteca **completa** —cientos de pistas de todo tipo— sin poder filtrar por lista
- No existe ninguna acción que devuelva las canciones de una lista concreta

> [!warning] Comprueba las acciones antes de diseñar
> Perdí un buen rato diseñando sobre una capacidad que daba por hecha. Las acciones de una integración se ven en *Herramientas de desarrollo → Acciones*, y probarlas ahí cuesta segundos. Hacerlo antes de decidir la arquitectura ahorra rehacerla.

### Lo que sí funcionó

La respuesta no estaba en Music Assistant sino en Home Assistant: la integración **`folder`**, que vigila una carpeta del disco y publica su contenido.

```yaml
sensor:
  - platform: folder
    folder: /media/Musica Princesas
    filter: "*.mp3"
```

Eso da un sensor con `file_list`: la lista de archivos, viva. A partir de ahí, un sensor de plantilla extrae los nombres limpios —sin ruta y sin extensión— y los expone como atributos. La pantalla lee esos atributos y pinta un botón por cada uno.

El resultado es que **el firmware no sabe ni un solo título**. Copias un archivo a la carpeta y el botón aparece. Lo borras y desaparece. Nunca más hay que recompilar.

El botón de "poner todo" tardó un poco más en alinearse. Al principio lanzaba una lista de reproducción creada a mano en Music Assistant, así que seguía sonando lo de siempre mientras los botones ya mostraban las canciones nuevas: **dos fuentes distintas contando cosas distintas**. Ahora también él lee la carpeta —Music Assistant acepta que le pases la lista de rutas—, y ya solo manda un sitio.

Y hay un efecto secundario bonito: como los botones muestran el nombre del archivo, **renombrar el MP3 cambia lo que ven las niñas**. Un archivo llamado `AUD-20221110-WA0006.mp3` no le dice nada a nadie; renombrado a `Buenos días.mp3`, sí.

### Diez botones, canciones sin límite

En 480 píxeles caben diez botones sin que dejen de ser cómodos para una mano pequeña. Con veinticinco canciones no llegan.

La solución no fue apretarlos más ni poner una lista con desplazamiento —arrastrar sin pulsar por accidente es justo lo que peor sale a esa edad—, sino **paginar**: un ayudante numérico guarda la página, la plantilla calcula el desplazamiento y dos flechas en la barra inferior cambian de página. En el centro, un indicador tipo `2 / 3`.

Los botones siguen siendo grandes, y pasar página es un gesto que una niña de cinco años ya conoce de los cuentos.

Un detalle que parece menor y no lo es: **las flechas no suman y restan sin más**. Si el ayudante va de 1 a 20 y solo hay tres páginas, pulsar "siguiente" acaba llevándote a la página 7, vacía, y para volver hay que pulsar "atrás" siete veces. Dos scripts calculan cuántas páginas hacen falta de verdad y hacen ciclo: de la última se pasa a la primera.

> [!tip] El límite de un contador no es el límite real
> Un contador con un máximo fijo no sabe cuánto contenido hay. Si ese máximo no se calcula a partir de los datos, tarde o temprano alguien se queda mirando una página en blanco sin saber cómo salir.

---

## 🕐 La hora y la fecha en español

ESPHome no trae los nombres de los días y meses en español. Se resuelven con un lambda y dos tablas:

```yaml
- lvgl.label.update:
    id: day_label
    text: !lambda |-
      static const char * const day_names[] = {
        "DOMINGO", "LUNES", "MARTES", "MIERCOLES",
        "JUEVES", "VIERNES", "SABADO"};
      return day_names[id(time_comp).now().day_of_week - 1];
```

El `- 1` es obligatorio: `day_of_week` empieza en 1, los arrays de C en 0. Sin él, el domingo se convierte en lunes y todo se corre un día.

La hora en formato de 12 horas tiene su propia trampa:

```cpp
int hour_12 = now.hour % 12;
if (hour_12 == 0) hour_12 = 12;   // medianoche y mediodía
```

Sin esa línea, las 12 del mediodía se muestran como las 0:00.

---

## 🌙 Que la pantalla sobreviva a los años

Un panel encendido las veinticuatro horas con la misma imagen acaba con esa imagen grabada. Hay tres mecanismos trabajando juntos:

**Se apaga sola.** Tras unos segundos sin tocarla, se apaga la retroiluminación y LVGL se pausa:

```yaml
lvgl:
  on_idle:
    timeout: !lambda "return (id(display_timeout).state * 1000);"
    then:
      - light.turn_off: back_light
      - switch.turn_on: switch_antiburn
      - lvgl.pause:
```

El tiempo no está fijo en el código: sale de un `number` configurable desde Home Assistant, de 10 a 180 segundos.

**Vuelve a la portada.** Si nadie la toca, regresa a la página inicial, para que al despertar siempre muestre lo mismo.

**Modo antiquemado.** Mientras está pausada, LVGL puede dibujar ruido en movimiento:

```yaml
- lvgl.pause:
    show_snow: true
```

Píxeles aleatorios que evitan que ninguna zona se quede fija. Es feo, pero está apagada y nadie lo ve.

---

## 🐛 Los tropiezos

La parte que suele faltar en los tutoriales.

### El apagado que en realidad apagaba

Quería que la pantalla brillara al 100% de día y al 40% de noche. Escribí esto:

```yaml
- hours: 18
  minutes: 0
  then:
    - light.turn_on:
        id: back_light
        brightness: 40%
    - light.turn_off: back_light     # ← esta línea
```

Y funcionó exactamente como está escrito: encendía al 40% y **apagaba a continuación**. Todas las tardes, a las seis, la pantalla se apagaba sola.

Lo que lo hace difícil de ver es que el bloque parece razonable de un vistazo. El error solo aparece si te preguntas qué hace la última línea, y llevaba meses ahí.

> [!warning] Los errores de horario no se notan
> Un fallo en el arranque salta a la primera. Un fallo programado a las 18:00 se manifiesta una vez al día, cuando probablemente no estás mirando, y es fácil atribuirlo a otra cosa.

### La fuente que estaba un piso más arriba

```yaml
- file: "fonts/materialdesignicons-webfont.ttf"
```

La carpeta `fonts/` estaba en la raíz del repositorio, pero el YAML vive en un subdirectorio, y **ESPHome resuelve las rutas relativas al archivo de configuración**, no al sitio desde donde lanzas el comando. Había que subir un nivel:

```yaml
- file: "../fonts/materialdesignicons-webfont.ttf"
```

### Dos temporizadores que no se hablaban

Había dos cuentas atrás independientes: una devolvía a la portada a los **40 segundos**, valor fijo en el código; otra apagaba la pantalla usando el número configurable, que por defecto era 45.

Mientras nadie tocara la configuración, el orden funcionaba. Pero bastaba bajar el apagado a 30 segundos para invertirlo: la pantalla se apagaba **antes** de volver a la portada, y al despertar aparecía en una página cualquiera.

La solución es que uno derive del otro:

```yaml
- if:
    condition:
      lambda: 'return id(inactivity_timer) >= (id(display_timeout).state - 5);'
```

Siempre cinco segundos antes, sea cual sea el valor. Y de paso, que solo cuente si LVGL no está en pausa: no tiene sentido recargar páginas que nadie está viendo.

### Botones invisibles: el orden importa

Los botones de la lista nacen ocultos y aparecen cuando reciben su nombre. Cargué el firmware, abrí la página y no había nada. Ni un botón.

No era un fallo del código: era el **orden**. Había subido el firmware **antes** de crear el sensor en Home Assistant. Cuando el panel arrancó y se suscribió, la entidad no existía, así que nunca recibió un valor y los botones se quedaron escondidos. El sensor se creó después, pero el panel ya no volvió a preguntar.

Se arregla reiniciando el ESP, que vuelve a suscribirse y esta vez sí encuentra la entidad.

> [!tip] La regla
> **Primero las entidades en Home Assistant, después el firmware que las lee.** Y si cambias o añades una entidad que el panel consume, reinícialo: la suscripción se hace al arrancar.

Me pasó dos veces el mismo día — la segunda al añadir el indicador de página.

### Lo que no compilaste no existe

Dos veces el mismo susto, con dos síntomas distintos y una sola causa.

Primero fue un **icono que salía como un rectángulo vacío**. Había bajado esa etiqueta de la fuente de 48 px a la de 32 para que cupiera en un botón más bajo, sin caer en que el glifo de la nota musical solo estaba declarado en la de 48.

Después fueron **las tildes**. Los nombres de las canciones empezaron a verse así:

```
Kike Pav[]n     Zen[]n     Pamp[]n     VERSI[]N
```

Al compilar una fuente, ESPHome **no mete el tipo de letra entero**: incluye solo un juego básico de caracteres, y ahí no están los acentos ni la eñe. Cada carácter ausente se dibuja como un cuadro.

```yaml
- file: "gfonts://Roboto"
  id: roboto16
  size: 16
  glyphsets:
    - GF_Latin_Core     # tildes, dieresis, ñ, ¿, ¡
```

> [!warning] En una pantalla empotrada, el alfabeto también se compila
> No hay una fuente del sistema a la que recurrir. Si un carácter no entró en el firmware, no existe — y da igual que sea una nota musical o una `ó`. Al escribir en español, **declara el juego latino desde el principio**: cuesta unos 285 KB de flash y te ahorra descubrirlo cuando ya está montado en la pared.

### El botón que reproducía otra canción

Este es el fallo más interesante, porque tenía **dos causas a la vez** y cada una bastaba para romperlo.

La primera: el script que reproduce recibía el número del botón —del 1 al 10— pero **no sabía en qué página estaba el usuario**. En la página 2, el botón 1 debía sonar la canción 11 y sonaba la 1. Se arregla pasándole también la página.

La segunda es más sutil. El sensor devuelve los archivos **en el orden que le da el sistema de ficheros**, que no es alfabético ni estable:

```
REC_0000046.wav, AUD-20221110-WA0006.mp3, REC_0000051.wav, REC_0000044.wav, ...
```

La pantalla leía los nombres en un momento y el script resolvía la ruta en otro. Si entre medias el sensor se actualizaba y el orden cambiaba, el número 7 ya no era la misma canción para los dos. **Ordenar la lista con `| sort` en ambos sitios** hace que el índice signifique lo mismo en todas partes.

> [!tip] Dos lugares que cuentan lo mismo tienen que contarlo igual
> Cuando una parte muestra una lista y otra la resuelve, no basta con que usen la misma fuente: tienen que usar el **mismo orden**. Si la fuente no lo garantiza, ordénalo tú.

### Las canciones que el filtro no veía

Copié diez canciones nuevas a la carpeta y la pantalla siguió mostrando seis. El sensor tampoco las veía, ni forzando su actualización.

No estaban perdidas: eran **`.wav`**, y el sensor filtraba `*.mp3`.

```yaml
sensor:
  - platform: folder
    folder: /media/Musica Princesas
    filter: "*"          # antes: "*.mp3"
```

Y un detalle que se me pasó al montarlo: **los sensores declarados en `configuration.yaml` no se recargan en caliente**. Cambiar el filtro no bastaba; hubo que reiniciar Home Assistant entero.

### El que costó la tarde entera: una variable de entorno

Este merece la sección más larga, porque el mensaje de error apuntaba a cualquier sitio menos al culpable.

La compilación fallaba siempre en el mismo punto, después de compilarlo todo:

```
ModuleNotFoundError: No module named 'esptool'
*** [.pioenvs/espantalla/bootloader.bin] Error 1
```

Lo primero que pensé es que la descarga se había cortado. Y algo de eso había: la carpeta de la herramienta existía pero **solo con los archivos de metadatos**, sin el programa. La borré para que se descargara de nuevo. Falló igual.

Rebuscando en el registro completo apareció la línea que lo explicaba todo, sepultada entre cientos:

```
ERROR: MSys/Mingw is not supported. Please follow the getting started guide
```

Estaba lanzando ESPHome desde **Git Bash**, y el instalador de herramientas de ESP-IDF se niega explícitamente a funcionar en ese entorno. Cambié a PowerShell. **Y siguió fallando igual.**

La razón es sutil y es la lección de verdad: PowerShell heredaba las variables de entorno del proceso que lo lanzaba, y entre ellas viajaba `MSYSTEM=MINGW64`. El instalador no comprueba qué intérprete lo ejecuta — **comprueba si esa variable existe**. Daba igual desde dónde lo llamara: la marca de Git Bash iba dentro del entorno.

```powershell
Remove-Item Env:MSYSTEM
esphome compile pantalla-esp32.yaml
```

Compiló a la primera, en veintiséis segundos.

> [!danger] El fallo que se disfrazó de éxito
> Hubo un detalle que alargó el diagnóstico más de lo necesario. La primera compilación la lancé así:
>
> ```
> esphome compile pantalla-esp32.yaml | tail -40
> ```
>
> Y el sistema informó de **éxito**. En una tubería, el código de salida es el del **último** comando: el de `tail`, que siempre triunfa. El fallo de ESPHome quedaba enmascarado.
>
> Si automatizas compilaciones, no pongas nada después de una tubería cuando te importe el resultado, o usa `set -o pipefail`.

---

## ✅ Decisiones que valió la pena tomar

**Los estilos compartidos.** Definir `header_footer` una vez y aplicarlo a todas las cabeceras evita nueve copias de los mismos ocho parámetros.

```yaml
style_definitions:
  - id: header_footer
    bg_color: 0x8A2BE2
    bg_grad_color: 0xE6E6FA
    bg_grad_dir: VER
    width: 100%
    height: 40
```

**Elegir los iconos a mano.** La fuente Material Design Icons trae más de siete mil glifos. Compilarlos todos hincharía el firmware sin sentido, así que se declara la lista concreta:

```yaml
- file: "../fonts/materialdesignicons-webfont.ttf"
  id: light48
  size: 48
  glyphs: ["\U000F0335", "\U000F0210", "\U000F0150"]
```

El precio de esta decisión es que **un icono que no esté en la lista no se dibuja**: aparece un hueco. Hay que acordarse de añadirlo al usarlo.

**Un `number` para el tiempo de apagado.** Poder ajustarlo desde Home Assistant, sin recompilar, ha resultado más útil de lo que parecía.

**No sobrecargar la interfaz.** Probé añadir una página de demostración con arcos, barras, LED, un indicador giratorio y un código QR. Todo funcionaba y quedaba vistoso, pero **no aportaba nada**: eran adornos compitiendo por la atención en una pantalla cuyas usuarias principales tienen cinco y seis años.

Los quité todos. Cuando el criterio es "¿esto ayuda a una niña a encender su ventilador?", la mitad de las ideas se caen solas.

Un widget que no responde una pregunta que alguien se hace de verdad es ruido.

**Que salir signifique parar.** Hubo un botón rojo de PARAR durante unas horas. Sobraba: si alguien sale del reproductor con el botón de menú, es que ya no quiere música. Ahora salir la detiene y hay un botón menos en pantalla. El regreso automático por inactividad, en cambio, **no** la detiene — si ponen música y se van a jugar, la pantalla se apaga y la canción sigue.

**Quitar lo que nunca se usó.** Había montado una sección con el horario de clases: seis páginas, una por día. Nunca llegué a rellenarlas, y ahí siguieron meses ocupando un botón del menú. Las borré y puse en su lugar el control de música, que sí piden a diario.

Una función a medias no es una promesa de futuro: es un botón que decepciona a quien lo pulsa.

---

## 🎯 El resultado

El firmware final ocupa poco para lo que hace:

| Recurso | Uso |
|---|---|
| RAM interna | 12,6% — 41 KB de 320 KB |
| Flash de aplicación | 20,7% — 1,69 MB de 8,13 MB |

Queda margen de sobra. La PSRAM, que es donde vive el búfer gráfico, ni se inmuta.

Y lo que importa no se mide en kilobytes: **el ventilador volvió a ser de ellas**. Lo encienden solas, le cambian la velocidad solas y ya no tienen que ir a buscar a nadie cuando tienen calor.

Les encantó, que era el único indicador que importaba. El resto —que sea local, que responda en milisegundos, que se actualice por WiFi sin desmontarlo y que no le pregunte nada a ningún servidor a diez mil kilómetros— es lo que me llevo yo.

---

## 🧭 Si vas a intentarlo

1. **Comprueba el chip con `esptool flash-id` antes de nada.** Treinta segundos que te ahorran una tarde de fallos incomprensibles.
2. **Asegúrate de que el módulo tiene PSRAM** y de declarar bien si es octal o quad. Sin ella no hay pantalla; mal declarada, no hay arranque.
3. **Usa el framework ESP-IDF.** Para RGB paralelo y PSRAM octal, Arduino no llega.
4. **Empieza por una sola página** y comprueba que se dibuja. Depurar una interfaz de diez páginas que no aparece es desesperante.
5. **Declara solo los iconos que uses**, y recuerda añadirlos a la lista cuando metas uno nuevo.
6. **Enlaza los estados en los dos sentidos** desde el principio. Un panel que no refleja lo que pasa fuera de él genera desconfianza y se deja de usar.
7. **Si la compilación falla de forma absurda, lee el registro entero.** El error real suele estar cientos de líneas antes del que te muestran.

8. **Declara el juego de caracteres completo de tus fuentes** si vas a escribir en español. Lo que no compilaste no se dibuja.
9. **Ordena cualquier lista que uses por índice** en los dos extremos: el que muestra y el que resuelve.

Y sobre todo: cuando algo falle y el mensaje no tenga sentido, sospecha del entorno antes que del código. Mi configuración era válida desde el primer intento; lo que estaba roto era el sitio desde donde la lanzaba.
