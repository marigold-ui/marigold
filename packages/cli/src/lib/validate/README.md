# `marigold validate` — wie die Validierungs-Engine funktioniert

Dieses Verzeichnis ist die komplette Implementierung von `marigold validate`. Der Befehl nimmt eine `.tsx`-Datei entgegen (typischerweise von einem LLM generierter Marigold-Code) und prüft sie auf drei Ebenen:

1. **Technisch (statisch)** — TypeScript-Kompilierung, Marigold-Props, Komposition, Barrierefreiheits-Konventionen. Läuft rein auf dem AST, ohne Browser.
2. **Räumlich (dynamisch)** — Overlap, Overflow, Responsive-Verhalten, Design-Token-Konformität. Braucht einen echten Render in einem Headless-Browser.
3. **Barrierefreiheit / a11y (dynamisch)** — axe-core, Kontrast, Tastatur-Navigation, Fokus-Sichtbarkeit, Hover/Focus-Inhalte. Braucht ebenfalls einen echten Render.

Ziel dieser Datei: Jeder, der hier etwas ändern, erweitern oder debuggen muss, soll ohne Vorwissen verstehen, **wie alles zusammenhängt** und **wo genau er ansetzen muss**.

---

## 1. Der Einstiegspunkt

Der CLI-Befehl (`packages/cli/src/commands/validate.ts` → `bin/marigold.ts`) ruft am Ende nur eine Funktion auf:

```ts
import { validate } from './lib/validate/index.js';

const report = await validate(filePath, {
  checks: ['technical', 'spatial', 'a11y'], // oder eine Teilmenge, oder 'all'
  viewport: { width: 1280, height: 720 },
});
```

`validate()` (in [`index.ts`](./index.ts)) macht drei Dinge, in dieser Reihenfolge:

1. **Technische Checks** laufen immer zuerst und synchron, ganz ohne Browser (`checkers/index.ts::runTechnicalChecks`).
2. Wenn `spatial` oder `a11y` angefragt sind **und** die technischen Checks keinen fatalen Fehler ergeben haben (TypeScript-Fehler oder ein Laufzeitfehler des Validators selbst), wird **einmal** eine Playwright/Vite-Renderumgebung aufgebaut (`spatial/renderer.ts::createRenderer`) und die Datei gerendert.
3. Auf dem gerenderten DOM laufen dann die räumlichen und a11y-Checks (`spatial/index.ts::runSpatialChecks`), alle im selben Render — es wird nicht mehrfach neu gerendert.

Am Ende werden alle gefundenen `ValidationIssue`s zu einem `ValidationReport` zusammengefasst (`buildReport` in `index.ts`) und über `format.ts` in lesbaren Text (oder JSON) gebracht.

### Wichtig: Die drei CLI-Flags sind gröber als die interne Steuerung

`--checks technical|spatial|a11y|all` steuert nur zwei Flags nach außen (`enableSpatial`, `enableA11y`), aber intern hat `spatial/index.ts` mehr Schalter (`enableResponsive`, `enableKeyboardA11y`, `enableTextSpacing`, `enableRevealed`, `enableContentHoverFocus`), die **standardmäßig von den beiden groben Flags abgeleitet werden**:

| Feiner Schalter           | Default (`??`)  | Läuft also bei CLI-Flag |
| ------------------------- | --------------- | ----------------------- |
| `enableResponsive`        | `enableSpatial` | `spatial`, `all`        |
| `enableTextSpacing`       | `enableA11y`    | `a11y`, `all`           |
| `enableRevealed`          | `enableA11y`    | `a11y`, `all`           |
| `enableContentHoverFocus` | `enableA11y`    | `a11y`, `all`           |
| `enableKeyboardA11y`      | `enableA11y`    | `a11y`, `all`           |

D. h. `--checks spatial` prüft auch Responsive-Verhalten, und `--checks a11y` prüft auch Tastatur-Navigation, Text-Spacing und Hover/Focus-Inhalte — nicht nur axe. Das ist so gewollt (diese Dinge brauchen alle denselben Render, es wäre verschwenderisch sie getrennt zu triggern), aber beim Debuggen "warum läuft Check X obwohl ich nur `--checks spatial` angegeben habe" ist genau das die Antwort.

---

## 2. Verzeichnisstruktur

