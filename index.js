 const info = {
            historia: {
                texto: `
                    <h2>Historia de la UFC</h2>
                    <p>La UFC fue fundada en 1993 con la idea de encontrar el arte marcial más efectivo en combate real. Desde entonces, ha evolucionado hasta convertirse en la principal organización de artes marciales mixtas (MMA) en el mundo.</p>
                `,
                imagen: '..//imagenes/historia.jpg'
            },
            campeones: {
                texto: `
                    <h2>Campeones actuales</h2>
                    <ul>
                        <li>Peso pesado: Jon Jones</li>
                        <li>Peso semipesado: Jan Blachowicz</li>
                        <li>Peso mediano: Israel Adesanya</li>
                        <li>Peso welter: Kamaru Usman</li>
                        <li>Peso ligero: Charles Oliveira</li>
                    </ul>
                `,
                imagen: '..//imagenes/campeones.jpg'
            },
            reglas: {
                texto: `
                    <h2>Reglas básicas de UFC</h2>
                    <ul>
                        <li>Rondas: 3 a 5 rounds de 5 minutos</li>
                        <li>Golpes permitidos: puñetazos, patadas, rodillazos y agarres</li>
                        <li>No se permite: golpes a la nuca, ataques a ojos, mordidas, ni golpes a la ingle</li>
                        <li>Ganador por nocaut, sumisión o decisión de jueces</li>
                    </ul>
                `,
                imagen: '..//imagenes/reglas.jpg'
            },
            peleadoresFamosos: {
                texto: `
                    <h2>Peleadores famosos de UFC</h2>
                    <ol>
                        <li>Conor McGregor</li>
                        <li>Ronda Rousey</li>
                        <li>Anderson Silva</li>
                        <li>Georges St-Pierre</li>
                        <li>Chuck Liddell</li>
                    </ol>
                `,
                imagen: '..//imagenes/peleadores.png'
            },
            estadísticas: {
                texto: `
                    <h2>Estadísticas UFC</h2>
                    <p>La UFC cuenta con más de 500 peleadores activos, más de 400 eventos realizados y millones de fanáticos en todo el mundo.</p>
                `,
                imagen: '..//imagenes/estadisticas.png'
            }
        };

        const contadorVisitas = {
            historia: 0,
            campeones: 0,
            reglas: 0,
            peleadoresFamosos: 0,
            estadísticas: 0
        };

        function mostrarInfo(seccion) {
            const contenido = document.getElementById('contenido');
            const data = info[seccion];

            // Incrementar contador solo si es info normal (no cuestionario)
            if(contadorVisitas.hasOwnProperty(seccion)) {
                contadorVisitas[seccion]++;
            }
            
            contenido.classList.remove('visible');
            setTimeout(() => {
                contenido.innerHTML = data.texto + `<img src="${data.imagen}" alt="${seccion} imagen" />` +
                    (contadorVisitas.hasOwnProperty(seccion) ? `<div id="contador">Visitas a esta sección: ${contadorVisitas[seccion]}</div>` : '');
                contenido.classList.add('visible');
            }, 300);

            limpiarBotonesActivos();
            const btn = document.getElementById(`btn-${seccion}`);
            if(btn) btn.classList.add('active');
        }

        function limpiarBotonesActivos() {
            document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
        }

        function limpiarContenido() {
            const contenido = document.getElementById('contenido');
            contenido.classList.remove('visible');
            limpiarBotonesActivos();
            setTimeout(() => {
                contenido.innerHTML = `<p>Haz clic en los botones para ver información sobre UFC.</p>`;
                contenido.classList.add('visible');
            }, 300);
        }

        // Mostrar contenido inicial animado al cargar
        window.onload = () => {
            const contenido = document.getElementById('contenido');
            setTimeout(() => contenido.classList.add('visible'), 100);
        };

        // Función para mostrar cuestionario de satisfacción
        function mostrarCuestionario() {
            const contenido = document.getElementById('contenido');
            contenido.classList.remove('visible');
            setTimeout(() => {
                contenido.innerHTML = `
                    <h2>Cuestionario de Satisfacción UFC</h2>
                    <form id="formCuestionario">
                        <label>1. ¿Qué tan satisfecho estás con esta página UFC?</label>
                        <label><input type="radio" name="satisfaccion" value="Muy satisfecho" required> Muy satisfecho</label>
                        <label><input type="radio" name="satisfaccion" value="Satisfecho"> Satisfecho</label>
                        <label><input type="radio" name="satisfaccion" value="Neutral"> Neutral</label>
                        <label><input type="radio" name="satisfaccion" value="Insatisfecho"> Insatisfecho</label>
                        <label><input type="radio" name="satisfaccion" value="Muy insatisfecho"> Muy insatisfecho</label>

                        <label>2. ¿Cuál es tu peleador favorito de UFC?</label>
                        <input type="text" name="peleadorFavorito" placeholder="Escribe aquí..." required>

                        <label>3. ¿Te gustaría que se agreguen más secciones o funcionalidades?</label>
                        <label><input type="radio" name="masFuncionalidades" value="Sí" required> Sí</label>
                        <label><input type="radio" name="masFuncionalidades" value="No"> No</label>

                        <button type="submit" class="btn-enviar">Enviar</button>
                    </form>
                    <div id="mensajeFinal" class="mensaje-final"></div>
                `;
                contenido.classList.add('visible');

                limpiarBotonesActivos();
                document.getElementById('btn-cuestionario').classList.add('active');

                const form = document.getElementById('formCuestionario');
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    procesarCuestionario(new FormData(form));
                });
            }, 300);
        }

        function procesarCuestionario(formData) {
            const mensajeFinal = document.getElementById('mensajeFinal');
            const satisfaccion = formData.get('satisfaccion');
            const peleador = formData.get('peleadorFavorito');
            const funcionalidades = formData.get('masFuncionalidades');

            mensajeFinal.innerHTML = `
                <p>¡Gracias por completar el cuestionario!</p>
                <p><strong>Satisfacción:</strong> ${satisfaccion}</p>
                <p><strong>Peleador favorito:</strong> ${peleador}</p>
                <p><strong>Más funcionalidades:</strong> ${funcionalidades}</p>
            `;
        }
    // Base de datos
        fetch('cuestionario.php', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.status === 'ok') {
        mensajeFinal.innerHTML += `<p>✅ Datos guardados correctamente en la base de datos.</p>`;
    } else {
        mensajeFinal.innerHTML += `<p>❌ Error al guardar los datos: ${data.error}</p>`;
    }
})
.catch(error => {
    mensajeFinal.innerHTML += `<p>❌ Error de red o servidor: ${error.message}</p>`;
});