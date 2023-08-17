document.addEventListener('DOMContentLoaded', () => {
    const generateReportButton = document.querySelector('#generate-report');
    const reportOutput = document.querySelector('#report-output');
  
    generateReportButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/report');
        const data = await response.json();
  
        const reportHTML = `
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Edad</th>
                <th>Género de Poesía</th>
                <th>Fecha de Declaración</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(student => `
                <tr>
                  <td>${student.nombre}</td>
                  <td>${student.carrera}</td>
                  <td>${calculateAge(student.fechaNacimiento)}</td>
                  <td>${student.generoPoesia}</td>
                  <td>${formatDate(student.fechaDeclaracion)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
  
        reportOutput.innerHTML = reportHTML;
      } catch (error) {
        console.error('Error:', error);
        reportOutput.innerHTML = '<p>Error al obtener el reporte</p>';
      }
    });
  
    function calculateAge(date) {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }
      
  
      function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
      }
      
  });
  