```
lib/validate/
├── index.ts              orchestriert alles: technical → render → spatial/a11y → Report
├── types.ts               alle gemeinsamen Typen (ValidationIssue, ValidationReport, …)
├── format.ts               formatiert den Report als lesbaren Text (formatForLLM)
├── checkers/                statische (AST-basierte) Checks — kein Browser nötig
│   ├── index.ts              orchestriert alle statischen Checker (runTechnicalChecks)
│   ├── compiler.ts             echte TypeScript-Kompilierung der Datei
│   ├── props.ts                 Props gegen die echten Marigold-Typen prüfen
│   ├── composition.ts            Compound-Components richtig zusammengesetzt?
│   ├── accessible-name.ts         Overlays (Dialog/Drawer) brauchen einen Titel/aria-label
│   ├── required-ancestor.ts       Teile eines Compounds brauchen ihren Container
│   ├── section-header.ts          <X.Section> braucht ein header-Prop
│   ├── collection-id.ts            Collection-Items brauchen eine id
│   ├── design-system-usage.ts      erfundene/nicht-existente Komponenten erkennen
│   ├── layout-usage.ts             Flow-Layout mit nur einem Kind ist sinnlos
│   ├── table-usage.ts              Formularfelder gehören nicht in eine <Table>
│   ├── component-conventions.ts    Konventionen wie "ein primary Button pro Form"
│   └── theme-variants.ts           Prop-Werte gegen echte Theme-Varianten prüfen
├── spatial/                  dynamische (Browser-basierte) Checks
│   ├── index.ts                orchestriert alle dynamischen Checks (runSpatialChecks)
│   ├── renderer.ts               baut Vite-Dev-Server + Playwright-Browser auf/ab
│   ├── cleanup-stack.ts           generisches LIFO-Teardown für Renderer-Ressourcen
│   ├── browser-helpers.ts         DOM-Hilfsfunktionen, die in die Seite injiziert werden
│   ├── bounding-box.ts             Bounding-Boxes aller Komponenten einsammeln
│   ├── overlap.ts                  echte Überlappungen aus den Bounding-Boxes erkennen
│   ├── overflow.ts                  Text-/Inhalts-Overflow und ungewolltes Wrapping
│   ├── computed-styles.ts          berechnete CSS-Werte pro Element einsammeln
│   ├── token-compliance.ts         berechnete Styles gegen Design-Tokens abgleichen
│   ├── responsive.ts               Verhalten bei mehreren Viewport-Breiten
│   ├── aom-extractor.ts             Accessibility-Object-Model + axe-core-Audit
│   ├── non-text-contrast.ts        Kontrast von Rahmen/Flächen (WCAG 1.4.11)
│   ├── contrast.ts                  reine Farb-/Kontrast-Mathematik (kein Browser)
│   ├── focus-visible.ts             reiner Vorher/Nachher-Style-Vergleich für Fokus
│   ├── keyboard.ts                  Tab-Reihenfolge, Fokus-Fallen, Pfeiltasten-Navigation
│   ├── text-spacing.ts              WCAG 1.4.12 Text-Spacing-Override-Test
│   ├── content-on-hover-focus.ts    WCAG 1.4.13 Hover/Focus-Inhalte (Tooltip etc.)
│   └── interaction-driver.ts        öffnet Overlays generisch und lässt Checks darauf laufen
├── helpers/                  gemeinsame Hilfsmodule für Checker UND spatial-Checks
│   ├── source.ts                Datei einlesen + TS-AST parsen
│   ├── ast.ts                    kleine AST-Helfer (statischer String-Wert, Spread erkannt, …)
│   ├── jsx.ts                     Import-Statements einsammeln
│   ├── components.ts               DIE Registry: lädt @marigold/components-Typen via ts-morph
│   ├── resolve-theme.ts            findet die installierte @marigold/theme-rui
│   ├── design-tokens.ts             lädt die CSS-Custom-Properties aus dem Theme
│   └── component-locations.ts      ordnet dynamische Findings einer Zeile im Quelltext zu
├── examples/                 Fixture-Dateien (.tsx), die in Tests als Testfälle gerendert/geparst werden
├── test-support/
│   └── tmp.ts                  Hilfsfunktion, um Testdateien in ein Tmp-Verzeichnis zu schreiben
└── *.test.ts                  je eine Testdatei direkt neben der Datei, die sie testet
```

Faustregel: **jede Datei hat eine `*.test.ts`-Datei direkt daneben** (Unit-Tests) und rendernde Module haben zusätzlich eine `*.integration.test.ts` (braucht echten Chromium, überspringt sich selbst wenn keiner verfügbar ist — siehe Abschnitt 7).

---

## 3. Technische Checks (`checkers/`)

Diese Checks laufen **synchron, ohne Browser**, direkt auf dem TypeScript-AST der Datei (`ts-morph` / `typescript`-Compiler-API). Orchestriert wird das in [`checkers/index.ts`](./checkers/index.ts) → `runTechnicalChecks(filePath, themePath?)`.

### Fehler-Isolation

