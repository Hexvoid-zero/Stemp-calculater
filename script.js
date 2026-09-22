const totalRevenueInput = document.getElementById('totalRevenue');
const avgOrderValueInput = document.getElementById('avgOrderValue');
const leadRateInput = document.getElementById('leadRate');
const prospectRateInput = document.getElementById('prospectRate');

const leadsValue = document.getElementById('leadsValue');
const prospectsValue = document.getElementById('prospectsValue');
const customersValue = document.getElementById('customersValue');

const leadRateValue = document.getElementById('leadRateValue');
const prospectRateValue = document.getElementById('prospectRateValue');
const leadsPercentLabel = document.getElementById('leadsPercentLabel');
const customersPercentLabel = document.getElementById('customersPercentLabel');

const leadsProgress = document.getElementById('leadsProgress');
const prospectsProgress = document.getElementById('prospectsProgress');
const customersProgress = document.getElementById('customersProgress');

function roundTo(value, decimals = 2) {
  return Number(value.toFixed(decimals));
}

function updateCalculator() {
  const revenue = Number(totalRevenueInput.value) || 0;
  const avgOrderValue = Number(avgOrderValueInput.value) || 0;
  const leadRate = Number(leadRateInput.value) || 0;
  const prospectRate = Number(prospectRateInput.value) || 0;

  const customers = avgOrderValue > 0 ? revenue / avgOrderValue : 0;
  const leads = leadRate > 0 ? (customers * 100) / leadRate : 0;
  const prospects = prospectRate > 0 ? (leads * 100) / prospectRate : 0;

  const displayCustomers = Math.round(customers);
  const displayLeads = Math.round(leads);
  const displayProspects = Math.round(prospects);

  customersValue.textContent = displayCustomers;
  leadsValue.textContent = displayLeads;
  prospectsValue.textContent = displayProspects;

  const percentLeads = displayProspects ? (displayLeads / displayProspects) * 100 : 0;
  const percentCustomers = displayProspects ? (displayCustomers / displayProspects) * 100 : 0;

  leadsPercentLabel.textContent = `${roundTo(percentLeads, 0)}%`;
  customersPercentLabel.textContent = `${roundTo(percentCustomers, 0)}%`;

  const progressMax = Math.max(displayProspects, displayLeads, displayCustomers, 1);
  leadsProgress.style.width = `${(displayLeads / progressMax) * 100}%`;
  prospectsProgress.style.width = `${(displayProspects / progressMax) * 100}%`;
  customersProgress.style.width = `${(displayCustomers / progressMax) * 100}%`;

  leadRateValue.textContent = `${roundTo(leadRate, 2).toFixed(2)}%`;
  prospectRateValue.textContent = `${roundTo(prospectRate, 2).toFixed(2)}%`;

  leadRateInput.style.setProperty('--percent', `${leadRate}%`);
  prospectRateInput.style.setProperty('--percent', `${prospectRate}%`);
}

[totalRevenueInput, avgOrderValueInput, leadRateInput, prospectRateInput].forEach((input) => {
  input.addEventListener('input', updateCalculator);
});

updateCalculator();
