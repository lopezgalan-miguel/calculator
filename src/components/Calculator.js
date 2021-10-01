import React from 'react';

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inputNum: '',
          numbers: [],
          operation:'',
          result: '',
          stringOperation: '0'
        };
    }

    setInputNum(number) {
        if(!isNaN(number)) {
            this.setState({inputNum: number})
        }
    }

    pushNumber() {
        if(this.state.numbers?.length < 2) {
            this.state.numbers.push(this.state.inputNum)
            this.setState({inputNum: ''})
            this.getStringOperation();
        }
        
    }

    getStringOperation() {
        let stringOperation = '';
        this.state.numbers.forEach((number, i) => {
            stringOperation+= number;
            if(this.state.operation && i+1 !==  this.state.numbers.length) {
                stringOperation += this.state.operation;
            }
        })
        this.setState({stringOperation});
    }
    
    setOperation(operation) {
        if(!this.state.operation) {
            this.setState({operation})
        }
        this.pushNumber()
    }

    getResult() {
        this.pushNumber()
        switch(this.state.operation) {
            case '+':
               this.sumNumbers()
                break;
            case '-':
                this.restNumbers()
                    break;
            case '*':
                this.multiplyNumbers()
                    break;
            case '/':
                this.divideNumbers()
                    break;
            default:
                break
        }
        this.setState({
            operation: '',
            numbers: []
        })
    }

    resetdata() {
        this.setState({
            inputNum: '',
            numbers: [],
            operation:'',
            result: '',
            stringOperation: '0'
        })
    }

    disabledButton() {
        return !this.state.numbers?.length && !this.state.inputNum
    }
    // -- operation functions
    sumNumbers() {
        let result = 0;
        this.state.numbers.forEach(element => {
            result+=parseInt(element)
        });
        this.setState({result})
    }

    restNumbers() {
        let result;
        this.state.numbers.forEach(element => {
            const elementInteger = parseInt(element) //save element number format
            if(!result) {
                result = elementInteger;
            } else {
                result-=elementInteger
            }
        });
        this.setState({result})
    }

    multiplyNumbers() {
        let result;
        this.state.numbers.forEach(element => {
            const elementInteger = parseInt(element) //save element number format
            if(!result) {
                result = elementInteger;
            } else {
                result*=elementInteger
            }
        });
        this.setState({result})
    }

    divideNumbers() {
        let result;
        this.state.numbers.forEach(element => {
            const elementInteger = parseInt(element) //save element number format
            if(!result) {
                result = elementInteger;
            } else {
                result/=elementInteger
            }
        });
        this.setState({result})
    }

    render() {
        return(
          <div className = "calculator">
              <div>
                  <p className = "calc-p">
                      {this.state.stringOperation}
                  </p>
              </div>
              <div>
                    <p className = "calc-p">Your result is:</p>
                    <input type = "number" value = {this.state.result} disabled/>
              </div>
            <div>
                <input  type = "number"
                        placeholder="Set your num..."
                        value={this.state.inputNum} 
                        onChange ={ (event)=>this.setInputNum(event.target.value) }
                />
            </div>
            <div className = "calc-bottom">
                <button onClick ={() => this.resetdata()} className = "calc-button is-clear">
                    C
                </button>
                <button onClick ={() => this.setOperation('+')} className = "calc-button is-operation" disabled={this.disabledButton()}>
                    +
                </button>
                <button onClick ={() => this.setOperation('-')} className = "calc-button is-operation" disabled={this.disabledButton()}>
                    -
                </button>
                <button onClick ={() => this.setOperation('*')} className = "calc-button is-operation" disabled={this.disabledButton()}>
                    X
                </button>
                <button onClick ={() => this.setOperation('/')} className = "calc-button is-operation" disabled={this.disabledButton()}>
                    /
                </button>
                <button onClick ={() => this.getResult()} className = "calc-button is-equals" disabled={this.disabledButton()}>
                    =
                </button>
            </div>
          </div>
        )
    }
}