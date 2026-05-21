
import  { useState, useEffect, useRef } from 'react';
/* global anime */
function App() {
  // 1. Memoria de la app: lista de mensajes simulados
  const [mensajes, setMensajes] = useState([
    { id: 1, nombre: "Victoria", texto: "¡Feliz cumple! Que pases un día hermoso.", reacciones: 5 },
    { id: 2, nombre: "Walter", texto: "¡Un abrazo grande! Éxitos en todo lo que venga.", reacciones: 2 }
  ]);

  // 2. Memoria del formulario: lo que escribe el usuario en tiempo real
  const [inputNombre, setInputNombre] = useState("");
  const [inputTexto, setInputTexto] = useState("");

  // Creamos la referencia (un cable invisible para conectar con el HTML)
  const formularioRef = useRef(null);

  // useEffect se ejecuta AUTOMÁTICAMENTE una vez que la pantalla se dibuja
  useEffect(() => {

    if (!formularioRef.current) return; // Si no existe el formulario, no hacemos nada
    anime({
      targets: formularioRef.current, // Apuntamos al elemento real del DOM
      opacity: [0, 1],                // Va de opacidad 0 a 1
      translateY: [40, 0],            // Sube desde 40px abajo hasta su posición original
      scale: [0.92, 1],               // Hace un pequeño efecto de escala
      duration: 1200,                 // Dura 1.2 segundos
      easing: 'easeOutElastic(1, .6)' // Tipo de curva elástica premium
    });
  }, []); // El array vacío asegura que solo ocurra una vez al cargar la página

  // 3. Función para agregar un nuevo deseo
  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (inputNombre.trim() === "" || inputTexto.trim() === "") return;

    const nuevoMensaje = {
      id: Date.now(),
      nombre: inputNombre,
      texto: inputTexto,
      reacciones: 0
    };

    setMensajes([nuevoMensaje, ...mensajes]);

    // Limpiamos los inputs
    setInputNombre("");
    setInputTexto("");
  };

  // 4. Función para manejar los likes/reacciones
  const reaccionarAMensaje = (idDelMensaje) => {
    const listaActualizada = mensajes.map((msg) => {
      if (msg.id === idDelMensaje) {
        return { ...msg, reacciones: msg.reacciones + 1 };
      }
      return msg;
    });
    setMensajes(listaActualizada);
  };

  return (
    <div style={{ backgroundColor: '#0d0d11', color: '#ffffff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#e0e0e0', margin: '0 0 10px 0' }}>Muro de Deseos</h1>
        <p style={{ color: '#888888', margin: 0 }}>Deja tu saludo premium para el festejo</p>
      </header>

      {/* FORMULARIO DE ENVÍO */}
      <section ref={formularioRef} style={{ maxWidth: '500px', margin: '0 auto 50px auto', backgroundColor: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', opacity: 0 }}>
        <form onSubmit={manejarEnvio}>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '0.9rem' }}>Tu Nombre</label>
            <input 
              type="text" 
              value={inputNombre}
              onChange={(e) => setInputNombre(e.target.value)}
              placeholder="Ej: Tía Marta"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #3a3a4a', backgroundColor: '#0d0d11', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '0.9rem' }}>Tu Mensaje (Máx. 160 caract.)</label>
            <textarea 
              maxLength="160"
              value={inputTexto}
              onChange={(e) => setInputTexto(e.target.value)}
              placeholder="Escribe tus buenos deseos aquí..."
              style={{ width: '100%', height: '90px', padding: '12px', borderRadius: '6px', border: '1px solid #3a3a4a', backgroundColor: '#0d0d11', color: '#fff', boxSizing: 'border-box', resize: 'none', lineHeight: '1.4' }}
            />
            <div style={{ textAlign: 'right', marginTop: '4px' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>{inputTexto.length} / 160</span>
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '6px', border: 'none', backgroundColor: '#4f46e5', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Enviar Deseo ✨
          </button>

        </form>
      </section>

      {/* GRILLA DEL MURO */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {mensajes.map((msg) => (
          <div key={msg.id} style={{ backgroundColor: '#16161f', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a35', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' }}>
            <div>
              <h3 style={{ margin: '0 0 12px 0', color: '#4f46e5', fontSize: '1.2rem' }}>{msg.nombre}</h3>
              <p style={{ margin: '0 0 20px 0', color: '#ccc', lineHeight: '1.5', fontSize: '0.95rem' }}>{msg.texto}</p>
            </div>
            
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button 
                onClick={() => reaccionarAMensaje(msg.id)}
                style={{ backgroundColor: 'transparent', border: 'none', color: '#ff4b91', fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
              >
                ❤️ <span style={{ color: '#aaa', fontSize: '1rem' }}>{msg.reacciones}</span>
              </button>
            </div>
          </div>
        ))}
      </main>

    </div>
  );
}

export default App;