import React from 'react';
import styled from 'styled-components';
import  { useSpring, animated } from 'react-spring'; 

const roles = [
  ' Felix Susanto',
  ' an Illustrator',
  ' a graphic designer',
  ' a web developer', 
  ' Felix Susanto'
]

const Wrapper = styled.div`
  font-size: 4rem;
  letter-spacing: -0.2rem;
  line-height: 1.5;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  .prof-wrapper {
    height: ${ 4 * 1.5 }rem;
    overflow: hidden;
    text-align: left;
  }
  .animate-wrapper {
  }
`;

const Greet = () => {
  const toTransform = Array(roles.length - 1)
    .fill('')
    .map((_:string, i: number) => {
      return {
        transform: `translateY(-${ (i+1)/roles.length * 100}%)`
      }
    })
  ;
  const animProps = useSpring({
    loop: { 
      to: toTransform,
      reset: true,
      reverse: true 
    },
    from: { transform: 'translateY(0%)'}
  });
  return (
    <Wrapper>
      <div>I'm</div>
      <div className="prof-wrapper">
        <animated.div className="animate-wrapper" style={animProps}>
          { roles.map((s: string, i: number) => {
            return <div key={i}>&nbsp;{s}</div>
          }) }
        </animated.div>
      </div>
    </Wrapper>
  );
};

export default Greet;