// src/components/sidebar/sidebar.tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const framework = useSignal('qwik');

  return (
    <aside class="sidebar">
      <h2>Chrono Picker</h2>
      <div class="framework-selector">
        <select
          value={framework.value}
          onChange$={(event) => {
            const value = (event.target as HTMLSelectElement).value;
            framework.value = value;
            const domains = {
              qwik: 'https://qwik.chronopicker.com',
              react: 'https://react.chronopicker.com',
              svelte: 'https://svelte.chronopicker.com'
            };
            window.location.href = domains[value as keyof typeof domains];
          }}
        >
          <option value="qwik">Qwik</option>
          <option value="react">React</option>
          <option value="svelte">Svelte</option>
        </select>
      </div>
      <nav>
        <ul>
          <li><a href="/timepicker">TimePicker</a></li>
          <li><a href="/datetimepicker">DateTimePicker</a></li>
          <li><a href="/calendar">Calendar</a></li>
        </ul>
      </nav>
    </aside>
  );
});