const logout = document.getElementById("logout");
const delete_account = document.getElementById("delete-account");
const modal = document.getElementById("logout-modal");
const btn_del = document.getElementById("delete-button");
const close_modal = document.getElementsByClassName("modal-close")[0];
const form_data = document.getElementById("change-data")
const message = document.getElementById("message")

// When the user clicks the button, open the modal 
btn_del.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close_modal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const get_customer_id = async () => {
  try {
    const response = await fetch("/api/customer-status-login");
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to get customer login");

    return (data)
  } catch (error) {
    setStatus(error.message, true);
  }
};

logout.addEventListener("click", async (event) => {
  event.preventDefault();
  const customerId = await get_customer_id();
  try {
    const response = await fetch(`/api/customer-logout/${customerId.customer_id}`, {
      method: "PUT"});
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Logout failed");

    alert("Berhasil Logout");
    window.location.href = "/";
    
  } catch (error) {
      console.error(error);
      alert(error.message || "Unable to connect to server.");
    }
});

logout.addEventListener("click", async (event) => {
  event.preventDefault();
  const customerId = await get_customer_id();
  try {
    const response = await fetch(`/api/customer-logout/${customerId.customer_id}`, {
      method: "PUT"});
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Logout failed");

    alert("Berhasil Logout");
    window.location.href = "/";
    
  } catch (error) {
      console.error(error);
      alert(error.message || "Unable to connect to server.");
    }
});

form_data.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  const customerId = await get_customer_id();
  try {
    const response = await fetch(`/update/${customerId.customer_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message || "Data Gagal Dirubah";
      return;
    }
    alert("Data berhasil dirubah");
    form_data.reset();
    
  } catch (error) {
    message_register.textContent = "Unable to connect to server.";
    console.log(error)
  }
});

delete_account.addEventListener("click", async (event) => {
  event.preventDefault();
  const customerId = await get_customer_id();
  try {
    const response = await fetch(`/delete/${customerId.customer_id}`, {method: "DELETE"});

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Deleted account failed");

    alert("Berhasil Menghapus Akun");
    window.location.href = "/";
    
  } catch (error) {
      console.error(error);
      alert(error.message || "Unable to connect to server.");
    }
});