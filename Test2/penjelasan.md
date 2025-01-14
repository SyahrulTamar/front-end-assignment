Fungsi ini digunakan untuk menghitung biaya pengiriman berdasarkan beberapa parameter:
tujuan pengiriman (destination), berat barang (weight), dan prioritas pengiriman (priority).
Berikut adalah rincian cara kerja fungsi:

1. Validasi Input
   Di awal fungsi, dilakukan validasi terhadap parameter input:

   - destination:
     - Hanya menerima nilai "domestic" atau "international".
     - Jika nilainya tidak sesuai, fungsi akan mengembalikan pesan "Invalid destination".
   - weight:
     - Harus berupa angka (number) dan lebih besar dari 0.
     - Jika tidak valid, fungsi akan mengembalikan pesan "Invalid weight".
   - priority:
     - Hanya menerima nilai "standard", "express", atau "priority".
     - Jika nilainya tidak sesuai, fungsi akan mengembalikan pesan "Invalid priority".

   Validasi ini memastikan bahwa semua input valid sebelum melanjutkan proses perhitungan.

2. Biaya Dasar per Kilogram
   Setelah validasi, fungsi menentukan biaya dasar per kilogram berdasarkan tujuan (destination)
   dan prioritas (priority):

   - Domestik (pengiriman dalam negeri):
     - standard: Rp 5 per kg
     - express: Rp 10 per kg
     - priority: Rp 20 per kg
   - Internasional (pengiriman luar negeri):
     - standard: Rp 15 per kg
     - express: Rp 25 per kg
     - priority: Rp 50 per kg

   Pemilihan biaya ini dilakukan dengan menggunakan beberapa pernyataan if-else.

3. Perhitungan Biaya Awal
   Setelah menentukan biaya dasar per kilogram, biaya awal dihitung dengan:
   let totalCost = baseCostPerKg * weight;
   Ini berarti total biaya awal adalah hasil kali antara biaya dasar per kilogram dan berat barang.

4. Biaya Tambahan Berdasarkan Berat
   Fungsi menambahkan biaya tambahan jika berat barang melebihi batas tertentu:

   - Domestik:
     - Jika berat barang lebih dari 10 kg, biaya tambahan sebesar Rp 10 ditambahkan.
   - Internasional:
     - Jika berat barang lebih dari 5 kg, biaya tambahan sebesar Rp 50 ditambahkan.

   Biaya tambahan ini dihitung dengan pernyataan:
   if (destination === "domestic" && weight > 10) { totalCost += 10; } else if (destination === "international" && weight > 5) { totalCost += 50; }

5. Mengembalikan Total Biaya
   Setelah menghitung biaya dasar dan menambahkan biaya tambahan (jika ada), fungsi mengembalikan
   total biaya pengiriman dengan:
   return totalCost;
