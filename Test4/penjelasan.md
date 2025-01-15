# Deskripsi
Tugas saya adalah membuat fitur Interactive Map untuk aplikasi logistik. Fitur ini harus menampilkan lokasi-lokasi pengiriman di peta, menghitung total jarak yang ditempuh oleh armada.

# Implementasi

1. Integrasi GraphQL
- Data lokasi diambil menggunakan query GraphQL `GET_ALL_LOCATIONS`.  
  Field yang diambil:
  - `id`: ID lokasi.
  - `name`: Nama lokasi.
  - `latitude` dan `longitude`: Koordinat lokasi.
- Saya juga menambahkan penanganan error agar aplikasi tetap informatif jika terjadi kesalahan saat mengambil data.

2. State Management dengan Pinia
- Pinia digunakan untuk mengelola data lokasi, status loading, error, dan total jarak.
- State Utama:
  - `locations`: Data lokasi yang berhasil diambil.
  - `loading`: Status untuk menandakan data sedang dimuat.
  - `error`: Jika ada kesalahan saat mengambil data.
  - `totalDistance`: Menyimpan total jarak yang dihitung.
- Action Utama:
  - `fetchLocations`: Mengambil data lokasi dari GraphQL backend dan menghitung total jarak.

3. Menghitung Total Jarak
- Jarak antar lokasi dihitung menggunakan Haversine formula, yang memperhitungkan kelengkungan bumi.
- Fungsi `calculateDistance` digunakan untuk menghitung jarak antar titik dalam satu rute, termasuk sub-rute jika ada.  

4. Peta Interaktif (Leaflet)
- Library: Leaflet digunakan untuk menampilkan peta dan marker.
- Fitur Utama:
  - Marker: Lokasi ditampilkan sebagai marker berdasarkan koordinat `latitude` dan `longitude`.
  - Pop-Up: Klik marker akan menampilkan pop-up dengan nama lokasi.

5. Komponen
- Komponen Utama:
  - `MapView.vue`: Mengelola peta, marker, dan pop-up.
  - `InteractiveMap.vue`: Bertanggung jawab untuk mengelola data lokasi dari store dan meneruskan ke komponen peta.
- File Utilitas:
  - `calculateDistance.js`: Fungsi untuk menghitung total jarak disimpan terpisah agar mudah digunakan kembali.