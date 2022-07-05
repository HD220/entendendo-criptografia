import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: ${ ({flexDirection}) => flexDirection ? flexDirection : "row" };
  justify-content: center ;
  align-items: center;
  width: 100%;
  padding: 0.5rem ;
`

const Title = styled.h1`
  display: flex;
  flex: 1;
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
  text-decoration: none;
  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    &:hover,
    :focus,
    :active {
      text-decoration: underline;
    }
  }
`

const Input = styled.input`
  display: flex;
  flex: 1;
  width: 100%;
`

const Label = styled.label`
  display: flex;
  flex: 1;
  width: 100%;
`

export { Container, Title, Input, Label }