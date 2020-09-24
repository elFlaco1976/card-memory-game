import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated, interpolate } from "react-spring";
import "./styles.scss";

const MyAnimationTest = () => {
  const props1 = useSpring({ fontSize: "50px", from: { fontSize: "10px" } });
  const props2 = useSpring({ number: 100, from: { number: 0 } });
  return (
    <div>
      <animated.h1 style={props1}>YES I CAN DO IT!!!!!</animated.h1>
      <animated.p>{props2.number}</animated.p>
    </div>
  );
};

/* const MyAnimationTest = () => {
  const [toggle, setToggle] = useState(false);

  const x = useSpring({
    x: toggle ? 1 : 0,
    config: { duration: 1000 },
  });

  console.log(toggle);
  return (
    <animated.h1
      style={{
        width: x
          .interpolate({ range: [0, 1], output: [20, 30] })
          .interpolate((o) => `${o}px`),
      }}
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      hello
    </animated.h1>
  );
};
 */
export default MyAnimationTest;
