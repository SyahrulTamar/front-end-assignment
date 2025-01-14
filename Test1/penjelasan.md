Test 1 meminta saya membuat fungsi bernama calculateTax untuk menghitung pajak seseorang berdasarkan: Pendapatan (income), Usia (age), Jumlah tanggungan (dependents)

# Fungsi ini juga harus:

- Memeriksa apakah data input benar (validasi).
- Menghitung tarif pajak berdasarkan aturan.
- Memberikan diskon jika usia ≥ 65. - Mengurangi pajak berdasarkan tanggungan.
- Memastikan pajak tidak negatif (minimal $0). - Menggunakan rekursi untuk menghitung pengurangan pajak tanggungan.

# Langkah-Langkah Membuat Fungsi:

1.  Cek Input Valid atau Tidak
    - Jika pendapatan (income) negatif atau bukan angka, kembalikan "Invalid income".
    - Jika usia (age) negatif atau bukan angka, kembalikan "Invalid age".
    - Jika tanggungan (dependents) negatif atau bukan angka, kembalikan "Invalid dependents".
2.  Periksa Usia
    - Jika usia di bawah 18, langsung kembalikan "Not eligible for tax" karena orang ini tidak perlu membayar pajak.
3.  Hitung Tarif Pajak
    Jika pendapatan: - ≤ $10,000 → Pajak 10%. - $10,001 - $50,000 → Pajak 20%. - $50,000 → Pajak 30%.
4.  Berikan Diskon Usia
    - Jika usia ≥ 65, tarif pajak diberi diskon 20%. Artinya, hanya 80% dari tarif awal yang dihitung (misalnya, dari 30% menjadi 24%).
5.  Hitung Pajak Awal
    - Kalikan pendapatan dengan tarif pajak (misalnya, $50,000 \* 20% = $10,000).
6.  Kurangi Pajak Berdasarkan Tanggungan (Rekursi)
    - Untuk setiap tanggungan, kurangi pajak sebesar $500.
      Proses ini dilakukan secara rekursif (memanggil fungsi berulang sampai semua tanggungan selesai).
7.  Pastikan Pajak Tidak Negatif
    - Jika setelah semua perhitungan pajak menjadi negatif, kembalikan 0 karena pajak minimum adalah $0.
      Kembalikan Pajak Akhir

# Contoh, jika income = 55000, age = 70, dan dependents = 2

1.  Validasi Input:
    - Semua input valid: pendapatan 55,000, usia 70, tanggungan 2.
2.  Hitung Tarif Pajak:
    - Pendapatan > $50,000 → Tarif pajak 30% (taxRate = 0.3).
3.  Periksa Usia:
    - Usia 70 ≥ 65
4.  Diskon Usia:
    - Diskon 20% diterapkan: taxRate = 0.3 \* 0.8 = 0.24 (24%).
5.  Hitung Pajak Awal:
    - Pajak awal: $55,000 \* 0.24 = $13,200.
6.  Kurangi Pajak untuk Tanggungan (Rekursi):
    Pajak awal = $13,200.
    - Iterasi 1: Pajak = $13,200 - $500 = $12,700, tanggungan sisa = 1.
    - Iterasi 2: Pajak = $12,700 - $500 = $12,200, tanggungan sisa = 0.
    - Pajak akhir = $12,200.
7.  Pajak Minimum:
    - Pajak tidak negatif → Kembalikan pajak akhir.