Jeder Checker läuft einzeln durch `safeCheck()`. Wirft ein Checker eine Exception (z. B. weil er auf eine AST-Form trifft, an die der Autor nicht gedacht hat), wird daraus **eine einzelne Warning für genau diesen Checker** — die anderen Checker laufen trotzdem weiter. Das ist Absicht: ein kaputter Checker darf nie den ganzen technischen Durchlauf lahmlegen.

### Die einzelnen Checker

| Datei                      | Prüft                                                                                                                                                                                                                                                                                                                      | Quelle der Wahrheit                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `compiler.ts`              | Führt die Datei durch einen echten, isolierten TypeScript-Compiler-Lauf (strict mode). Fängt Syntaxfehler, Typfehler, falsche Imports — alles, was `tsc` auch fangen würde.                                                                                                                                                | TypeScript selbst                                                                                   |
| `props.ts`                 | Vergleicht jedes JSX-Attribut einer Marigold-Komponente mit den echten Prop-Typen aus `helpers/components.ts`. Erkennt unbekannte Props, falsche Enum-Werte, HTML-Events statt React-Aria-Events (`onClick` statt `onPress`), DOM-Event-Objekte in value-basierten Handlern.                                               | `@marigold/components`-Typdeklarationen                                                             |
| `composition.ts`           | Prüft Compound-Components (`<Dialog><Dialog.Title>…`) auf: komplett leere Nutzung (Error), doppelte Sub-Komponenten (Warning). Ignoriert dynamische Kinder (`{children}`) und Collections (Tabs, Select — die wiederholen ihre Items by design).                                                                           | `helpers/components.ts` (welche Sub-Komponenten gibt es, ist es eine Collection?)                   |
| `accessible-name.ts`       | Overlays (Dialog, Drawer, Menu, …) brauchen einen Titel oder ein `aria-label` — sonst kann axe das zur Laufzeit gar nicht prüfen, weil das Overlay standardmäßig geschlossen ist und nie gerendert öffnet.                                                                                                                 | curated Liste + `helpers/components.ts`-Resolver                                                    |
| `required-ancestor.ts`     | Manche Bausteine dürfen nur innerhalb eines bestimmten Containers stehen (z. B. `<Radio>` nur innerhalb `<Radio.Group>`).                                                                                                                                                                                                  | schema-abgeleitet + eine kleine curated Ausnahmeliste (siehe Kommentar `REQUIRED_ANCESTOR` im File) |
| `section-header.ts`        | `<X.Section>` (Select, ComboBox, Autocomplete, TagField) verlangt laut Doku ein `header`-Prop — TypeScript selbst prüft das aus technischen Gründen nicht scharf genug.                                                                                                                                                    | curated (dokumentierte Anforderung)                                                                 |
| `collection-id.ts`         | Statisch geschriebene Collection-Items brauchen eine `id`, damit `onAction`/`onSelectionChange` sie identifizieren können.                                                                                                                                                                                                 | schema-abgeleitet                                                                                   |
| `design-system-usage.ts`   | Erkennt "halluzinierte" Komponenten — Namen, die wie eine Marigold-Komponente aussehen, aber gar nicht existieren (typisches LLM-Problem). Schlägt bei Bedarf die echte, ähnlich benannte Komponente vor.                                                                                                                  | `helpers/components.ts`-Registry                                                                    |
| `layout-usage.ts`          | Ein Flow-Layout (`Stack`, `Inline`, `Columns`, `Grid`) mit nur einem Kind macht nichts — Ausnahmen sind Wrapper wie `Inset`/`Center`, deren Zweck genau das ist.                                                                                                                                                           | curated                                                                                             |
| `table-usage.ts`           | Formularfelder gehören nicht direkt in eine `<Table>` — das ist ein Zeichen, dass die Tabelle für Formular-Layout zweckentfremdet wird.                                                                                                                                                                                    | curated                                                                                             |
| `component-conventions.ts` | Eine Sammlung kleinerer Stil-Konventionen, z. B. nur ein `variant="primary"`-Button pro Form, Platzhalter-Texte, die wie ein "lädt gerade"-Label aussehen. Nutzt denselben Origin-Resolver wie `props.ts`, damit ein gleichnamiger lokaler `<Form>`/`<Button>` nicht fälschlich als Marigold-Komponente behandelt wird.    | curated                                                                                             |
| `theme-variants.ts`        | Prüft Prop-Werte, die zwar laut TypeScript gültig sind (offener String-Typ), aber keiner echten Theme-Variante entsprechen (z. B. `size="huge"`, wenn das Theme nur `sm`/`md`/`lg` kennt). Läuft nur, wenn das Theme-Paket auf der Platte gefunden werden kann — sonst wird der Check komplett übersprungen (kein Fehler). | `*.styles.ts`-Dateien im installierten `@marigold/theme-rui`                                        |

### Wie man einen neuen technischen Checker hinzufügt

