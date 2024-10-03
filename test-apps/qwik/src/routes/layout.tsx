// src/routes/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import Sidebar from '../components/sidebar/sidebar';


export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <div class="animated-background"></div>
      <div class="container">
        <div class="layout grid">
          <Sidebar />
          <div class="content card">
            <Slot />
          </div>
        </div>
      </div>
    </>
  );
});