export interface Address {
  street: string;
  postalCode: string;
  city: string;
}

export interface Customer {
  number: string;
  firstName: string;
  lastName: string;
  address: Address;
  email: string;
  phone?: string;
  iban?: string;
  bic?: string;
  bank?: string;
  accountHolder?: string;
}

export interface Event {
  title: string;
  date: string;
  time: string;
  category: string;
  subcategory?: string;
  venue?: string;
}

export interface OrderItem {
  event: Event;
  quantity: number;
  price: number;
  pricePerItem: number;
  cancelled?: boolean;
}

export type PaymentStatus =
  | 'Kasse'
  | 'Rechnung'
  | 'Lastschrift'
  | 'Überweisung'
  | 'storniert';
export type PaymentMethod =
  | 'Kasse'
  | 'Rechnung'
  | 'Lastschrift'
  | 'Überweisung (Vorkasse)';
export type InvoiceStatus = 'teilweise' | 'storniert' | 'bezahlt';
export type TicketStatus = 'Nicht gedruckt' | 'Erstellt am';

export interface Payment {
  status: PaymentStatus;
  method?: PaymentMethod;
  amount: number;
  date?: string;
  invoiceStatus?: InvoiceStatus;
}

export interface Invoice {
  number?: string;
  date?: string;
  dueDate?: string;
  status?: InvoiceStatus;
}

export interface TicketPrint {
  status: TicketStatus;
  printedAt?: string;
}

export interface Action {
  items: string[];
}

export interface Booking {
  id: string;
  date: string;
  customer: Customer;
  orderItems: OrderItem[];
  orderValue: number;
  payment: Payment;
  invoice?: Invoice;
  ticketPrint: TicketPrint;
  actions: Action;
  notes?: string[];
  scanLog?: string;
}

// Example booking data
export const exampleBooking: Booking = {
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
      event: {
        title: 'Stornierte Bestellungen',
        date: '20.02.2030',
        time: '20:00 Uhr',
        category: 'Normalpreis 1',
        venue: 'Wombatlove - WOW-Sats',
      },
      quantity: 1,
      price: 100.0,
      pricePerItem: 100.0,
    },
  ],
  orderValue: 100.0,
  payment: {
    status: 'Kasse',
    method: 'Lastschrift',
    amount: 0.0,
    date: '21.01.2026 00:07:11',
    invoiceStatus: 'storniert',
  },
  ticketPrint: {
    status: 'Nicht gedruckt',
  },
  actions: {
    items: [
      'Zutrittsstatus',
      'Personalisierung',
      'Stornobedürg drucken',
      'Bestellterminale',
      'Scanstatus bearbeiten',
      'Tickets sperren',
    ],
  },
  scanLog: 'E-Mail-Versand Scan-Logbuch',
  notes: ['TEST Laura`s Ticketcorner'],
};
