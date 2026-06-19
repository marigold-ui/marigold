'use client';

// Umsatzreport: a plain-language overview that explains the flow of each of the
// three prototype variants and compares them side by side. It is the entry
// point of the "Umsatzreport" nav group and links into A, B and C.
import { ArrowRight, Check, Minus } from 'lucide-react';
import {
  Badge,
  Columns,
  Description,
  Divider,
  LinkButton,
  Page,
  Panel,
  Stack,
  Table,
  Text,
  Title,
} from '@marigold/components';

interface Variant {
  id: 'A' | 'B' | 'C';
  name: string;
  href: string;
  summary: string;
  steps: string[];
  pros: string[];
  cons: string[];
}

const variants: Variant[] = [
  {
    id: 'A',
    name: 'Liste',
    href: '/examples/revenue-report',
    summary:
      'Die Reportliste ist der Einstieg. Erstellung und Ergebnis liegen auf eigenen Seiten.',
    steps: [
      'Einstieg auf der Liste aller Reporte – jede Zeile zeigt ihren Live-Status (in Bearbeitung, fertig, fehlgeschlagen).',
      '„Neuer Report“ öffnet eine eigene Builder-Seite mit dem Formular: Auswertung, Zeitraum, Filter – von oben nach unten lesbar.',
      '„Report erstellen“ startet die Berechnung und führt direkt auf die Detailseite, die sich nach und nach füllt.',
      'Während gerechnet wird, kann man wegnavigieren. Ein Toast mit „Anzeigen“ meldet die Fertigstellung.',
      'Fertige Reporte findet man über Liste, Suche und „Duplizieren & anpassen“ wieder.',
    ],
    pros: [
      'Reporte lassen sich gut wiederfinden (Liste + Suche)',
      'Mehrere Berechnungen laufen sichtbar parallel',
      'Die Historie ist immer präsent',
      'Skaliert gut bei vielen Reporten',
    ],
    cons: [
      'Mehr Seitenwechsel für einen einzelnen Report',
      'Erstellung und Ergebnis sind nie gleichzeitig sichtbar',
    ],
  },
  {
    id: 'B',
    name: 'Assistent',
    href: '/examples/revenue-report-wizard',
    summary:
      'Gleiche Listen-Architektur wie A, aber die Erstellung führt ein Assistent in drei Schritten.',
    steps: [
      'Einstieg wie bei Variante A auf der Reportliste.',
      '„Neuer Report“ startet den Assistenten: Schritt 1 Auswertung, Schritt 2 Zeitraum, Schritt 3 Filter.',
      'Eine Zusammenfassungs-Leiste zeigt jederzeit, was gerade konfiguriert ist – inklusive geschätzter Dauer.',
      '„Report erstellen“ im letzten Schritt startet die Berechnung. Ab hier identisch zu A (Detailseite, Toast).',
    ],
    pros: [
      'Niedrige Einstiegshürde, führt Schritt für Schritt',
      'Weniger Überforderung durch viele Felder auf einmal',
      'Gut für Gelegenheitsnutzer:innen und Einsteiger:innen',
    ],
    cons: [
      'Mehr Klicks pro Report',
      'Für wiederholte, ähnliche Auswertungen eher langsam (mildert „Duplizieren“)',
    ],
  },
  {
    id: 'C',
    name: 'Kombiniert',
    href: '/examples/revenue-report-classic',
    summary:
      'Erstellung und Ergebnis auf einem Bildschirm – das heutige Modell, überarbeitet.',
    steps: [
      'Builder und Ergebnis liegen untereinander auf einer einzigen Seite.',
      'Die Aufschlüsselung steht oben (die wichtigste Entscheidung); Filter liegen in einem Drawer und erscheinen als entfernbare Tags.',
      '„Report anzeigen“ startet die Berechnung; das Ergebnis erscheint direkt darunter im selben Bildschirm.',
      'Früher erstellte Reporte sind über ein Dropdown in der Ergebnis-Leiste erreichbar.',
    ],
    pros: [
      'Alles auf einen Blick, ohne Seitenwechsel',
      'Schnelles Iterieren an den Parametern',
      'Vertraut – nah am heutigen Produkt',
    ],
    cons: [
      'Nur ein Report gleichzeitig sichtbar',
      'Wiederfinden über ein Dropdown statt einer vollwertigen Liste',
    ],
  },
];

