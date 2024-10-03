import { component$, useSignal, $ } from '@builder.io/qwik';
import { DateTimePicker } from '@chrono-picker/library-qwik';

export default component$(() => {
  const codeVisibility = useSignal(Array(6).fill(false));
  const toggleCode = $((index: number) => {
    const newVisibility = [...codeVisibility.value];
    newVisibility[index] = !newVisibility[index];
    codeVisibility.value = newVisibility;
  });
  const examples = [
    { 
      title: "Default DateTimePicker", 
      code: '<DateTimePicker />', 
      component: <DateTimePicker /> 
    },
    { 
      title: "DateTimePicker with Custom Colors", 
      code: '<DateTimePicker backgroundColor="#f0f8ff" textColor="#000080" accentColor="#4169e1" />', 
      component: <DateTimePicker backgroundColor="#f0f8ff" textColor="#000080" accentColor="#4169e1" /> 
    },
    { 
      title: "DateTimePicker with 24-hour Format", 
      code: '<DateTimePicker format="24h" showBorder={true} accentColor="#800080" />', 
      component: <DateTimePicker format="24h" showBorder={true} accentColor="#800080" /> 
    },
    { 
      title: "Small Size Dark Theme DateTimePicker", 
      code: '<DateTimePicker size="small" backgroundColor="#2c3e50" textColor="#ecf0f1" accentColor="#e74c3c" />', 
      component: <DateTimePicker size="small" backgroundColor="#2c3e50" textColor="#ecf0f1" accentColor="#e74c3c" /> 
    },
    { 
      title: "Large Size Pastel Theme DateTimePicker", 
      code: '<DateTimePicker size="large" backgroundColor="#ffefd5" textColor="#8b4513" accentColor="#dda0dd" />', 
      component: <DateTimePicker size="large" backgroundColor="#ffefd5" textColor="#8b4513" accentColor="#dda0dd" /> 
    },
    { 
      title: "DateTimePicker with Date Range", 
      code: '<DateTimePicker minDate={new Date(2023, 0, 1)} maxDate={new Date(2023, 11, 31)} showBorder={true} />', 
      component: <DateTimePicker minDate={new Date(2023, 0, 1)} maxDate={new Date(2023, 11, 31)} showBorder={true} /> 
    },
  ];

  return (
    <div class="container">
      <h2>DateTimePicker Examples</h2>
      <div class="grid">
        {examples.map((example, index) => (
          <div key={index} class="card">
            <h3>{example.title}</h3>
            <div class="example-component">{example.component}</div>
            <button class="button" onClick$={() => toggleCode(index)}>
              {codeVisibility.value[index] ? 'Hide Code' : 'Show Code'}
            </button>
            {codeVisibility.value[index] && (
              <pre>
                <code>{example.code}</code>
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});