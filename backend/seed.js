const sequelize = require("./config/database");
const Product = require("./models/Product");

async function seedGroceryProducts() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced");

    const groceryProducts = [
      {
        name: "Fresh Organic Tomatoes",
        description: "Farm fresh red tomatoes, rich in vitamins",
        price: 45,
        category: "Vegetables",
        image:
          "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
        stock: 50,
      },
      {
        name: "Green Capsicum",
        description: "Crispy fresh capsicum,perfect for salads",
        price: 60,
        category: "Vegetables",
        image:
          "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400",
        stock: 40,
      },
      {
        name: "Fresh Bananas (1 Dozen)",
        description: "Ripe yellow bananas, rich in potassium",
        price: 50,
        category: "Fruits",
        image:
          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
        stock: 60,
      },
      {
        name: "Royal Gala Apples",
        description: "Sweet and crunchy apples from Kashmir",
        price: 180,
        category: "Fruits",
        image:
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
        stock: 35,
      },
      {
        name: "Amul Fresh Milk (1L)",
        description: "Full cream fresh milk, homogenized",
        price: 65,
        category: "Dairy",
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
        stock: 80,
      },
      {
        name: "Amul Butter (500g)",
        description: "Creamy salted butter, made from pure milk",
        price: 285,
        category: "Dairy",
        image:
          "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400",
        stock: 45,
      },
      {
        name: "Brown Bread Loaf",
        description: "Whole wheat healthy brown bread",
        price: 45,
        category: "Bakery",
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
        stock: 25,
      },
      {
        name: "Farm Fresh Eggs (30 pcs)",
        description: "Protein-rich white eggs from cage-free hens",
        price: 180,
        category: "Dairy",
        image:
          "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
        stock: 50,
      },
      {
        name: "Basmati Rice (5kg)",
        description: "Premium aged basmati rice",
        price: 450,
        category: "Staples",
        image:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
        stock: 30,
      },
      {
        name: "Fresh Spinach",
        description: "Organic green spinach leaves",
        price: 30,
        category: "Vegetables",
        image:
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
        stock: 40,
      },
      {
        name: "Fresh Orange Juice (1L)",
        description: "Freshly squeezed orange juice, no preservatives",
        price: 120,
        category: "Beverages",
        image:
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
        stock: 25,
      },
      {
        name: "Yogurt Cup (400g)",
        description: "Creamy fresh yogurt with active cultures",
        price: 55,
        category: "Dairy",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
        stock: 60,
      },
    ];

    await Product.bulkCreate(groceryProducts);
    console.log("✅ Grocery products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding grocery products:", error);
    process.exit(1);
  }
}

seedGroceryProducts();
