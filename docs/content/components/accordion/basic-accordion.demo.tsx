import { Accordion, Text } from '@marigold/components';

export default () => {
  return (
    <Accordion defaultExpandedKeys={[1]}>
      <Accordion.Item key={1} title="Harry Potter and the Philosopher's Stone">
        <Text>
          Harry Potter and the Philosopher's Stone is a 1997 fantasy novel
          written by British author J. K. Rowling. The first novel in the Harry
          Potter series and Rowling's debut novel, it follows Harry Potter, a
          young wizard who discovers his magical heritage on his eleventh
          birthday, when he receives a letter of acceptance to Hogwarts School
          of Witchcraft and Wizardry. Harry makes close friends and a few
          enemies during his first year at the school and with the help of his
          friends, Ron Weasley and Hermione Granger, he faces an attempted
          comeback by the dark wizard Lord Voldemort, who killed Harry's
          parents, but failed to kill Harry when he was just 15 months old.
        </Text>
      </Accordion.Item>
      <Accordion.Item key={2} title="Harry Potter and the Chamber of Secrets">
        <Text>
          Harry Potter and the Chamber of Secrets is a fantasy novel written by
          British author J. K. Rowling and the second novel in the Harry Potter
          series. The plot follows Harry's second year at Hogwarts School of
          Witchcraft and Wizardry, during which a series of messages on the
          walls of the school's corridors warn that the "Chamber of Secrets" has
          been opened and that the "heir of Slytherin" would kill all pupils who
          do not come from all-magical families. These threats are found after
          attacks that leave residents of the school petrified. Throughout the
          year, Harry and his friends Ron and Hermione investigate the attacks.
        </Text>
      </Accordion.Item>
      <Accordion.Item key={3} title="Harry Potter and the Prisoner of Azkaban">
        <Text>
          Harry Potter and the Prisoner of Azkaban is a fantasy novel written by
          British author J. K. Rowling and is the third in the Harry Potter
          series. The book follows Harry Potter, a young wizard, in his third
          year at Hogwarts School of Witchcraft and Wizardry. Along with friends
          Ronald Weasley and Hermione Granger, Harry investigates Sirius Black,
          an escaped prisoner from Azkaban, the wizard prison, believed to be
          one of Lord Voldemort's old allies.
        </Text>
      </Accordion.Item>
    </Accordion>
  );
};
