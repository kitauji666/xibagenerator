import "./App.css";
import Essay from "./components/Essay";
import React, { useRef, useState, useEffect } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import avatar from "./xi8.png";
function App() {
  // const [sliderValue, setSliderValue] = useState(2);
  class MyForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        work: "",
        epNum: "",
        protagonist: "",
        showCustomizedComponent: false,
        sliderValue: 2,
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
        showCustomizedComponent: false,
      });
    };
    
    handleSliderChange = (event) => {
      this.setState({
        sliderValue: event.target.value,
      });
    };

    handleClick = (e) => {
      e.preventDefault();
      this.setState({
        showCustomizedComponent: true,
      });
    };

    render() {
      return (
        <div>
          <form>
            <input
              type="text"
              name="work"
              value={this.state.work}
              placeholder="作品名，如孤独摇滚"
              onChange={this.handleChange}
            />
            <input
              type="number"
              name="epNum"
              value={this.state.epNum}
              placeholder="集数，如11"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="protagonist"
              value={this.state.protagonist}
              placeholder="主角名，如波奇"
              onChange={this.handleChange}
            />

            <button id="submitButton" onClick={this.handleClick}>
              生成
            </button>
            <input
              id="slider-component"
              type="range"
              min="1"
              max="10"
              value={this.state.sliderValue}
              onChange={this.handleSliderChange}
              // onChange={(event) => setSliderValue(event.target.value)}
            />
            <p style={{textAlign: "center"}}>段落数：{this.state.sliderValue}</p>
          </form>
          {this.state.showCustomizedComponent && (
            <ComponentToPrint
              ref={componentRef}
              work={this.state.work === "" ? "孤独摇滚" : this.state.work}
              epNum={this.state.epNum === "" ? "11" : this.state.epNum}
              protagonist={
                this.state.protagonist === "" ? "波奇" : this.state.protagonist
              }
              paragraphNum={this.state.sliderValue}
            />
          )}
        </div>
      );
    }
  }

  // <ComponentToPrint ref={componentRef} />
  const componentRef = useRef();
  const ComponentToPrint = React.forwardRef((props, ref) => (
    <div id="component-to-print" ref={ref}>
      <Essay
        id="main-essay"
        work={props.work}
        epNum={props.epNum}
        protagonist={props.protagonist}
        paragraphNum={props.paragraphNum}
      />
    </div>
  ));

  return (
    <div className="application">
      <div className="main-body">
        <h1>喜八君生成器</h1>
        <button
          id="saveButton"
          onClick={() =>
            exportComponentAsPNG(componentRef, {
              html2CanvasOptions: { backgroundColor: "#FCFCF0", padding: "5%" },
            })
          }
        >
          保存为图片
        </button>
        
        <MyForm />
        <a href="https://github.com/kitauji666/xibagenerator/">项目地址</a>
      </div>
    </div>
  );
}

export default App;
