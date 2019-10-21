import React from "react";
import { withRouter } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleDownArrow = this.handleDownArrow.bind(this);
    this.handleUpArrow = this.handleUpArrow.bind(this);
  }

  handleDownArrow(e) {
    const parentEl = document.querySelector("#language-to-learn");
    const downArrow = document.querySelector(".arrow-down");
    const upArrow = document.createElement("span");

    upArrow.classList.add("arrow-up");
    upArrow.onclick = this.handleUpArrow;

    parentEl.removeChild(downArrow);
    parentEl.appendChild(upArrow);

    this.props.openDropDown();
  }

  handleUpArrow(e) {
    const parentEl = document.querySelector("#language-to-learn");
    const upArrow = document.querySelector(".arrow-up");
    const downArrow = document.createElement("span");

    downArrow.classList.add("arrow-down");
    downArrow.onclick = this.handleDownArrow;

    parentEl.removeChild(upArrow);
    parentEl.appendChild(downArrow);
  }

  render() {
    return (
      <div className="teach-language" style={{ top: "0px" }}>
        <p className="teach-language-choice">
          <span onClick={this.handleDownArrow} id="language-to-learn">
            {this.props.match.params.languageName}
            <span className="arrow-down"></span>
          </span>
        </p>
      </div>
    );
  }
}

export default withRouter(SearchBar);
