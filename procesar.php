<?php
header('Content-Type: application/json');

// Leer los datos JSON del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que se recibieron los datos correctamente
if (isset($data['peso']) && isset($data['altura'])) {
    $peso = floatval($data['peso']);
    $altura = floatval($data['altura']);

    if ($peso > 0 && $altura > 0) {
        // Calcular IMC
        $imc = $peso / ($altura * $altura);

        // Determinar categoría del IMC
        if ($imc < 18.5) {
            $categoria = 'Bajo peso';
        } elseif ($imc >= 18.5 && $imc < 24.9) {
            $categoria = 'Peso normal';
        } elseif ($imc >= 25 && $imc < 29.9) {
            $categoria = 'Sobrepeso';
        } else {
            $categoria = 'Obesidad';
        }

        // Devolver los resultados en formato JSON
        echo json_encode([
            'success' => true,
            'imc' => number_format($imc, 2),
            'categoria' => $categoria
        ]);
    } else {
        // Devolver mensaje de error
        echo json_encode([
            'success' => false,
            'message' => 'El peso y la altura deben ser mayores a 0.'
        ]);
    }
} else {
    // Devolver mensaje de error
    echo json_encode([
        'success' => false,
        'message' => 'Datos incompletos.'
    ]);
}
