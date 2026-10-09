const calculateRentProcess = document.getElementById("hitung-sewa")
const pricesVehicle = {
  nmax: 150000,
  beat: 80000,
  adv: 200000,
  avanza: 350000,
  innova: 400000,
  agya: 250000,
};

const calculate = (duration, driver, helm, pickUp, vehicle) => {
  const costVehicle = pricesVehicle[vehicle] * duration;
  const costDriver = driver ? 150000 * duration : 0;
  const costHelm = helm ? 10000 * duration : 0;
  const costPickUp = pickUp ? 50000 : 0;

  const subtotal = costVehicle + costDriver + costHelm + costPickUp;
  const discount = duration >= 7 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return { costVehicle, costDriver, costHelm, costPickUp, discount, total };
};

calculateRentProcess.addEventListener("submit", (event) => {
  event.preventDefault();
  const vehicle = document.getElementById("vehicles").value; 
  const ambil = document.getElementById("ambil").value;
  const kembali = document.getElementById("kembali").value;
  const driver = document.getElementById("driver").checked;
  const pickUp = document.getElementById("antar-jemput").checked;
  const helm = document.getElementById("helm").checked;

  const MS_PER_DAY = 1000 * 60 * 60 * 24; 
  const selisih = new Date(kembali) - new Date(ambil); 
  const durasi = Math.max(1, Math.round(selisih / MS_PER_DAY));

  const result = calculate(durasi, driver, helm, pickUp, vehicle);

  document.getElementById("out-durasi").textContent = durasi;
  document.getElementById("out-sewa").textContent = result.costVehicle;
  document.getElementById("out-sopir").textContent = result.costDriver;
  document.getElementById("out-antar").textContent = result.costPickUp;
  document.getElementById("out-helm").textContent = result.costHelm;
  document.getElementById("out-diskon").textContent = result.discount;
  document.getElementById("out-total").textContent = result.total;
});
