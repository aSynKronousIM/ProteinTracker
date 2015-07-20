ProteinData = new Meteor.Collection('protein-data');
History = new Meteor.Collection('historyItem');


if (Meteor.isClient) {

    Meteor.subscribe('allProteinData');
    Meteor.subscribe('allHistory');

    Template.userDetails.helpers({
        user: function() {
            var user = ProteinData.findOne();
            return user;
        }
    });

    Template.history.helpers({
        historyItem: function() {
            return History.find({}, {sort: {date: -1}, limit: 5});
        }
    });

    Template.userDetails.events({
        'click #addAmount': function(e) {
            e.preventDefault();

            var amount = parseInt($('#amount').val());

            ProteinData.update(this._id, {$inc: {total: amount}});

            History.insert({
                value: amount,
                date: new Date().toTimeString(),
                userId: this._id
            })
        }
    });
}

if (Meteor.isServer) {

    Meteor.publish('allProteinData', function() {
        return ProteinData.find();
    });

    Meteor.publish('allHistory', function() {
        return History.find();
    });

}
