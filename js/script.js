"use strict";

class DraggableSelector {
  form = document.querySelector(".pricing-form");
  input = document.querySelector("#price-selector");
  pricingDetails = document.querySelector(".pricing-details");
  pageviews = document.querySelector(".pageviews-num");
  price = document.querySelector(".price");
  timeframe = document.querySelector(".timeframe");
  billPlanBtn = document.querySelector(".billing-plan-btn");
  plans = [
    ["10K", 8],
    ["50K", 12],
    ["100K", 16],
    ["500K", 24],
    ["1M", 36],
  ];
  range;
  discount;

  constructor() {
    this.init();
    this.billPlanBtn.addEventListener("click", this.switchPlan.bind(this));
    this.form.addEventListener("input", this.checkValue.bind(this));
    this.form.addEventListener(
      "submit",
      function (e) {
        this.showResults(e);
      }.bind(this)
    );
  }

  checkValue() {
    const range = +this.input.value;
    const value = (range / this.input.max) * 100;
    this.range = range;
    this.input.style.background = `linear-gradient(to right, #a5f3eb 0%, #a5f3eb ${value}%, #eaeefb ${value}%, #eaeefb 100%)`;
    this.updatePrice(range);
  }

  updatePrice(range) {
    this.pricingDetails.classList.toggle("transition");
    const timeframe = this.discount === 1 ? "month" : "year";
    const perYear = this.discount === 1 ? 1 : 12;
    setTimeout(
      function () {
        this.pageviews.textContent = this.plans[range][0];
        this.price.textContent = `$${(
          this.plans[range][1] *
          perYear *
          this.discount
        ).toFixed(2)}`;
        this.timeframe.textContent = timeframe;
        this.pricingDetails.classList.toggle("transition");
      }.bind(this),
      200
    );
  }

  switchPlan() {
    if (this.discount === 1) {
      this.discount = 0.75;
    } else {
      this.discount = 1;
    }
    this.billPlanBtn.classList.toggle("billing-plan-btn--active");
    this.updatePrice(this.range);
  }

  showResults(e) {
    e.preventDefault();
    console.log(
      `Selected Plan: ${this.plans[this.range][0]} pageviews for $${(
        this.plans[this.range][1] * this.discount
      ).toFixed(2)} / ${this.discount === 1 ? "month" : "year"}`
    );
    console.log("App Finished!");
  }

  init() {
    this.range = 2;
    this.discount = 1;
    this.updatePrice(this.range);
  }
}

const app = new DraggableSelector();
