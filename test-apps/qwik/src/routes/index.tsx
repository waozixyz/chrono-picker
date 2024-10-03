// src/routes/index.tsx
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="home">
      <h2>Welcome to Chrono Picker</h2>
      <p>
        Discover the power and flexibility of the Chrono Picker library. 
        Built with Mitosis, it's available for React, Svelte, and Qwik, offering a wide range of customization options to elevate your project.
      </p>
      <p>Select a component from the sidebar to see examples and usage.</p>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Chrono Picker - Home',
  meta: [
    {
      name: 'description',
      content: 'Explore the versatile components from the Chrono Picker library, designed for React, Svelte, and Qwik using Mitosis.',
    },
  ],
};
