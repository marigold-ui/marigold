import type { Booking } from './booking';

// Diverse events with different categories and seating types
const popularEvents = [
  {
    title: 'Wombatlove - Eye of the Wombat',
    date: '20.04.2030',
    time: '20:00 Uhr',
    category: 'Regular Price',
    subcategory: 'Reserved Seating',
    venue: 'Wombatlove Arena',
  },
  {
    title: 'Wombatlove - Wombats in Town',
    date: '24.04.2030',
    time: '20:00 Uhr',
    category: 'VIP',
    subcategory: 'Section A',
    venue: 'Wombatlove Arena',
  },
  {
    title: 'Wombatlove - Every Wombat You Take',
    date: '24.09.2030',
    time: '20:00 Uhr',
    category: 'Student Discount',
    subcategory: 'General Admission',
    venue: 'Wombatlove Theater',
  },
  {
    title: 'We love Wombats - Open Seating',
    date: '10.09.2035',
    time: '10:00 Uhr',
    category: 'Family Pass',
    subcategory: 'General Admission',
    venue: 'Wombatlove Park',
  },
  {
    title: 'Bohemian Wombatsody',
    date: '20.04.2030',
    time: '20:00 Uhr',
    category: 'Regular Price',
    subcategory: 'Section B',
    venue: 'Grand Theater',
  },
  {
    title: 'Wombat Symphony Orchestra',
    date: '15.05.2030',
    time: '19:30 Uhr',
    category: 'Premium',
    subcategory: 'Reserved Seating',
    venue: 'Concert Hall',
  },
  {
    title: 'Comedy Night with Wombats',
    date: '22.06.2030',
    time: '21:00 Uhr',
    category: 'Early Bird',
    subcategory: 'General Admission',
    venue: 'Comedy Club',
  },
  {
    title: 'Wombat Rock Festival',
    date: '12.07.2030',
    time: '14:00 Uhr',
    category: 'Weekend Pass',
    subcategory: 'General Admission',
    venue: 'Festival Grounds',
  },
  {
    title: 'Classical Wombat Evening',
    date: '18.08.2030',
    time: '20:00 Uhr',
    category: 'Senior Discount',
    subcategory: 'Reserved Seating',
    venue: 'Opera House',
  },
  {
    title: 'Wombat Jazz Night',
    date: '05.09.2030',
    time: '22:00 Uhr',
    category: 'Regular Price',
    subcategory: 'Section C',
    venue: 'Jazz Lounge',
  },
  {
    title: 'Kids Love Wombats',
    date: '25.09.2030',
    time: '15:00 Uhr',
    category: 'Child Ticket',
    subcategory: 'General Admission',
    venue: 'Family Arena',
  },
  {
    title: 'Wombat Dance Spectacular',
    date: '30.10.2030',
    time: '19:00 Uhr',
    category: 'Group Discount',
    subcategory: 'Reserved Seating',
    venue: 'Dance Theater',
  },
];

