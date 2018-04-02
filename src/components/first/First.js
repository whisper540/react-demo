import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './First.css';
import $ from 'jquery';

class First extends Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        //每个事件必须绑定后才可以使用
        this.myTextInput = React.createRef();
        // this.focusFunc = this.focusFunc.bind(this);
        // this.getInput = this.getInput.bind(this);
        //定义初始状态
        this.state = {
            message: false,
            inputValue: "inputValue...",
            divStyle: {
                color: 'red',
                backgroundColor: 'green'
            },
            opacity:0.2,
            //fetch
            usernameF: '',
            lastUrlF: '',
            //ajax数据
            username: '',
            lastUrl: ''
        }
    }

    render() {
        let hellotext = this.state.message ? 'like' : 'have\'t liked';
        return (
            <div>
                <h1> {this.props.title} </h1>
                <hr />
                <input type="text" ref="myTextInput" />
                <input type="button" value="Focus the textinput!" onClick={this.focusFunc.bind(this)}/>
                <p>{ hellotext }</p>
                <hr />
                <input type="button" onClick={this.getInput.bind(this)} value="互动" />
                <p>{ this.state.inputValue }</p>
                <hr />
                <div style={this.state.divStyle}>this is div!</div>
                <div style={{opacity: this.state.opacity}}>this is div2!</div>
                <hr/>
                <div>
                    {this.state.usernameF},
                    {this.state.lastUrlF}
                </div>
                <hr />
                <div>
                    {this.state.username},
                    {this.state.lastUrl}
                </div>
            </div>
        );
    }

    focusFunc() {
        this.refs.myTextInput.focus();//获取真实的DOM节点需要使用refs.name
        //重新修改状态值,每次修改以后，自动调用 this.render 方法，再次渲染组件。
        this.setState({
            message: !this.state.message
        });
    }

    getInput(event) {
        // alert();
        this.setState({
            inputValue: event.target.value
        });
    }

    //生命周期
    // Mounting：已插入真实 DOM
    // Updating：正在被重新渲染
    // Unmounting：已移出真实 DOM
    componentWillMount() {
        console.log('componentWillMount');
        fetch(this.props.source)
            .then(res => res.json())
            .then(
                (result) => {
                    var lastGist = result[1];
                    this.setState({
                        usernameF: lastGist.owner.login,
                        lastUrlF: lastGist.html_url
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        // isLoaded: true,
                        // error
                    });
                }
            )
    }
    componentDidMount() {
        let self = this;
        console.log('componentDidMount');
        $.get(this.props.source,function(res){
            var lastGist = res[0];
            self.setState({
                username: lastGist.owner.login,
                lastUrl: lastGist.html_url
            });
        });
    }
    componentWillUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just added new items.
        // Adjust scroll so these new items don't push the old ones out of view.
        if (snapshot !== null) {
            console.log('componentWillUpdate');
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just added new items.
        // Adjust scroll so these new items don't push the old ones out of view.
        if (snapshot !== null) {
            console.log('componentDidUpdate');
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
}

//设置props的数据类型
First.proTypes = {
    title: PropTypes.func,
}

//设置默认props的title值
First.defaultProps = {
    title: 'First'
}

export default First;