# Flow CRUD

1. Fetch Data:
   - Data produk dan kategori di-fetch menggunakan query GraphQL GET_ALL_DATA saat komponen dimuat (onMounted).
   - Data disimpan dalam state Pinia.
2. Add/Edit Product:
   - Modal untuk Add/Edit digunakan untuk mengelola input pengguna.
   - Validasi diterapkan baik di frontend (form) maupun di store sebelum mengirim data ke backend.
   - Produk baru ditambahkan di awal array untuk memastikan tampilannya diurutkan dengan benar.
3. Delete Product:
   - Produk dihapus dari backend menggunakan mutasi DELETE_PRODUCT, dan array di state diperbarui untuk menghapus item tersebut.

# Perhitungan Total Harga Kategori

    - Total harga dihitung secara rekursif menggunakan fungsi calculateCategoryTotal.
    - Fungsi ini menjumlahkan harga semua produk di kategori utama dan subkategori.

# Error Handling

    - Setiap error selama operasi GraphQL ditangkap dan ditampilkan melalui notifikasi menggunakan Notyf.
    - Status loading dan error dikelola dalam state Pinia untuk memastikan UI responsif terhadap perubahan data.
