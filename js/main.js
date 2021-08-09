let monthlyInvest = document.getElementById("monthlyInvest");
let mi = document.getElementById("mi");
mi.innerHTML = "Monthly Invest ₹ " + monthlyInvest.value;

let expectedReturnRate = document.getElementById("expectedReturnRate");
let err = document.getElementById("err");
err.innerHTML = "Expected Return Rate " + expectedReturnRate.value + " %";

let timePeriod = document.getElementById("timePeriod");
let tp = document.getElementById("tp");
tp.innerHTML = "Time Period " + timePeriod.value + " Yr";

let ia = document.getElementById("ia");
let er = document.getElementById("er");
let tv = document.getElementById("tv");

const vals = [25000.0, 12.0, 10.0];
let doughnutValues = [3000000, 2808477];

let monthlyInvestTB = document.getElementById("monthlyInvestTB");
let expectedReturnRateTB = document.getElementById("expectedReturnRateTB");
let timePeriodTB = document.getElementById("timePeriodTB");

monthlyInvest.addEventListener("input", function () {
  mi.innerHTML = "Monthly Invest ₹ " + this.value;
  monthlyInvestTB.value = this.value;
  vals[0] = parseFloat(this.value);
  let [loc_ia, loc_er, loc_FV] = calculateSIP(vals);
  ia.innerHTML = "₹" + commaSeparatedString(loc_ia.toString());
  er.innerHTML = "₹" + commaSeparatedString(loc_er.toString());
  tv.innerHTML = "₹" + commaSeparatedString(loc_FV.toString());
  ctx.data.datasets[0].data = [loc_ia, loc_er];
  ctx.update();
});

expectedReturnRate.addEventListener("input", function () {
  err.innerHTML = "Expected Return Rate " + this.value + " %";
  expectedReturnRateTB.value = this.value;
  vals[1] = parseFloat(this.value);
  let [loc_ia, loc_er, loc_FV] = calculateSIP(vals);
  ia.innerHTML = "₹" + commaSeparatedString(loc_ia.toString());
  er.innerHTML = "₹" + commaSeparatedString(loc_er.toString());
  tv.innerHTML = "₹" + commaSeparatedString(loc_FV.toString());
  ctx.data.datasets[0].data = [loc_ia, loc_er];
  ctx.update();
});

timePeriod.addEventListener("input", function () {
  tp.innerHTML = "Time Period " + this.value + " Yr";
  timePeriodTB.value = this.value;
  vals[2] = parseFloat(this.value);
  let [loc_ia, loc_er, loc_FV] = calculateSIP(vals);
  ia.innerHTML = "₹" + commaSeparatedString(loc_ia.toString());
  er.innerHTML = "₹" + commaSeparatedString(loc_er.toString());
  tv.innerHTML = "₹" + commaSeparatedString(loc_FV.toString());
  ctx.data.datasets[0].data = [loc_ia, loc_er];
  ctx.update();
});

monthlyInvestTB.addEventListener("input", function (event) {
  let miv = parseFloat(this.value);
  if (miv > 500.0 && miv < 200000.0 && miv % 500 == 0) {
    monthlyInvest.value = miv;
    mi.innerHTML = "Monthly Invest ₹ " + miv;
    vals[0] = parseFloat(this.value);
    let [loc_ia, loc_er, loc_FV] = calculateSIP(vals);
    ia.innerHTML = "₹" + commaSeparatedString(loc_ia.toString());
    er.innerHTML = "₹" + commaSeparatedString(loc_er.toString());
    tv.innerHTML = "₹" + commaSeparatedString(loc_FV.toString());
    ctx.data.datasets[0].data = [loc_ia, loc_er];
    ctx.update();
  }
});

expectedReturnRateTB.addEventListener("input", function (event) {
  let erv = parseFloat(this.value);
  if (erv > 1.0 && erv < 30.0) {
    expectedReturnRate.value = erv;
    err.innerHTML = "Expected Return Rate " + erv + " %";
    vals[1] = parseFloat(this.value);
    let [loc_ia, loc_er, loc_FV] = calculateSIP(vals);
    ia.innerHTML = "₹" + commaSeparatedString(loc_ia.toString());
    er.innerHTML = "₹" + commaSeparatedString(loc_er.toString());
    tv.innerHTML = "₹" + commaSeparatedString(loc_FV.toString());
    ctx.data.datasets[0].data = [loc_ia, loc_er];
    ctx.update();
  }
});

timePeriodTB.addEventListener("input", function (event) {
  let tpv = parseFloat(this.value);
  if (tpv > 1.0 && tpv < 30.0) {
    timePeriod.value = tpv;
    tp.innerHTML = "Time Period " + tpv + " Yr";
    vals[2] = parseFloat(this.value);
    let [loc_ia, loc_er, loc_FV] = calculateSIP(vals);
    ia.innerHTML = "₹" + commaSeparatedString(loc_ia.toString());
    er.innerHTML = "₹" + commaSeparatedString(loc_er.toString());
    tv.innerHTML = "₹" + commaSeparatedString(loc_FV.toString());
    ctx.data.datasets[0].data = [loc_ia, loc_er];
    ctx.update();
  }
});

function calculateSIP() {
  let P = vals[0];
  let r = vals[1];
  let i = r / 100 / 12;
  let y = vals[2];
  let n = y * 12;
  let FV = (P * [Math.pow(1 + i, n) - 1] * (1 + i)) / i;
  let ia = vals[0] * n;
  let er = FV - ia;
  return [Math.round(ia), Math.round(er), Math.round(FV)];
}

function commaSeparatedString(no) {
  let lastThree = no.substring(no.length - 3);
  let otherNumbers = no.substring(0, no.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

/* chart.js chart examples */

// chart colors
let colors = ["#007bff", "#28a745", "#333333", "#c3e6cb", "#dc3545", "#6c757d"];

/* 3 donut charts */
let donutOptions = {
  cutoutPercentage: 65,
  legend: {
    position: "top",
    padding: 10,
    labels: { pointStyle: "circle", usePointStyle: false },
  },
};

// donut 1
let chDonutData1 = {
  labels: ["Invested Amount", "Est. Return"],
  datasets: [
    {
      backgroundColor: colors.slice(0, 2),
      borderWidth: 0,
      data: doughnutValues,
    },
  ],
  hoverOffset: 4,
};

let chDonut1 = document.getElementById("chDonut1");
let ctx = null;
if (chDonut1) {
  ctx = new Chart(chDonut1, {
    type: "pie",
    data: chDonutData1,
    options: donutOptions,
  });
}
