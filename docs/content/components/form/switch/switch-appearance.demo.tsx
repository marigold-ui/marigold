import { Container, Switch, SwitchProps } from '@marigold/components';

export default (props: SwitchProps) => (
  <Container size={'small'}>
    <Switch {...props}>Default Switch</Switch>
  </Container>
);
