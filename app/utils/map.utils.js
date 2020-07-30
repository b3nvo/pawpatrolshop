var lodash = require('lodash');
var _ = require('underscore');
const mongoose = require('mongoose');

exports.reArrangeUserAddresses = (users, addresses) => {
    const merged = [];
   
    if (users.length <= 0) {
        return []
    }

    if (addresses.length <= 0) {
        return []
    }



    for (let i = 0 ; i < addresses.length; i++) {
        console.log(addresses);

        var mergedList = _.map(users, (item) => {
            console.log('item', item);
            return _.extend(item, _.findWhere(addresses, { userId: mongoose.Types.ObjectId(item._id)}))
        });

        // merged.push({
        //     user: users[i]._id ? users[i] : users.find((value) => value._id === addresses[i].userId),
        //     address: addresses.find((value) => value[i].userId === users[i]._id)          
        // });
    }
 
    console.log('merged list')

    return mergedList;
}