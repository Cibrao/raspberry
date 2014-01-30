define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    '../../collections/billCollection',
    '../../models/billModel',
    'hbs!../../templates/spendings/spendings.hbs'
    ], function($, _, Backbone, Handlebars, BillCollection, BillModel, SpendingsTemplate) {
      var months = [ 'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 
        'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 
        'listopad', 'grudzień' ];

      var Main = Backbone.View.extend({

        initialize: function() {
          _.bindAll(this, "render", 
            "addToBills",
            "isEnterPressed",
            "registerHelpers", 
            "sumOfBills", 
            "sumOfBillsByMonth", 
            "sumOfPreviousMonthBills", 
            "sumOfCurrentMonthBills", 
            "getBillsFromLocalStorage",
            "getBillsByDate",
            "getBillsForToday");

          this.registerHelpers();
          this.collection = new BillCollection();
          this.render();
        },

        render: function() {
          var bills = this.getBillsForToday();
          this.$el.html(SpendingsTemplate( { date: new Date().getDate() + " " + months[new Date().getMonth()] + " " + new Date().getFullYear() , bills: bills.toJSON() } ));
          $("#amount").focus();
        },

        getBillsFromLocalStorage: function() {
          var ls = new Backbone.LocalStorage("Bills");
          var storedCollection = new BillCollection(ls.findAll());
          return storedCollection;
        },

        getBillsByDate: function(othDate) {
          var billsForDate = new BillCollection();
          var storedCollection = this.getBillsFromLocalStorage();
          storedCollection.each(function(bill) {
            var date = new Date(bill.get("date"));
            if(date.getDate() == othDate.getDate() && date.getMonth() == othDate.getMonth() && date.getFullYear() == othDate.getFullYear()) {
              billsForDate.add(bill);
            } 
          });

          return billsForDate;
        },

        getBillsForToday: function() {
          return this.getBillsByDate(new Date());
        },

        events: {
         "click #add" : "addToBills",
         "click #remove" : "removeFromBills",
         "keyup #amount" : "validateAmountInput"
        },

        addToBills: function() {
          var amount = $("#amount").val().replace(",", ".");
          var bill = new BillModel({ amount: amount, comment: $("#comment").val(), date: new Date()});
          this.collection.add(bill); 
          bill.save();
          this.render();
        },
        
        removeFromBills: function(e) {
          var id = $(e.currentTarget).data("id");
          var item = this.getBillsFromLocalStorage().get(id);
          item.destroy();
          this.render(); 
        },
        
        validateAmountInput: function(e) {
          if(e.currentTarget.validity.patternMismatch && !this.isEnterPressed(e.which)) {
            $("#add").attr("disabled", "disabled");

          } else if(!$("#add").attr("disabled") && this.isEnterPressed(e.which)) {
            this.addToBills();

          } else if($("#add").attr("disabled") && !this.isEnterPressed(e.which)) {
            $("#add").removeAttr("disabled");    
          }
        },

        isEnterPressed: function(key) {
          console.log(key===13);
          return key === 13;
        },

        registerHelpers: function() {
          Handlebars.registerHelper("sumOfBills", this.sumOfBills);
          Handlebars.registerHelper("sumOfCurrentMonthBills", this.sumOfCurrentMonthBills);
          Handlebars.registerHelper("sumOfPreviousMonthBills", this.sumOfPreviousMonthBills);
        },

        sumOfBills: function() {
          var total = 0.0, val;
          var bills = new BillCollection(arguments[0]);
          bills.each(function(bill) {
            val = Number(bill.get("amount"));
            if(!isNaN(val)) {
              total += val;
            }
          });
          return total.toFixed(2);
        },

        sumOfBillsByMonth: function(month) {
          var allBills = this.getBillsFromLocalStorage();
          var total = 0.0, currDate;
          allBills.each(function(bill) {
            currDate = bill.get("date");
            if(new Date(currDate).getMonth() == month) {
              total += Number(bill.get("amount"));
            }
          });
          return total.toFixed(2);
        },

        sumOfCurrentMonthBills: function() {
          return this.sumOfBillsByMonth(new Date().getMonth());
        },

        sumOfPreviousMonthBills: function() {
          var previousMonth = new Date().getMonth();
          if(previousMonth == 0) {
            previousMonth = 11;
          } else {
            previousMonth -= 1;
          }
          return this.sumOfBillsByMonth(previousMonth);
        }
      });
      
      var mainView = new Main({ el: $(".container") });
      return Main;
    });
