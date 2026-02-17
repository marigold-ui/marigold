import { ruiTheme } from '@/theme';
import {
  Headline,
  MarigoldProvider,
  Text,
  fontWeight,
  textAlign,
  textSize,
  textStyle,
} from '@/ui';

export const Headlines = () => {
  const headline = ruiTheme.components.Headline?.variants;

  if (!headline) {
    return null;
  }

  return (
    <table aria-label="typography" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Level</th>
          <th>Example</th>
          <th>Styles</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(headline?.size).map(([level, value]) => (
          <tr key={level}>
            <td>{level}</td>
            <td>
              <div>
                <MarigoldProvider theme={ruiTheme}>
                  <div className="align-center flex bg-white">
                    <Headline size={level}>
                      Discover the Beauty of Marigold
                    </Headline>
                  </div>
                </MarigoldProvider>
              </div>
            </td>
            <td>{value?.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const FontSizes = () => {
  return (
    <table aria-label="typography" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(textSize).map(([key, value]) => (
          <tr key={key}>
            <td>
              <code className="before:content-none after:content-none">
                {key}
              </code>
            </td>
            <td>{value}</td>
            <td>
              <Text fontSize={key as keyof typeof textSize}>
                Marigolds bloom with vibrant colors.
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const FontWeights = () => {
  return (
    <table aria-label="typography" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(fontWeight).map(([key, value]) => (
          <tr key={key}>
            <td>
              <code className="before:content-none after:content-none">
                {key}
              </code>
            </td>
            <td>{value}</td>
            <td>
              <Text weight={key as keyof typeof fontWeight}>
                Marigolds bloom with vibrant colors.
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const FontStyle = () => {
  return (
    <table aria-label="typography" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(textStyle).map(([key, value]) => (
          <tr key={key}>
            <td>
              <code className="before:content-none after:content-none">
                {key}
              </code>
            </td>
            <td>{value}</td>
            <td>
              <Text fontStyle={key as keyof typeof textStyle}>
                Marigolds bloom with vibrant colors.
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const TextAlign = () => {
  return (
    <table aria-label="typography" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(textAlign).map(([key, value]) => (
          <tr key={key}>
            <td>
              <code className="before:content-none after:content-none">
                {key}
              </code>
            </td>
            <td>{value}</td>
            <td>
              <Text align={key as keyof typeof textAlign}>
                Marigolds bloom with vibrant colors.
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