1. Neue Datei `checkers/mein-check.ts`, die eine Funktion `export const validateMeinCheck = (filePath: string): ValidationIssue[] => …` exportiert.
2. Quelle parsen mit `parseSource(filePath)` aus `helpers/source.ts` (macht den TS-AST-Aufbau einheitlich, mit vernünftigen Fehlermeldungen).
3. Neuen `IssueSource`-Wert in `types.ts` ergänzen (z. B. `'mein-check'`).
4. In `checkers/index.ts` importieren, mit `safeCheck('mein-check', 'Mein Check', () => validateMeinCheck(filePath))` in `runTechnicalChecks` einhängen und (falls sinnvoll) einen `passed`-Eintrag ergänzen.
5. Test-Datei `checkers/mein-check.test.ts` daneben anlegen — Muster: `tmpFile()` aus `test-support/tmp.ts` benutzen, um kleine Inline-Fixtures zu bauen, oder eine Fixture unter `examples/` anlegen, wenn mehrere Tests sie teilen.

**Wichtige Konvention, die sich durch alle Checker zieht:** Ein Tag gilt nur dann als "Marigold-Komponente", wenn er tatsächlich aus `@marigold/components` importiert wurde — nie rein nach Namen. Dafür gibt es `buildMarigoldTagResolver(source)` in `helpers/components.ts`. Ein lokal deklariertes `<Button>` oder ein `<Button>` aus `./ui/Button` darf NIE gegen das Marigold-Prop-Schema geprüft werden (das war mehrfach eine echte False-Positive-Quelle, siehe Git-History von `props.ts`/`composition.ts`/`component-conventions.ts`).

---

## 4. Räumliche & dynamische Checks (`spatial/`)

Diese Checks brauchen einen **echten, gerenderten DOM** — dafür wird die zu prüfende Datei tatsächlich mit React gerendert, in einem Headless-Chromium, über einen lokalen Vite-Dev-Server. Orchestriert in [`spatial/index.ts`](./spatial/index.ts) → `runSpatialChecks()`.

### 4.1 Die Render-Pipeline

```
validate/index.ts
  └─ spatial/renderer.ts :: createRenderer()      // startet EINEN Chromium-Browser
       └─ renderer.render(filePath, viewport)      // pro Datei:
            1. stageHarnessFiles()                    Harness-Dateien + Component.tsx
                                                        in ein Tmp-Verzeichnis kopieren
                                                        (harness/ liegt in packages/cli/src/harness)
            2. linkProjectModules()                   node_modules des Zielprojekts
                                                        per Symlink verfügbar machen
            3. startViteServer()                       Vite-Dev-Server auf einem
                                                        vom OS zugewiesenen Port starten
            4. browser.newContext() + page.goto()      Seite öffnen, auf
                                                        [data-validation-root="ready"] warten
            5. cleanup-stack.ts                        alles wieder abbauen (Context,
                                                        Server, Tmp-Verzeichnis), LIFO
```

Die eigentliche gerenderte Komponente kommt aus [`packages/cli/src/harness/`](../../harness/):

- `entry.tsx` — sucht einen `default`- oder `App`-Export in der Zieldatei und rendert ihn. Wartet zwei `requestAnimationFrame`-Ticks (Layout muss erst wirklich fertig sein), bevor es das `data-validation-root="ready"`-Attribut setzt, auf das Playwright wartet.
- `setup.tsx` — wickelt die Komponente in `<MarigoldProvider theme={theme}>` plus eine Error-Boundary, die Render-Fehler auf `window.__marigoldValidateRenderErrors` protokolliert statt die Seite crashen zu lassen.

### 4.2 Sicherheits-Sandbox

Die gerenderte Datei ist **nicht vertrauenswürdiger Code** (typischerweise LLM-generiert). Der Renderer (`renderer.ts`) schützt dagegen auf zwei Ebenen:

- **Netzwerk:** `page.route('**/*')` blockiert jeden HTTP(S)-Request außer zum lokalen Vite-Server; `context.routeWebSocket('**/*', ws => ws.close())` schließt zusätzlich jeden WebSocket-Versuch (reines `page.route` deckt keine WebSockets ab).
- **Dateisystem:** Vites `server.fs.deny` blockiert eine Denylist hochwertiger Ziele (`.env`, `.ssh/**`, `.aws/**`, private Keys, …) über Vites `/@fs`-Lesepfad. **Das ist eine Denylist, kein Allowlist** — der Kommentar direkt über `fs.deny` in `renderer.ts` erklärt genau, was dadurch noch NICHT abgedeckt ist und warum (Vite muss weiterhin seinen eigenen Client + die pnpm-`node_modules`-Symlinks lesen können).

Wer an der Sandbox etwas ändert, sollte diesen Kommentar in `renderer.ts` zuerst lesen — die Abwägungen dort sind bewusst getroffen, nicht vergessen.

