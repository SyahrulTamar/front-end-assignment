function calculateTax(income, age, dependents) {
  // Validasi input is not number dan angka dibawah nol
  if (typeof income !== "number" || income < 0) {
    return "Invalid income";
  } else if (typeof age !== "number" || age < 0) {
    return "Invalid age";
  } else if (typeof dependents !== "number" || dependents < 0) {
    return "Invalid dependents";
  }

  // Validasi umur di bawah 18 tahun tidak berhak pajak
  if (age < 18) {
    return "Not eligible for tax";
  }

  // Tarif pajak berdasarkan income
  let taxRate;
  if (income <= 10000) {
    taxRate = 0.1;
  } else if (income <= 50000) {
    taxRate = 0.2;
  } else {
    taxRate = 0.3;
  }

  // Diskon jika umur >= 65, setalah tarif pajak di tentukan
  if (age >= 65) {
    taxRate = taxRate * 0.8;
  }

  // Dapetin pajak awal sebelum pengurangan tanggungan
  let tax = income * taxRate;

  // Rekursi untuk pengurangan tax tanggungan
  function applyDependentDeduction(tax, dependentsLeft) {
    if (dependentsLeft === 0) {
      return tax;
    } else {
      return applyDependentDeduction(tax - 500, dependentsLeft - 1);
    }
  }

  // Pajak akhir
  tax = applyDependentDeduction(tax, dependents);

  // Jangan sampai di bawah nol nilai kembalinya, kalo di bawah nol balikin nol
  if (tax < 0) {
    return 0;
  } else {
    return tax;
  }
}

console.log(calculateTax(0, 25, 0)); // Pajak harus $0
console.log(calculateTax(10000, 18, 0)); // Pajak dihitung normal
console.log(calculateTax(5000, 17, 0)); // "Not eligible for tax"
console.log(calculateTax(1000, 30, 5)); // Pajak harus $0
console.log(calculateTax("5000", 30, 2)); // "Invalid income"
console.log(calculateTax(10000, 18, 100)); // Pajak harus $0
