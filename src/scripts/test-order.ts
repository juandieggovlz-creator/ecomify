async function testOrder() {
  const testData = {
    firstName: "Juan",
    lastName: "Prueba",
    phone: "3242063393",
    email: "juan@test.com",
    department: "Antioquia",
    city: "Medellín",
    address: "Calle Test 123",
    reference: "Frente al parque principal casa verde",
    complement: "Apto 502",
    quantity: 1
  };

  try {
    const response = await fetch("http://localhost:3000/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log("Response from API:", result);
    if (result.success) {
      console.log("Test SUCCESSFUL! Order created with number:", result.orderNumber);
    } else {
      console.log("Test FAILED:", result.error);
    }
  } catch (error) {
    console.error("Connection Error:", error);
  }
}

testOrder();