const badgeVariant = (id: Variant['id']) =>
  id === 'A' ? 'info' : id === 'B' ? 'success' : 'warning';

const FlowSteps = ({ steps }: { steps: string[] }) => (
  <ol className="grid gap-3">
    {steps.map((step, index) => (
      <li key={step} className="flex items-start gap-3">
        <Badge>{index + 1}</Badge>
        <Text>{step}</Text>
      </li>
    ))}
  </ol>
);

const ProsCons = ({
  title,
  tone,
  items,
}: {
  title: string;
  tone: 'pro' | 'con';
  items: string[];
}) => {
  const Icon = tone === 'pro' ? Check : Minus;
  return (
    <Stack space="regular">
      <Text weight="semibold" fontSize="sm">
        {title}
      </Text>
      <ul className="grid gap-2">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2">
            <Icon size={16} className="mt-0.5 shrink-0" aria-hidden />
            <Text fontSize="sm" variant="muted">
              {item}
            </Text>
          </li>
        ))}
      </ul>
    </Stack>
  );
};

const VariantCard = ({ variant }: { variant: Variant }) => (
  <Panel aria-label={`Variante ${variant.id}: ${variant.name}`}>
    <Panel.Header>
      <Title>
        Variante {variant.id}: {variant.name}
      </Title>
      <Description>{variant.summary}</Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <Badge variant={badgeVariant(variant.id)}>So läuft es ab</Badge>
        <FlowSteps steps={variant.steps} />
        <Divider />
        <Columns columns={[1, 1]} space="group" collapseAt="40rem">
          <ProsCons title="Stärken" tone="pro" items={variant.pros} />
          <ProsCons title="Kompromisse" tone="con" items={variant.cons} />
        </Columns>
      </Stack>
    </Panel.Content>
    <Panel.Footer>
      <LinkButton variant="primary" href={variant.href}>
        Variante {variant.id} öffnen
        <ArrowRight size={16} />
      </LinkButton>
    </Panel.Footer>
  </Panel>
);

const comparison: {
  aspect: string;
  a: string;
  b: string;
  c: string;
}[] = [
  {
    aspect: 'Einstieg',
    a: 'Reportliste',
    b: 'Reportliste',
    c: 'Builder + Ergebnis',
  },
  {
    aspect: 'Erstellung',
    a: 'Eigene Formular-Seite',
    b: '3-Schritt-Assistent',
    c: 'Inline, oben auf der Seite',
  },
  {
    aspect: 'Ergebnis',
    a: 'Eigene Detailseite',
    b: 'Eigene Detailseite',
    c: 'Direkt darunter',
  },
  {
    aspect: 'Wiederfinden',
    a: 'Liste + Suche',
    b: 'Liste + Suche',
    c: 'Dropdown in der Ergebnis-Leiste',
  },
  {
    aspect: 'Mehrere Reporte parallel',
    a: 'Ja, in der Liste sichtbar',
    b: 'Ja, in der Liste sichtbar',
    c: 'Eingeschränkt (über Dropdown)',
  },
  {
    aspect: 'Am besten für',
    a: 'Viele & wiederkehrende Reporte',
    b: 'Einsteiger:innen, seltene Nutzung',
    c: 'Schnelles Iterieren, vertraute Nutzer:innen',
  },
];

