// src/routes/timepicker/index.tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import { TimePicker } from '@chrono-picker/library-qwik';

export default component$(() => {
  const codeVisibility = useSignal(Array(12).fill(false));

  const toggleCode = $((index: number) => {
    codeVisibility.value = [...codeVisibility.value];
    codeVisibility.value[index] = !codeVisibility.value[index];
  });


  const examples = [
    { 
      title: "Default TimePicker", 
      code: '<TimePicker />', 
      component: <TimePicker /> 
    },
    { 
      title: "12-hour Format with Custom Colors", 
      code: '<TimePicker format="12h" backgroundColor="#f0f8ff" textColor="#000080" accentColor="#4169e1" />', 
      component: <TimePicker format="12h" backgroundColor="#f0f8ff" textColor="#000080" accentColor="#4169e1" /> 
    },
    { 
      title: "24-hour Format with Border", 
      code: '<TimePicker format="24h" showBorder={true} accentColor="#800080" />', 
      component: <TimePicker format="24h" showBorder={true} accentColor="#800080" /> 
    },
    { 
      title: "Small Size Dark Theme", 
      code: '<TimePicker size="small" backgroundColor="#2c3e50" textColor="#ecf0f1" accentColor="#e74c3c" />', 
      component: <TimePicker size="small" backgroundColor="#2c3e50" textColor="#ecf0f1" accentColor="#e74c3c" /> 
    },
    { 
      title: "Large Size Pastel Theme", 
      code: '<TimePicker size="large" backgroundColor="#ffefd5" textColor="#8b4513" accentColor="#dda0dd" />', 
      component: <TimePicker size="large" backgroundColor="#ffefd5" textColor="#8b4513" accentColor="#dda0dd" /> 
    },
    { 
      title: "24-hour Format with Neon Theme", 
      code: '<TimePicker format="24h" backgroundColor="#000" textColor="#39ff14" accentColor="#ff00ff" showBorder={true} />', 
      component: <TimePicker format="24h" backgroundColor="#000" textColor="#39ff14" accentColor="#ff00ff" showBorder={true} /> 
    },
    { 
      title: "TimePicker with Autumn Theme", 
      code: '<TimePicker size="large" format="12h" backgroundColor="#ffa500" textColor="#8b4513" accentColor="#228b22" />', 
      component: <TimePicker size="large" format="12h" backgroundColor="#ffa500" textColor="#8b4513" accentColor="#228b22" /> 
    },
    { 
      title: "Small 24-hour Ocean Theme", 
      code: '<TimePicker size="small" format="24h" backgroundColor="#e0ffff" textColor="#000080" accentColor="#00ced1" showBorder={true} />', 
      component: <TimePicker size="small" format="24h" backgroundColor="#e0ffff" textColor="#000080" accentColor="#00ced1" showBorder={true} /> 
    },
    { 
      title: "Minimalist Black and White", 
      code: '<TimePicker backgroundColor="#fff" textColor="#000" accentColor="#000" showBorder={true} />', 
      component: <TimePicker backgroundColor="#fff" textColor="#000" accentColor="#000" showBorder={true} /> 
    },
    { 
      title: "Vibrant Rainbow Theme", 
      code: '<TimePicker backgroundColor="#ff6b6b" textColor="#4ecdc4" accentColor="#ffe66d" />', 
      component: <TimePicker backgroundColor="#ff6b6b" textColor="#4ecdc4" accentColor="#ffe66d" /> 
    },
    { 
      title: "Elegant Gold and Black", 
      code: '<TimePicker backgroundColor="#000" textColor="#ffd700" accentColor="#daa520" showBorder={true} />', 
      component: <TimePicker backgroundColor="#000" textColor="#ffd700" accentColor="#daa520" showBorder={true} /> 
    },
    { 
      title: "Retro Digital Clock Style", 
      code: '<TimePicker backgroundColor="#000" textColor="#00ff00" accentColor="#00ff00" size="large" format="24h" />', 
      component: <TimePicker backgroundColor="#000" textColor="#00ff00" accentColor="#00ff00" size="large" format="24h" /> 
    },
  ];
  
  return (
    <div>
      <h2>TimePicker Examples</h2>
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