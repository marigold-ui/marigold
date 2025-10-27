import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { Button } from '../Button/Button';
import { SelectList, SelectListProps } from './SelectList';

type RenderProps = React.JSX.IntrinsicAttributes &
  SelectListProps &
  React.RefAttributes<HTMLUListElement>;

const cardImg =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NSIgaGVpZ2h0PSI1NCIgdmlld0JveD0iMCAwIDg1IDU0Ij4KICA8cmVjdCB3aWR0aD0iODUiIGhlaWdodD0iNTQiIHJ4PSI1IiBmaWxsPSIjMDA3NGZmIi8+CiAgPHJlY3QgeD0iNyIgeT0iMTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxMCIgcng9IjIiIGZpbGw9IiNmZmM4MDAiLz4KICA8dGV4dCB4PSI3IiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjZmZmIiBmb250LWZhbWlseT0iQXJpYWwiPuKAoiDigKLigKIg4oCi4oCi4oCiIOKAouKAouKAoiAxMjM0PC90ZXh0PgogIDx0ZXh0IHg9IjciIHk9IjQ1IiBmb250LXNpemU9IjQiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCI+Q0FSRCBIT0xERVI8L3RleHQ+CiAgPGNpcmNsZSBjeD0iNjgiIGN5PSIxNSIgcj0iNSIgZmlsbD0iI2ZmMDAwMCIgb3BhY2l0eT0iMC44Ii8+CiAgPGNpcmNsZSBjeD0iNzUiIGN5PSIxNSIgcj0iNSIgZmlsbD0iI2ZmYzgwMCIgb3BhY2l0eT0iMC44Ii8+Cjwvc3ZnPg==';

const InfoIcon = () => (
  <svg width="30px" height="30px" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-15h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

const meta: Meta<typeof SelectList> = {
  title: 'Components/SelectList',
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['none', 'single', 'multiple'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'single' },
      },
      description: 'Set selection mode of the select list',
      defaultValue: false,
    },
  },
  args: {
    selectionMode: 'single',
  },
} satisfies Meta<typeof SelectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  tags: ['component-test'],
  args: {
    onChange: fn(),
  },
  render: args => (
    <SelectList {...args} aria-labelledby="SelectList" selectionMode="single">
      <SelectList.Item id="charizard" textValue="Charizard">
        <SelectList.Label>Charizard</SelectList.Label>
      </SelectList.Item>
      <SelectList.Item id="blastoise" textValue="Blastoise">
        <SelectList.Label>Blastoise</SelectList.Label>
      </SelectList.Item>
      <SelectList.Item id="venusaur" textValue="Venusaur">
        <SelectList.Label>Venusaur</SelectList.Label>
      </SelectList.Item>
      <SelectList.Item id="pikachu" textValue="Pikachu">
        <SelectList.Label>Pikachu</SelectList.Label>
      </SelectList.Item>
    </SelectList>
  ),
  play: async ({ args, canvas, step }) => {
    await step('Renders all items', async () => {
      await expect(canvas.getByText('Charizard')).toBeInTheDocument();
      await expect(canvas.getByText('Blastoise')).toBeInTheDocument();
      await expect(canvas.getByText('Venusaur')).toBeInTheDocument();
      await expect(canvas.getByText('Pikachu')).toBeInTheDocument();
    });

    await step('Selects item on click', async () => {
      const charizard = canvas.getByRole('row', { name: /Charizard/i });
      await userEvent.click(charizard);
      await expect(args.onChange).toHaveBeenCalled();
      await expect(charizard).toHaveAttribute('aria-selected', 'true');
    });

    await step('Navigates with keyboard', async () => {
      const blastoise = canvas.getByRole('row', { name: /Blastoise/i });
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard(' '); // Space key selects the focused item
      await expect(blastoise).toHaveAttribute('aria-selected', 'true');
    });
  },
};

