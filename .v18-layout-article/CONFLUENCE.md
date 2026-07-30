> **Nicht mehr gepflegt.** Diese Datei war die Vorlage für die Confluence-Seite [DST » DRAFT](https://reservix.atlassian.net/wiki/spaces/DST/pages/4980703245/DRAFT). Ab dem 30.07.2026 wird nur noch dort weitergearbeitet. Stand: Commit `38981a87d`.

> **Entwurf für Review – noch nicht veröffentlicht.** Ticket: DST-1571. Folgeartikel zu „RUI: Das visuelle Fundament von Marigold v18". Die Screenshots sind noch nicht eingefügt: An jeder Stelle steht ein Platzhalter mit dem Dateinamen. Die offenen Punkte für die Veröffentlichung stehen am Ende der Seite.

Im letzten Artikel ging es um Farben, Flächen und Schatten, also darum, wie unsere Oberflächen aussehen. Diesmal geht es eine Ebene höher: um den Aufbau einer Seite. Das ist der Teil von v18, der am meisten daran ändert, wie wir entwerfen und entwickeln.

Ein Bild vorweg, das den ganzen Artikel zusammenfasst: **erst die Räume, dann die Möbel.** Der Rahmen einer Anwendung ist das Gebäude. Eine Seite ist ein Raum darin. Panels sind die benannten Bereiche im Raum. Und was in einem Bereich steht, sind die Möbel.

**[Bild: v18-concept-structure.png — Rahmen, Seite und Panels als verschachtelte Struktur]**

Der Artikel ist in drei Teilen aufgebaut. **Teil 1** erklärt den Aufbau einer Seite und ist für alle interessant, die mit unseren Produkten arbeiten, auch ohne Design- oder Entwicklungshintergrund. **Teil 2** geht ins Detail und richtet sich an Designerinnen und Designer. **Teil 3** erklärt, warum wir uns so entschieden haben, inklusive der Stellen, an denen wir uns bewusst gegen den Standard anderer Systeme gestellt haben.

---

## Teil 1: Wie eine Seite in Marigold aufgebaut ist

### Vorher gab es kein gemeinsames Modell

Bisher hat jedes Produkt seinen Seitenaufbau selbst festgelegt. Es gab Bausteine für Buttons, Felder und Tabellen, aber keinen für „eine Seite". Also hat jede Seite die Grundfragen neu beantwortet: Wo steht der Titel? Wie weit ist der Abstand nach oben? Kommt die Hauptaktion oben rechts hin oder unten? Wie werden Abschnitte voneinander getrennt, und heißen sie überhaupt irgendwie?

Das Ergebnis sieht man hier. Unter dem Titel liegt ein Stapel Bedienelemente: ein Schalter, ein Suchfeld, eine Schnellwahl, dazwischen die Hauptaktion. Danach folgt eine Tabelle, die direkt auf dem Seitenhintergrund liegt. Nichts davon ist als Bereich benannt.

**[Bild: core-before-veranstaltungen.png — Veranstaltungsübersicht: Bedienelemente ohne benannte Bereiche unter dem Titel]**

Das war kein Fehler, den irgendwer gemacht hat. Es gab schlicht kein gemeinsames Modell, an dem man sich orientieren konnte, also hat jedes Team eine eigene Lösung gefunden. Genau diese Lücke füllt v18.

### Der Rahmen bleibt, der Inhalt wechselt

v18 beantwortet diese Fragen einmal, und zwar mit drei Ebenen, die ineinander liegen: dem Rahmen der Anwendung, der Seite darin, und den benannten Bereichen auf der Seite. Jede Ebene hat eine klare Aufgabe, und keine übernimmt die Aufgabe einer anderen. Das ist der ganze Kern des Layout-Systems. Gehen wir die drei Ebenen von außen nach innen durch.

Ganz außen sitzt der **App-Rahmen**: Navigation links, eine Kopfzeile oben, der Inhalt darunter. Der Rahmen bleibt stehen, während man durch die Anwendung navigiert. Nur der Inhaltsbereich wechselt.

**[Bild: v18-dashboard.png — Der v18-Rahmen mit Navigation, Kopfzeile und Inhaltsbereich]**

Die Navigation hat zwei Ebenen: eine schmale Leiste mit Symbolen für die Hauptbereiche und daneben eine Spalte mit den Links des aktuellen Bereichs. Klappt man die Spalte zu, bleiben die Symbole stehen. Man gewinnt Platz, ohne die Orientierung zu verlieren.

**[Bild: nav-collapsed-rail.png — Zugeklappte Navigation: die Symbolleiste bleibt sichtbar]**

Auf schmalen Bildschirmen wird die Navigation zu einer Fläche, die sich über die Seite legt, und der Inhalt läuft einspaltig darunter.

**[Bild: nav-mobile-sheet.png — Navigation auf schmalem Bildschirm]**

**[Bild: nav-mobile-page.png — Seiteninhalt auf schmalem Bildschirm]**

Die neue Navigation kommt allerdings nicht zusammen mit dem Rest von v18. Wann sie kommt und warum getrennt, steht weiter unten unter „Wann kommt das?".

Wichtig ist außerdem etwas, das man nicht sieht: Die Seite scrollt wie eine ganz normale Webseite, nicht in einem eigenen Kasten. Deshalb funktionieren Dinge, die man von jeder Website erwartet: Suchen mit `Cmd+F`, der Zurück-Button, Links, die an die richtige Stelle springen.

### Die Seite: ein Titel, eine Hauptaktion

Im Rahmen liegt die **Seite**. Jede Seite hat denselben Anfang: einen Titel, der sagt, wo man ist, optional einen Satz zur Erklärung, und rechts daneben die eine Aktion, um die es auf dieser Seite hauptsächlich geht.

Zwei Dinge stehen bewusst **nicht** im Seitenkopf. Der Pfad, an dem man ablesen kann, wo man sich in der Anwendung befindet, gehört zum Rahmen, nicht zur Seite. Und der Status eines Objekts, also etwa „aktiv" oder „gesperrt", steht im Inhalt, nicht neben dem Titel. Bei Detailseiten hat sich dafür eine schmale Spalte rechts etabliert, die den Status und die wichtigsten Fakten trägt.

**[Bild: v18-detail-user.png — Detailseite: Inhalt links, Status und Kennzahlen in einer schmalen Spalte rechts]**

### Panels: benannte Bereiche

Unter dem Seitenkopf liegen **Panels**. Ein Panel ist ein benannter Bereich, der ein Thema bündelt: „Basisdaten", „Tickets", „Abrechnung". Eine typische Seite besteht aus einer Handvoll davon. Das macht aus einer langen Liste von Feldern eine Seite, die man überfliegen kann: Man liest die Überschriften, findet seinen Bereich und liest nur dort weiter.

Der Unterschied zur Karte ist wichtig, weil beide gleich aussehen: Eine Karte steht für einen Eintrag, der sich wiederholt, etwa eine Veranstaltung in einer Liste. Ein Panel gibt es pro Bereich genau einmal. **Karten wiederholen sich, Panels nicht.**

### Wir haben uns schon herangetastet

Das Muster ist nicht neu. An mehreren Stellen in unseren Systemen haben wir uns in genau diese Richtung vorgearbeitet, lange bevor es einen Namen dafür gab. Ein Beispiel, das viele kennen, ist die Seite zum Bearbeiten eines Einzeltermins: Abschnitte mit Titel, jeder mit einem Thema, jeweils auf einer eigenen weißen Fläche.

**[Bild: core-event-panel-tickets.png — Abschnitt „Tickets" auf der Einzeltermin-Seite]**

Technisch ist dieser Abschnitt eine Card, denn ein Panel gab es damals noch nicht. Also wurde die Card zum Seitenabschnitt umgebaut, weil sie das Nächstliegende war. v18 gibt dem Ding endlich seinen richtigen Namen und den passenden Aufbau.

Und genau das ist inzwischen passiert. In der v18-Beta läuft dieselbe Seite auf dem echten Panel:

**[Bild: core-beta-panel-tickets.png — Derselbe Abschnitt „Tickets", in der v18-Beta als echtes Panel]**

Der Unterschied ist mit Absicht kaum zu sehen, denn die Card war ja schon ein Panel in allem außer dem Namen. Wichtig ist, was darunter passiert: „Tickets" ist jetzt eine Überschrift in der Gliederung der Seite, der Abschnitt ist ein benannter Bereich, und die Breite kommt vom Panel und nicht von der Seite.

So sieht die Seite im Ganzen aus. Oben der Pfad, darunter der Seitentitel, darunter die Panels:

**[Bild: core-beta-event-page.png — Die Einzeltermin-Seite in der v18-Beta]**

Diese Seite ist gleichzeitig der Beleg dafür, dass die Umstellung Seite für Seite gehen kann: Sie nutzt Seite und Panels aus v18, während der Rahmen um sie herum und die Navigation unverändert die bisherigen sind.

Dasselbe im Überspielungstool, dort mit zwei Bereichen nebeneinander. Beide haben einen Titel, eine Zeile mit der Anzahl darunter, ihre eigenen Filter und einen leeren Zustand mit einem Hinweis, was zu tun ist.

**[Bild: core-after-wizard-bundles.png — Überspielungstool: zwei benannte Bereiche nebeneinander]**

Diese Beispiele sind der eigentliche Beleg dafür, dass v18 nichts Neues erfindet. An verschiedenen Stellen sind wir unabhängig voneinander bei derselben Form gelandet, weil das die Form ist, die die Aufgabe verlangt. Das Layout-System schreibt sie auf und macht sie überall verfügbar.

### Was das im Alltag bringt

- **Schneller am Ziel.** Wer den ganzen Tag im System arbeitet, sucht nicht, sondern springt. „Finanzen" ist ein eigener Bereich mit demselben Namen an derselben Stelle: Überschriften überfliegen, hin, erledigt. Bei hundert Vorgängen am Tag summiert sich das.
- **Weniger Fehlgriffe.** Aktionen stehen in dem Bereich, auf den sie sich beziehen. Wenn „Löschen" im Bereich „Tickets" sitzt, ist klar, worauf es sich bezieht, und nicht auf halber Seitenhöhe zu erraten.
- **Weniger Erklärbedarf.** Wer eine Seite verstanden hat, versteht die anderen auch. Der Rahmen springt nicht von Produkt zu Produkt.
- **Bereiche haben Namen.** Im Support kann man sagen „im Bereich Tickets" statt „ungefähr in der Mitte weiter runter scrollen". Dasselbe gilt für Schulungsunterlagen: Namen bleiben gültig, wenn sich die Anordnung später ändert.
- **Neue Seiten gehen schneller.** Niemand baut den Seitenrahmen noch mal neu.
- **Barrierefreiheit fällt mit ab.** Die benannten Bereiche und die Überschriften-Struktur einer Seite sind genau das, worüber Screenreader navigieren. Beides entsteht automatisch, sobald ein Bereich einen Titel hat.

### Wann kommt das?

Hier lohnt es sich, genau zu lesen, weil drei Dinge zu drei verschiedenen Zeitpunkten kommen.

**Das Aussehen** kommt Mitte August ins Reservix-System, also die neuen Farben, Flächen und Schatten aus dem letzten Artikel. Die anderen Systeme ziehen danach nach. Funktional ändert sich dabei nichts.

**Der Seitenaufbau mit Panels** kommt Seite für Seite, nicht mit einem Schlag. Ein Produkt kann Panels einsetzen und dabei weiterhin im bisherigen Rahmen laufen, so wie es die Einzeltermin-Seite heute schon tut. Es gibt also keinen Tag, an dem plötzlich alle Seiten anders aussehen, sondern eine Reihe von Umbauten über die nächsten Releases. Wo umgebaut wird, ändern sich Anordnung und Abstände sichtbar, weil genau das der Punkt ist.

**Die neue Navigation** ist von beidem ausgenommen und kommt im ersten Quartal 2027, zunächst als Opt-in. Die Navigation ist einer der wichtigsten Faktoren in unseren Systemen und besonders im Reservix-System: Wer täglich damit arbeitet, greift blind nach den richtigen Stellen. Deshalb führen wir sie getrennt vom Rest ein, statt sie in einem großen Release mitlaufen zu lassen. Und weil sie als Opt-in startet, entscheidet jede und jeder selbst, wann umgestellt wird.

Einige von euch haben die neue Navigation schon getestet. Danke dafür, euer Feedback ist eingebaut. Bis zum Rollout wird intern weiter getestet, deutlich früher also als das erste Quartal: Bevor die Navigation an den Start geht, wird sie noch einmal auf Herz und Nieren geprüft.

Wer nur wissen wollte, wie eine Seite aufgebaut ist, kann hier aufhören. Der Rest geht ins Detail.

---

## Teil 2: Was das für den Entwurf bedeutet

### Panel für die Gliederung, Layout-Bausteine für alles darin

Die Arbeitsregel ist kurz: **Panel gliedert die Seite, alles innerhalb wird mit Layout-Bausteinen angeordnet.** Diese Bausteine sind unsichtbar und haben jeweils genau eine Aufgabe: `Stack` stapelt untereinander, `Inline` reiht nebeneinander, `Columns` teilt in Spalten, `Inset` gibt Innenabstand. In der Doku stehen sie unter „Layout Primitives".

Panel besitzt die Fläche, den Titel und den Rahmen um den Inhalt. Es bestimmt nicht, wie der Inhalt darin angeordnet ist. Das übernehmen die Layout-Bausteine, und die funktionieren innerhalb eines Panels genauso wie außerhalb.

Daraus folgt eine Regel, die im Entwurf oft übersehen wird: **Ein Element bringt keinen Außenabstand mit.** Ein Button weiß nicht, was neben ihm steht. Der Abstand zwischen zwei Elementen wird immer von dem Baustein entschieden, der beide enthält. Wer im Entwurf Abstände an ein einzelnes Element klebt, beschreibt etwas, das das System nicht bauen kann, ohne die Wiederverwendbarkeit aufzugeben.

### Panel oder Card?

Die Frage kommt regelmäßig, weil beide gleich aussehen: weiße Fläche, feiner Rahmen, kein Schatten. Der Unterschied liegt nicht im Aussehen, sondern in der Rolle.

Die Prüffrage: **Wiederholt sich das Element beim Scrollen?** Eine Veranstaltung, ein Produkt, ein Teammitglied kommen mehrfach vor, jeweils in derselben Form. Das ist eine Card. „Basisdaten" oder „Abrechnung" gibt es pro Seite einmal, mit eigenem Titel und eigenen Aktionen. Das ist ein Panel.

Aus der Rolle folgt der Rest: Panels tragen Titel, die zur Gliederung der Seite gehören, und werden dadurch zu Bereichen, die Screenreader ansteuern können. Cards sind Einträge in einer Sammlung und brauchen das nicht.

### Breite wird pro Fläche entschieden, nicht pro Seite

Eine Seite gibt keine Maximalbreite vor. Stattdessen entscheidet jede Fläche für sich: Formularabschnitte werden auf eine angenehme Lesebreite begrenzt, datenreiche Flächen wie Tabellen laufen über die volle Breite.

Das klingt nach einem Detail, ist aber der Unterschied zu Systemen, die einen Schalter auf Seitenebene anbieten, „schmal" oder „volle Breite". Eine echte Seite mischt beides: ein kurzes Formular oben, darunter eine breite Tabelle. Ein Schalter auf Seitenebene erzwingt eine Entscheidung für die ganze Seite und liegt dann bei der Hälfte des Inhalts daneben.

Auf der Einzeltermin-Seite kann man das nachsehen: Die Formularabschnitte sind auf eine Lesebreite begrenzt, obwohl die Seite viel breiter ist. Genau das ist gemeint.

### Die fünf Seitenformen

Fast jede Seite in einer Anwendung ist eine von fünf Formen. Alle bestehen aus denselben Bausteinen. Unterschiedlich ist nur, wie viele Flächen es gibt, wie sie angeordnet sind und wie breit sie laufen.

| Form | Wofür | Aufbau |
| --- | --- | --- |
| **Liste** | Eine Sammlung durchsuchen und filtern | Ein Panel über die volle Breite mit Filtern und Tabelle |
| **Detail** | Ein Objekt mit Status und Kennzahlen | Zwei Spalten: Inhalt links, schmale Übersicht rechts |
| **Formular** | Etwas anlegen oder bearbeiten | Panels auf Lesebreite, Hauptaktion am Ende |
| **Einstellungen** | Konfiguration in Gruppen, oft mit Tabs | Tabs unter dem Seitenkopf, darin gestapelte Formular-Panels |
| **Übersicht** | Kennzahlen auf einen Blick | Panels und Cards in Spalten oder als Raster |

**[Bild: v18-list-filter.png — Listenform]**

**[Bild: v18-form-event.png — Formularform]**

**[Bild: v18-settings-general.png — Einstellungsform]**

Die Detailform lohnt es sich besonders anzuschauen, weil sie am häufigsten vorkommt und dabei den meisten Spielraum lässt. Der Inhalt steht links, Status und Kennzahlen in einer schmalen Spalte rechts, etwa zwei Drittel zu einem Drittel. Auf schmalen Bildschirmen fällt die rechte Spalte unter die linke.

Die schmale Spalte verdient ihren Platz aber nur, wenn es wirklich etwas zusammenzufassen gibt: Status, Verantwortliche, wichtige Daten, Anzahlen. Steht dort am Ende nur ein einzelnes Etikett, wirkt sie wie eine leere Randspalte. Dann gehören die Angaben in den Inhalt.

### Was in die Übergabe gehört

Für die Übergabe an die Entwicklung heißt das: Die Struktur ist die eigentliche Information. Also nicht Abstände in Pixeln, sondern „eine Seite mit dem Titel *Einzeltermin bearbeiten*, darunter vier Panels: Basisdaten, Tickets, Besucherinformation, Finanzen. Speichern und Abbrechen liegen außerhalb der Panels am Seitenende."

Abstände, Innenabstände, Überschriftenebenen und Umbruchverhalten kommen aus dem System und müssen nicht mitgeliefert werden. Das soll die Übergabe an die Entwicklung leichter machen: weniger Details, die abgestimmt und geprüft werden müssen, und dafür mehr Zeit für die Fragen, bei denen es wirklich um das Produkt geht. Genauso hilft es im Gespräch untereinander. Wenn alle von „Panel" und „Seitentitel" sprechen, meinen alle dasselbe, und Rückfragen wie „welcher Abschnitt genau?" fallen weg.

---

## Teil 3: Warum wir uns so entschieden haben

### Der Kern: eine Seite besteht aus benannten Bereichen

v18 hat viele Teile, aber wenn man einen Satz mitnimmt, dann diesen: **Eine Seite besteht aus benannten Bereichen.** Alles andere im Layout-System ist die Folge davon. Die Seite selbst ist kein Bereich, sondern die Bühne, deshalb trägt sie nur einen Titel und eine Hauptaktion. Jeder Bereich hat einen Namen, weil er ein Thema bündelt. Aktionen gehören zu dem Bereich, auf den sie sich beziehen, nicht an den Seitenrand. Und weil das überall gleich funktioniert, trägt die Struktur über Produkte hinweg.

Warum das bei uns besonders zählt: Unsere Systeme sind Arbeitsgeräte. Niemand öffnet das Reservix-System einmal und schaut sich um, sondern Menschen arbeiten dort acht Stunden am Tag und wiederholen dieselben Vorgänge hundertmal. Für sie ist der Seitenaufbau keine Optik, sondern Bedienung. Wer das Kontingent eines Termins ändern will, will nicht die Seite lesen, sondern zu „Tickets". Genau das machen benannte Bereiche möglich: Überschriften überfliegen, in den richtigen Bereich springen, dort arbeiten, weiter. Das sind ein paar Sekunden pro Vorgang, und Sekunden pro Vorgang sind bei dieser Art Arbeit die Währung.

Dazu kommt, dass eine Seite mit benannten Bereichen beschreibbar wird. „Im Bereich Finanzen, das zweite Feld" funktioniert am Telefon, im Support-Ticket, in der Schulungsunterlage und in der Abstimmung untereinander. Vorher haben wir Positionen beschrieben, „unten links, unter der Tabelle", und Positionen ändern sich beim nächsten Umbau. Namen bleiben.

### Vier Festlegungen, die auffallen

Vergleicht man Marigold mit anderen Systemen, fallen vier Festlegungen auf. Alle vier sind bewusst getroffen.

**Panel ist der Standard für Abschnitte, nicht die Card.** Viele Systeme kennen nur die Card und benutzen sie für beides: für den wiederkehrenden Eintrag in einer Liste und für den Abschnitt einer Seite. Dann bedeutet dieselbe weiße Fläche einmal „eines von vielen" und einmal „ein Teil dieser Seite", und man muss erst lesen, um zu wissen, was gemeint ist. Wir trennen die beiden, damit die Fläche selbst schon die Auskunft gibt: Ein Panel ist ein Teil dieser Seite und hat immer einen Namen, eine Card ist eines von vielen.

**Keine Maximalbreite auf Seitenebene.** Begründung wie oben: Eine Seite mischt schmalen und breiten Inhalt, deshalb entscheidet die einzelne Fläche über ihre Breite und nicht die Seite über alles darauf. Andere Systeme lösen das mit einem Schalter am Seitenkopf, der dann für alles auf der Seite gilt, und damit ist eine der beiden Sorten Inhalt immer falsch bedient.

**Eine Hauptaktion pro Seite, alles andere gehört in seinen Bereich.** Der Seitenkopf trägt Titel, Beschreibung und die eine Aktion, wegen der die Seite geöffnet wurde. Status-Etiketten und Kennzahlen bekommen dort bewusst keinen Platz, weil die Aktion sonst in einer Reihe von Kleinteilen verschwindet; sie stehen in der schmalen Übersichtsspalte. Und was nur einen Bereich betrifft, steht in diesem Bereich, damit sichtbar bleibt, worauf sich „Löschen" bezieht.

**Die Seite scrollt, nicht ein Kasten darin.** Ein eigener Scroll-Bereich im Inhalt sieht ordentlich aus und kostet lauter Kleinigkeiten, die der Browser sonst geschenkt mitbringt: Suchen im Text, Zurückkehren an die vorherige Scroll-Position, Sprungmarken, das Zusammenklappen der Adressleiste auf dem Handy.

Eine kleinere Festlegung noch am Rand, weil die Frage regelmäßig kommt: Der Pfad, der zeigt, wo man sich befindet, sitzt in der Kopfzeile des Rahmens und nicht im Seitenkopf. Er beschreibt, wo eine Seite liegt, nicht, was sie ist.

### Eine Stelle, die noch nicht entschieden ist

Ein Punkt ist offen, und es lohnt nicht, das zu verstecken. Sehr lange Formulare bestehen häufig aus vielen eingeklappten Abschnitten. Die untere Hälfte der Einzeltermin-Seite sieht so aus:

**[Bild: core-beta-collapsed-stack.png — Mehrere eingeklappte Panels in der v18-Beta, darunter Speichern und Abbrechen]**

Das ist praktisch, weil man sonst endlos scrollt. Gleichzeitig ist es eine Seite, die man erst aufklappen muss, um zu sehen, was auf ihr steht. Unsere Empfehlung ist bisher: pro Panel höchstens ein eingeklappter Teil, und zwar für den Rand des Themas, nicht für das Thema selbst. Für eine Reihe gleichrangiger Klapp-Abschnitte gibt es ein eigenes Element, das Accordion.

Für Formulare in dieser Länge ist die Frage aber ehrlich gesagt noch nicht beantwortet. Wer gerade so eine Seite baut: Sprecht uns an, dann lösen wir das am konkreten Fall statt in der Theorie.

### Was noch nicht fertig ist

Rahmen und Seite sind in v18 als Beta gekennzeichnet. Sie funktionieren und sind im Einsatz, die Schnittstelle kann sich aber noch ändern. Panel ist stabiler und die naheliegende Stelle, um anzufangen: Man kann eine bestehende Seite in benannte Bereiche gliedern, ohne den Rahmen anzufassen.

## Zum Weiterlesen

Die vollständige Referenz steht in der Beta-Dokumentation: [Layouts](https://marigold-docs-git-beta-release-marigold.vercel.app/foundations/layouts) für die Grundlagen, [App Frame](https://marigold-docs-git-beta-release-marigold.vercel.app/patterns/layout/app-frame) für den Aufbau einer Anwendung, [Panel](https://marigold-docs-git-beta-release-marigold.vercel.app/components/layout/panel) für alle Details zu Titel, Aktionen, Varianten und Abständen. Die Beispielseiten unter [Examples](https://marigold-docs-git-beta-release-marigold.vercel.app/examples) sind vollständige Seiten, durch die man klicken kann.

Zum Schluss dieselbe Beobachtung wie beim visuellen Fundament: Ein gutes Layout fällt nicht auf. Man merkt es daran, dass man auf einer neuen Seite nicht überlegen muss, wo man ist und was man als Nächstes tun soll.

---

### Intern: vor der Veröffentlichung zu klären

*Dieser Abschnitt wird vor dem Publizieren entfernt.*

- Screenshots stammen aus dem Test-Mandanten „Test-Design System" auf Stage, keine echten Kundendaten.
- Doku-Links zeigen auf die Beta-Deployment-URL und müssen zum Launch auf marigold-ui.io umgestellt werden.
- Master- und Admin-Markierungen sind auf zwei Screenshots sichtbar, werden im Text aber bewusst nicht erklärt.
- Navigation ist mit „erstes Quartal 2027, zunächst als Opt-in" angegeben. Vor der Veröffentlichung gegen den aktuellen Plan abgleichen.
- Die Bilder liegen im Repo unter `.v18-layout-article/assets/` (Branch `worktree-dst-1571-designer-layout-article`) und müssen an die markierten Stellen eingefügt werden.
- Die drei `core-beta-*`-Screenshots stammen aus der Review-App (`chore-marigold-18-beta`), Test-Mandant 29187. `core-beta-events-list.png` liegt zusätzlich bereit, ist aber aktuell nicht eingebunden.
