Meteor.methods({
    serviceReport(serviceId){
        let service = Collection.Order.aggregate([
            {
                $match: {
                    _id: serviceId
                }
            },
            {
                $lookup: {
                    from: "customer",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "customerDoc"
                }
            },
            {
                $unwind: { path: '$customerDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "staff",
                    localField: "staffId",
                    foreignField: "_id",
                    as: "staffDoc"
                }
            },
            {
                $unwind: { path: '$staffDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "orderDetail",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "orderDetailDoc"
                }
            },
            {
                $unwind: { path: '$orderDetailDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "item",
                    localField: "orderDetailDoc.itemId",
                    foreignField: "_id",
                    as: "itemDoc"
                }
            },
            {
                $unwind: { path: '$itemDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "payment",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "paymentDoc"
                }
            },
            {
                $unwind: { path: '$paymentDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: '$_id',
                    deliveryDate: {
                        $last: "$deliveryDate"
                    },
                    receiveDate: {
                        $last: "$receiveDate"
                    },
                    customer: {
                        $last: "$customerDoc.name"
                    },
                    tel: {
                        $last: "$customerDoc.tel"
                    },
                    staff: {
                        $last: "$staffDoc.name"
                    },
                    serviceDetail: {
                        $addToSet: {
                            itemName: '$itemDoc.name',
                            price: '$orderDetailDoc.price',
                            qty: '$orderDetailDoc.quantity',
                            amount: '$orderDetailDoc.amount'
                        }
                    },
                    total: {
                        $last: "$total"
                    },
                    discountType: {
                        $last: "$discountType"
                    },
                    discount: {
                        $last: "$discountVal"
                    },
                    grandTotal: {
                        $last: "$grandTotal"
                    },
                    paidAmount: {
                        $last: "$paymentDoc.paidAmount"
                    },
                    description: {
                        $last: "$description"
                    }
                }
            }
        ]);
        let data = {};
        let content = [];
        if (service) {
            console.log(data);
            data.content = service;
            return data;
        }
    },
    // payment(){
    //     {
    //         $lookup: {
    //             from: "customer",
    //                 localField: "customerId",
    //                 foreignField: "_id",
    //                 as: "customerDoc"
    //         }
    //     },
    //     {
    //         $unwind: {path:'$customerDoc',preserveNullAndEmptyArrays:true}
    //     },
    //     {
    //         $lookup: {
    //             from: "staff",
    //                 localField: "staffId",
    //                 foreignField: "_id",
    //                 as: "staffDoc"
    //         }
    //     },
    //     {
    //         $unwind: {path:'$staffDoc',preserveNullAndEmptyArrays:true}
    //     },
    //     {
    //         $lookup: {
    //             from: "payment",
    //                 localField: "_id",
    //                 foreignField: "orderId",
    //                 as: "paymentDoc"
    //         }
    //     },
    //     {
    //         $unwind: {path:'$paymentDoc',preserveNullAndEmptyArrays:true}
    //     },
    //     {
    //         $lookup: {
    //             from: "orderDetail",
    //                 localField: "_id",
    //                 foreignField: "orderId",
    //                 as: "orderDetailDoc"
    //         }
    //     },
    //     {
    //         $unwind: {path:'$orderDetailDoc',preserveNullAndEmptyArrays:true}
    //     },
    //     {
    //         $lookup: {
    //             from: "item",
    //                 localField: "orderDetailDoc.itemId",
    //                 foreignField: "_id",
    //                 as: "itemDoc"
    //         }
    //     },
    //     {
    //         $unwind: {path:'$itemDoc',preserveNullAndEmptyArrays:true}
    //     },
    //     {
    //         $group: {
    //             _id:'$paymentDoc.orderId',
    //                 serviceDate:{
    //                 $last: "$date"
    //             },
    //             customer:{
    //                 $last: "$customerDoc.name"
    //             },
    //             staff:{
    //                 $last: "$staffDoc.name"
    //             },
    //             serviceDetail:{
    //                 $addToSet: {
    //                     itemName:'$itemDoc.name',
    //                         price:'$orderDetailDoc.price',
    //                         qty:'$orderDetailDoc.quantity',
    //                         discount:'$orderDetailDoc.discount',
    //                         amount:'$orderDetailDoc.amount'
    //                 }
    //             },
    //             total: {
    //                 $last: "$total"
    //             },
    //             discountType:{
    //                 $last: "$discountType"
    //             },
    //             discount:{
    //                 $last: "$discountVal"
    //             },
    //             grandTotal:{
    //                 $last: "$grandTotal"
    //             },
    //             paymentDate: {
    //                 $last: "$paymentDoc.paymentDate"
    //             },
    //             dueAmount: {
    //                 $last: "$paymentDoc.dueAmount"
    //             },
    //             paidAmount: {
    //                 $last: "$paymentDoc.paidAmount"
    //             },
    //             balance: {
    //                 $last: "$paymentDoc.balance"
    //             }
    //         }
    //     }
    // }
});

