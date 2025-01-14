function calculateShippingCost(destination, weight, priority) {
  // Validasi input
  if (destination !== "domestic" && destination !== "international") {
    return "Invalid destination";
  }
  if (typeof weight !== "number" || weight <= 0) {
    return "Invalid weight";
  }
  if (
    priority !== "standard" &&
    priority !== "express" &&
    priority !== "priority"
  ) {
    return "Invalid priority";
  }

  // Biaya dasar berdasarkan tujuan dan prioritas
  let baseCostPerKg;
  if (destination === "domestic") {
    if (priority === "standard") {
      baseCostPerKg = 5;
    } else if (priority === "express") {
      baseCostPerKg = 10;
    } else if (priority === "priority") {
      baseCostPerKg = 20;
    }
  } else if (destination === "international") {
    if (priority === "standard") {
      baseCostPerKg = 15;
    } else if (priority === "express") {
      baseCostPerKg = 25;
    } else if (priority === "priority") {
      baseCostPerKg = 50;
    }
  }

  // Hitung total biaya awal
  let totalCost = baseCostPerKg * weight;

  // Tambahkan biaya tambahan berdasarkan berat
  if (destination === "domestic" && weight > 10) {
    totalCost += 10;
  } else if (destination === "international" && weight > 5) {
    totalCost += 50;
  }

  // Kembalikan total biaya pengiriman
  return totalCost;
}

console.log(calculateShippingCost("domestic", 12, "express"));
