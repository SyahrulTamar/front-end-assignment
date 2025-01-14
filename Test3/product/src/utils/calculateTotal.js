export function calculateCategoryTotal(categoryId, categories, products) {
  let total = 0

  // Cari produk yang sesuai dengan categoryId
  const categoryProducts = products.filter((product) => product.category_id === categoryId)
  total += categoryProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)

  // Cari subkategori yang memiliki parent_id = categoryId
  const subcategories = categories.filter((category) => category.parent_id === categoryId)

  // Hitung total harga untuk semua subkategori
  subcategories.forEach((subcategory) => {
    total += calculateCategoryTotal(subcategory.id, categories, products)
  })

  return total
}
