import { Button, Drawer, DrawerProps } from '@marigold/components';

export default (props: DrawerProps) => (
  <Drawer.Trigger>
    <Button>Open Drawer</Button>
    <Drawer {...props}>
      <Drawer.Title>Drawer Title</Drawer.Title>
      <Drawer.Content>
        <p className="pb-4">
          Once upon a time in the quirky world of web design, there lived a
          lively Drawer Component named Daria. Unlike her staid companions, she
          loved to make a grand entrance by sliding in from the left, declaring,
          "Surprise! I've got filters and puns galore!"
        </p>

        <p className="pb-4">
          Every time a user clicked, Daria would pop out with flair, showing off
          her hidden treasures while her neighboring components—Header the Bold
          and Footer the Wise—watched in amused awe. They’d chuckle as Daria’s
          witty remarks filled the space between content sections.
        </p>

        <p className="pb-4">
          One day, Daria got a bit too excited. In a burst of enthusiasm, she
          slid out so fast that she disrupted the perfect grid layout! The Main
          Content, usually so composed, was thrown into disarray, muttering
          about lost pixels and wayward margins.
        </p>

        <p className="pb-4">
          But instead of sulking, Daria quipped, "Looks like I just broke the
          grid—guess I'm too stylish to be confined!" The users, entertained by
          her antics, cheered on as she restored order with a graceful slide
          back, proving that even a mischievous drawer could be the hero of
          responsive design.
        </p>
      </Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Close</Button>
        <Button
          slot="close"
          variant="primary"
          onPress={() => alert('Drawer will be closed')}
        >
          Save
        </Button>
      </Drawer.Actions>
    </Drawer>
  </Drawer.Trigger>
);