### 4.3 Ressourcen-Aufräumen (`cleanup-stack.ts`)

Jede Ressource, die `renderer.ts` während eines Renders erzeugt (Browser-Context, Vite-Server, Tmp-Verzeichnis), wird **sofort bei Erzeugung** auf einen `CleanupStack` registriert (LIFO — zuletzt erzeugt, zuerst abgebaut). Das ist bewusst so und nicht "am Ende alles aufräumen", weil ein Timeout mitten im Aufbau sonst eine Ressource verwaist zurücklassen könnte, die erst NACH dem Timeout fertig erzeugt wurde. Siehe `cleanup-stack.test.ts` für die genauen Garantien (Reihenfolge, "alle abbauen auch wenn eine wirft", Re-Run-Sicherheit).

### 4.4 Die einzelnen dynamischen Checks

| Datei                                        | Prüft                                                                                                                                                                                                                                                                                                                                                                                            | Läuft bei                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `bounding-box.ts` + `overlap.ts`             | Sammelt die Bounding-Box jeder Marigold-Komponente ein und erkennt echte visuelle Überlappungen (keine reinen Berührungen an der Kante).                                                                                                                                                                                                                                                         | `spatial`                                  |
| `overflow.ts`                                | Erkennt Text-/Inhalts-Overflow und Zeilenumbrüche, die eigentlich nicht gewollt sind (z. B. abgeschnittener Text in einer zu kleinen Box).                                                                                                                                                                                                                                                       | `spatial`                                  |
| `computed-styles.ts` + `token-compliance.ts` | Liest die tatsächlich berechneten CSS-Werte jeder Komponente aus und vergleicht sie gegen die echten Design-Tokens aus dem Theme — z. B. eine Hex-Farbe statt eines Farb-Tokens.                                                                                                                                                                                                                 | `spatial`                                  |
| `responsive.ts`                              | Rendert bei mehreren Viewport-Breiten und prüft, ob Inhalte grundlos verschwinden, und berechnet die "Breiten-Auslastung" (wird der verfügbare Platz auf Desktop wirklich genutzt, oder bleibt das Layout im Mobil-Format hängen?).                                                                                                                                                              | `spatial` (und `enableResponsive`-Default) |
| `aom-extractor.ts`                           | Baut das Accessibility Object Model (Rollen, Namen, States) aus der Seite und lässt zusätzlich einen echten `axe-core`-Audit laufen.                                                                                                                                                                                                                                                             | `a11y`                                     |
| `non-text-contrast.ts` + `contrast.ts`       | WCAG 1.4.11 — Kontrast von Rahmen/Füllungen von UI-Komponenten (nicht Text!) gegen ihre Umgebung. `contrast.ts` ist die reine, Node-testbare Farb-Mathematik dahinter (kein Browser-Code).                                                                                                                                                                                                       | `a11y`                                     |
| `focus-visible.ts`                           | Reiner Vergleich fokussiert-vs-unfokussiert Style-Fingerabdruck (WCAG 2.4.7) — wird von `keyboard.ts` während der Tab-Traversierung benutzt, nicht separat aufgerufen.                                                                                                                                                                                                                           | (Teil von `keyboard.ts`)                   |
| `keyboard.ts`                                | Tab-Reihenfolge, unerreichbare Elemente, Fokus-Fallen (WCAG 2.1.2), Pfeiltasten-Navigation in Composite-Widgets, sichtbarer Fokusindikator.                                                                                                                                                                                                                                                      | `a11y` (`enableKeyboardA11y`-Default)      |
| `text-spacing.ts`                            | WCAG 1.4.12 — Text darf nicht abgeschnitten werden, wenn Zeilenhöhe/Buchstaben-/Wortabstand vergrößert werden.                                                                                                                                                                                                                                                                                   | `a11y` (`enableTextSpacing`-Default)       |
| `content-on-hover-focus.ts`                  | WCAG 1.4.13 — von Hover/Focus eingeblendete Inhalte (Tooltip, Popover) müssen schließbar (Escape), "hoverable" (Maus kann drauf bewegen ohne dass es verschwindet) und persistent (verschwindet nicht von selbst) sein. Kein öffentliches Tool automatisiert das — hier wird die Interaktion wirklich simuliert.                                                                                 | `a11y` (`enableContentHoverFocus`-Default) |
| `interaction-driver.ts`                      | Generischer Mechanismus: findet alle interaktiven Trigger (Menü, Dialog, Listbox, Disclosure — generisch über das ARIA-Trigger-Kontrakt, nicht über Komponentennamen), öffnet sie nacheinander, lässt einen `onOpen`-Callback (i. d. R. axe + Kontrast) auf dem enthüllten Inhalt laufen, schließt wieder. So werden auch Inhalte geprüft, die beim initialen Render noch gar nicht im DOM sind. | `a11y` (`enableRevealed`-Default)          |
| `browser-helpers.ts`                         | Keine eigene Prüfung — stellt DOM-Hilfsfunktionen (`cssPath`, `isHidden`, `focusFingerprint`, …) bereit, die per `buildInstallScript()` einmal in die Seite injiziert werden, damit jeder `page.evaluate`-Aufruf sie unter `window.__mv` wiederverwenden kann, statt sie in jedem Check neu zu definieren.                                                                                       | (Infrastruktur, kein Check)                |

