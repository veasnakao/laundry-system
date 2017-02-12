// //oncreated
Template.printInvoice.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('orders');
        this.subscription = Meteor.subscribe('customers');
        this.subscription = Meteor.subscribe('items');
        this.subscription = Meteor.subscribe('orderDetails');
    }.bind(this));
};

Template.printInvoice.helpers({
    serviceReport(){
        if (Session.get('serviceReport')) {
            return Session.get('serviceReport');
        }
    },
    checkPayment(payment){
        if (payment == null) {
            return true
        }
    },
    company(){
        let company = Collection.Company.find();
        if (company) {
            return company;
        }
    },
});

Template.printInvoice.events({
    'click .js-back'(){
        let params = Router.current().params;
        let orderId = params.orderId;
        let order = Collection.Order.findOne(orderId);
        Router.go(`/itemOrder/orderId/${orderId}?staffId=${order.staffId}&customerId=${order.customerId}`)
    },
    'click #print'(){
        var mode = 'iframe'; // popup
        var close = mode == "popup";
        var options = {mode: mode, popClose: close};
        $("div.print").printArea(options);
        Router.go(`/showOrder`);
    },
});