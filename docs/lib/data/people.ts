export const people = [
  {
    id: 'chippy',
    name: "Chip 'Pixel' Patterson",
    position: 'Chief Button Herder',
    avatar: '/people/chip-patterson.png',
    email: 'chip.patterson@example.com',
  },
  {
    id: 'token',
    name: "Dr. Alex 'Token' Chen",
    position: 'Font Whisperer & Color Alchemist',
    avatar: '/people/alex-chen.png',
    email: 'alex.chen@example.com',
  },
  {
    id: 'sandy',
    name: "Sandy 'Specs' Vega",
    position: 'Director of Component Choreography',
    avatar: '/people/sandy-vega.png',
    email: 'sandy.vega@example.com',
  },
  {
    id: 'crash',
    name: "Diana 'Crash' Martinez",
    position: 'Professional Bug Hunter',
    avatar: '/people/diana-martinez.png',
    email: 'diana.martinez@example.com',
  },
  {
    id: 'pipes',
    name: "Evan 'Pipes' Wilson",
    position: 'Pipeline Plumber & Cloud Tamer',
    avatar: '/people/evan-wilson.png',
    email: 'evan.wilson@example.com',
  },
  {
    id: 'query',
    name: "Fiona 'Query' Chen",
    position: 'Data Detective',
    avatar: '/people/fiona-chen.png',
    email: 'fiona.chen@example.com',
  },
  {
    id: 'gizmo',
    name: "George 'Gizmo' Smith",
    position: 'API Architect & Logic Wrangler',
    avatar: '/people/george-smith.png',
    email: 'george.smith@example.com',
  },
  {
    id: 'flex',
    name: "Hannah 'Flex' White",
    position: 'CSS Sorceress & Interaction Weaver',
    avatar: '/people/hannah-white.png',
    email: 'hannah.white@example.com',
  },
] as const;

export type Person = (typeof people)[number];
