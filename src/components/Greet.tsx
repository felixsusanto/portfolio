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
  display: flex;
  flex-direction: column;
  justify-content: center; 
  height: 100%;
  font-size: 2rem;
  letter-spacing: -0.05em;
  line-height: 1.5;
  font-weight: 300;
  .prof-wrapper {
    height: ${ 2 * 1.5 }rem;
    overflow: hidden;
    text-align: left;
  }
  .greet {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .roles {
    white-space: nowrap;
    color: #c3e88d;
  }
  @media(min-width: 768px) {
    font-size: 4rem;
    .prof-wrapper {
      height: ${ 4 * 1.5 }rem;
    }
  }
`;

const Greet = (props: any) => {
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
      {props.children}
      <div className="greet">
        <div>I'm</div>
        <div className="prof-wrapper">
          <animated.div className="animate-wrapper" style={animProps}>
            { roles.map((s: string, i: number) => {
              return <div className="roles" key={i}>&nbsp;{s}</div>
            }) }
          </animated.div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Greet;