export const Compound: Story = {
  render: args => (
    <SelectList {...args} aria-labelledby="SelectList" selectionMode="single">
      <SelectList.Item id="charizard" textValue="Charizard">
        <SelectList.Image
          src="https://www.pokewiki.de/images/0/08/Hauptartwork_005.png"
          alt="Charizard"
          size="large"
        />
        <SelectList.Label>
          Charizard
          <span className="text-sm font-normal text-gray-600">
            (Fire/Flying)
          </span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with fire and flying abilities, lives in volcanic areas. Has
          a fierce temper and is known to breathe fire.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="blastoise" textValue="Blastoise">
        <SelectList.Image
          src="https://www.pokewiki.de/images/2/22/Hauptartwork_009.png"
          alt="Blastoise"
          size="large"
        />
        <SelectList.Label>
          Blastoise
          <span className="text-sm font-normal text-gray-600">(Water)</span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with water abilities, lives in water. Has a calm personality
          and is known to shoot water from its cannons.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="venusaur" textValue="Venusaur">
        <SelectList.Image
          src="https://www.pokewiki.de/images/1/1a/Hauptartwork_003.png"
          alt="Venusaur"
          size="large"
        />
        <SelectList.Label>
          Venusaur
          <span className="text-sm font-normal text-gray-600">
            (Grass/Poison)
          </span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with grass and poison abilities, lives in forests. Has a
          gentle personality and is known to have a large flower on its back.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="pikachu" textValue="Pikachu">
        <SelectList.Image
          src="https://www.pokewiki.de/images/9/9e/Hauptartwork_025.png"
          alt="Pikachu"
          size="large"
        />
        <SelectList.Label>
          Pikachu
          <span className="text-sm font-normal text-gray-600">(Electric)</span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with electric abilities, lives in trees. Has a playful
          personality and is known to generate electricity.
        </SelectList.Description>
      </SelectList.Item>
    </SelectList>
  ),
};

export const WithMultiSelection: Story = {
  tags: ['component-test'],
  args: {
    onChange: fn(),
  },
  render: (args: RenderProps) => (
    <SelectList {...args} aria-labelledby="SelectList" selectionMode="multiple">
      <SelectList.Item id="charizard" textValue="Charizard">
        <SelectList.Image
          src="https://www.pokewiki.de/images/0/08/Hauptartwork_005.png"
          alt="Charizard"
          size="large"
        />
        <SelectList.Label>
          Charizard
          <span className="text-sm font-normal text-gray-600">
            (Fire/Flying)
          </span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with fire and flying abilities, lives in volcanic areas. Has
          a fierce temper and is known to breathe fire.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="blastoise" textValue="Blastoise">
        <SelectList.Image
          src="https://www.pokewiki.de/images/2/22/Hauptartwork_009.png"
          alt="Blastoise"
          size="large"
        />
        <SelectList.Label>
          Blastoise
          <span className="text-sm font-normal text-gray-600">(Water)</span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with water abilities, lives in water. Has a calm personality
          and is known to shoot water from its cannons.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="venusaur" textValue="Venusaur">
        <SelectList.Image
          src="https://www.pokewiki.de/images/1/1a/Hauptartwork_003.png"
          alt="Venusaur"
          size="large"
        />
        <SelectList.Label>
          Venusaur
          <span className="text-sm font-normal text-gray-600">
            (Grass/Poison)
          </span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with grass and poison abilities, lives in forests. Has a
          gentle personality and is known to have a large flower on its back.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="pikachu" textValue="Pikachu">
        <SelectList.Image
          src="https://www.pokewiki.de/images/9/9e/Hauptartwork_025.png"
          alt="Pikachu"
          size="large"
        />
        <SelectList.Label>
          Pikachu
          <span className="text-sm font-normal text-gray-600">(Electric)</span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with electric abilities, lives in trees. Has a playful
          personality and is known to generate electricity.
        </SelectList.Description>
      </SelectList.Item>
    </SelectList>
  ),
  play: async ({ args, canvas, step }) => {
    await step('Renders checkboxes for multiple selection', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      await expect(checkboxes).toHaveLength(4);
    });

    await step('Selects multiple items', async () => {
      const charizard = canvas.getByRole('row', { name: /Charizard/i });
      const pikachu = canvas.getByRole('row', { name: /Pikachu/i });

      await userEvent.click(charizard);
      await userEvent.click(pikachu);

      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(charizard).toHaveAttribute('aria-selected', 'true');
      await expect(pikachu).toHaveAttribute('aria-selected', 'true');
    });
  },
};