### Fehler-Isolation (wie bei den technischen Checks)

`spatial/index.ts` packt **jeden einzelnen** dieser Checks in sein eigenes `try/catch`. Schlägt z. B. `extractBoundingBoxes()` fehl, wird daraus eine einzelne Warning mit `source: 'overlap-detector'` — die anderen Blöcke (Token-Compliance, Overflow, Text-Spacing, a11y, Responsive, Keyboard) laufen trotzdem weiter. Das ist erst kürzlich für den `enableSpatial`-Block nachgezogen worden, damit er genauso robust ist wie der `enableA11y`-Block direkt darunter — beim Hinzufügen eines neuen Checks hier IMMER dieses Muster übernehmen.

### Wie man einen neuen dynamischen Check hinzufügt

1. Neue Datei `spatial/mein-check.ts` mit zwei Teilen:
   - `extractMeinCheckData(page: Page): Promise<MeinCheckDatum[]>` — läuft `page.evaluate(...)` und liefert reine Daten zurück (kein `ValidationIssue` direkt aus dem Browser — das würde bedeuten, `ValidationIssue`-Typen müssten im Browser-Kontext verfügbar sein, was sie nicht sind).
   - `meinCheckToValidationIssues(data): ValidationIssue[]` — reine, Node-seitige Funktion, die die Rohdaten in Findings übersetzt. **Das ist die Funktion, die in `*.test.ts` unit-getestet wird** (kein Browser nötig) — siehe `non-text-contrast.test.ts` als Vorlage.
2. In `spatial/index.ts` importieren und im passenden Block (`enableSpatial`/`enableA11y`/eigener Schalter) mit eigenem `try/catch` einhängen, analog zu den bestehenden Blöcken.
3. Neuen `IssueSource`-Wert in `types.ts` ergänzen.
4. Wenn der Check echtes Browser-Verhalten braucht, das sich nicht sinnvoll mocken lässt: eine `*.integration.test.ts` daneben, die sich selbst überspringt, wenn kein Chromium verfügbar ist (Muster: `beforeAll` versucht einen echten Render, setzt ein `renderWorks`-Flag, jeder Test prüft `if (!renderWorks) return ctx.skip()`).

---

## 5. Gemeinsame Hilfsmodule (`helpers/`)

