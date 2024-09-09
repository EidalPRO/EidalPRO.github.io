document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("imcForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío normal del formulario

    // Obtener los valores del formulario
    const peso = parseFloat(form.peso.value);
    const altura = parseFloat(form.altura.value);

    // Validar que los valores no sean negativos
    if (peso <= 0 || altura <= 0) {
      Swal.fire("Error", "El peso y la altura deben ser mayores a 0", "error");
      return;
    }

    // Crear el objeto de datos
    const datos = {
      peso: peso,
      altura: altura,
    };

    // Enviar los datos al servidor
    fetch("procesar.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ocurrió un error al realizar la solicitud.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "info",
            title: "Resultado",
            text: `Tu IMC es: ${data.imc} (${data.categoria})`,
          });
        } else {
          Swal.fire(
            "Error",
            data.message || "Ocurrió un error al calcular el IMC",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "Ocurrió un error en la conexión con el servidor.",
          "error"
        );
      });
  });
});
