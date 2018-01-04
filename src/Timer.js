import React from 'react';
import moment from 'moment';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPercent: 0,
                    duration: (typeof this.props.duration != 'undefined' ? this.props.duration : 60) * 1000 ,
                    startTime: 0,
                    pauseTime: 0,
                    pauseDuration: 0,
                    onCompleteTriggered: false
    };
  }  

    componentWillMount() {
      if (this.props.started && !this.props.paused) {
        this.setState({startTime:  moment().valueOf()}, () => {
          let currentMoment = moment().valueOf();
          console.log("test");
          setTimeout(() => {
              this.setState({currentPercent: 100 * ((currentMoment - this.state.startTime - this.state.pauseDuration) / this.state.duration)});
            }, 5);
        });
      }
    }

  componentWillReceiveProps(nextProps) {
    if (nextProps.started && this.state.startTime == 0) {
      this.setState({startTime: moment().valueOf()});
    } else if (nextProps.paused && !this.props.paused) {
      this.setState({pauseTime: moment().valueOf()});
    } else if (!nextProps.paused && this.props.paused) {
        this.setState({pauseDuration: this.state.pauseDuration + (moment().valueOf() - this.state.pauseTime), 
                      pauseTime: 0
        });
    }
  }
  componentDidMount() {
    this.draw();
  }

  componentWillUpdate(nextProps, nextState) {
    this.draw();
    if (nextProps.started && !nextProps.paused && nextState.currentPercent < 100 ) {
      let currentMoment = moment().valueOf();
      setTimeout(() => {
          this.setState({currentPercent: 100 * ((currentMoment - nextState.startTime - nextState.pauseDuration) / nextState.duration)});
        }, 5);
    } else if (nextState.currentPercent >= 100 && typeof nextProps.onComplete != 'undefined' && !nextState.onCompleteTriggered) {
      this.setState({onCompleteTriggered: true}, nextProps.onComplete);
    }
  }

  render() {
    return (
      <div>
        <canvas id={"timerNo" + (typeof this.props.id != 'undefined' ? this.props.id : 1)}  className="timer" width={40 * (typeof this.props.size != 'undefined' ? this.props.size : 10)} height={25 * (typeof this.props.size != 'undefined' ? this.props.size : 10)} />        
      </div>
    );
  }

  draw() {
    var canvas = document.getElementById("timerNo" + (typeof this.props.id != 'undefined' ? this.props.id : 1));
    var outerColor = typeof this.props.outerColor != 'undefined' ? this.props.outerColor : 'white';
    var innerColor = typeof this.props.innerColor != 'undefined' ? this.props.innerColor : 'grey';
    var pageBgColor = this.props.pageBgColor;
    var strokeColor = typeof this.props.strokeColor != 'undefined' ? this.props.strokeColor : 'black';
    var percentCompleted = this.weightPercentage(this.state.currentPercent);
    var size = typeof this.props.size != 'undefined' ? this.props.size : 10;
    var topPercent = 100 - percentCompleted;
    var bottomPercent = percentCompleted;
    var lineWidth = 0.4 * size;
    
    this.drawOuterFill(canvas, 10, 10, size, outerColor, innerColor);
    this.drawInner(canvas, 10, 10, size, innerColor, outerColor, topPercent, bottomPercent);
    this.fixInnerError(canvas, 10, 10, size, pageBgColor);
    this.drawOuterStroke(canvas, 10, 10, size, lineWidth, strokeColor);
           
  }

  drawOuterFill(canvas, startX, startY, size, outerColor, innerColor) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();   
    ctx.fillStyle = outerColor;

    ctx.moveTo(20 * size + startX, startY);
    ctx.bezierCurveTo(20 * size + startX,10 * size + startY,12 * size + startX,5 * size + startY,10 * size + startX, 12 * size + startY);
    
    ctx.bezierCurveTo(8 * size +startX,5 * size +startY,startX,10 * size +startY,startX,startY);
    ctx.lineTo(20 * size+startX, startY);
    ctx.fill();
    ctx.closePath();    

    ctx.beginPath();
    ctx.moveTo(20 * size + startX,24 * size + startY);
    ctx.bezierCurveTo(20 * size + startX,14 * size + startY,12 * size + startX,19 * size + startY,10 * size + startX, 12 * size + startY);
    
    ctx.bezierCurveTo(8 * size +startX,19 * size +startY,startX,14 * size +startY,startX,24 * size +startY);
    ctx.lineTo(20 * size +startX, 24 * size +startY); 
    ctx.fillStyle = innerColor;
    ctx.fill();   
    ctx.closePath(); 
  }

  drawOuterStroke(canvas, startX, startY, size, lineWidth, strokeColor) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth=lineWidth;        
    ctx.strokeStyle = strokeColor;

    ctx.moveTo(20 * size + startX, startY);
    ctx.bezierCurveTo(20 * size + startX,10 * size + startY,12 * size + startX,5 * size + startY,10 * size + startX, 12 * size + startY);
    
    ctx.bezierCurveTo(8 * size+startX,5 * size+startY,startX,10 * size+startY,startX,startY);
    ctx.lineTo(20* size+startX, startY);
    
    ctx.moveTo(startX, startY);
    ctx.lineTo(20.1 * size+startX, startY );
    ctx.stroke();

    ctx.moveTo(20 * size+ startX,24* size + startY);
    ctx.bezierCurveTo(20* size + startX,14* size + startY,12* size + startX,19* size + startY,10* size + startX, 12* size + startY);
    
    ctx.bezierCurveTo(8* size+startX,19* size+startY,startX,14* size+startY,startX,24* size+startY);
    ctx.lineTo(20* size+startX, 24* size+startY); 

    ctx.moveTo(startX,24* size + startY);
    ctx.lineTo(20.1* size + startX,24* size + startY );
    ctx.stroke();
    ctx.closePath();
    
  }

  drawInner(canvas, startX, startY, size, innerColor, outerColor, topPercent, bottomPercent) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();    
    ctx.fillStyle = innerColor;

    ctx.moveTo(20* size + startX, startY);
    ctx.bezierCurveTo(20* size+ startX,10* size + startY,12* size + startX,5* size + startY,10* size+ startX, 12* size + startY);
    
    ctx.bezierCurveTo(8* size+startX,5* size+startY,startX,10* size+startY,startX,startY);
    ctx.lineTo(startX, ((100-topPercent) / 100 * 12* size)+startY);
    ctx.lineTo(20*size+startX,((100-topPercent) / 100 * 12* size)+ startY);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(20* size + startX,24* size + startY);
    ctx.bezierCurveTo(20* size+ startX,14* size+ startY,12* size + startX,19* size + startY,10* size + startX, 12* size + startY);
    
    ctx.bezierCurveTo(8* size+startX,19* size+startY,startX,14* size+startY,startX,24* size+startY);
    ctx.lineTo(startX,12* size+((100-bottomPercent) / 100 * 12* size)+ startY);
    ctx.lineTo(20* size+startX, 12* size+((100-bottomPercent) / 100 * 12* size)+startY);
    ctx.fillStyle = outerColor;
    ctx.fill();
    ctx.closePath();
    
  }

  fixInnerError(canvas, startX, startY, size, pageBgColor) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = pageBgColor;

    ctx.moveTo(20* size + startX, startY);
    ctx.bezierCurveTo(20* size + startX,10* size + startY,12* size + startX,5* size + startY,10* size + startX, 12* size + startY);
    ctx.lineTo(canvas.width, 12* size+startY);
    ctx.lineTo(canvas.width, startY);
    ctx.closePath();
    ctx.fill();

    ctx.moveTo(10* size + startX, 12* size + startY);
    ctx.bezierCurveTo(8* size+startX,5* size+startY,startX,10* size+startY,startX,startY);
    ctx.lineTo(startX, startY);
    ctx.lineTo(startX,12* size+ startY);
    ctx.closePath();
    ctx.fill();

    ctx.moveTo(20* size + startX,24* size + startY);
    ctx.bezierCurveTo(20* size + startX,14* size + startY,12* size + startX,19* size + startY,10* size + startX, 12* size + startY);
    ctx.lineTo(canvas.width, 12* size+startY);
    ctx.lineTo(canvas.width, 24* size+startY);
    ctx.closePath();
    ctx.fill();
    
    ctx.moveTo(10* size + startX,12* size + startY);
    ctx.bezierCurveTo(8* size+startX,19* size+startY,startX,14* size+startY,startX,24* size+startY);
    ctx.lineTo(startX, 24* size+startY); 
    ctx.lineTo(startX, 12* size+startY); 
    ctx.closePath();
    ctx.fill();

    
  }

  weightPercentage(percentage) {
    //Weighting Percent completed to give more accurate picture based on area in timer 
    //TODO: Instead of domain-weighted linear equations, 
    // use more accurate approximation of area under curve
    if (percentage <= 60) {
        return  percentage * 0.7;
    } else if (percentage <= 75){
        return 60 * 0.7 + (percentage - 60) * 0.8;
    } else  {
        return 60 * 0.7 + 15 * 0.8 + (percentage - 75) * 1.84;
    }    
  }
}