| Datei                    | Zweck                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source.ts`              | Einheitliches Einlesen + Parsen einer Quelldatei zu einem `ts.SourceFile`. Jeder Checker sollte hierüber gehen, nicht selbst `ts.createSourceFile` aufrufen.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `ast.ts`                 | Kleine, reine AST-Helfer, die von mehreren Checkern gebraucht werden: `staticStringValue` (String- oder Template-Literal-Wert eines JSX-Attributs, falls statisch bestimmbar), `hasSpreadAttribute`, `hasOpaqueDynamicChild`, `containsEventTargetAccess` (erkennt `param.target.value`-Zugriffe, gebunden an den konkreten Handler-Parameter).                                                                                                                                                                                                                                                |
| `jsx.ts`                 | Sammelt Import-Statements eines Files ein (ohne Alias-Auflösung — dafür siehe `components.ts::buildMarigoldTagResolver`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `components.ts`          | **Die zentrale Registry.** Lädt die echten `.d.mts`-Typdeklarationen von `@marigold/components` über `ts-morph`, einmal pro Prozess gecacht. Daraus werden abgeleitet: welche Komponenten es gibt, welche Props sie haben (inkl. bekannter String-Literal-Werte), welche Sub-Komponenten ein Compound hat, ob eine Komponente eine "Collection" ist (hat sie/eine Sub-Komponente ein `items`-Prop?). Enthält außerdem `buildMarigoldTagResolver()` — siehe Abschnitt 3, die zentrale Regel, dass ein Tag nur nach echtem Import-Ursprung als Marigold-Komponente zählt, nie nach Namen allein. |
| `resolve-theme.ts`       | Findet das Verzeichnis des installierten `@marigold/theme-rui`-Pakets (über `require.resolve` + Verifikation, dass das gefundene `package.json` wirklich zu `@marigold/theme-rui` gehört — nicht nur das nächstbeste `package.json` auf dem Pfad).                                                                                                                                                                                                                                                                                                                                             |
| `design-tokens.ts`       | Lädt die tatsächlichen CSS-Custom-Properties (Design-Tokens) aus dem installierten Theme, damit `token-compliance.ts` reale Werte statt geratener Konstanten vergleichen kann.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `component-locations.ts` | Dynamische Findings (aus `spatial/`) haben von Natur aus keine Quelltext-Zeile — sie kommen aus dem gerenderten DOM. Diese Datei ordnet sie nachträglich einer Zeile in der Originaldatei zu (per Komponentennamen-Treffer, mit Text-Fingerabdruck als Tie-Breaker bei mehreren gleichnamigen Vorkommen). Wird von `index.ts::enrichDynamicLocations` benutzt.                                                                                                                                                                                                                                 |

---

## 6. Typen & Ausgabe

### `types.ts`

Das zentrale Vokabular des ganzen Systems:

- **`ValidationIssue`** — ein einzelner Fund: `type` (technical/spatial/style/a11y), `severity` (error/warning), `source` (welcher Checker — muss hier als `IssueSource` ergänzt werden, wenn ein neuer Checker dazukommt), `component`, `message`, `suggestion`, optional `location` und `details`.
- **`ValidationReport`** — das Gesamtergebnis: `errors`/`warnings` (partitioniert nach `severity`), `passed` (Liste bestandener Checks als Klartext), `text` (fertig formatiert), `metadata` (Renderzeit, gefundene Komponenten, welche Checks liefen, Coverage, Breiten-Auslastung).
- **`ValidationCoverage`** — macht transparent, wie viel vom Code überhaupt statisch geprüft werden konnte: wie viele Enum-Prop-Werte waren statisch bestimmbar vs. dynamisch (nicht prüfbar), wie viele Spread-Attribute (`{...props}`) haben die Prop-Prüfung umgangen.

**Severity-Regel** (steht auch als Kommentar direkt bei `IssueSeverity`): `error` heißt "blockiert Korrektheit" (Typfehler, fehlende Pflicht-Props, fehlende Pflicht-Sub-Komponenten, kritische a11y-Verstöße, echte Überlappungen). `warning` heißt "wahrscheinlich verbesserungswürdig" (falsche Prop-Werte, fehlende optionale Sub-Komponenten, native statt Marigold-Komponente, ungültige Theme-Variante, Layout-Overflow). Diese Grenze ist bewusst gezogen: die Checks werden auch von automatisierten Korrekturschleifen (LLM-Agenten) benutzt, und ein `error`, der in Wahrheit ein False Positive ist, kann eine solche Schleife in eine falsche Richtung schicken. Deshalb gilt für JEDEN neuen `error`-Fund die Regel: **er muss deterministisch und False-Positive-frei sein** — im Zweifel `warning`.

### `format.ts`

`formatForLLM(report)` baut aus dem strukturierten Report den lesbaren `text`-Block (sortiert: erst nach `type`, dann `error` vor `warning`, dann alphabetisch nach Komponente). `formatValue()` darf dabei **niemals werfen**, egal was für ein `details`-Wert reinkommt (auch nicht bei bigint oder zirkulären Objekten) — das ist Teil des "throw-proof"-Vertrags des ganzen Systems (siehe Abschnitt 7).

---

## 7. Zentrale Entwurfsprinzipien

Diese Prinzipien ziehen sich durch den gesamten Code und sollten bei jeder Änderung beachtet werden:

1. **False-Positive-Sicherheit vor Vollständigkeit.** Ein Check, der bei Unsicherheit lieber nichts meldet, ist besser als einer, der bei Unsicherheit rät. Das zieht sich durch: unklare Farben werden `null` (= "nicht bestimmbar", nie ein falscher Kontrastwert), dynamische Prop-Werte werden übersprungen statt geraten, ein einzelner unlesbarer Theme-File degradiert auf einen Teil-Fund statt den ganzen Check abzubrechen.
2. **Kein Check darf einen anderen mitreißen.** Sowohl `checkers/index.ts` (`safeCheck`) als auch `spatial/index.ts` (pro-Block `try/catch`) isolieren jeden einzelnen Check. Ein Fehler in einem Checker wird zu einer einzelnen Warning für genau diesen Checker, nicht zum Totalausfall.
3. **"Throw-proof"-Vertrag für `validate()`.** Der äußere Aufruf (`validate()` in `index.ts`) soll praktisch nie werfen — auch ein Renderfehler, ein Timeout oder ein fehlendes optionales Toolchain-Paket wird zu einem strukturierten `runtime`-Finding, nicht zu einer Exception. Das ist wichtig, weil `validate()` der programmatische Einstiegspunkt für automatisierte Korrekturschleifen ist, die auf ein Ergebnisobjekt angewiesen sind, nicht auf einen Crash.
4. **Origin über Namen.** Ein JSX-Tag zählt nur dann als Marigold-Komponente, wenn er nachweislich aus `@marigold/components` importiert wurde (`buildMarigoldTagResolver`). Niemals rein nach Namensgleichheit prüfen — das war wiederholt eine reale Quelle von False Positives (lokale Komponenten oder Third-Party-Importe mit demselben Namen).
5. **Alles ableiten, nichts hart kodieren, wo es geht.** Props, Sub-Komponenten, Collection-Status — all das kommt aus den echten `@marigold/components`-Typdeklarationen (`helpers/components.ts`), nicht aus Hand-gepflegten Listen. Wo eine Ausnahme sich NICHT aus dem Typsystem ableiten lässt (z. B. welche Compounds ihre Items self-populating rendern), steht eine kuratierte, kommentierte Konstante — und genau dort, direkt daneben, der Kommentar, WARUM sie nicht ableitbar ist.
6. **Ressourcen sofort bei Erzeugung fürs Aufräumen registrieren**, nicht erst am Ende (`cleanup-stack.ts`). Sonst kann ein Timeout mitten im Aufbau eine Ressource verwaisen lassen.

---

## 8. Tests

- **Unit-Tests** (`*.test.ts`) — direkt neben der getesteten Datei, brauchen keinen Browser. Für Checker: `tmpFile()` aus `test-support/tmp.ts` für kleine Inline-Fixtures, oder eine Datei unter `examples/` für Fixtures, die mehrere Tests teilen.
- **Integrationstests** (`*.integration.test.ts`) — brauchen einen echten Chromium. Überspringen sich selbst (`ctx.skip()`), wenn kein Browser verfügbar ist (z. B. ein CI-Runner ohne vorinstalliertes Playwright) — das Muster steht ganz oben in jeder dieser Dateien.
- **`examples/`** — geteilte Fixture-Dateien: sowohl "gültiger" Code (sollte nichts melden) als auch absichtlich fehlerhafter Code (sollte einen bestimmten Fund auslösen), für Checks, die dieselbe Fixture aus mehreren Blickwinkeln testen.

Alle Tests laufen über `pnpm --filter @marigold/cli test` (siehe `packages/cli/vitest.config.ts`). Wichtig: diese Konfiguration setzt `NO_COLOR=1`, damit CLI-Text-Ausgaben in Tests unabhängig davon, ob eine `CI`-Umgebungsvariable gesetzt ist (z. B. GitHub Actions), immer unkoloriert und damit deterministisch geprüft werden können.

---

## 9. "Wo finde ich …?" — Schnellreferenz

| Ich will …                                                                 | … schau hier                                                                   |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| einen neuen statischen Fehler-/Warnungstyp hinzufügen                      | `checkers/` (neue Datei) + `checkers/index.ts` + `types.ts::IssueSource`       |
| einen neuen dynamischen (Render-)Fehler-/Warnungstyp hinzufügen            | `spatial/` (neue Datei) + `spatial/index.ts` + `types.ts::IssueSource`         |
| verstehen, welche Props/Sub-Komponenten eine Marigold-Komponente hat       | `helpers/components.ts`                                                        |
| verstehen, warum ein lokal/third-party importiertes Tag nicht geprüft wird | `helpers/components.ts::buildMarigoldTagResolver`                              |
| die Sandbox/Sicherheitsgrenzen des Renders anpassen                        | `spatial/renderer.ts` (Kommentare bei `fs.deny`/`routeWebSocket` zuerst lesen) |
| verstehen, wie/wann Ressourcen aufgeräumt werden                           | `spatial/cleanup-stack.ts`                                                     |
| die Ausgabeformatierung (Text/JSON) ändern                                 | `format.ts`                                                                    |
| verstehen, wie ein dynamischer Fund seiner Quelltextzeile zugeordnet wird  | `helpers/component-locations.ts`, `index.ts::enrichDynamicLocations`           |
| die CLI-Flags (`--checks`, `--format`) nachvollziehen                      | `commands/validate.ts`, `bin/marigold.ts`                                      |
| verstehen, wie die Komponente überhaupt gerendert wird                     | `harness/entry.tsx`, `harness/setup.tsx`                                       |
| Design-Token-Werte für den Vergleich nachschlagen                          | `helpers/design-tokens.ts`                                                     |
| Theme-Varianten-Daten nachschlagen                                         | `checkers/theme-variants.ts`, `helpers/resolve-theme.ts`                       |
| verstehen, warum ein Fund `error` statt `warning` ist (oder umgekehrt)     | Abschnitt 6 oben, Kommentar bei `IssueSeverity` in `types.ts`                  |
