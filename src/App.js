import React, { Component } from "react";
import { HomePage } from "./Pages/HomePage";
import { Switch, Route, withRouter } from "react-router-dom";
import { EventPage } from "./Pages/EventPage";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from './pageTransition/slideTransition.module.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDepth: this.getPathDepth(this.props.location),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({ prevDepth: this.getPathDepth(this.props.location) });
    }
  }

  getPathDepth(location) {
    let pathArr = location.pathname.split("/");
    pathArr = pathArr.filter((n) => n !== "");
    return pathArr.length;
  }

  render() {
    const { location } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = {
      enter: 800,
      exit: 400,
    };

    const transitionDirection =
      this.getPathDepth(location) >= this.state.prevDepth ? "left" : "right";

    return (
      <TransitionGroup component={null}>
        <CSSTransition
          timeout={timeout}
          mountOnEnter={false}
          unmountOnExit={true}
          key={currentKey}
          classNames={styles.pageSlider}
        >
          <div className={transitionDirection}>
            <Switch location={location}>
              <Route path="/" exact component={HomePage} />
              <Route path="/event" exact component={EventPage} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);