const shared: { title: string; description: string }[] = [
  {
    title: 'Asynchrone Berechnung',
    description:
      'Der Status durchläuft „In Warteschlange“ → „Wird berechnet“ → „Fertig“. Die Dauer steigt mit dem Umfang (mehr Filter, feinere Aufschlüsselung) und wird vorab als Schätzung angezeigt. Die Seite lässt sich jederzeit verlassen – ein Toast meldet die Fertigstellung. Gelegentlich schlägt eine Berechnung fehl (mit Wiederholen-Aktion), um den Fehlerfall zu zeigen.',
  },
  {
    title: 'Vorlagen',
    description:
      'Häufig genutzte Konfigurationen lassen sich als Vorlage speichern und für neue Reporte wiederverwenden.',
  },
  {
    title: 'Spaltenkonfiguration',
    description:
      'Im Ergebnis lassen sich die angezeigten Kennzahlen-Spalten ein- und ausblenden.',
  },
  {
    title: 'Deutsche Lokalisierung',
    description:
      'Datums-, Zahlen- und Währungsformate folgen durchgängig dem Format de-DE.',
  },
  {
    title: 'Gemeinsame Datenbasis',
    description:
      'Alle drei Varianten greifen auf dasselbe Mock-Datenmodul und denselben Zustand zu – ein in Variante A gestarteter Report taucht auch in C wieder auf.',
  },
];

const RevenueReportFlowsPage = () => (
  <Page>
    <Page.Header>
      <Title>Umsatzreport: Varianten im Vergleich</Title>
      <Description>
        Drei Flow-Konzepte für denselben Report – wie sie sich im Ablauf
        unterscheiden und wofür sich jede eignet.
      </Description>
    </Page.Header>

    <Panel aria-label="Ausgangslage">
      <Panel.Header>
        <Title>Ausgangslage</Title>
      </Panel.Header>
      <Panel.Content>
        <Stack space="regular">
          <Text>
            Der Umsatzreport bündelt über zwanzig Filter, mehrere
            Aufschlüsselungen und einen optionalen Zeitverlauf. Die Berechnung
            läuft asynchron und dauert je nach Umfang von wenigen Sekunden bis
            zu mehreren Minuten.
          </Text>
          <Text>
            Diese drei Prototypen erkunden, wie der Ablauf rund um diese
            asynchrone Erstellung aussehen kann. Sie teilen sich dasselbe
            Datenmodell, dieselbe Berechnungssimulation und dieselben Funktionen
            (Vorlagen, Spaltenkonfiguration) – nur der Flow unterscheidet sich.
          </Text>
        </Stack>
      </Panel.Content>
    </Panel>

    {variants.map(variant => (
      <VariantCard key={variant.id} variant={variant} />
    ))}

    <Panel aria-label="Vergleich auf einen Blick">
      <Panel.Header>
        <Title>Vergleich auf einen Blick</Title>
        <Description>
          Dieselbe Aufgabe, drei unterschiedliche Abläufe.
        </Description>
      </Panel.Header>
      <Panel.Content bleed>
        <Table aria-label="Vergleich der drei Varianten">
          <Table.Header>
            <Table.Column rowHeader>Aspekt</Table.Column>
            <Table.Column>A: Liste</Table.Column>
            <Table.Column>B: Assistent</Table.Column>
            <Table.Column>C: Kombiniert</Table.Column>
          </Table.Header>
          <Table.Body>
            {comparison.map(row => (
              <Table.Row key={row.aspect}>
                <Table.Cell>
                  <Text weight="medium">{row.aspect}</Text>
                </Table.Cell>
                <Table.Cell>{row.a}</Table.Cell>
                <Table.Cell>{row.b}</Table.Cell>
                <Table.Cell>{row.c}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>

    <Panel aria-label="Was alle Varianten teilen">
      <Panel.Header>
        <Title>Was alle Varianten teilen</Title>
      </Panel.Header>
      <Panel.Content>
        <Stack space="group">
          {shared.map(item => (
            <Stack key={item.title} space="tight">
              <Text weight="semibold">{item.title}</Text>
              <Text variant="muted">{item.description}</Text>
            </Stack>
          ))}
          <Divider />
          <Text variant="muted" fontSize="sm">
            Hinweis: Dies ist ein Klick-Prototyp mit simulierten Daten. Die
            Zahlen sind zufällig erzeugt und bleiben pro Browser-Session
            erhalten.
          </Text>
        </Stack>
      </Panel.Content>
    </Panel>
  </Page>
);

export default RevenueReportFlowsPage;