export const WithLabelImage: Story = {
  render: args => (
    <SelectList {...args} aria-labelledby="SelectList" selectionMode="single">
      <SelectList.Item id="payment_card" textValue="Payment card">
        <SelectList.Label>
          <img src={cardImg} alt="Payment Card" width={36} />
          Payment card
          <span className="text-sm font-normal text-gray-600">(Debit)</span>
        </SelectList.Label>
        <SelectList.Description>
          A payment card that deducts money directly from your checking account.
          Widely accepted for purchases and ATM withdrawals.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="credit_card" textValue="Credit card">
        <SelectList.Label>
          <img src={cardImg} alt="Credit Card" width={36} />
          Credit card
          <span className="text-sm font-normal text-gray-600">(Credit)</span>
        </SelectList.Label>
        <SelectList.Description>
          A payment card that allows you to borrow funds up to a certain limit.
          Offers rewards and requires monthly payments.
        </SelectList.Description>
      </SelectList.Item>
    </SelectList>
  ),
};

export const WithLongDescription: Story = {
  render: args => (
    <SelectList {...args} aria-labelledby="SelectList" selectionMode="single">
      <SelectList.Item id="charizard" textValue="Charizard">
        <SelectList.Image
          src="https://www.pokewiki.de/images/0/08/Hauptartwork_005.png"
          alt="Charizard"
          size="large"
        />
        <SelectList.Label>
          Charizard
          <span className="text-sm font-normal text-gray-600">
            (Fire/Flying)
          </span>
        </SelectList.Label>
        <SelectList.Description>
          Charizard is a fierce Fire- and Flying-type Pokémon known for its
          dragon-like appearance and blazing power. Evolving from Charmeleon, it
          is the final form of Charmander, one of the original Kanto starters.
          Charizard soars through the sky, breathing intense flames capable of
          melting boulders and even starting forest fires. Proud and passionate,
          it never uses its full strength against weaker opponents. In battle,
          it combines speed and fiery attacks like Flamethrower and Fire Blast
          with impressive aerial agility. Charizard can Mega Evolve into Mega
          Charizard X or Y, each form amplifying its strength and granting
          unique new abilities.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="blastoise" textValue="Blastoise">
        <SelectList.Image
          src="https://www.pokewiki.de/images/2/22/Hauptartwork_009.png"
          alt="Blastoise"
          size="large"
        />
        <SelectList.Label>
          Blastoise
          <span className="text-sm font-normal text-gray-600">(Water)</span>
        </SelectList.Label>
        <SelectList.Description>
          Blastoise is a powerful Water-type Pokémon known for its massive,
          tank-like body and twin water cannons mounted on its shell. Evolving
          from Wartortle, it is the final form of Squirtle, one of the original
          Kanto starter Pokémon. Blastoise uses its cannons to shoot
          high-pressure water blasts capable of piercing steel and toppling
          walls. Despite its heavy armor, it's remarkably agile in water, making
          it both a fierce attacker and a dependable defender. Its intelligence
          and calm demeanor make it a reliable companion in battle. Mega
          Blastoise enhances its power even further with a single, enormous
          central cannon.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="venusaur" textValue="Venusaur">
        <SelectList.Image
          src="https://www.pokewiki.de/images/1/1a/Hauptartwork_003.png"
          alt="Venusaur"
          size="large"
        />
        <SelectList.Label>
          Venusaur
          <span className="text-sm font-normal text-gray-600">
            (Grass/Poison)
          </span>
        </SelectList.Label>
        <SelectList.Description>
          Venusaur is a powerful Grass- and Poison-type Pokémon and the final
          evolution of Bulbasaur, one of the original Kanto starter Pokémon. It
          has a massive flower blooming on its back, nourished by sunlight and
          supported by its sturdy, plant-like body. This flower releases a
          soothing aroma that calms those nearby and promotes plant growth.
          Venusaur draws energy from sunlight, using it to unleash devastating
          attacks like Solar Beam and Petal Blizzard. Known for its balance of
          strength and endurance, it thrives in both offense and defense.
          Through Mega Evolution, Venusaur's flower grows larger, enhancing its
          resilience and natural energy even further.
        </SelectList.Description>
      </SelectList.Item>
      <SelectList.Item id="pikachu" textValue="Pikachu">
        <SelectList.Image
          src="https://www.pokewiki.de/images/9/9e/Hauptartwork_025.png"
          alt="Pikachu"
          size="large"
        />
        <SelectList.Label>
          Pikachu
          <span className="text-sm font-normal text-gray-600">(Electric)</span>
        </SelectList.Label>
        <SelectList.Description>
          Pikachu is an Electric-type Pokémon and one of the most iconic
          creatures in the Pokémon world. It has yellow fur, long pointed ears
          with black tips, and a lightning bolt-shaped tail. Pikachu stores
          electricity in its cheeks, releasing powerful electric shocks when
          threatened or during battle. Known for its playful and loyal nature,
          it often forms strong bonds with its Trainer. Pikachu's signature
          move, Thunderbolt, demonstrates its impressive electrical strength.
          Though small, it's fast, clever, and courageous. When surrounded by
          others of its kind, their sparks can light up the air. Pikachu evolves
          into Raichu when exposed to a Thunder Stone.
        </SelectList.Description>
      </SelectList.Item>
    </SelectList>
  ),
};

