//引入依赖模块
var React = require('react');
var Stream = require('./Steram.react');
var Collection = require('./Collection.react');

//定义React组件
var Application = React.createClass({
    getInitialState: function(){
        return {
            CollectionTweets: {}
        };
    },

    addTweetToCollection: function(tweet){
        var collectionTweets = this.state.collectionTweets;

        collectionTweets[tweet.id] = tweet;

        this.setState({
            collectionTweets: collectionTweets
        });
    },

    removeTweetFromCollection: function(tweet){
        var collectionTweets = this.state.collectionTweets;

        delete collectionTweets[tweet.id];

        this.setState({
            collectionTweets: collectionTweets
        });
    },

    removeAllTweetFromCollection: function(){
        var collectionTweets = this.state.collectionTweets;

        delete collectionTweets[tweet.id];
        
        this.setState({
            collectionTweets: {}
        });
    },

    removeALLTweetFromCollection: function(){
        this.setState({
            collectionTweets: {}
        });
    },

    render: function(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <Stream onAddTweetToCollection = {this.addTweetToCollection} />
                    </div>
                    <div className="col-md-8">
                        <Collection 
                            tweets = {this.state.collectionTweets}
                            onRemoveTweetFromCollection = {this.removeTweetFromCollection}
                            onRemoveAllTweetFromCollection = {this.removeALLTweetFromCollection}
                        />
                    </div>
                </div>
            </div>
        );
    }
});

//作为模块导出这个React组件
module.exports = Application;