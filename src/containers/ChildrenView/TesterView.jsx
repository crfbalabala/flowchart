import React, { Component } from 'react';

import { HeadNav, InputDefault, InputPicCode, WeChatLogin, LeftBars } from '../../component'

import { Button } from 'antd';



export default class LoginView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      price: 0
    }
  }

  checkIsLogin(){
    if(CONFIGS.token != 'default'){
      this.props.history.push('/login')
    }
  }

  componentDidMount() {
    
    var dotDefault = "digraph {\n" +
      " Parent -> C1[label=\"default\"];  // Default style is solid \n" +
      " Parent -> C2[label=\"solid pink\", color=\"pink\"];\n" +
      " Parent -> C3[label=\"dashed green\", style=\"dashed\", color=\"green\"];\n" +
      " Parent -> C4[label=\"dotted purple\", style=\"dotted\", color=\"purple\"];\n" +
      "}";

    // create a network
    var container = document.getElementById('mynetwork');
    var options = {
      physics: {
        stabilization: false,
        barnesHut: {
          springLength: 200
        }
      }
    };
    var data = {};
    var network = new vis.Network(container, data, options);

    $('#draw').click(draw);
    $('#reset').click(reset);

    $(window).resize(resize);
    $(window).load(draw);

    $('#data').keydown(function (event) {
      if (event.ctrlKey && event.keyCode === 13) { // Ctrl+Enter
        draw();
        event.stopPropagation();
        event.preventDefault();
      }
    });

    function resize() {
      $('#contents').height($('body').height() -70);
    }

    function draw () {
      try {
        resize();
        $('#error').html('');

        // Provide a string with data in DOT language
        data = vis.network.convertDot($('#data').val());

        network.setData(data);
      }
      catch (err) {
        // set the cursor at the position where the error occurred
        var match = /\(char (.*)\)/.exec(err);
        if (match) {
          var pos = Number(match[1]);
          var textarea = $('#data')[0];
          if(textarea.setSelectionRange) {
            textarea.focus();
            textarea.setSelectionRange(pos, pos);
          }
        }

        // show an error message
        $('#error').html(err.toString());
      }
    }

    function reset() {
      $('#data').val(dotDefault);
      draw();
    }

    window.onload = function() {
      reset();
    }

  }

  render() {

    this.checkIsLogin()

    return(
      <div>
          <div id="header" className="left-container">
            <div>
              <button id="draw" title="Draw the DOT graph (Ctrl+Enter)">Draw</button>
              <button id="reset" title="Reset the DOT graph">Reset</button>
              <span id="error"></span>
            </div>
            <textarea id="data">
            </textarea>
          </div>
          
          <div id="contents" className="right-container">
              <div id="mynetwork" className='mynetwork'></div>
          </div>
      </div>
    )
  }
}

