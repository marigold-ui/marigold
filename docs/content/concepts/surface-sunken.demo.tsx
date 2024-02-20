import { Card } from '@marigold/components';

export default () => {
  return (
    <div>
      <div className="bg-bg-surface-sunken/40 shadow-surface-sunken">
        I'm sunken
        <Card>
          <h2>Professor Severus Snape</h2>
          <section>
            <p>
              <strong>Professor Severus Snape</strong> (9 January, 1960[1] - 2
              May, 1998)[2] was an English half-blood[3] wizard serving as
              Potions Master (1981-1996), Head of Slytherin House (1981-1997),
              Defence Against the Dark Arts professor (1996-1997), and
              Headmaster (1997-1998) of the Hogwarts School of Witchcraft and
              Wizardry as well as a member of the Order of the Phoenix and a
              Death Eater. His double life played an extremely important role in
              both of the Wizarding Wars against Voldemort.
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};
