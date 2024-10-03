import { component$, useSignal, $ } from '@builder.io/qwik';
import { Calendar } from '@chrono-picker/library-qwik';

export default component$(() => {
  const codeVisibility = useSignal(Array(6).fill(false));

  const toggleCode = $((index: number) => {
    codeVisibility.value = [...codeVisibility.value];
    codeVisibility.value[index] = !codeVisibility.value[index];
  });

  const examples = [
    { 
      title: "Default Calendar", 
      code: '<Calendar />', 
      component: <Calendar /> 
    },
    { 
      title: "Calendar with Custom Theme", 
      code: '<Calendar backgroundColor="#ffefd5" textColor="#8b4513" accentColor="#dda0dd" />', 
      component: <Calendar backgroundColor="#ffefd5" textColor="#8b4513" accentColor="#dda0dd" /> 
    },
    { 
      title: "Calendar with Date Range", 
      code: '<Calendar minDate={new Date(2023, 0, 1)} maxDate={new Date(2023, 11, 31)} />', 
      component: <Calendar minDate={new Date(2023, 0, 1)} maxDate={new Date(2023, 11, 31)} /> 
    },
    { 
      title: "Small Size Dark Theme Calendar", 
      code: '<Calendar size="small" backgroundColor="#2c3e50" textColor="#ecf0f1" accentColor="#e74c3c" />', 
      component: <Calendar size="small" backgroundColor="#2c3e50" textColor="#ecf0f1" accentColor="#e74c3c" /> 
    },
    { 
      title: "Large Size Ocean Theme Calendar", 
      code: '<Calendar size="large" backgroundColor="#e0ffff" textColor="#000080" accentColor="#00ced1" />', 
      component: <Calendar size="large" backgroundColor="#e0ffff" textColor="#000080" accentColor="#00ced1" /> 
    },
    { 
      title: "Calendar with Custom Start of Week", 
      code: '<Calendar startOfWeek={1} showBorder={true} accentColor="#4b0082" />', 
      component: <Calendar startOfWeek={1} showBorder={true} accentColor="#4b0082" /> 
    },
  ];

  return (
    <div class="container">
      <h2>Calendar Examples</h2>
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