export const WithAction: Story = {
  tags: ['component-test'],
  args: {
    onChange: fn(),
  },
  render: (args: RenderProps) => (
    <SelectList {...args} aria-labelledby="SelectList" selectionMode="single">
      <SelectList.Item id="charizard" textValue="Charizard">
        <SelectList.Image
          src="https://www.pokewiki.de/images/0/08/Hauptartwork_005.png"
          alt="Charizard"
          size="large"
        />
        <SelectList.Label>
          Charizard
          <span className="text-sm font-normal text-gray-600">
            (Fire/Flying)
          </span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with fire and flying abilities, lives in volcanic areas. Has
          a fierce temper and is known to breathe fire.
        </SelectList.Description>
        <SelectList.Action>
          <Button
            aria-label="Info"
            onPress={() => alert(`Info for Charizard...`)}
          >
            <InfoIcon />
          </Button>
        </SelectList.Action>
      </SelectList.Item>
      <SelectList.Item id="blastoise" textValue="Blastoise">
        <SelectList.Image
          src="https://www.pokewiki.de/images/2/22/Hauptartwork_009.png"
          alt="Blastoise"
          size="large"
        />
        <SelectList.Label>
          Blastoise
          <span className="text-sm font-normal text-gray-600">(Water)</span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with water abilities, lives in water. Has a calm personality
          and is known to shoot water from its cannons.
        </SelectList.Description>
        <SelectList.Action>
          <Button
            aria-label="Info"
            onPress={() => alert(`Info for Blastoise...`)}
          >
            <InfoIcon />
          </Button>
        </SelectList.Action>
      </SelectList.Item>
      <SelectList.Item id="venusaur" textValue="Venusaur">
        <SelectList.Image
          src="https://www.pokewiki.de/images/1/1a/Hauptartwork_003.png"
          alt="Venusaur"
          size="large"
        />
        <SelectList.Label>
          Venusaur
          <span className="text-sm font-normal text-gray-600">
            (Grass/Poison)
          </span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with grass and poison abilities, lives in forests. Has a
          gentle personality and is known to have a large flower on its back.
        </SelectList.Description>
        <SelectList.Action>
          <Button
            aria-label="Info"
            onPress={() => alert(`Info for Venusaur...`)}
          >
            <InfoIcon />
          </Button>
        </SelectList.Action>
      </SelectList.Item>
      <SelectList.Item id="pikachu" textValue="Pikachu">
        <SelectList.Image
          src="https://www.pokewiki.de/images/9/9e/Hauptartwork_025.png"
          alt="Pikachu"
          size="large"
        />
        <SelectList.Label>
          Pikachu
          <span className="text-sm font-normal text-gray-600">(Electric)</span>
        </SelectList.Label>
        <SelectList.Description>
          A Pokemon with electric abilities, lives in trees. Has a playful
          personality and is known to generate electricity.
        </SelectList.Description>
        <SelectList.Action>
          <Button
            aria-label="Info"
            onPress={() => alert(`Info for Pikachu...`)}
          >
            <InfoIcon />
          </Button>
        </SelectList.Action>
      </SelectList.Item>
    </SelectList>
  ),
};
