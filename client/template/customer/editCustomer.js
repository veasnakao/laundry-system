//oncreate
Template.editCustomer.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('customer', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editCustomer.rendered = function() {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        })
    } catch (e) {
        console.log(e);
    }
};

Template.editCustomer.helpers({
    customerInfo() {
        var template = Template.instance();
        return Collection.Customer.findOne({
            _id: template.data.id
        });
    }
});

AutoForm.hooks({
    editCustomer: {
        onSuccess(formType, id){
            swal({
                title: "ជោគជ័យ",
                text: "ពត៌មានអតិថិជនកែប្រែជោគជ័យ",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: false
            });
            $("[name='close']").trigger("click");
        },
        onError(formType, error){
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: false
            })
        }
    }
});