import React, { Component } from 'react';
import Screen from './screen'
import Board from  './board'
import '../CSS/calculator.css';
import evaluate from '../functions/evaluate';

class calculator extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            mainD: "0", //mainD = main display
            subD: "", //subDisplay
            prevClick: "n",//prevClick can have one of three values: n(number), o(operation), or e(equals)
            prent: "",
            gray: false
         }
        this.updateScreenDisplay = this.updateScreenDisplay.bind(this)
    }

    // updates the state on the screen
    updateScreenDisplay(s) {
        let {mainD, subD, prevClick, gray} = this.state;
        if(s === 'AC') {
            this.setState({
                mainD: "0",
                subD: "",
                prevClick: "n",
            });
        }
        else if(prevClick === "n" && !gray){
            if(!isNaN(s)){
                if(mainD=="0") this.setState({ mainD: s, prevClick: "n" });
                else this.setState({ mainD: mainD+s, prevClick: "n" });
            }
            else if(s === '/' || s === '+' || s === '-' || s === 'x' && !gray){
                this.setState({
                    prevClick: "o",
                    mainD: mainD+s,
                });
            }else if(s === "="){
                // do what the doc says 
                this.setState({
                    prevClick: "e",
                    subD: mainD+s,
                    mainD: "696969",
                })
            }else if(s == "(") {
                if(mainD === "0"){
                    this.setState({
                        prevClick: "open",
                        mainD: s+")"
                    })
                }else{
                    this.setState({
                        prevClick: "open",
                        mainD: mainD+s+")"
                    })
                }
            }else if(s == "(") {
                this.setState({
                    mainD: mainD
                })
            }
        } // end of "n"
        else if(prevClick=="o"){
            if(!isNaN(s)){
                this.setState({
                    prevClick:"n",
                    mainD: mainD+s,
                })
            }
            else if(s === '/' || s === '+' || s === '-' || s === 'x'){
                this.setState({
                    prevClick:"o",
                    mainD: mainD.substring(0,mainD.length-1)+s,
                })
            }else if(s === "=") {
                this.setState({
                    prevClick: "e",
                    subD: mainD.substring(0,mainD.length-1)+s,
                    mainD: "696969",
                })
            }else if(s === "(" ) {
                this.setState({
                    prevClick: "open",
                    mainD: mainD+s+")"
                })
            }else if(s === ")"){
                this.setState({
                    mainD: mainD
                })
            }
        }  // end of "o" else if
        else if(prevClick === "e"){
            if(!isNaN(s)){
                this.setState({
                    prevClick:"n",
                    subD: "Ans="+ mainD,
                    mainD: s,
                })
            }
            else if(s === '/' || s === '+' || s === '-' || s === 'x'){
                this.setState({
                    prevClick: "o",
                    subD: "",
                    mainD: mainD+s,
                })
            }else if(s === "("){
                 
                this.setState({
                    mainD: mainD + "()",
                    prevClick: "open"
                })
            }else if(s === ")"){
                this.setState({
                    mainD: mainD
                })
            }else {
                console.log("equals sign pressed repetitively");
            }
        } // end of if else for "e"
        else if(prevClick === "open" || gray) {
            let currVal = mainD.slice(0, mainD.length-1);
            if(!isNaN(s)) {
                this.setState({
                    mainD: currVal + s + ")",
                    prevClick: "n",
                    gray: true
                })
            } else if(s === '/' || s === '+' || s === '-' || s === 'x') {
                this.setState({
                    mainD: currVal +  s + ")",
                    gray: true,
                    prevClick: "o"
                })
            }  else if(s === "e") {
                let result = evaluate(s);
                this.setState({
                    mainD: result
                })
            } else if(s === "(") {
                this.setState({
                    mainD: mainD
                })
            }else if(s === ")"){
                this.setState({
                    mainD: currVal + s,
                    gray: false,
                    prevClick: "close"
                })
            }
        } // if of open
        else if(prevClick === 'close') {
            this.setState({
                mainD: mainD + s,
                prevClick: "close"

            })

        } // end of close
        
    }

    render() {
        return (
            <div className="calculator">
                <Screen gray={this.state.gray} prevClick={this.state.prevClick} mainD={this.state.mainD} subD={this.state.subD} />
                <Board updateScreenDisplay={this.updateScreenDisplay}/>
            </div>
        );
    }
}
export default calculator;