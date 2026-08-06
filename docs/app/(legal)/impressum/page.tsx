import type { Metadata } from 'next';

/**
 * DRAFT — must be reviewed and released by Legal / the DPO before going live.
 *
 * Company data was taken from https://www.reservix.de/impressum and must be
 * re-verified against the current commercial register entry. See the review
 * checklist in the accompanying PR description.
 *
 * German is the authoritative version (Reservix GmbH is a German company and
 * § 5 DDG applies regardless of the site language). The English translation is
 * provided because the site itself is English-only. Both versions must be kept
 * in sync — a stale translation is itself a compliance problem.
 */

export const metadata: Metadata = {
  title: 'Impressum | Marigold Design System',
  description: 'Impressum und Anbieterkennzeichnung gemäß § 5 DDG.',
};

const Page = () => (
  <>
    <h1>Impressum</h1>

    <p className="lead">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>

    <h2>Diensteanbieter</h2>
    <p>
      Reservix GmbH
      <br />
      Humboldtstraße 2
      <br />
      79098 Freiburg im Breisgau
      <br />
      Deutschland
    </p>

    <h2>Vertreten durch</h2>
    <p>Geschäftsführer: Helge Hollander, Katrin Stahlberg, Johannes Tolle</p>

    <h2>Kontakt</h2>
    <p>
      Telefon: <a href="tel:+497618878800">+49 761 88788 0</a>
      <br />
      E-Mail: <a href="mailto:info@reservix.de">info@reservix.de</a>
    </p>

    <h2>Registereintrag</h2>
    <p>
      Registergericht: Amtsgericht Freiburg
      <br />
      Registernummer: HRB 700054
    </p>

    <h2>Umsatzsteuer-Identifikationsnummer</h2>
    <p>
      Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
      <br />
      DE 814269842
    </p>

    <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p>
      Dr. Hann Wagner
      <br />
      Reservix GmbH
      <br />
      Humboldtstraße 2
      <br />
      79098 Freiburg im Breisgau
    </p>

    <h2>Verbraucherstreitbeilegung</h2>
    <p>
      Die Reservix GmbH ist nicht bereit und nicht verpflichtet, an
      Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
      teilzunehmen.
    </p>

    <h2>Haftung für Inhalte und Links</h2>
    <p>
      Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
      Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann
      jedoch keine Gewähr übernommen werden. Diese Website dokumentiert das
      Marigold Design System und richtet sich an Entwicklerinnen und Entwickler;
      die dargestellten Code-Beispiele werden ohne Zusicherung einer bestimmten
      Eignung bereitgestellt.
    </p>
    <p>
      Für Inhalte externer Links ist ausschließlich der jeweilige Anbieter
      verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße
      erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden entsprechende
      Links umgehend entfernt.
    </p>

    <h2>Urheberrecht und Lizenz</h2>
    <p>
      Der Quellcode des Marigold Design Systems steht unter der MIT-Lizenz und
      ist auf{' '}
      <a
        href="https://github.com/marigold-ui/marigold"
        rel="noopener noreferrer"
      >
        GitHub
      </a>{' '}
      verfügbar. Marken, Logos und redaktionelle Inhalte dieser Website sind
      hiervon ausgenommen und bleiben urheberrechtlich geschützt.
    </p>

    <hr />

    <h1>Legal Notice</h1>

    <p className="lead">
      Information pursuant to Section 5 of the German Digital Services Act
      (DDG). In case of discrepancies, the German version above prevails.
    </p>

    <h2>Service provider</h2>
    <p>
      Reservix GmbH
      <br />
      Humboldtstrasse 2
      <br />
      79098 Freiburg im Breisgau
      <br />
      Germany
    </p>

    <h2>Represented by</h2>
    <p>Managing Directors: Helge Hollander, Katrin Stahlberg, Johannes Tolle</p>

    <h2>Contact</h2>
    <p>
      Phone: <a href="tel:+497618878800">+49 761 88788 0</a>
      <br />
      Email: <a href="mailto:info@reservix.de">info@reservix.de</a>
    </p>

    <h2>Register entry</h2>
    <p>
      Register court: Local Court (Amtsgericht) of Freiburg
      <br />
      Registration number: HRB 700054
    </p>

    <h2>VAT identification number</h2>
    <p>
      VAT identification number pursuant to Section 27a of the German VAT Act:
      <br />
      DE 814269842
    </p>

    <h2>Responsible for editorial content pursuant to Section 18(2) MStV</h2>
    <p>
      Dr. Hann Wagner
      <br />
      Reservix GmbH
      <br />
      Humboldtstrasse 2
      <br />
      79098 Freiburg im Breisgau, Germany
    </p>

    <h2>Consumer dispute resolution</h2>
    <p>
      Reservix GmbH is neither willing nor obliged to participate in dispute
      resolution proceedings before a consumer arbitration board.
    </p>

    <h2>Liability for content and links</h2>
    <p>
      The content of this website has been compiled with the greatest possible
      care. However, no guarantee is given as to its accuracy, completeness or
      timeliness. This website documents the Marigold Design System and is
      addressed to developers; the code examples shown are provided without any
      warranty of fitness for a particular purpose.
    </p>
    <p>
      The respective provider is solely responsible for the content of external
      links. No legal violations were apparent at the time the links were set.
      Such links will be removed immediately if we become aware of any legal
      infringement.
    </p>

    <h2>Copyright and licence</h2>
    <p>
      The source code of the Marigold Design System is licensed under the MIT
      licence and is available on{' '}
      <a
        href="https://github.com/marigold-ui/marigold"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      . Trademarks, logos and editorial content on this website are excluded
      from this licence and remain protected by copyright.
    </p>
  </>
);

export default Page;
