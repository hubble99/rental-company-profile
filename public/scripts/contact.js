const form_contact = document.getElementById("contact");
const message = document.getElementById("contact-feedback")

const get_customer_id = async () => {
  try {
    const response = await fetch("/api/customer-status-login");
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to get customer login");

    return (data.customer_id)
  } catch (error) {
    setStatus(error.message, true);
  }
};

form_contact.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";

  const customerId = await get_customer_id();
  if (customerId == null) {
    return; 
  }
  
  try {
    const response = await fetch(`/api/contact/${customerId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("contact-message").value
      })
    });
    const data = await response.json();
    if (!response.ok) {
      message.textContent = data.message || "Gagal mengirim pesan";
      return;
    }

    alert("Pesan berhasil dikirim.");
    form_contact.reset();
    
  } catch (error) {
    message.textContent = "Unable to connect to server.";
    console.log(error);
  }
});
