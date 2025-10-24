import { SelectList } from '@marigold/components';

export default () => (
  <SelectList
    aria-label="Select a venue"
    selectionMode="single"
    defaultSelectedKeys={['1']}
  >
    <SelectList.Item id="1" textValue="Main Street Park Amphitheater">
      <SelectList.Image
        src="/venues/main-street-park-amphitheater.webp"
        alt="Main Street Park Amphitheater"
        size="large"
      />
      <SelectList.Label>Main Street Park Amphitheater</SelectList.Label>
      <SelectList.Description>
        An open-air amphitheater in the town park with lawn seating and a
        covered stage, ideal for community performances.
      </SelectList.Description>
    </SelectList.Item>
    <SelectList.Item id="2" textValue="Shakytown Comedy Club">
      <SelectList.Image
        src="/venues/shakytown-comedy-club.webp"
        alt="Shakytown Comedy Club"
        size="large"
      />
      <SelectList.Label>Shakytown Comedy Club</SelectList.Label>
      <SelectList.Description>
        A cozy comedy club in the heart of Shakytown, offering an intimate
        atmosphere where every seat is close to the laughter.
      </SelectList.Description>
    </SelectList.Item>
    <SelectList.Item id="3" textValue="Oak Ridge Barn">
      <SelectList.Image
        src="/venues/oak-ridge-barn.webp"
        alt="Oak Ridge Barn"
        size="large"
      />
      <SelectList.Label>Oak Ridge Barn</SelectList.Label>
      <SelectList.Description>
        A restored timber barn with modern amenities, ideal for rustic weddings,
        small concerts, and community gatherings.
      </SelectList.Description>
    </SelectList.Item>
  </SelectList>
);
