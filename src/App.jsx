import { useState, useEffect, useRef } from 'react';
import {SendHorizontal, Mic, Heart, User, Play, Volume2} from 'lucide-react';
/* global anime */

function App() {
  // 1. Historial de mensajes (burbujas de chat)
  const [mensajes, setMensajes] = useState([
    { id: 1, nombre: "Victoria", texto: "¡Feliz cumple! Que pases un día hermoso, me encanta cómo está quedando este muro de deseos. 💖", reacciones: 5, tipo: 'texto' },
    { id: 2, nombre: "Walter", texto: "¡Un abrazo grande Hugo! Éxitos en todos estos proyectos premium.", reacciones: 2, tipo: 'texto' }
  ]);

  // 2. Estado del formulario inferior
  const [inputNombre, setInputNombre] = useState("");
  const [inputTexto, setInputTexto] = useState("");
  const [destelloActivo, setDestelloActivo] = useState(false);

  // Referencias para las animaciones y el scroll automático
  const contenedorMensajesRef = useRef(null);

  // Efecto de entrada elástica para todo el contenedor de chat al cargar
  useEffect(() => {
    if (!contenedorMensajesRef.current) return;
    
    // Animamos las burbujas iniciales para que entren en cascada
    anime({
      targets: '.burbuja-chat',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(150),
      easing: 'easeOutElastic(1, .6)',
      duration: 1000
    });
  }, []);

  // 3. Función para enviar un nuevo mensaje (Deseo)
  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (inputNombre.trim() === "" || inputTexto.trim() === "") return;

    const nuevoMensaje = {
      id: Date.now(),
      nombre: inputNombre,
      texto: inputTexto,
      reacciones: 0,
      tipo: 'texto'
    };

  

    // Agregamos el mensaje al final de la lista (estilo chat cronológico)
    setMensajes([...mensajes, nuevoMensaje]);

    // Limpiamos solo el texto del mensaje (dejamos el nombre para que no tenga que escribirlo cada vez)
    setInputTexto("");

   // 4. 🔥 EFECTO NATIVO DE PULSO EN EL FONDO (¡Uno solo y bien ordenado!)
    setDestelloActivo(true);
    setTimeout(() => {
      setDestelloActivo(false);
    }, 500);

   

    // Animamos la NUEVA burbuja de forma instantánea justo cuando aparece
    setTimeout(() => {
      const debaAsubir = contenedorMensajesRef.current.lastElementChild;
      if (debaAsubir) {
        anime({
          targets: debaAsubir,
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.9, 1],
          duration: 600,
          easing: 'easeOutBack'
        });
        
        // Auto-scroll hacia abajo para ver el último mensaje
        contenedorMensajesRef.current.scrollTop = contenedorMensajesRef.current.scrollHeight;
      }
    }, 50);
  };

  // Nueva función para inyectar un audio simulado premium
  const enviarAudioSimulado = () => {
    if (inputNombre.trim() === "") {
      alert("Por favor, ingresa tu nombre primero para saber quién envía el audio.");
      return;
    }

    const nuevoAudio = {
      id: Date.now(),
      nombre: inputNombre,
      texto: "",             // Va vacío porque es formato audio
      reacciones: 0,
      tipo: 'audio',         // <-- Clave para el render condicional
      duracion: '0:12'
    };

    setMensajes([...mensajes, nuevoAudio]);

    // Disparar el pulso de fondo que ya te funciona de diez
    setDestelloActivo(true);
    setTimeout(() => {
      setDestelloActivo(false);
    }, 500);

    // Animación elástica para que la burbuja de audio suba flotando
    setTimeout(() => {
      const debaAsubir = contenedorMensajesRef.current.lastElementChild;
      if (debaAsubir) {
        anime({
          targets: debaAsubir,
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.9, 1],
          duration: 600,
          easing: 'easeOutBack'
        });
        contenedorMensajesRef.current.scrollTop = contenedorMensajesRef.current.scrollHeight;
      }
    }, 50);
  };

  // 4. Función para los likes en las burbujas
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
    <div style={{ backgroundColor: '#09090d', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', position: 'relative', overflow:'hidden' }}>

     {/* CAPA DE DESTELLO CINEMÁTICO REAL */}
      <div 
        style={{
          position: 'fixed',             
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${destelloActivo ? 1.6 : 1.1})`, // Se expande con el envío
          width: '600px',                // Más grande para que asome por los lados del celu
          height: '600px',
          background: destelloActivo 
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(0,0,0,0) 70%)'   // Luz índigo fuerte al enviar
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)', // Luz tenue de fondo
          borderRadius: '50%',
          pointerEvents: 'none', 
          zIndex: 0,                     // <-- ¡CLAVE! Lo mandamos al fondo de verdad ahora que el chat va a ser transparente
          opacity: 1,                
          filter: 'blur(50px)',          // <-- Volvemos a suavizar los bordes para que sea luz pura
          transition: 'all 0.5s ease-out' 
        }}
      />

     
      
      {/* Encabezado Fijo superior */}
      <header style={{ width: '100%', maxWidth: '600px', padding: '16px', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #1f1f2e', boxSizing: 'border-box', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ fontSize: '1.4rem', color: '#fc5151', margin: '0 0 4px 0', fontWeight: 'bold' }}> Muro de Deseos</h1>
        <p style={{ color: '#313131', margin: 0, fontSize: '0.85rem' }}></p>
      </header>

      {/* ÁREA DE MENSAJES (HISTORIAL TIPO WHATSAPP) */}
      <main 
        ref={contenedorMensajesRef}
        style={{ width: '100%', maxWidth: '600px', flex: 1, padding: '20px 16px 120px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box', minHeight: 'calc(100vh - 180px)', borderRadius:`32px`, position: 'relative', zIndex: 2, backgroundColor: 'transparent' }}
      >
        {mensajes.map((msg) => (
          <div 
            key={msg.id} 
            className="burbuja-chat"
            style={{ 
              backgroundColor: '#dadada', 
              padding: '14px 16px', 
              borderRadius: '16px 16px 16px 4px', 
              border: '1px solid #232336', 
              maxWidth: '85%', 
              alignSelf: 'flex-start',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {/* Nombre del remitente */}
            <span style={{ color: '#1d1d1d', fontWeight: 'bold', fontSize: '0.85rem' }}>
              <User size={16} /> {msg.nombre}
            </span>
            
            {/* Cuerpo del deseo */}
            {/* Cuerpo del deseo (Condición inteligente: Texto o Audio) */}
            {msg.tipo === 'audio' ? (
              /* --- DISEÑO DEL REPRODUCTOR DE AUDIO PREMIUM --- */
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#161622', padding: '10px 14px', borderRadius: '12px', marginTop: '4px', width: '220px', boxSizing: 'border-box', border: '1px solid #2d2d3d' }}>
                {/* Botón Play */}
                <button type="button" style={{ backgroundColor: '#4f46e5', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                  <Play size={12} fill="#fff" style={{ marginLeft: '2px' }} />
                </button>
                
                {/* Barra de progreso simulada */}
                <div style={{ flex: 1, height: '4px', backgroundColor: '#2d2d3f', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ width: '40%', height: '100%', backgroundColor: '#6366f1', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', top: '-3px', left: '40%', width: '10px', height: '10px', backgroundColor: '#6366f1', borderRadius: '50%' }} />
                </div>

                {/* Tiempo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666', fontSize: '0.75rem' }}>
                  <span>{msg.duracion}</span>
                  <Volume2 size={12} />
                </div>
              </div>
            ) : (
              /* --- MENSAJE DE TEXTO TRADICIONAL --- */
              <p style={{ margin: 0, color: '#020a16', fontSize: '0.95rem', lineHeight: '1.4', wordBreak: 'break-word' }}>
                {msg.texto}
              </p>
            )}
            
            {/* Barra inferior de la burbuja (Reacciones / Corazón) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
              <button 
                onClick={() => reaccionarAMensaje(msg.id)}
                style={{ backgroundColor: '#202030', border: 'none', borderRadius: '20px', color: '#ff4b91', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px' }}
              >
                <Heart size={16} /> <span style={{ color: '#a0aec0', fontSize: '0.8rem' }}>{msg.reacciones}</span>
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* BARRA INFERIOR FIJA (FORMULARIO ESTILO WHATSAPP) */}
      <footer style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '600px', backgroundColor: '#e2e2e2', borderTop: '1px solid #1f1f2e', padding: '12px 16px 24px 16px', boxSizing: 'border-box', zIndex: 10 }}>
        <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          {/* Fila sutil superior para el nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#666', whiteSpace: 'nowrap' }}> Victoria, soy...:</span>
            <input 
              type="text" 
              value={inputNombre}
              onChange={(e) => setInputNombre(e.target.value)}
              placeholder="Ej: Daniel, tu amigo de la facu"
              style={{ flex: 1, 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #2d2d3d', 
                borderRadius: '20px',
                boxSizing: 'border-box',
                borderBottom: '1px solid #2d2d3d', 
                padding: '4px 10px', 
                color: '#242424', 
                fontSize: '0.85rem', 
                outline: 'none' 
              }}
            />
          </div>

          {/* Fila principal del Chat */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
            
            {/* Botón de Audio Simulador (Micrófono) */}
           {/* Botón de Audio Simulador (Micrófono) */}
            <button 
              type="button"
              onClick={enviarAudioSimulado} // <-- Conectado acá
              style={{ backgroundColor: '#1f1f2e', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#a0aec0', flexShrink: 0 }}
            >
              <Mic size={20} />
            </button>

            {/* Input de Texto principal */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type="text"
                maxLength="160"
                value={inputTexto}
                onChange={(e) => setInputTexto(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                style={{ width: '100%', padding: '12px 45px 12px 14px', borderRadius: '24px', border: '1px solid #2d2d3d', backgroundColor: '#161622', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
              />
              {/* Contador de caracteres integrado sutilmente a la derecha */}
              <span style={{ position: 'absolute', right: '14px', fontSize: '0.75rem', color: '#444' }}>
                {inputTexto.length}
              </span>
            </div>

            {/* Botón Enviar (Avioncito/Flecha) */}
            <button 
              type="submit" 
              style={{ 
                backgroundColor: inputTexto.trim() && inputNombre.trim() ? '#4f46e5' : '#2d2d3d', 
                border: 'none', 
                borderRadius: '50%', 
                width: '42px', 
                height: '42px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                fontSize: '1.1rem', 
                color: '#fff', 
                transition: 'background-color 0.3s',
                flexShrink: 0 
              }}
            >
              <SendHorizontal size={20} />
            </button>

          </div>
        </form>
      </footer>

    </div>
  );
}

export default App;