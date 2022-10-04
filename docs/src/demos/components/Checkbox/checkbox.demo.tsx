import {
  Button,
  Center,
  Checkbox,
  Dialog,
  Image,
  Stack,
} from '@marigold/components';

export const CheckboxDemo = () => (
  <Dialog.Trigger dismissable={false} keyboardDismissable={false}>
    <Checkbox defaultChecked readOnly>
      I will not talk about Fight Club
    </Checkbox>
    <Dialog>
      {({ close }) => (
        <Center>
          <Stack space="medium">
            <Image
              alt="you will not talk about fight club"
              src="/fight-club.gif"
            />
            <Button variant="primary" onClick={close}>
              Fine! Calm down!
            </Button>
          </Stack>
        </Center>
      )}
    </Dialog>
  </Dialog.Trigger>
);