export const bookings: Booking[] = [
  // Order with multiple items in different categories
  {
    id: '95000001',
    date: 'Mo, 03.02.2026 10:30:15 Uhr',
    customer: {
      number: '30000001',
      firstName: 'Emma',
      lastName: 'Schmidt',
      address: {
        street: 'Hauptstraße 123',
        postalCode: '10115',
        city: 'Berlin',
      },
      email: 'emma.schmidt@email.de',
      phone: '030123456789',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[1],
        quantity: 1,
        price: 150.0,
        pricePerItem: 150.0,
      },
      {
        event: popularEvents[6],
        quantity: 3,
        price: 90.0,
        pricePerItem: 30.0,
      },
    ],
    orderValue: 360.0,
    payment: {
      status: 'Rechnung',
      amount: 360.0,
    },
    invoice: {
      date: '03.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Dokumente'],
    },
  },
  // Partially cancelled order
  {
    id: '95000002',
    date: 'Mo, 03.02.2026 11:45:22 Uhr',
    customer: {
      number: '30000002',
      firstName: 'Lukas',
      lastName: 'Müller',
      address: {
        street: 'Gartenweg 45',
        postalCode: '80331',
        city: 'München',
      },
      email: 'lukas.mueller@provider.de',
      phone: '089987654321',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 4,
        price: 200.0,
        pricePerItem: 50.0,
      },
      {
        event: popularEvents[4],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
        cancelled: true,
      },
      {
        event: popularEvents[8],
        quantity: 2,
        price: 70.0,
        pricePerItem: 35.0,
      },
    ],
    orderValue: 270.0,
    payment: {
      status: 'Kasse',
      amount: 270.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '03.02.2026, 12:00',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Zutrittsstatus', 'Dokumente'],
    },
  },
  // General admission order
  {
    id: '95000003',
    date: 'Mo, 03.02.2026 14:20:30 Uhr',
    customer: {
      number: '30000003',
      firstName: 'Sophie',
      lastName: 'Wagner',
      address: {
        street: 'Schillerstraße 78',
        postalCode: '50667',
        city: 'Köln',
      },
      email: 'sophie.wagner@email.com',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 4,
        price: 160.0,
        pricePerItem: 40.0,
      },
      {
        event: popularEvents[10],
        quantity: 2,
        price: 50.0,
        pricePerItem: 25.0,
      },
    ],
    orderValue: 210.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 210.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  // VIP and Premium mix
  {
    id: '95000004',
    date: 'Di, 04.02.2026 09:15:45 Uhr',
    customer: {
      number: '30000004',
      firstName: 'Maximilian',
      lastName: 'Fischer',
      address: {
        street: 'Königsallee 200',
        postalCode: '40212',
        city: 'Düsseldorf',
      },
      email: 'max.fischer@business.de',
      phone: '0211555777',
      iban: 'DE89 3704 0044 0532 0130 00',
      bic: 'COBADEFFXXX',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 2,
        price: 300.0,
        pricePerItem: 150.0,
      },
      {
        event: popularEvents[5],
        quantity: 2,
        price: 240.0,
        pricePerItem: 120.0,
      },
    ],
    orderValue: 540.0,
    payment: {
      status: 'Lastschrift',
      amount: 540.0,
    },
    invoice: {
      date: '04.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '04.02.2026, 09:30',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  // Student discount order with cancellation
  {
    id: '95000005',
    date: 'Di, 04.02.2026 12:30:18 Uhr',
    customer: {
      number: '30000005',
      firstName: 'Laura',
      lastName: 'Becker',
      address: {
        street: 'Universitätsstraße 12',
        postalCode: '69117',
        city: 'Heidelberg',
      },
      email: 'laura.becker@student.de',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 1,
        price: 50.0,
        pricePerItem: 50.0,
      },
      {
        event: popularEvents[7],
        quantity: 2,
        price: 140.0,
        pricePerItem: 70.0,
        cancelled: true,
      },
    ],
    orderValue: 50.0,
    payment: {
      status: 'Rechnung',
      amount: 50.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Personalisierung'],
    },
  },
  // Large family order
  {
    id: '95000006',
    date: 'Mi, 05.02.2026 16:45:33 Uhr',
    customer: {
      number: '30000006',
      firstName: 'Anna',
      lastName: 'Hoffmann',
      address: {
        street: 'Waldweg 56',
        postalCode: '20095',
        city: 'Hamburg',
      },
      email: 'anna.hoffmann@family.de',
      phone: '040888999',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 2,
        price: 80.0,
        pricePerItem: 40.0,
      },
      {
        event: popularEvents[10],
        quantity: 3,
        price: 75.0,
        pricePerItem: 25.0,
      },
      {
        event: popularEvents[11],
        quantity: 1,
        price: 90.0,
        pricePerItem: 90.0,
      },
    ],
    orderValue: 245.0,
    payment: {
      status: 'Kasse',
      amount: 245.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '05.02.2026, 17:00',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  // Senior discount with reserved seating
  {
    id: '95000007',
    date: 'Mi, 05.02.2026 10:20:12 Uhr',
    customer: {
      number: '30000007',
      firstName: 'Heinrich',
      lastName: 'Weber',
      address: {
        street: 'Rosengarten 23',
        postalCode: '70173',
        city: 'Stuttgart',
      },
      email: 'h.weber@senior.de',
      phone: '0711333444',
    },
    orderItems: [
      {
        event: popularEvents[8],
        quantity: 2,
        price: 70.0,
        pricePerItem: 35.0,
      },
      {
        event: popularEvents[9],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 190.0,
    payment: {
      status: 'Rechnung',
      amount: 190.0,
    },
    invoice: {
      date: '05.02.2026',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  // Mixed order with partial cancellation
  {
    id: '95000008',
    date: 'Do, 06.02.2026 15:55:27 Uhr',
    customer: {
      number: '30000008',
      firstName: 'Julia',
      lastName: 'Koch',
      address: {
        street: 'Marktplatz 88',
        postalCode: '60311',
        city: 'Frankfurt',
      },
      email: 'julia.koch@email.de',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 3,
        price: 180.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[6],
        quantity: 2,
        price: 60.0,
        pricePerItem: 30.0,
        cancelled: true,
      },
      {
        event: popularEvents[4],
        quantity: 1,
        price: 60.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 240.0,
    payment: {
      status: 'Lastschrift',
      amount: 240.0,
      invoiceStatus: 'teilweise',
    },
    invoice: {
      date: '06.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Scanstatus bearbeiten'],
    },
  },
  // Group discount order
  {
    id: '95000009',
    date: 'Do, 06.02.2026 11:10:40 Uhr',
    customer: {
      number: '30000009',
      firstName: 'Thomas',
      lastName: 'Schneider',
      address: {
        street: 'Gruppenstraße 15',
        postalCode: '04109',
        city: 'Leipzig',
      },
      email: 'thomas.schneider@company.de',
      phone: '034166677788',
    },
    orderItems: [
      {
        event: popularEvents[11],
        quantity: 10,
        price: 800.0,
        pricePerItem: 80.0,
      },
    ],
    orderValue: 800.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 800.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '06.02.2026, 11:30',
    },
    actions: {
      items: ['Bestellterminale', 'Tickets drucken'],
    },
  },
  // Jazz night with general admission
  {
    id: '95000010',
    date: 'Fr, 07.02.2026 18:25:55 Uhr',
    customer: {
      number: '30000010',
      firstName: 'Maria',
      lastName: 'Zimmermann',
      address: {
        street: 'Jazzallee 77',
        postalCode: '90402',
        city: 'Nürnberg',
      },
      email: 'maria.zimmermann@jazz.de',
    },
    orderItems: [
      {
        event: popularEvents[9],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[6],
        quantity: 2,
        price: 60.0,
        pricePerItem: 30.0,
      },
    ],
    orderValue: 180.0,
    payment: {
      status: 'Kasse',
      amount: 180.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '07.02.2026, 18:40',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  // Festival weekend pass
  {
    id: '95000011',
    date: 'Fr, 07.02.2026 14:30:20 Uhr',
    customer: {
      number: '30000011',
      firstName: 'Felix',
      lastName: 'Braun',
      address: {
        street: 'Festivalplatz 1',
        postalCode: '01067',
        city: 'Dresden',
      },
      email: 'felix.braun@festival.de',
      phone: '0351222333',
    },
    orderItems: [
      {
        event: popularEvents[7],
        quantity: 2,
        price: 140.0,
        pricePerItem: 70.0,
      },
    ],
    orderValue: 140.0,
    payment: {
      status: 'Lastschrift',
      amount: 140.0,
    },
    invoice: {
      date: '07.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Scanstatus bearbeiten'],
    },
  },
  // Multi-event order with cancellation
  {
    id: '95000012',
    date: 'Sa, 08.02.2026 10:15:33 Uhr',
    customer: {
      number: '30000012',
      firstName: 'Sarah',
      lastName: 'Klein',
      address: {
        street: 'Bergstraße 99',
        postalCode: '79098',
        city: 'Freiburg',
      },
      email: 'sarah.klein@email.de',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[5],
        quantity: 1,
        price: 120.0,
        pricePerItem: 120.0,
        cancelled: true,
      },
      {
        event: popularEvents[8],
        quantity: 2,
        price: 70.0,
        pricePerItem: 35.0,
      },
      {
        event: popularEvents[10],
        quantity: 2,
        price: 50.0,
        pricePerItem: 25.0,
        cancelled: true,
      },
    ],
    orderValue: 190.0,
    payment: {
      status: 'Rechnung',
      amount: 190.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Dokumente'],
    },
  },
  // Premium seats order
  {
    id: '95000013',
    date: 'Sa, 08.02.2026 16:40:18 Uhr',
    customer: {
      number: '30000013',
      firstName: 'Michael',
      lastName: 'Herrmann',
      address: {
        street: 'VIP Allee 50',
        postalCode: '22763',
        city: 'Hamburg',
      },
      email: 'michael.herrmann@premium.de',
      phone: '040111222333',
      iban: 'DE12 5001 0517 5407 3249 31',
      bic: 'INGDDEFFXXX',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 4,
        price: 600.0,
        pricePerItem: 150.0,
      },
      {
        event: popularEvents[5],
        quantity: 2,
        price: 240.0,
        pricePerItem: 120.0,
      },
    ],
    orderValue: 840.0,
    payment: {
      status: 'Rechnung',
      amount: 840.0,
    },
    invoice: {
      date: '08.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '08.02.2026, 17:00',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Tickets drucken'],
    },
  },
  // Early bird special
  {
    id: '95000014',
    date: 'So, 09.02.2026 09:05:22 Uhr',
    customer: {
      number: '30000014',
      firstName: 'Christina',
      lastName: 'Wolf',
      address: {
        street: 'Frühlingsweg 34',
        postalCode: '80331',
        city: 'München',
      },
      email: 'christina.wolf@earlybird.de',
    },
    orderItems: [
      {
        event: popularEvents[6],
        quantity: 4,
        price: 120.0,
        pricePerItem: 30.0,
      },
      {
        event: popularEvents[7],
        quantity: 2,
        price: 140.0,
        pricePerItem: 70.0,
      },
    ],
    orderValue: 260.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 260.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  // Family package with kids tickets
  {
    id: '95000015',
    date: 'So, 09.02.2026 13:20:45 Uhr',
    customer: {
      number: '30000015',
      firstName: 'Peter',
      lastName: 'Schäfer',
      address: {
        street: 'Kinderweg 88',
        postalCode: '50667',
        city: 'Köln',
      },
      email: 'peter.schaefer@family.de',
      phone: '0221444555666',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 2,
        price: 80.0,
        pricePerItem: 40.0,
      },
      {
        event: popularEvents[10],
        quantity: 4,
        price: 100.0,
        pricePerItem: 25.0,
      },
    ],
    orderValue: 180.0,
    payment: {
      status: 'Kasse',
      amount: 180.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '09.02.2026, 13:35',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  // Reserved seating multi-show
  {
    id: '95000016',
    date: 'Mo, 10.02.2026 11:30:55 Uhr',
    customer: {
      number: '30000016',
      firstName: 'Sabine',
      lastName: 'Neumann',
      address: {
        street: 'Theaterstraße 12',
        postalCode: '40212',
        city: 'Düsseldorf',
      },
      email: 'sabine.neumann@theater.de',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[4],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[11],
        quantity: 2,
        price: 180.0,
        pricePerItem: 90.0,
      },
    ],
    orderValue: 420.0,
    payment: {
      status: 'Lastschrift',
      amount: 420.0,
    },
    invoice: {
      date: '10.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Scanstatus bearbeiten'],
    },
  },
  // Student group with partial cancellation
  {
    id: '95000017',
    date: 'Mo, 10.02.2026 14:45:20 Uhr',
    customer: {
      number: '30000017',
      firstName: 'Jonas',
      lastName: 'Richter',
      address: {
        street: 'Campusstraße 5',
        postalCode: '69117',
        city: 'Heidelberg',
      },
      email: 'jonas.richter@uni.de',
      phone: '06221777888',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 5,
        price: 250.0,
        pricePerItem: 50.0,
      },
      {
        event: popularEvents[6],
        quantity: 3,
        price: 90.0,
        pricePerItem: 30.0,
        cancelled: true,
      },
    ],
    orderValue: 250.0,
    payment: {
      status: 'Rechnung',
      amount: 250.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Bestellterminale'],
    },
  },
  // VIP experience package
  {
    id: '95000018',
    date: 'Di, 11.02.2026 10:20:33 Uhr',
    customer: {
      number: '30000018',
      firstName: 'Alexander',
      lastName: 'Hartmann',
      address: {
        street: 'Luxusstraße 100',
        postalCode: '10115',
        city: 'Berlin',
      },
      email: 'alex.hartmann@vip.de',
      phone: '030999888777',
      iban: 'DE89 3704 0044 0532 0130 00',
      bic: 'COBADEFFXXX',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 2,
        price: 300.0,
        pricePerItem: 150.0,
      },
      {
        event: popularEvents[5],
        quantity: 2,
        price: 240.0,
        pricePerItem: 120.0,
      },
      {
        event: popularEvents[11],
        quantity: 2,
        price: 180.0,
        pricePerItem: 90.0,
      },
    ],
    orderValue: 720.0,
    payment: {
      status: 'Lastschrift',
      amount: 720.0,
    },
    invoice: {
      date: '11.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '11.02.2026, 10:45',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Tickets drucken'],
    },
  },
  // General admission festival
  {
    id: '95000019',
    date: 'Di, 11.02.2026 15:50:18 Uhr',
    customer: {
      number: '30000019',
      firstName: 'Lisa',
      lastName: 'Engel',
      address: {
        street: 'Partystraße 55',
        postalCode: '20095',
        city: 'Hamburg',
      },
      email: 'lisa.engel@party.de',
    },
    orderItems: [
      {
        event: popularEvents[7],
        quantity: 1,
        price: 70.0,
        pricePerItem: 70.0,
      },
      {
        event: popularEvents[3],
        quantity: 1,
        price: 40.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 110.0,
    payment: {
      status: 'Kasse',
      amount: 110.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '11.02.2026, 16:00',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  // Senior couple reserved seats
  {
    id: '95000020',
    date: 'Mi, 12.02.2026 09:15:44 Uhr',
    customer: {
      number: '30000020',
      firstName: 'Helga',
      lastName: 'Bergmann',
      address: {
        street: 'Seniorenweg 23',
        postalCode: '70173',
        city: 'Stuttgart',
      },
      email: 'helga.bergmann@senior.de',
      phone: '0711888999000',
    },
    orderItems: [
      {
        event: popularEvents[8],
        quantity: 2,
        price: 70.0,
        pricePerItem: 35.0,
      },
      {
        event: popularEvents[9],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 190.0,
    payment: {
      status: 'Rechnung',
      amount: 190.0,
    },
    invoice: {
      date: '12.02.2026',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  // Mixed category large order
  {
    id: '95000021',
    date: 'Mi, 12.02.2026 13:40:27 Uhr',
    customer: {
      number: '30000021',
      firstName: 'Daniel',
      lastName: 'Vogel',
      address: {
        street: 'Mixstraße 44',
        postalCode: '60311',
        city: 'Frankfurt',
      },
      email: 'daniel.vogel@mixed.de',
      phone: '069333444555',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 3,
        price: 180.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[2],
        quantity: 2,
        price: 100.0,
        pricePerItem: 50.0,
      },
      {
        event: popularEvents[6],
        quantity: 2,
        price: 60.0,
        pricePerItem: 30.0,
      },
      {
        event: popularEvents[10],
        quantity: 3,
        price: 75.0,
        pricePerItem: 25.0,
      },
    ],
    orderValue: 415.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 415.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Bestellterminale', 'Dokumente'],
    },
  },
  // Comedy night general admission
  {
    id: '95000022',
    date: 'Do, 13.02.2026 19:25:15 Uhr',
    customer: {
      number: '30000022',
      firstName: 'Nina',
      lastName: 'Schulz',
      address: {
        street: 'Lachweg 77',
        postalCode: '04109',
        city: 'Leipzig',
      },
      email: 'nina.schulz@laugh.de',
    },
    orderItems: [
      {
        event: popularEvents[6],
        quantity: 4,
        price: 120.0,
        pricePerItem: 30.0,
      },
    ],
    orderValue: 120.0,
    payment: {
      status: 'Kasse',
      amount: 120.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '13.02.2026, 19:40',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  // Cancelled premium order
  {
    id: '95000023',
    date: 'Do, 13.02.2026 11:55:33 Uhr',
    customer: {
      number: '30000023',
      firstName: 'Robert',
      lastName: 'Lang',
      address: {
        street: 'Stornogasse 12',
        postalCode: '90402',
        city: 'Nürnberg',
      },
      email: 'robert.lang@email.de',
      phone: '0911222333444',
    },
    orderItems: [
      {
        event: popularEvents[5],
        quantity: 2,
        price: 240.0,
        pricePerItem: 120.0,
        cancelled: true,
      },
      {
        event: popularEvents[1],
        quantity: 1,
        price: 150.0,
        pricePerItem: 150.0,
      },
      {
        event: popularEvents[11],
        quantity: 2,
        price: 180.0,
        pricePerItem: 90.0,
        cancelled: true,
      },
    ],
    orderValue: 150.0,
    payment: {
      status: 'Rechnung',
      amount: 150.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Dokumente'],
    },
  },
  // Kids show family package
  {
    id: '95000024',
    date: 'Fr, 14.02.2026 14:10:22 Uhr',
    customer: {
      number: '30000024',
      firstName: 'Katharina',
      lastName: 'Frank',
      address: {
        street: 'Kinderplatz 90',
        postalCode: '01067',
        city: 'Dresden',
      },
      email: 'katharina.frank@kids.de',
      phone: '0351555666777',
    },
    orderItems: [
      {
        event: popularEvents[10],
        quantity: 5,
        price: 125.0,
        pricePerItem: 25.0,
      },
      {
        event: popularEvents[3],
        quantity: 2,
        price: 80.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 205.0,
    payment: {
      status: 'Lastschrift',
      amount: 205.0,
    },
    invoice: {
      date: '14.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '14.02.2026, 14:30',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Tickets drucken'],
    },
  },
  // Jazz and classical mix
  {
    id: '95000025',
    date: 'Fr, 14.02.2026 17:35:40 Uhr',
    customer: {
      number: '30000025',
      firstName: 'Wolfgang',
      lastName: 'Stein',
      address: {
        street: 'Musikweg 33',
        postalCode: '79098',
        city: 'Freiburg',
      },
      email: 'wolfgang.stein@music.de',
    },
    orderItems: [
      {
        event: popularEvents[9],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[8],
        quantity: 2,
        price: 70.0,
        pricePerItem: 35.0,
      },
    ],
    orderValue: 190.0,
    payment: {
      status: 'Rechnung',
      amount: 190.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  // Large group booking
  {
    id: '95000026',
    date: 'Sa, 15.02.2026 10:05:15 Uhr',
    customer: {
      number: '30000026',
      firstName: 'Andrea',
      lastName: 'Lorenz',
      address: {
        street: 'Gruppenweg 200',
        postalCode: '22763',
        city: 'Hamburg',
      },
      email: 'andrea.lorenz@group.de',
      phone: '040666777888',
    },
    orderItems: [
      {
        event: popularEvents[11],
        quantity: 12,
        price: 960.0,
        pricePerItem: 80.0,
      },
    ],
    orderValue: 960.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 960.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '15.02.2026, 10:30',
    },
    actions: {
      items: ['Bestellterminale', 'Tickets drucken'],
    },
  },
  // Festival weekend with cancellation
  {
    id: '95000027',
    date: 'Sa, 15.02.2026 16:20:50 Uhr',
    customer: {
      number: '30000027',
      firstName: 'Patrick',
      lastName: 'Keller',
      address: {
        street: 'Festivalweg 8',
        postalCode: '80331',
        city: 'München',
      },
      email: 'patrick.keller@festival.de',
    },
    orderItems: [
      {
        event: popularEvents[7],
        quantity: 3,
        price: 210.0,
        pricePerItem: 70.0,
      },
      {
        event: popularEvents[6],
        quantity: 2,
        price: 60.0,
        pricePerItem: 30.0,
        cancelled: true,
      },
    ],
    orderValue: 210.0,
    payment: {
      status: 'Kasse',
      amount: 210.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '15.02.2026, 16:35',
    },
    actions: {
      items: [
        'Stornobedürg drucken',
        'Zutrittsstatus',
        'Scanstatus bearbeiten',
      ],
    },
  },
  // Multi-event subscription-style
  {
    id: '95000028',
    date: 'So, 16.02.2026 11:45:28 Uhr',
    customer: {
      number: '30000028',
      firstName: 'Claudia',
      lastName: 'Sommer',
      address: {
        street: 'Abostraße 66',
        postalCode: '50667',
        city: 'Köln',
      },
      email: 'claudia.sommer@subscription.de',
      phone: '0221888999000',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 1,
        price: 60.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[4],
        quantity: 1,
        price: 60.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[8],
        quantity: 1,
        price: 35.0,
        pricePerItem: 35.0,
      },
      {
        event: popularEvents[9],
        quantity: 1,
        price: 60.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[11],
        quantity: 1,
        price: 90.0,
        pricePerItem: 90.0,
      },
    ],
    orderValue: 305.0,
    payment: {
      status: 'Lastschrift',
      amount: 305.0,
    },
    invoice: {
      date: '16.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Scanstatus bearbeiten'],
    },
  },
  // Student discount multiple shows
  {
    id: '95000029',
    date: 'So, 16.02.2026 15:30:12 Uhr',
    customer: {
      number: '30000029',
      firstName: 'Tim',
      lastName: 'Baumann',
      address: {
        street: 'Studentenweg 101',
        postalCode: '69117',
        city: 'Heidelberg',
      },
      email: 'tim.baumann@student.de',
    },
    orderItems: [
      {
        event: popularEvents[2],
        quantity: 2,
        price: 100.0,
        pricePerItem: 50.0,
      },
      {
        event: popularEvents[6],
        quantity: 2,
        price: 60.0,
        pricePerItem: 30.0,
      },
    ],
    orderValue: 160.0,
    payment: {
      status: 'Rechnung',
      amount: 160.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  // VIP complete experience
  {
    id: '95000030',
    date: 'Mo, 17.02.2026 09:20:35 Uhr',
    customer: {
      number: '30000030',
      firstName: 'Stephanie',
      lastName: 'Gross',
      address: {
        street: 'Premiumallee 1',
        postalCode: '40212',
        city: 'Düsseldorf',
      },
      email: 'stephanie.gross@premium.de',
      phone: '0211111222333',
      iban: 'DE12 5001 0517 5407 3249 31',
      bic: 'INGDDEFFXXX',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 3,
        price: 450.0,
        pricePerItem: 150.0,
      },
      {
        event: popularEvents[5],
        quantity: 3,
        price: 360.0,
        pricePerItem: 120.0,
      },
    ],
    orderValue: 810.0,
    payment: {
      status: 'Lastschrift',
      amount: 810.0,
    },
    invoice: {
      date: '17.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '17.02.2026, 09:45',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Tickets drucken'],
    },
  },
  // Family bundle with partial cancellation
  {
    id: '95000031',
    date: 'Mo, 17.02.2026 14:15:48 Uhr',
    customer: {
      number: '30000031',
      firstName: 'Martin',
      lastName: 'Dietrich',
      address: {
        street: 'Familienstraße 45',
        postalCode: '10115',
        city: 'Berlin',
      },
      email: 'martin.dietrich@family.de',
      phone: '030444555666',
    },
    orderItems: [
      {
        event: popularEvents[3],
        quantity: 3,
        price: 120.0,
        pricePerItem: 40.0,
      },
      {
        event: popularEvents[10],
        quantity: 4,
        price: 100.0,
        pricePerItem: 25.0,
      },
      {
        event: popularEvents[6],
        quantity: 2,
        price: 60.0,
        pricePerItem: 30.0,
        cancelled: true,
      },
    ],
    orderValue: 220.0,
    payment: {
      status: 'Rechnung',
      amount: 220.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Bestellterminale'],
    },
  },
  // General admission party package
  {
    id: '95000032',
    date: 'Di, 18.02.2026 18:40:20 Uhr',
    customer: {
      number: '30000032',
      firstName: 'Jennifer',
      lastName: 'Huber',
      address: {
        street: 'Partyplatz 88',
        postalCode: '20095',
        city: 'Hamburg',
      },
      email: 'jennifer.huber@party.de',
    },
    orderItems: [
      {
        event: popularEvents[7],
        quantity: 5,
        price: 350.0,
        pricePerItem: 70.0,
      },
      {
        event: popularEvents[3],
        quantity: 2,
        price: 80.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 430.0,
    payment: {
      status: 'Kasse',
      amount: 430.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '18.02.2026, 19:00',
    },
    actions: {
      items: ['Zutrittsstatus', 'Scanstatus bearbeiten'],
    },
  },
  // Reserved seating culture package
  {
    id: '95000033',
    date: 'Di, 18.02.2026 10:25:33 Uhr',
    customer: {
      number: '30000033',
      firstName: 'Matthias',
      lastName: 'Scholz',
      address: {
        street: 'Kulturallee 22',
        postalCode: '70173',
        city: 'Stuttgart',
      },
      email: 'matthias.scholz@culture.de',
      phone: '0711222333444',
    },
    orderItems: [
      {
        event: popularEvents[8],
        quantity: 2,
        price: 70.0,
        pricePerItem: 35.0,
      },
      {
        event: popularEvents[11],
        quantity: 2,
        price: 180.0,
        pricePerItem: 90.0,
      },
      {
        event: popularEvents[5],
        quantity: 1,
        price: 120.0,
        pricePerItem: 120.0,
      },
    ],
    orderValue: 370.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 370.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  // Mixed categories large order
  {
    id: '95000034',
    date: 'Mi, 19.02.2026 13:50:15 Uhr',
    customer: {
      number: '30000034',
      firstName: 'Anja',
      lastName: 'Krause',
      address: {
        street: 'Eventweg 99',
        postalCode: '60311',
        city: 'Frankfurt',
      },
      email: 'anja.krause@events.de',
      phone: '069555666777',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[2],
        quantity: 3,
        price: 150.0,
        pricePerItem: 50.0,
      },
      {
        event: popularEvents[6],
        quantity: 4,
        price: 120.0,
        pricePerItem: 30.0,
      },
      {
        event: popularEvents[9],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 510.0,
    payment: {
      status: 'Lastschrift',
      amount: 510.0,
    },
    invoice: {
      date: '19.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Scanstatus bearbeiten'],
    },
  },
  // Early bird special with cancellation
  {
    id: '95000035',
    date: 'Mi, 19.02.2026 08:15:40 Uhr',
    customer: {
      number: '30000035',
      firstName: 'Frank',
      lastName: 'Roth',
      address: {
        street: 'Frühstraße 11',
        postalCode: '04109',
        city: 'Leipzig',
      },
      email: 'frank.roth@early.de',
    },
    orderItems: [
      {
        event: popularEvents[6],
        quantity: 3,
        price: 90.0,
        pricePerItem: 30.0,
      },
      {
        event: popularEvents[7],
        quantity: 1,
        price: 70.0,
        pricePerItem: 70.0,
        cancelled: true,
      },
    ],
    orderValue: 90.0,
    payment: {
      status: 'Rechnung',
      amount: 90.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Dokumente'],
    },
  },
  // Premium seats couple
  {
    id: '95000036',
    date: 'Do, 20.02.2026 16:30:25 Uhr',
    customer: {
      number: '30000036',
      firstName: 'Gabriele',
      lastName: 'Mayer',
      address: {
        street: 'Premiumweg 77',
        postalCode: '90402',
        city: 'Nürnberg',
      },
      email: 'gabriele.mayer@premium.de',
      phone: '0911777888999',
    },
    orderItems: [
      {
        event: popularEvents[1],
        quantity: 2,
        price: 300.0,
        pricePerItem: 150.0,
      },
      {
        event: popularEvents[5],
        quantity: 2,
        price: 240.0,
        pricePerItem: 120.0,
      },
    ],
    orderValue: 540.0,
    payment: {
      status: 'Lastschrift',
      amount: 540.0,
    },
    invoice: {
      date: '20.02.2026',
      status: 'bezahlt',
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '20.02.2026, 16:50',
    },
    actions: {
      items: ['Zutrittsstatus', 'Personalisierung', 'Tickets drucken'],
    },
  },
  // Kids entertainment package
  {
    id: '95000037',
    date: 'Do, 20.02.2026 11:05:18 Uhr',
    customer: {
      number: '30000037',
      firstName: 'Birgit',
      lastName: 'Jung',
      address: {
        street: 'Spielstraße 33',
        postalCode: '01067',
        city: 'Dresden',
      },
      email: 'birgit.jung@kids.de',
      phone: '0351333444555',
    },
    orderItems: [
      {
        event: popularEvents[10],
        quantity: 6,
        price: 150.0,
        pricePerItem: 25.0,
      },
      {
        event: popularEvents[3],
        quantity: 2,
        price: 80.0,
        pricePerItem: 40.0,
      },
    ],
    orderValue: 230.0,
    payment: {
      status: 'Kasse',
      amount: 230.0,
    },
    ticketPrint: {
      status: 'Erstellt am',
      printedAt: '20.02.2026, 11:20',
    },
    actions: {
      items: ['Zutrittsstatus', 'Tickets drucken'],
    },
  },
  // Jazz lover season tickets
  {
    id: '95000038',
    date: 'Fr, 21.02.2026 14:40:55 Uhr',
    customer: {
      number: '30000038',
      firstName: 'Rainer',
      lastName: 'Pohl',
      address: {
        street: 'Jazzstraße 66',
        postalCode: '79098',
        city: 'Freiburg',
      },
      email: 'rainer.pohl@jazz.de',
    },
    orderItems: [
      {
        event: popularEvents[9],
        quantity: 4,
        price: 240.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 240.0,
    payment: {
      status: 'Rechnung',
      amount: 240.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Personalisierung', 'Dokumente'],
    },
  },
  // Festival general admission group
  {
    id: '95000039',
    date: 'Fr, 21.02.2026 17:20:30 Uhr',
    customer: {
      number: '30000039',
      firstName: 'Susanne',
      lastName: 'Busch',
      address: {
        street: 'Festivalring 200',
        postalCode: '22763',
        city: 'Hamburg',
      },
      email: 'susanne.busch@festival.de',
      phone: '040999000111',
    },
    orderItems: [
      {
        event: popularEvents[7],
        quantity: 8,
        price: 560.0,
        pricePerItem: 70.0,
      },
    ],
    orderValue: 560.0,
    payment: {
      status: 'Überweisung',
      method: 'Überweisung (Vorkasse)',
      amount: 560.0,
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Bestellterminale', 'Dokumente'],
    },
  },
  // Multi-show with heavy cancellation
  {
    id: '95000040',
    date: 'Sa, 22.02.2026 10:35:22 Uhr',
    customer: {
      number: '30000040',
      firstName: 'Uwe',
      lastName: 'Fuchs',
      address: {
        street: 'Stornoweg 8',
        postalCode: '80331',
        city: 'München',
      },
      email: 'uwe.fuchs@cancelled.de',
      phone: '089111222333',
    },
    orderItems: [
      {
        event: popularEvents[0],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
        cancelled: true,
      },
      {
        event: popularEvents[4],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
      {
        event: popularEvents[6],
        quantity: 3,
        price: 90.0,
        pricePerItem: 30.0,
        cancelled: true,
      },
      {
        event: popularEvents[9],
        quantity: 2,
        price: 120.0,
        pricePerItem: 60.0,
      },
    ],
    orderValue: 240.0,
    payment: {
      status: 'Rechnung',
      amount: 240.0,
      invoiceStatus: 'teilweise',
    },
    ticketPrint: {
      status: 'Nicht gedruckt',
    },
    actions: {
      items: ['Stornobedürg drucken', 'Bestellterminale', 'Dokumente'],
    },
  },

  // Original bookings (keeping some for continuity)
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
];
