import { cva } from '@marigold/system';

export default () => {
  const styledDiv = cva({
    base: 'p-4 text-4xl',
    variants: {
      variant: {
        myOwnVariant: 'bg-lime-200',
      },
    },
  });
  return (
    <div className={styledDiv({ variant: 'myOwnVariant' })}>
      this is some text
    </div>
  );
};
