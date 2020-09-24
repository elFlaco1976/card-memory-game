import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";
import "./styles.scss";

/*
0 % { transform: scale(1); }
25 % { transform: scale(.97); }
35 % { transform: scale(.9); }
45 % { transform: scale(1.1); }
55 % { transform: scale(.9); }
65 % { transform: scale(1.1); }
75 % { transform: scale(1.03); }
100 % { transform: scale(1); }
`*/

const Demo = () => {
  const [state, toggle] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  });
  return (
    <div onClick={() => toggle(!state)}>
      <animated.div
        style={{
          opacity: x
            .interpolate({ range: [0, 1], output: [0.3, 1] })
            .interpolate((o) => `${o}px`),
        }}
      >
        click
      </animated.div>
    </div>
  );
};

export default Demo;
