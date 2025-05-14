import { NumberFrequency } from '@/components/Main'

export const roundNumber = (num: number) => {
  const integerPart = Math.floor(num)
  const decimalPart = num - integerPart
  if (decimalPart > 0.59) {
    return integerPart + 1
  } else if (decimalPart < 0.5) {
    return integerPart
  } else {
    if (integerPart % 2 === 0) {
      return integerPart
    } else {
      return integerPart + 1
    }
  }
}

export const createTable = (
  numbers: Array<number>,
  N: number,
  setResults: (value: Array<NumberFrequency>) => void
) => {
  // Contar las ocurrencias de cada número
  const frequencyMap: { [key: number]: number } = {}
  numbers.forEach((num) => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1
  })
  // Crear un array de números únicos
  const uniqueNumbers = Object.keys(frequencyMap).map(Number)
  // Crear el nuevo array de objetos
  const resultArray: NumberFrequency[] = uniqueNumbers.map((num) => ({
    X: num,
    f: frequencyMap[num],
  }))
  // Ordenar de menor a mayor
  resultArray.sort((a, b) => a.X - b.X)
  // Calcular la propiedad F
  let cumulativeF = 0
  resultArray.forEach((item) => {
    cumulativeF += item.f
    item.F = cumulativeF // Ahora F es reconocida
  })
  // Agregar números faltantes con f = 0 dentro del rango
  const minNumber = Math.min(...uniqueNumbers)
  const maxNumber = Math.max(...uniqueNumbers)
  for (let i = minNumber; i <= maxNumber; i++) {
    if (!frequencyMap[i]) {
      resultArray.push({ X: i, f: 0, F: cumulativeF }) // Mantener el valor anterior de F
    }
  }
  // Ordenar nuevamente después de agregar números faltantes
  resultArray.sort((a, b) => a.X - b.X)
  // Actualizar F y calcular h, p, H, P para los números
  cumulativeF = 0 // Reiniciar cumulativeF para calcular correctamente
  resultArray.forEach((item) => {
    cumulativeF += item.f
    item.F = cumulativeF // Actualizar F
    item.h = parseFloat((item.f / N).toFixed(2))
    item.p = parseFloat((item.h * 100).toFixed(2))
    item.H = parseFloat((item.F / N).toFixed(2))
    item.P = parseFloat((item.H * 100).toFixed(2))
  })
  setResults(resultArray)
}
