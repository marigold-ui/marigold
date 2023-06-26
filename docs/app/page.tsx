'use client';
import Image from 'next/image';
import { Partial } from './something';
import BasicButton from '@/components/button-basic.demo';
// import { Demo } from '@/components/button-basic.demo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BasicButton />
    </main>
  );
}
