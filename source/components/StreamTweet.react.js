var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Tweet = require('./Tweet.react');

var StreamTweet = React.createClass({
    //在这里定义其他组件生命周期方法
    getInitialState: function(){
        console.log('[Snapterest] StreamTweet: 1.Running getInitialState()');
        return{
            numberOfCharactersIsIncreasing: null,
            headerText: null
        };
    },

    componentWillMount: function(){
        console.log('[Snapterest] StreamTweet: 2.Running componentWillMount()');
        this.setState({
            numberOfCharactersIsIncreasing: true,
            headerText: 'Latest public photo from Twitter'
        });
        window.snapterest = {
            numberOfReceivedTweets: 1,
            numberOfDisplayedTweets: 1
        };        
    },

    componentDidMount: function(){
        console.log('[Snapterest] StreamTweet: 3.Running componentDidMount()');
        var componentDOMRepresentation = ReactDOM.findDOMNode(this);
        window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;//children[0]:<Header />组件的DOM
        window.snapterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML;//children[1]:<Tweet />组件的DOM
    },

    componentWillReceiveProps: function(nextProps){
        console.log('[Snapterest] StreamTweet: 3.Running componentWillReceiveProps()');
        var correntTweetLength = this.props.tweet.text.length;
        var nextTweetLength = nextProps.tweet.text.length;
        var IsnumberOfCharactersIncreasing = (nextTweetLength > correntTweetLength); 

        var headerText;

        this.setState({
            numberOfCharactersIsIncreasing: IsnumberOfCharactersIncreasing
        });

        if (IsnumberOfCharactersIncreasing) {
            headerText = 'Number of characters is increasing';
        } else {
            headerText = 'Latest public photo from Twitter';
        }

        this.setState({
            headerText: headerText
        });

        window.snapterest.numberOfReceivedTweets++;
    },

    shouldComponentUpdate: function(nextProps,nextState){
        console.log('[Snapterest] StreamTweet: 5.Running shouldComponentUpdate()');
        return (nextProps.tweet.text.length > 1);
    },

    componentWillUpdate: function(){
        console.log('[Snapterest] StreamTweet: 6.Running componentWillUpdate()');
    },

    componentDidUpdate: function(){
        console.log('[Snapterest] StreamTweet: 7.Running componentDidUpdate()');
        window.snapterest.numberOfDisplayedTweets++;
    },

    componentWillUnmount: function(){
        console.log('[Snapterest] StreamTweet: 8.Running componentWillUmount()');
        delete window.snapterest;
    },

    render: function(){
        console.log('[Snapterest] StreamTweet: Running render()');

        return(
            <section>
                <Header text={this.state.headerText} />
                <Tweet
                    tweet = {this.props.tweet}
                    onImageClick = {this.props.onAddTweetToCollection}
                />
            </section>
        );
    }
});

module.exports = StreamTweet;