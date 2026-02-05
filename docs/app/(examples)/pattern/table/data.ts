import type { Booking } from './booking';

// Common events that will be repeated
const popularEvents = [
  {
    title: 'Wombatlove - Eye of the Wombat',
    date: '20.04.2030',
    time: '20:00 Uhr',
    category: 'Normalpreis 1',
    venue: 'Wombatlove',
  },
  {
    title: 'Wombatlove - Wombats in Town',
    date: '24.04.2030',
    time: '20:00 Uhr',
    category: 'Normalpreis 1',
    venue: 'Wombatlove',
  },
  {
    title: 'Wombatlove - Every Wombat You Take',
    date: '24.09.2030',
    time: '20:00 Uhr',
    category: 'Normalpreis 1',
    venue: 'Wombatlove',
  },
  {
    title: 'We love Wombats - Freie Platzwahl',
    date: '10.09.2035',
    time: '10:00 Uhr',
    category: 'Ermäßigt',
    venue: 'Wombatlove',
  },
  {
    title: 'Bohemian Wombatsody',
    date: '20.04.2030',
    time: '20:00 Uhr',
    category: 'Normalpreis 1',
    venue: 'Wombatlove',
  },
];

export const bookings: Booking[] = [
  {
    id: '85175192',
    date: 'Mi, 14.01.2026 16:46:41 Uhr',
    customer: {
      number: '24379585',
      firstName: 'Laura',
      lastName: 'Warnher',
      address: {
        street: 'Unigostraße 1',
        postalCode: '79102',
        city: 'Freiburg',
      },
      email: 'laura.warnher@reservix.de',
      phone: '07958704048',
      iban: 'DE79 2004 1155 0799 2308 00',
      bic: 'COBADEFFXXX',
      bank: 'Commerzbank',
      accountHolder: 'Karin Metzger',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 100.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 100.0,
    payment: {
      status: 'Lastschrift',
      amount: 0.0,
      date: '21.01.2026 00:07:11',
      invoiceStatus: 'storniert',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Stornobedürg drucken'],
    },
    scanLog: 'E-Mail-Versand Scan-Logbuch',
  },
  {
    id: '85172443',
    date: 'Mi, 14.01.2026 14:50:15 Uhr',
    customer: {
      number: '24379585',
      firstName: 'Laura',
      lastName: 'Warnher',
      address: {
        street: 'Unigostraße 1',
        postalCode: '79102',
        city: 'Freiburg',
      },
      email: 'laura.warnher@reservix.de',
      phone: '07958704048',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 1,
        price: 200.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 200.0,
    payment: {
      status: 'Kasse',
      amount: 0.0,
    },
    invoice: {
      date: '14.01.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '85172275',
    date: 'Mi, 14.01.2026 14:01:31 Uhr',
    customer: {
      number: '24379280',
      firstName: 'Laura',
      lastName: 'Frau',
      address: {
        street: 'Unigostraße 1',
        postalCode: '79102',
        city: 'Freiburg',
      },
      email: 'laura.warnher@reservix.de',
      phone: '07958704048',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Rechnung',
      amount: 192.0,
      invoiceStatus: 'storniert',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Stornobedürg drucken'],
    },
  },
  {
    id: '85172272',
    date: 'Mi, 14.01.2026 13:59:24 Uhr',
    customer: {
      number: '24135207',
      firstName: 'Wernerweir',
      lastName: 'Warnz',
      address: {
        street: 'Hauptstraße 45',
        postalCode: '10115',
        city: 'Berlin',
      },
      email: 'w.warnz@email.de',
      iban: 'DE79 2004 1155 0799 2308 00',
      bic: 'COBADEFFXXX',
      bank: 'Deutsche Bank',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 1,
        price: 60.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 60.0,
    payment: {
      status: 'Rechnung',
      amount: 60.0,
    },
    invoice: {
      date: '14.01.2026',
      dueDate: '14.43:19 Uhr',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Ticketdruck pro Position'],
    },
  },
  {
    id: '85146842',
    date: 'Di, 13.01.2026 11:09:24 Uhr',
    customer: {
      number: '24379280',
      firstName: 'Asd',
      lastName: 'Test',
      address: {
        street: 'Unigostraße 1',
        postalCode: '79102',
        city: 'Freiburg',
      },
      email: 'test@reservix.de',
      phone: '07958704048',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 2,
        price: 224.0,
        pricePerItem: 112.0,
      },
    ],
    orderValue: 224.0,
    payment: {
      status: 'Rechnung',
      amount: 0.0,
      invoiceStatus: 'storniert',
    },
    invoice: {
      date: '20.01.2026',
      dueDate: '00:07:76',
      status: 'storniert',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Bestellterminale', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '85142168',
    date: 'Di, 13.01.2026 09:02:21 Uhr',
    customer: {
      number: '24135207',
      firstName: 'Wernerweir',
      lastName: 'Warnz',
      address: {
        street: 'Berliner Str. 123',
        postalCode: '10115',
        city: 'Berlin',
      },
      email: 'warnz@example.com',
      iban: 'DE79 2004 1155 0799 2308 00',
      bic: 'COBADEFFXXX',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 3,
        price: 300.0,
        pricePerItem: 100.0,
      },
    ],
    orderValue: 300.0,
    payment: {
      status: 'Kasse',
      amount: 0.0,
      invoiceStatus: 'storniert',
    },
    invoice: {
      date: '20.01.2026',
      dueDate: '00:07:19',
      status: 'storniert',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Überweisung (Vorkasse)', 'Dokumente'],
    },
  },
  {
    id: '83492344',
    date: 'Fr, 19.12.2025 10:38:31 Uhr',
    customer: {
      number: '23882460',
      firstName: 'Maxima',
      lastName: 'Musterfrau',
      address: {
        street: 'Humboldtstr. 2',
        postalCode: '79098',
        city: 'Freiburg',
      },
      email: 'maxima@testuser.de',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 2,
        price: 80.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 80.0,
    payment: {
      status: 'Überweisung',
      amount: 0.0,
    },
    invoice: {
      date: '10.11.2025',
      dueDate: '10:39:18 Uhr',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '83493182',
    date: 'Mo, 10.11.2025 11:42:33 Uhr',
    customer: {
      number: '25614880',
      firstName: 'Maxima',
      lastName: 'Musterfrau',
      address: {
        street: 'Testweg 17',
        postalCode: '80331',
        city: 'München',
      },
      email: 'dd-testuser1@reservix.de',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 120.0,
    payment: {
      status: 'Rechnung',
      method: 'Rechnung',
      amount: 60.0,
      invoiceStatus: 'teilweise',
    },
    invoice: {
      date: '10.11.2025',
      dueDate: '10:40:43',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Bestellterminale', 'Tickets sperren'],
    },
  },
  {
    id: '83493158',
    date: 'Mo, 10.11.2025 09:21:15 Uhr',
    customer: {
      number: '23882460',
      firstName: 'Maxima',
      lastName: 'Musterfrau',
      address: {
        street: 'Humboldtstr. 2',
        postalCode: '79098',
        city: 'Freiburg',
      },
      email: 'maxima@example.de',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 1,
        price: 60.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 60.0,
    payment: {
      status: 'Rechnung',
      amount: 60.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '83492360',
    date: 'Mo, 10.11.2025 08:15:17 Uhr',
    customer: {
      number: '23883617',
      firstName: 'Laura',
      lastName: 'Frau',
      address: {
        street: 'Kaiserstraße 99',
        postalCode: '60311',
        city: 'Frankfurt',
      },
      email: 'laura.frau@mail.de',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 1,
        price: 240.0,
        pricePerItem: 240.0,
      },
    ],
    orderValue: 240.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 300.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '10.11.2025, 08:20',
    },
    actions: {
      items: ['Teilnahmebedingungen', 'Tickets drucken'],
    },
  },
  {
    id: '83445621',
    date: 'Fr, 07.11.2025 15:33:42 Uhr',
    customer: {
      number: '23771234',
      firstName: 'Hans',
      lastName: 'Schmidt',
      address: {
        street: 'Mozartstraße 15',
        postalCode: '50674',
        city: 'Köln',
      },
      email: 'h.schmidt@email.com',
      phone: '022154321',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 4,
        price: 384.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 384.0,
    payment: {
      status: 'Kasse',
      amount: 384.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '07.11.2025, 15:40',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '83401928',
    date: 'Do, 06.11.2025 11:22:19 Uhr',
    customer: {
      number: '22984567',
      firstName: 'Emma',
      lastName: 'Weber',
      address: {
        street: 'Goetheweg 8',
        postalCode: '20095',
        city: 'Hamburg',
      },
      email: 'emma.weber@provider.de',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Rechnung',
      amount: 192.0,
    },
    invoice: {
      date: '06.11.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '83398274',
    date: 'Do, 06.11.2025 09:15:33 Uhr',
    customer: {
      number: '22945123',
      firstName: 'Lukas',
      lastName: 'Becker',
      address: {
        street: 'Schillerplatz 3',
        postalCode: '70173',
        city: 'Stuttgart',
      },
      email: 'lukas.becker@mail.com',
      phone: '071134567',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 3,
        price: 150.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 150.0,
    payment: {
      status: 'Kasse',
      amount: 150.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '06.11.2025, 09:20',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '83365489',
    date: 'Mi, 05.11.2025 16:44:21 Uhr',
    customer: {
      number: '22881456',
      firstName: 'Sophie',
      lastName: 'Müller',
      address: {
        street: 'Bahnhofstraße 22',
        postalCode: '01067',
        city: 'Dresden',
      },
      email: 'sophie.mueller@example.de',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 1,
        price: 200.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 200.0,
    payment: {
      status: 'Lastschrift',
      amount: 200.0,
    },
    invoice: {
      date: '05.11.2025',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '83342156',
    date: 'Mi, 05.11.2025 10:12:45 Uhr',
    customer: {
      number: '22798234',
      firstName: 'Felix',
      lastName: 'Hoffmann',
      address: {
        street: 'Leopoldstraße 88',
        postalCode: '80802',
        city: 'München',
      },
      email: 'f.hoffmann@provider.com',
      phone: '089765432',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 5,
        price: 200.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 200.0,
    payment: {
      status: 'Kasse',
      amount: 200.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '05.11.2025, 10:18',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '83315678',
    date: 'Di, 04.11.2025 14:55:18 Uhr',
    customer: {
      number: '22745891',
      firstName: 'Anna',
      lastName: 'Fischer',
      address: {
        street: 'Marienplatz 11',
        postalCode: '90402',
        city: 'Nürnberg',
      },
      email: 'anna.fischer@email.de',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Rechnung',
      amount: 192.0,
    },
    invoice: {
      date: '04.11.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '83298745',
    date: 'Di, 04.11.2025 11:33:29 Uhr',
    customer: {
      number: '22698123',
      firstName: 'Paul',
      lastName: 'Wagner',
      address: {
        street: 'Friedrichstraße 50',
        postalCode: '10117',
        city: 'Berlin',
      },
      email: 'paul.wagner@mail.de',
      phone: '030123456',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 1,
        price: 96.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 96.0,
    payment: {
      status: 'Kasse',
      amount: 96.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '04.11.2025, 11:40',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '83267412',
    date: 'Mo, 03.11.2025 16:22:10 Uhr',
    customer: {
      number: '22634567',
      firstName: 'Marie',
      lastName: 'Klein',
      address: {
        street: 'Königsallee 77',
        postalCode: '40212',
        city: 'Düsseldorf',
      },
      email: 'marie.klein@provider.de',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 100.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 100.0,
    payment: {
      status: 'Rechnung',
      amount: 100.0,
    },
    invoice: {
      date: '03.11.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '83245189',
    date: 'Mo, 03.11.2025 09:45:55 Uhr',
    customer: {
      number: '22589234',
      firstName: 'Tim',
      lastName: 'Schulz',
      address: {
        street: 'Alexanderplatz 1',
        postalCode: '10178',
        city: 'Berlin',
      },
      email: 'tim.schulz@email.com',
      phone: '030987654',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 3,
        price: 600.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 600.0,
    payment: {
      status: 'Lastschrift',
      amount: 600.0,
    },
    invoice: {
      date: '03.11.2025',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung'],
    },
  },
  {
    id: '83198765',
    date: 'So, 02.11.2025 19:30:42 Uhr',
    customer: {
      number: '22512345',
      firstName: 'Lena',
      lastName: 'Krause',
      address: {
        street: 'Elbchaussee 150',
        postalCode: '22763',
        city: 'Hamburg',
      },
      email: 'lena.krause@mail.de',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 2,
        price: 80.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 80.0,
    payment: {
      status: 'Kasse',
      amount: 80.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '02.11.2025, 19:35',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '83167234',
    date: 'So, 02.11.2025 14:18:27 Uhr',
    customer: {
      number: '22467891',
      firstName: 'Jonas',
      lastName: 'Zimmermann',
      address: {
        street: 'Münchener Straße 45',
        postalCode: '60329',
        city: 'Frankfurt',
      },
      email: 'jonas.z@provider.com',
      phone: '069234567',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 4,
        price: 384.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 384.0,
    payment: {
      status: 'Rechnung',
      amount: 384.0,
    },
    invoice: {
      date: '02.11.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '83134567',
    date: 'Sa, 01.11.2025 20:55:13 Uhr',
    customer: {
      number: '22398456',
      firstName: 'Lisa',
      lastName: 'Braun',
      address: {
        street: 'Breite Straße 88',
        postalCode: '50667',
        city: 'Köln',
      },
      email: 'lisa.braun@email.de',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 1,
        price: 96.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 96.0,
    payment: {
      status: 'Kasse',
      amount: 96.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '01.11.2025, 21:00',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '83112345',
    date: 'Sa, 01.11.2025 17:20:48 Uhr',
    customer: {
      number: '22345678',
      firstName: 'Max',
      lastName: 'Koch',
      address: {
        street: 'Theaterplatz 2',
        postalCode: '01067',
        city: 'Dresden',
      },
      email: 'max.koch@provider.de',
      phone: '0351876543',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 5,
        price: 250.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 250.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 250.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '83089234',
    date: 'Sa, 01.11.2025 12:08:19 Uhr',
    customer: {
      number: '22289123',
      firstName: 'Julia',
      lastName: 'Schröder',
      address: {
        street: 'Schlossstraße 100',
        postalCode: '70176',
        city: 'Stuttgart',
      },
      email: 'julia.schroeder@mail.com',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 2,
        price: 400.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 400.0,
    payment: {
      status: 'Rechnung',
      amount: 400.0,
    },
    invoice: {
      date: '01.11.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '83067891',
    date: 'Fr, 31.10.2025 18:45:35 Uhr',
    customer: {
      number: '22234567',
      firstName: 'David',
      lastName: 'Neumann',
      address: {
        street: 'Rathausmarkt 5',
        postalCode: '20095',
        city: 'Hamburg',
      },
      email: 'd.neumann@email.de',
      phone: '040567890',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 3,
        price: 120.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 120.0,
    payment: {
      status: 'Kasse',
      amount: 120.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '31.10.2025, 18:50',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '83045678',
    date: 'Fr, 31.10.2025 15:30:22 Uhr',
    customer: {
      number: '22178234',
      firstName: 'Sarah',
      lastName: 'Wolf',
      address: {
        street: 'Karolinenplatz 12',
        postalCode: '90402',
        city: 'Nürnberg',
      },
      email: 'sarah.wolf@provider.de',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Lastschrift',
      amount: 192.0,
    },
    invoice: {
      date: '31.10.2025',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '83023456',
    date: 'Fr, 31.10.2025 10:15:09 Uhr',
    customer: {
      number: '22123891',
      firstName: 'Michael',
      lastName: 'Richter',
      address: {
        street: 'Unter den Linden 44',
        postalCode: '10117',
        city: 'Berlin',
      },
      email: 'michael.richter@mail.de',
      phone: '030345678',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 3,
        price: 288.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 288.0,
    payment: {
      status: 'Kasse',
      amount: 288.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '31.10.2025, 10:20',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '82998234',
    date: 'Do, 30.10.2025 19:40:51 Uhr',
    customer: {
      number: '22067345',
      firstName: 'Nina',
      lastName: 'Lange',
      address: {
        street: 'Bismarckstraße 33',
        postalCode: '40210',
        city: 'Düsseldorf',
      },
      email: 'nina.lange@email.com',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 1,
        price: 50.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 50.0,
    payment: {
      status: 'Rechnung',
      amount: 50.0,
    },
    invoice: {
      date: '30.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82976123',
    date: 'Do, 30.10.2025 16:22:37 Uhr',
    customer: {
      number: '22012456',
      firstName: 'Tom',
      lastName: 'Hartmann',
      address: {
        street: 'Sendlinger Straße 20',
        postalCode: '80331',
        city: 'München',
      },
      email: 'tom.hartmann@provider.com',
      phone: '089987654',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 4,
        price: 800.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 800.0,
    payment: {
      status: 'Kasse',
      amount: 800.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '30.10.2025, 16:30',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '82954567',
    date: 'Do, 30.10.2025 11:55:24 Uhr',
    customer: {
      number: '21967234',
      firstName: 'Katharina',
      lastName: 'Berger',
      address: {
        street: 'Alte Brücke 7',
        postalCode: '69117',
        city: 'Heidelberg',
      },
      email: 'k.berger@mail.de',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 1,
        price: 40.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 40.0,
    payment: {
      status: 'Rechnung',
      amount: 40.0,
    },
    invoice: {
      date: '30.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82932345',
    date: 'Mi, 29.10.2025 20:33:15 Uhr',
    customer: {
      number: '21912345',
      firstName: 'Sebastian',
      lastName: 'Frank',
      address: {
        street: 'Poststraße 88',
        postalCode: '20354',
        city: 'Hamburg',
      },
      email: 'sebastian.frank@email.de',
      phone: '040234567',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 5,
        price: 480.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 480.0,
    payment: {
      status: 'Lastschrift',
      amount: 480.0,
    },
    invoice: {
      date: '29.10.2025',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung'],
    },
  },
  {
    id: '82910123',
    date: 'Mi, 29.10.2025 17:08:42 Uhr',
    customer: {
      number: '21867891',
      firstName: 'Vanessa',
      lastName: 'Schmitt',
      address: {
        street: 'Rheinufer 15',
        postalCode: '40221',
        city: 'Düsseldorf',
      },
      email: 'vanessa.schmitt@provider.de',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Kasse',
      amount: 192.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '29.10.2025, 17:15',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '82887891',
    date: 'Mi, 29.10.2025 13:45:29 Uhr',
    customer: {
      number: '21812456',
      firstName: 'Christian',
      lastName: 'Werner',
      address: {
        street: 'Königstraße 1',
        postalCode: '70173',
        city: 'Stuttgart',
      },
      email: 'christian.werner@mail.com',
      phone: '0711123456',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 100.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 100.0,
    payment: {
      status: 'Rechnung',
      amount: 100.0,
    },
    invoice: {
      date: '29.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82865678',
    date: 'Mi, 29.10.2025 09:20:17 Uhr',
    customer: {
      number: '21767234',
      firstName: 'Petra',
      lastName: 'Meyer',
      address: {
        street: 'Neumarkt 22',
        postalCode: '04109',
        city: 'Leipzig',
      },
      email: 'petra.meyer@email.de',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 3,
        price: 600.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 600.0,
    payment: {
      status: 'Kasse',
      amount: 600.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '29.10.2025, 09:25',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '82843456',
    date: 'Di, 28.10.2025 21:15:55 Uhr',
    customer: {
      number: '21712345',
      firstName: 'Martin',
      lastName: 'Bauer',
      address: {
        street: 'Ludwigstraße 50',
        postalCode: '80539',
        city: 'München',
      },
      email: 'martin.bauer@provider.com',
      phone: '089345678',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 4,
        price: 160.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 160.0,
    payment: {
      status: 'Rechnung',
      amount: 160.0,
    },
    invoice: {
      date: '28.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82821234',
    date: 'Di, 28.10.2025 18:40:33 Uhr',
    customer: {
      number: '21667891',
      firstName: 'Sandra',
      lastName: 'Huber',
      address: {
        street: 'Altstadt 18',
        postalCode: '90403',
        city: 'Nürnberg',
      },
      email: 'sandra.huber@mail.de',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 1,
        price: 96.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 96.0,
    payment: {
      status: 'Kasse',
      amount: 96.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '28.10.2025, 18:45',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '82799123',
    date: 'Di, 28.10.2025 14:25:18 Uhr',
    customer: {
      number: '21612456',
      firstName: 'Daniel',
      lastName: 'Keller',
      address: {
        street: 'Spandauer Straße 99',
        postalCode: '10178',
        city: 'Berlin',
      },
      email: 'd.keller@email.com',
      phone: '030456789',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Lastschrift',
      amount: 192.0,
    },
    invoice: {
      date: '28.10.2025',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '82776891',
    date: 'Di, 28.10.2025 10:50:06 Uhr',
    customer: {
      number: '21567234',
      firstName: 'Claudia',
      lastName: 'Vogel',
      address: {
        street: 'Reeperbahn 77',
        postalCode: '20359',
        city: 'Hamburg',
      },
      email: 'claudia.vogel@provider.de',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 6,
        price: 300.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 300.0,
    payment: {
      status: 'Kasse',
      amount: 300.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '28.10.2025, 10:55',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '82754678',
    date: 'Mo, 27.10.2025 22:35:41 Uhr',
    customer: {
      number: '21512345',
      firstName: 'Andreas',
      lastName: 'Herrmann',
      address: {
        street: 'Mainzer Landstraße 66',
        postalCode: '60325',
        city: 'Frankfurt',
      },
      email: 'andreas.herrmann@mail.de',
      phone: '069567890',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 1,
        price: 200.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 200.0,
    payment: {
      status: 'Rechnung',
      amount: 200.0,
    },
    invoice: {
      date: '27.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82732456',
    date: 'Mo, 27.10.2025 19:18:27 Uhr',
    customer: {
      number: '21467891',
      firstName: 'Stefanie',
      lastName: 'Schubert',
      address: {
        street: 'Schlossplatz 5',
        postalCode: '70173',
        city: 'Stuttgart',
      },
      email: 'stefanie.schubert@email.de',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 2,
        price: 80.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 80.0,
    payment: {
      status: 'Kasse',
      amount: 80.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '27.10.2025, 19:25',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '82710234',
    date: 'Mo, 27.10.2025 15:05:14 Uhr',
    customer: {
      number: '21412456',
      firstName: 'Thomas',
      lastName: 'Groß',
      address: {
        street: 'Rathausplatz 8',
        postalCode: '50667',
        city: 'Köln',
      },
      email: 'thomas.gross@provider.com',
      phone: '0221678901',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 3,
        price: 288.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 288.0,
    payment: {
      status: 'Rechnung',
      amount: 288.0,
    },
    invoice: {
      date: '27.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82688123',
    date: 'Mo, 27.10.2025 11:42:59 Uhr',
    customer: {
      number: '21367234',
      firstName: 'Simone',
      lastName: 'Dietrich',
      address: {
        street: 'Prager Straße 33',
        postalCode: '01069',
        city: 'Dresden',
      },
      email: 'simone.dietrich@mail.de',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 4,
        price: 384.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 384.0,
    payment: {
      status: 'Lastschrift',
      amount: 384.0,
    },
    invoice: {
      date: '27.10.2025',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung'],
    },
  },
  {
    id: '82665891',
    date: 'So, 26.10.2025 23:28:35 Uhr',
    customer: {
      number: '21312345',
      firstName: 'Frank',
      lastName: 'Scholz',
      address: {
        street: 'Kurfürstendamm 111',
        postalCode: '10711',
        city: 'Berlin',
      },
      email: 'frank.scholz@email.com',
      phone: '030789012',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 1,
        price: 50.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 50.0,
    payment: {
      status: 'Kasse',
      amount: 50.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '26.10.2025, 23:35',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '82643678',
    date: 'So, 26.10.2025 20:15:22 Uhr',
    customer: {
      number: '21267891',
      firstName: 'Anja',
      lastName: 'Seidel',
      address: {
        street: 'Mönckebergstraße 44',
        postalCode: '20095',
        city: 'Hamburg',
      },
      email: 'anja.seidel@provider.de',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 2,
        price: 400.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 400.0,
    payment: {
      status: 'Rechnung',
      amount: 400.0,
    },
    invoice: {
      date: '26.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82621456',
    date: 'So, 26.10.2025 17:50:08 Uhr',
    customer: {
      number: '21212456',
      firstName: 'Markus',
      lastName: 'Lorenz',
      address: {
        street: 'Residenzstraße 7',
        postalCode: '80333',
        city: 'München',
      },
      email: 'markus.lorenz@mail.com',
      phone: '089678901',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 5,
        price: 200.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 200.0,
    payment: {
      status: 'Kasse',
      amount: 200.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '26.10.2025, 17:55',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '82599234',
    date: 'So, 26.10.2025 14:32:45 Uhr',
    customer: {
      number: '21167234',
      firstName: 'Kerstin',
      lastName: 'Jung',
      address: {
        street: 'Augustusplatz 9',
        postalCode: '04109',
        city: 'Leipzig',
      },
      email: 'kerstin.jung@email.de',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Rechnung',
      amount: 192.0,
    },
    invoice: {
      date: '26.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82577123',
    date: 'So, 26.10.2025 10:18:31 Uhr',
    customer: {
      number: '21112345',
      firstName: 'Uwe',
      lastName: 'Stein',
      address: {
        street: 'Hafenstraße 20',
        postalCode: '40221',
        city: 'Düsseldorf',
      },
      email: 'uwe.stein@provider.com',
      phone: '0211890123',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 1,
        price: 96.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 96.0,
    payment: {
      status: 'Lastschrift',
      amount: 96.0,
    },
    invoice: {
      date: '26.10.2025',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '82554891',
    date: 'Sa, 25.10.2025 21:55:17 Uhr',
    customer: {
      number: '21067891',
      firstName: 'Birgit',
      lastName: 'Heinrich',
      address: {
        street: 'Königsstraße 55',
        postalCode: '70173',
        city: 'Stuttgart',
      },
      email: 'birgit.heinrich@mail.de',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 3,
        price: 150.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 150.0,
    payment: {
      status: 'Kasse',
      amount: 150.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '25.10.2025, 22:00',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '82532678',
    date: 'Sa, 25.10.2025 18:40:53 Uhr',
    customer: {
      number: '21012456',
      firstName: 'Ralf',
      lastName: 'Pohl',
      address: {
        street: 'Neuhauser Straße 88',
        postalCode: '80331',
        city: 'München',
      },
      email: 'ralf.pohl@email.com',
      phone: '089901234',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 4,
        price: 800.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 800.0,
    payment: {
      status: 'Rechnung',
      amount: 800.0,
    },
    invoice: {
      date: '25.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82510456',
    date: 'Sa, 25.10.2025 15:25:39 Uhr',
    customer: {
      number: '20967234',
      firstName: 'Monika',
      lastName: 'Busch',
      address: {
        street: 'Zeil 99',
        postalCode: '60313',
        city: 'Frankfurt',
      },
      email: 'monika.busch@provider.de',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 1,
        price: 40.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 40.0,
    payment: {
      status: 'Kasse',
      amount: 40.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '25.10.2025, 15:30',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '82488234',
    date: 'Sa, 25.10.2025 11:10:25 Uhr',
    customer: {
      number: '20912345',
      firstName: 'Jürgen',
      lastName: 'Engel',
      address: {
        street: 'Königsallee 88',
        postalCode: '40212',
        city: 'Düsseldorf',
      },
      email: 'juergen.engel@mail.de',
      phone: '0211012345',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 5,
        price: 480.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 480.0,
    payment: {
      status: 'Rechnung',
      amount: 480.0,
    },
    invoice: {
      date: '25.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82466123',
    date: 'Fr, 24.10.2025 22:45:11 Uhr',
    customer: {
      number: '20867891',
      firstName: 'Gabriele',
      lastName: 'Becker',
      address: {
        street: 'Brühl 12',
        postalCode: '04109',
        city: 'Leipzig',
      },
      email: 'gabriele.becker@email.de',
    },
    orderItems: [
      {
        event: popularEvents[4],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Lastschrift',
      amount: 192.0,
    },
    invoice: {
      date: '24.10.2025',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung'],
    },
  },
  {
    id: '82443891',
    date: 'Fr, 24.10.2025 19:30:57 Uhr',
    customer: {
      number: '20812456',
      firstName: 'Holger',
      lastName: 'Roth',
      address: {
        street: 'Jungfernstieg 44',
        postalCode: '20354',
        city: 'Hamburg',
      },
      email: 'holger.roth@provider.com',
      phone: '040123456',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 100.0,
        pricePerItem: 50.0,
      },
    ],
    orderValue: 100.0,
    payment: {
      status: 'Kasse',
      amount: 100.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '24.10.2025, 19:35',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  {
    id: '82421678',
    date: 'Fr, 24.10.2025 16:15:43 Uhr',
    customer: {
      number: '20767234',
      firstName: 'Sabine',
      lastName: 'Fuchs',
      address: {
        street: 'Marienplatz 20',
        postalCode: '80331',
        city: 'München',
      },
      email: 'sabine.fuchs@mail.de',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 1,
        price: 200.0,
        pricePerItem: 200.0,
      },
    ],
    orderValue: 200.0,
    payment: {
      status: 'Rechnung',
      amount: 200.0,
    },
    invoice: {
      date: '24.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  {
    id: '82399456',
    date: 'Fr, 24.10.2025 12:50:29 Uhr',
    customer: {
      number: '20712345',
      firstName: 'Werner',
      lastName: 'Scholz',
      address: {
        street: 'Altmarkt 7',
        postalCode: '01067',
        city: 'Dresden',
      },
      email: 'werner.scholz@email.com',
      phone: '0351234567',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 3,
        price: 120.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 120.0,
    payment: {
      status: 'Kasse',
      amount: 120.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '24.10.2025, 12:55',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  {
    id: '82377234',
    date: 'Fr, 24.10.2025 09:35:15 Uhr',
    customer: {
      number: '20667891',
      firstName: 'Ingrid',
      lastName: 'Vogt',
      address: {
        street: 'Breite Straße 33',
        postalCode: '50667',
        city: 'Köln',
      },
      email: 'ingrid.vogt@provider.de',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 2,
        price: 192.0,
        pricePerItem: 96.0,
      },
    ],
    orderValue: 192.0,
    payment: {
      status: 'Rechnung',
      amount: 192.0,
    },
    invoice: {
      date: '24.10.2025',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
];
