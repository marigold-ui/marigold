import type { Metadata } from 'next';

/**
 * DRAFT — must be reviewed and released by Legal / the DPO before going live.
 *
 * This notice describes the processing that this documentation site actually
 * performs, as of the date below:
 *
 *   - Hosting + server logs (Vercel)
 *   - Vercel Web Analytics (no cookies, no device storage — verified against
 *     the live script; visitor hash is derived server-side and dropped after 24h)
 *   - Site search (fumadocs/Orama, runs in our own API route, no third party)
 *   - MCP endpoint (authenticated, embeddings via AWS Bedrock)
 *   - Marigold CLI telemetry (opt-out, persistent anonymousId, POSTs to
 *     /api/telemetry, stored in Upstash Redis)
 *
 * If any of that changes, this page has to change with it.
 *
 * German is the authoritative version; the English translation exists because
 * the site is English-only. Keep both in sync.
 */

const LAST_UPDATED_DE = '6. August 2026';
const LAST_UPDATED_EN = '6 August 2026';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Marigold Design System',
  description:
    'Informationen zur Verarbeitung personenbezogener Daten auf marigold-ui.io gemäß Art. 13 DSGVO.',
};

const Page = () => (
  <>
    <h1>Datenschutzerklärung</h1>

    <p className="lead">
      Diese Datenschutzerklärung informiert Sie gemäß Art. 13 DSGVO über die
      Verarbeitung personenbezogener Daten beim Besuch dieser Website
      (marigold-ui.io) sowie bei der Nutzung des Marigold CLI.
    </p>

    <h2>1. Verantwortlicher</h2>
    <p>
      Reservix GmbH
      <br />
      Humboldtstraße 2
      <br />
      79098 Freiburg im Breisgau
      <br />
      Deutschland
      <br />
      Telefon: <a href="tel:+497618878800">+49 761 88788 0</a>
      <br />
      E-Mail: <a href="mailto:info@reservix.de">info@reservix.de</a>
    </p>
    <p>
      Weitere Angaben finden Sie in unserem <a href="/impressum">Impressum</a>.
    </p>

    <h2>2. Datenschutzbeauftragter</h2>
    <p>
      Sie erreichen unseren Datenschutzbeauftragten unter:
      <br />
      E-Mail:{' '}
      <a href="mailto:datenschutz@reservix.de">datenschutz@reservix.de</a>
      <br />
      oder postalisch unter der oben genannten Anschrift mit dem Zusatz „An den
      Datenschutzbeauftragten“.
    </p>

    <h2>3. Hosting und Server-Logfiles</h2>
    <p>
      Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
      91789, USA, gehostet. Vercel verarbeitet die Daten als Auftragsverarbeiter
      für uns; es besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
    </p>
    <p>
      Beim Aufruf einer Seite werden technisch notwendige Verbindungsdaten
      verarbeitet, insbesondere:
    </p>
    <ul>
      <li>IP-Adresse des anfragenden Endgeräts</li>
      <li>Datum und Uhrzeit des Zugriffs</li>
      <li>aufgerufene URL bzw. Datei</li>
      <li>übertragene Datenmenge und HTTP-Statuscode</li>
      <li>Referrer-URL</li>
      <li>Browsertyp, Browserversion und Betriebssystem</li>
    </ul>
    <p>
      <strong>Zweck:</strong> Auslieferung der Website, Gewährleistung der
      Systemsicherheit und Stabilität sowie Fehleranalyse.
      <br />
      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO. Unser
      berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb dieser
      Website.
      <br />
      <strong>Speicherdauer:</strong> Logdaten werden nur so lange gespeichert,
      wie es für diese Zwecke erforderlich ist, und anschließend gelöscht.
    </p>

    <h2>4. Reichweitenmessung (Vercel Web Analytics)</h2>
    <p>
      Wir nutzen Vercel Web Analytics, um zu verstehen, welche Inhalte der
      Dokumentation genutzt werden und wo Verbesserungsbedarf besteht.
    </p>
    <p>
      Vercel Web Analytics setzt <strong>keine Cookies</strong> und speichert
      oder liest <strong>keine Informationen auf Ihrem Endgerät</strong>. Es
      werden weder Local Storage, Session Storage noch vergleichbare Techniken
      verwendet. Ein Zugriff auf Ihre Endeinrichtung im Sinne des § 25 TDDDG
      findet daher nicht statt.
    </p>
    <p>
      Unabhängig davon aktivieren wir die Reichweitenmessung{' '}
      <strong>ausschließlich nach Ihrer ausdrücklichen Einwilligung</strong>.
      Solange Sie nicht zugestimmt haben, wird das Analyse-Skript nicht geladen
      und es werden keine Daten übertragen.
    </p>
    <p>Erhoben werden ausschließlich aggregierte Angaben, insbesondere:</p>
    <ul>
      <li>aufgerufene Seite und dynamischer Pfad</li>
      <li>Referrer und gefilterte Query-Parameter</li>
      <li>
        grobe Standortangabe (Land, Region, Stadt) auf Basis der IP-Adresse
      </li>
      <li>Betriebssystem, Browser und Gerätetyp</li>
      <li>Zeitstempel des Aufrufs</li>
    </ul>
    <p>
      Zur Unterscheidung wiederkehrender Aufrufe bildet Vercel serverseitig
      einen Hashwert aus der eingehenden Anfrage. Dieser Hashwert wird{' '}
      <strong>nach 24 Stunden verworfen</strong> und ermöglicht keine
      Wiedererkennung über einen längeren Zeitraum oder über andere Websites
      hinweg. Ein Personenbezug wird nicht hergestellt, und es findet kein
      seitenübergreifendes Tracking statt.
    </p>
    <p>
      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO
      (Einwilligung).
      <br />
      <strong>Widerruf:</strong> Sie können Ihre Einwilligung jederzeit mit
      Wirkung für die Zukunft widerrufen. Nutzen Sie dazu den Link
      „Cookie-Einstellungen“ am Ende jeder Seite. Die Rechtmäßigkeit der bis zum
      Widerruf erfolgten Verarbeitung bleibt unberührt.
      <br />
      <strong>Speicherung Ihrer Auswahl:</strong> Ihre Entscheidung wird im
      Local Storage Ihres Browsers unter dem Schlüssel <code>mg-consent</code>{' '}
      gespeichert, damit wir Sie nicht bei jedem Besuch erneut fragen müssen.
      Diese Speicherung ist zur Umsetzung Ihrer Auswahl unbedingt erforderlich
      (§ 25 Abs. 2 Nr. 2 TDDDG) und erfolgt daher einwilligungsfrei.
    </p>

    <h2>5. Suchfunktion</h2>
    <p>
      Die Suche dieser Dokumentation wird vollständig auf unserer eigenen
      Infrastruktur ausgeführt. Ihre Suchanfrage wird zur Beantwortung an unsere
      Server übermittelt, dort verarbeitet und{' '}
      <strong>nicht dauerhaft gespeichert</strong>. Eine Weitergabe an Dritte
      findet nicht statt.
    </p>
    <p>
      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
      (Bereitstellung einer nutzbaren Dokumentation).
    </p>

    <h2>6. MCP-Schnittstelle</h2>
    <p>
      Wir stellen unter <code>/mcp</code> eine Schnittstelle bereit, über die
      KI-gestützte Entwicklungswerkzeuge die Dokumentation durchsuchen können.
      Die Nutzung setzt eine Authentifizierung voraus und steht ausschließlich
      berechtigten Personen zur Verfügung.
    </p>
    <p>
      Zur semantischen Suche werden Suchanfragen an Amazon Web Services (Amazon
      Bedrock) übermittelt, um einen Vektor-Repräsentanten der Anfrage zu
      berechnen. Es besteht ein Auftragsverarbeitungsvertrag; die Verarbeitung
      erfolgt in einer Region innerhalb der Europäischen Union.
    </p>
    <p>
      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
      (Bereitstellung von Entwicklungswerkzeugen für berechtigte Nutzer).
    </p>

    <h2>7. Telemetrie des Marigold CLI</h2>
    <p>
      Das Kommandozeilenwerkzeug <code>@marigold/cli</code> übermittelt
      standardmäßig anonyme Nutzungsstatistiken an diese Website, damit wir
      erkennen können, welche Befehle genutzt werden und wo Fehler auftreten.
      Diese Verarbeitung betrifft nur Nutzerinnen und Nutzer des CLI, nicht
      Besucher dieser Website.
    </p>
    <p>Übermittelt werden:</p>
    <ul>
      <li>aufgerufener Befehl und dessen Exit-Code</li>
      <li>CLI-Version, Node.js-Version und Betriebssystem-Plattform</li>
      <li>
        Ausführungsdauer (in groben Zeitklassen) und ob ein Cache-Treffer vorlag
      </li>
      <li>
        ob die Ausführung interaktiv erfolgte und ob ein KI-Agent erkannt wurde
      </li>
      <li>
        eine zufällig erzeugte, nicht personenbezogene Kennung (
        <code>anonymousId</code>), die lokal in Ihrer CLI-Konfigurationsdatei
        gespeichert wird
      </li>
    </ul>
    <p>
      Es werden keine Inhalte Ihres Projekts, keine Dateinamen, keine Pfade und
      keine Suchbegriffe übermittelt. In CI-Umgebungen ist die Telemetrie
      automatisch deaktiviert.
    </p>
    <p>
      <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (Verbesserung
      unserer Entwicklerwerkzeuge).
      <br />
      <strong>Speicherdauer:</strong> Die Ereignisse werden tagesweise
      gespeichert und nach Ablauf der Aufbewahrungsfrist automatisch gelöscht.
      <br />
      <strong>Deaktivierung:</strong> Sie können die Telemetrie jederzeit
      abschalten, mit dem Befehl <code>marigold telemetry disable</code> oder
      indem Sie eine der Umgebungsvariablen{' '}
      <code>MARIGOLD_TELEMETRY_DISABLED=1</code> oder{' '}
      <code>DO_NOT_TRACK=1</code> setzen.
    </p>

    <h2>8. Empfänger und Übermittlung in Drittländer</h2>
    <p>
      Personenbezogene Daten werden an die in dieser Erklärung genannten
      Auftragsverarbeiter übermittelt. Soweit dabei Daten in Länder außerhalb
      des Europäischen Wirtschaftsraums übertragen werden, erfolgt dies auf
      Grundlage geeigneter Garantien nach Art. 44 ff. DSGVO, insbesondere durch
      den Abschluss der Standardvertragsklauseln der EU-Kommission und
      ergänzender technischer und organisatorischer Maßnahmen.
    </p>

    <h2>9. Ihre Rechte</h2>
    <p>Sie haben das Recht,</p>
    <ul>
      <li>
        Auskunft über die zu Ihrer Person verarbeiteten Daten zu verlangen (Art.
        15 DSGVO),
      </li>
      <li>die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO),</li>
      <li>die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO),</li>
      <li>
        die Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO) sowie
      </li>
      <li>
        die Übertragung Ihrer Daten in einem gängigen Format zu verlangen (Art.
        20 DSGVO).
      </li>
    </ul>
    <p>
      <strong>Widerspruchsrecht nach Art. 21 DSGVO:</strong> Soweit wir
      personenbezogene Daten auf Grundlage berechtigter Interessen verarbeiten,
      haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
      ergeben, jederzeit Widerspruch gegen diese Verarbeitung einzulegen. Wenden
      Sie sich hierzu an{' '}
      <a href="mailto:datenschutz@reservix.de">datenschutz@reservix.de</a>.
    </p>

    <h2>10. Beschwerderecht bei der Aufsichtsbehörde</h2>
    <p>
      Unbeschadet anderweitiger Rechtsbehelfe haben Sie das Recht, sich bei
      einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Die für
      uns zuständige Behörde ist:
    </p>
    <p>
      Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
      Baden-Württemberg
      <br />
      Lautenschlagerstraße 20
      <br />
      70173 Stuttgart
      <br />
      Deutschland
    </p>

    <h2>11. Änderungen dieser Datenschutzerklärung</h2>
    <p>
      Wir passen diese Datenschutzerklärung an, wenn sich die beschriebenen
      Verarbeitungen ändern. Es gilt jeweils die auf dieser Seite abrufbare
      Fassung.
    </p>
    <p>
      <em>Stand: {LAST_UPDATED_DE}</em>
    </p>

    <hr />

    <h1>Privacy Notice</h1>

    <p className="lead">
      This notice informs you pursuant to Art. 13 GDPR about the processing of
      personal data when visiting this website (marigold-ui.io) and when using
      the Marigold CLI. In case of discrepancies, the German version above
      prevails.
    </p>

    <h2>1. Controller</h2>
    <p>
      Reservix GmbH
      <br />
      Humboldtstrasse 2
      <br />
      79098 Freiburg im Breisgau
      <br />
      Germany
      <br />
      Phone: <a href="tel:+497618878800">+49 761 88788 0</a>
      <br />
      Email: <a href="mailto:info@reservix.de">info@reservix.de</a>
    </p>
    <p>
      Further details are available in our <a href="/impressum">legal notice</a>
      .
    </p>

    <h2>2. Data Protection Officer</h2>
    <p>
      You can reach our Data Protection Officer at:
      <br />
      Email:{' '}
      <a href="mailto:datenschutz@reservix.de">datenschutz@reservix.de</a>
      <br />
      or by post at the address above, marked “To the Data Protection Officer”.
    </p>

    <h2>3. Hosting and server log files</h2>
    <p>
      This website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
      91789, USA. Vercel processes data on our behalf as a processor; a data
      processing agreement pursuant to Art. 28 GDPR is in place.
    </p>
    <p>
      When a page is requested, technically necessary connection data is
      processed, in particular:
    </p>
    <ul>
      <li>IP address of the requesting device</li>
      <li>date and time of the request</li>
      <li>URL or file requested</li>
      <li>volume of data transferred and HTTP status code</li>
      <li>referrer URL</li>
      <li>browser type, browser version and operating system</li>
    </ul>
    <p>
      <strong>Purpose:</strong> delivering the website, ensuring system security
      and stability, and diagnosing errors.
      <br />
      <strong>Legal basis:</strong> Art. 6(1)(f) GDPR. Our legitimate interest
      is the secure and reliable operation of this website.
      <br />
      <strong>Retention:</strong> log data is stored only for as long as
      necessary for these purposes and is deleted thereafter.
    </p>

    <h2>4. Audience measurement (Vercel Web Analytics)</h2>
    <p>
      We use Vercel Web Analytics to understand which parts of the documentation
      are used and where improvements are needed.
    </p>
    <p>
      Vercel Web Analytics sets <strong>no cookies</strong> and neither stores
      nor reads <strong>any information on your device</strong>. No local
      storage, session storage or comparable technique is used. Accordingly,
      there is no access to your terminal equipment within the meaning of
      Section 25 TDDDG.
    </p>
    <p>
      Independently of that, we enable audience measurement{' '}
      <strong>only after your explicit consent</strong>. Until you have agreed,
      the analytics script is not loaded and no data is transmitted.
    </p>
    <p>Only aggregated information is collected, in particular:</p>
    <ul>
      <li>page requested and dynamic path</li>
      <li>referrer and filtered query parameters</li>
      <li>
        coarse location (country, region, city) derived from the IP address
      </li>
      <li>operating system, browser and device type</li>
      <li>timestamp of the request</li>
    </ul>
    <p>
      To distinguish repeat requests, Vercel derives a hash from the incoming
      request on the server side. This hash is{' '}
      <strong>discarded after 24 hours</strong> and does not allow recognition
      over a longer period or across other websites. No personal profile is
      created and no cross-site tracking takes place.
    </p>
    <p>
      <strong>Legal basis:</strong> Art. 6(1)(a) GDPR (consent).
      <br />
      <strong>Withdrawal:</strong> you may withdraw your consent at any time
      with effect for the future, using the “Cookie-Einstellungen” link at the
      bottom of every page. This does not affect the lawfulness of processing
      carried out before the withdrawal.
      <br />
      <strong>Storing your choice:</strong> your decision is stored in your
      browser’s local storage under the key <code>mg-consent</code> so that we
      do not have to ask again on every visit. That storage is strictly
      necessary to give effect to your choice (Section 25(2) no. 2 TDDDG) and
      therefore does not itself require consent.
    </p>

    <h2>5. Search function</h2>
    <p>
      The documentation search runs entirely on our own infrastructure. Your
      query is transmitted to our servers to be answered, processed there and{' '}
      <strong>not stored permanently</strong>. It is not shared with any third
      party.
    </p>
    <p>
      <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (providing usable
      documentation).
    </p>

    <h2>6. MCP endpoint</h2>
    <p>
      At <code>/mcp</code> we provide an interface that allows AI-assisted
      development tools to search the documentation. Use requires authentication
      and is available to authorised persons only.
    </p>
    <p>
      For semantic search, queries are transmitted to Amazon Web Services
      (Amazon Bedrock) in order to compute a vector representation of the query.
      A data processing agreement is in place and processing takes place in a
      region within the European Union.
    </p>
    <p>
      <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (providing development
      tools to authorised users).
    </p>

    <h2>7. Marigold CLI telemetry</h2>
    <p>
      The <code>@marigold/cli</code> command line tool sends anonymous usage
      statistics to this website by default, so that we can see which commands
      are used and where errors occur. This processing affects users of the CLI
      only, not visitors to this website.
    </p>
    <p>The following is transmitted:</p>
    <ul>
      <li>the command invoked and its exit code</li>
      <li>CLI version, Node.js version and operating system platform</li>
      <li>
        execution time (in coarse buckets) and whether a cache hit occurred
      </li>
      <li>
        whether execution was interactive and whether an AI agent was detected
      </li>
      <li>
        a randomly generated, non-identifying identifier (
        <code>anonymousId</code>) stored locally in your CLI configuration file
      </li>
    </ul>
    <p>
      No project content, file names, paths or search terms are transmitted.
      Telemetry is automatically disabled in CI environments.
    </p>
    <p>
      <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (improving our developer
      tooling).
      <br />
      <strong>Retention:</strong> events are stored per day and deleted
      automatically once the retention period expires.
      <br />
      <strong>Opting out:</strong> you can disable telemetry at any time by
      running <code>marigold telemetry disable</code> or by setting either the{' '}
      <code>MARIGOLD_TELEMETRY_DISABLED=1</code> or <code>DO_NOT_TRACK=1</code>{' '}
      environment variable.
    </p>

    <h2>8. Recipients and transfers to third countries</h2>
    <p>
      Personal data is transmitted to the processors named in this notice. Where
      data is transferred to countries outside the European Economic Area, this
      takes place on the basis of appropriate safeguards pursuant to Art. 44 et
      seq. GDPR, in particular the EU Commission’s Standard Contractual Clauses
      together with supplementary technical and organisational measures.
    </p>

    <h2>9. Your rights</h2>
    <p>You have the right to:</p>
    <ul>
      <li>request access to the data we hold about you (Art. 15 GDPR),</li>
      <li>request rectification of inaccurate data (Art. 16 GDPR),</li>
      <li>request erasure of your data (Art. 17 GDPR),</li>
      <li>request restriction of processing (Art. 18 GDPR), and</li>
      <li>
        request portability of your data in a commonly used format (Art. 20
        GDPR).
      </li>
    </ul>
    <p>
      <strong>Right to object under Art. 21 GDPR:</strong> where we process
      personal data on the basis of legitimate interests, you have the right to
      object at any time, on grounds relating to your particular situation. To
      do so, please contact{' '}
      <a href="mailto:datenschutz@reservix.de">datenschutz@reservix.de</a>.
    </p>

    <h2>10. Right to lodge a complaint</h2>
    <p>
      Without prejudice to any other remedy, you have the right to lodge a
      complaint with a data protection supervisory authority (Art. 77 GDPR). The
      authority responsible for us is:
    </p>
    <p>
      Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
      Baden-Württemberg
      <br />
      Lautenschlagerstrasse 20
      <br />
      70173 Stuttgart
      <br />
      Germany
    </p>

    <h2>11. Changes to this notice</h2>
    <p>
      We update this notice whenever the processing described here changes. The
      version available on this page is the one that applies.
    </p>
    <p>
      <em>Last updated: {LAST_UPDATED_EN}</em>
    </p>
  </>
);

export default Page;
